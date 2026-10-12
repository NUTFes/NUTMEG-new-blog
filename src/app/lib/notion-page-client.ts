import { NotionAPI } from 'notion-client';
import type { BlockMap, RecordMap } from 'notion-types';
import { parsePageId } from 'notion-utils';
import {
  isObject,
  isUnavailableBlock,
  isValidBlockEntry,
  normalizeRecordMap,
} from './notion-record-map';

type PageChunk = Awaited<ReturnType<NotionAPI['getBlocks']>>;

// The same shape Notion returns for a record the caller cannot read.
const UNAVAILABLE_BLOCK = { role: 'none' } as unknown as BlockMap[string];

function unresolvedBlockIds(blockIds: string[], response: PageChunk): string[] {
  return blockIds.filter((id) => {
    const entry = response.recordMap.block?.[id];
    return !isUnavailableBlock(entry) && !isValidBlockEntry(entry);
  });
}

function withBlocks(response: PageChunk, blocks: BlockMap): PageChunk {
  return {
    ...response,
    recordMap: {
      ...response.recordMap,
      block: { ...response.recordMap.block, ...blocks },
    },
  };
}

export class NotionPageClient extends NotionAPI {
  // Normalize every response before notion-client traverses it. This also covers
  // collections and file URL discovery for blocks fetched after the first chunk.
  override async fetch<T>(options: Parameters<NotionAPI['fetch']>[0]): Promise<T> {
    const response = await super.fetch<T>(options);
    if (!isObject(response) || !isObject(response.recordMap)) return response;

    const recordMap = normalizeRecordMap(response.recordMap as unknown as RecordMap);
    if (isObject(recordMap.block)) {
      // Invalid placeholders must remain fetchable, including ones included
      // incidentally in a continuation response. Keep all parent content IDs.
      recordMap.block = Object.fromEntries(
        Object.entries(recordMap.block).filter(([id, entry]) =>
          isUnavailableBlock(entry) || (isValidBlockEntry(entry) && entry.value.id === id)
        )
      );
    }

    return {
      ...response,
      recordMap,
    };
  }

  override async getPageRaw(
    pageId: string,
    options?: Parameters<NotionAPI['getPageRaw']>[1]
  ) {
    const id = parsePageId(pageId);
    if (!id) throw new Error(`Invalid Notion page ID "${pageId}"`);

    const response = await super.getPageRaw(pageId, options);
    const blocks = response.recordMap?.block;
    const root = blocks?.[id];

    if (!isValidBlockEntry(root)) {
      throw new Error(`Notion page not found "${pageId}"`);
    }

    return {
      ...response,
      recordMap: {
        ...response.recordMap,
        // Both the client and renderer use the first block as the page root.
        block: {
          [id]: root,
          ...blocks,
        },
      },
    };
  }

  // notion-client keeps requesting IDs until each one has an entry in the
  // record map, so every requested ID must come back as either a valid block
  // or an explicit role:none. The fetch override already removed malformed
  // and mismatched entries, so anything else is simply missing here.
  override async getBlocks(
    blockIds: string[],
    options?: Parameters<NotionAPI['getBlocks']>[1]
  ) {
    let response = await super.getBlocks(blockIds, options);
    if (!isObject(response?.recordMap)) {
      throw new Error(
        `Notion did not return a record map for requested blocks: ${blockIds.join(', ')}`
      );
    }

    let unresolved = unresolvedBlockIds(blockIds, response);
    if (unresolved.length > 0) {
      // A continuation response can omit records transiently; ask once more.
      const retry = await super.getBlocks(unresolved, options);
      if (isObject(retry?.recordMap?.block)) {
        response = withBlocks(response, retry.recordMap.block);
      }
      unresolved = unresolvedBlockIds(blockIds, response);
    }

    if (unresolved.length > 0) {
      // Treat what Notion keeps omitting (e.g. a mention of a deleted page) as
      // inaccessible, so the rest of the article still renders instead of
      // looping forever or failing the whole page.
      console.warn(
        `Notion did not return requested blocks; treating them as unavailable: ${unresolved.join(', ')}`
      );
      response = withBlocks(
        response,
        Object.fromEntries(
          unresolved.map((id): [string, BlockMap[string]] => [id, UNAVAILABLE_BLOCK])
        )
      );
    }

    return response;
  }
}
