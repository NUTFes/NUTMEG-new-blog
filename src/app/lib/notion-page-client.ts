import { NotionAPI } from 'notion-client';
import type { RecordMap } from 'notion-types';
import { parsePageId } from 'notion-utils';
import {
  isObject,
  isUnavailableBlock,
  isValidBlockEntry,
  normalizeRecordMap,
} from './notion-record-map';

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
    const response = await super.getPageRaw(pageId, options);
    const id = parsePageId(pageId);
    if (!id) throw new Error(`Invalid Notion page ID "${pageId}"`);
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

  override async getBlocks(
    blockIds: string[],
    options?: Parameters<NotionAPI['getBlocks']>[1]
  ) {
    const response = await super.getBlocks(blockIds, options);
    const unresolved = blockIds.filter((id) => {
      const entry = response.recordMap?.block?.[id];
      return !isUnavailableBlock(entry) &&
        (!isValidBlockEntry(entry) || entry.value.id !== id);
    });

    // An explicit role:none is an inaccessible record. A missing/malformed
    // response is a fetch failure: throw instead of looping or caching a partial page.
    if (unresolved.length > 0) {
      throw new Error(`Notion did not return requested blocks: ${unresolved.join(', ')}`);
    }

    return response;
  }
}
