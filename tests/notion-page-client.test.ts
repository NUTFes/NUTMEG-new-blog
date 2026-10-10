import assert from 'node:assert/strict';
import { test, type TestContext } from 'node:test';
import type { ExtendedRecordMap } from 'notion-types';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NotionRenderer } from 'react-notion-x';
import { NotionPageClient } from '../src/app/lib/notion-page-client';
import {
  normalizeRecordMap,
  prepareRecordMapForRendering,
} from '../src/app/lib/notion-record-map';

const pageId = '11111111-1111-4111-8111-111111111111';
const id = (n: number) => `22222222-2222-4222-8222-${String(n).padStart(12, '0')}`;
const block = (blockId: string, type = 'text', content?: string[]) => ({
  id: blockId,
  type,
  properties: { title: [[`Block ${blockId}`]] },
  ...(content && { content }),
});
const nested = (value: unknown) => ({ value: { role: 'reader', value } });
const flat = (value: unknown) => ({ role: 'reader', value });
const chunk = (blocks: Record<string, unknown>) => ({
  recordMap: { block: blocks },
  cursor: { stack: [] },
});
const requestIds = (body: Record<string, unknown>) =>
  (body.requests as { id: string }[]).map((request) => request.id);

function mockApi(
  t: TestContext,
  respond: (endpoint: string, body: Record<string, unknown>) => unknown
) {
  const requests: { endpoint: string; body: Record<string, unknown> }[] = [];
  t.mock.method(globalThis, 'fetch', async (input: string, init: RequestInit) => {
    const endpoint = new URL(input).pathname.split('/').pop()!;
    const body = JSON.parse(init.body as string) as Record<string, unknown>;
    requests.push({ endpoint, body });
    const response = respond(endpoint, body);
    return response instanceof Response ? response : Response.json(response);
  });

  return {
    client: new NotionPageClient({ ofetchOptions: { retry: 0 } }),
    requests,
  };
}

test('fetches beyond the first 100 blocks, including rows of a table in a later chunk', async (t) => {
  const children = Array.from({ length: 130 }, (_, i) => id(i));
  const tableId = children[129];
  const rowId = id(130);
  const allBlocks = Object.fromEntries(children.map((childId) => [childId, nested(block(childId))]));
  allBlocks[children[128]] = nested({
    ...block(children[128], 'header'),
    properties: { title: [['あとがき']] },
  });
  allBlocks[tableId] = nested({
    ...block(tableId, 'table', [rowId]),
    format: { table_block_column_order: ['title'] },
  });
  allBlocks[rowId] = nested({
    ...block(rowId, 'table_row'),
    parent_id: tableId,
    properties: { title: [['末尾の表の行']] },
  });

  const { client, requests } = mockApi(t, (endpoint, body) => {
    if (endpoint === 'loadPageChunk') {
      assert.equal(body.limit, 100);
      return chunk({
        [pageId]: nested(block(pageId, 'page', children)),
        ...Object.fromEntries(children.slice(0, 99).map((childId) => [childId, allBlocks[childId]])),
      });
    }
    assert.equal(endpoint, 'syncRecordValuesMain');
    return chunk(Object.fromEntries(requestIds(body).map((childId) => [childId, allBlocks[childId]])));
  });

  const map = await client.getPage(pageId);
  const renderable = prepareRecordMapForRendering(map);
  assert.deepEqual(renderable.block[pageId].value.content, children);
  assert.equal(renderable.block[rowId].value.type, 'table_row');
  assert.equal(Object.keys(renderable.block).length, 132);
  const html = renderToStaticMarkup(createElement(NotionRenderer, {
    recordMap: renderable,
    fullPage: false,
  }));
  assert.match(html, /あとがき/);
  assert.match(html, /末尾の表の行/);
  assert.deepEqual(
    requests.filter((request) => request.endpoint === 'syncRecordValuesMain').map((request) => requestIds(request.body)),
    [children.slice(99), [rowId]]
  );
});

test('supports flat responses and keeps the requested page first even if another block arrives first', async (t) => {
  const { client, requests } = mockApi(t, () => chunk({
    [id(1)]: flat(block(id(1))),
    [pageId]: flat(block(pageId, 'page', [id(1)])),
  }));

  const map = await client.getPage(pageId.replaceAll('-', ''));
  assert.equal(Object.keys(map.block)[0], pageId);
  assert.deepEqual(map.block[pageId].value.content, [id(1)]);
  assert.equal(requests.length, 1);
});

test('retries an invalid initial entry without losing its child reference', async (t) => {
  const { client, requests } = mockApi(t, (endpoint) => endpoint === 'loadPageChunk'
    ? chunk({
      [pageId]: nested(block(pageId, 'page', [id(1)])),
      [id(1)]: { value: {} },
    })
    : chunk({ [id(1)]: flat(block(id(1))) })
  );

  const map = await client.getPage(pageId);
  assert.equal(map.block[id(1)].value.type, 'text');
  assert.equal(requests.length, 2);
});

test('fetches incomplete child entries included incidentally in a continuation response', async (t) => {
  const { client, requests } = mockApi(t, (endpoint, body) => {
    if (endpoint === 'loadPageChunk') {
      return chunk({ [pageId]: nested(block(pageId, 'page', [id(1)])) });
    }
    if (requestIds(body)[0] === id(1)) {
      return chunk({
        [id(1)]: nested(block(id(1), 'table', [id(2)])),
        [id(2)]: { value: { role: 'reader' } },
      });
    }
    assert.deepEqual(requestIds(body), [id(2)]);
    return chunk({ [id(2)]: nested(block(id(2), 'table_row')) });
  });

  const map = await client.getPage(pageId);
  assert.equal(map.block[id(2)].value.type, 'table_row');
  assert.equal(requests.length, 3);
});

test('skips explicitly inaccessible blocks after retrieval and still displays later text', async (t) => {
  const { client, requests } = mockApi(t, (endpoint, body) => {
    if (endpoint === 'loadPageChunk') {
      return chunk({
        [pageId]: nested(block(pageId, 'page', [id(1), id(2), id(3)])),
        [id(1)]: { value: { role: 'none' } },
      });
    }
    assert.deepEqual(requestIds(body), [id(2), id(3)]);
    return chunk({
      [id(2)]: { role: 'none' },
      [id(3)]: nested(block(id(3))),
    });
  });

  const map = await client.getPage(pageId);
  assert.deepEqual(map.block[pageId].value.content, [id(1), id(2), id(3)]);
  const renderable = prepareRecordMapForRendering(map);
  assert.deepEqual(renderable.block[pageId].value.content, [id(3)]);
  assert.equal(requests.length, 2);
});

for (const [description, response] of [
  ['omitted blocks', chunk({})],
  ['malformed blocks', chunk({ [id(1)]: { value: { role: 'reader', value: {} } } })],
  ['mismatched block IDs', chunk({ [id(1)]: nested(block(id(2))) })],
  ['a missing recordMap', {}],
] as const) {
  test(`rejects ${description} instead of looping or returning a partial page`, async (t) => {
    const { client, requests } = mockApi(t, (endpoint) => endpoint === 'loadPageChunk'
      ? chunk({ [pageId]: nested(block(pageId, 'page', [id(1)])) })
      : response
    );

    await assert.rejects(client.getPage(pageId), /Notion did not return requested blocks/);
    assert.equal(requests.length, 2);
  });
}

test('propagates a failed continuation request so callers cannot cache partial content', async (t) => {
  const { client, requests } = mockApi(t, (endpoint) => endpoint === 'loadPageChunk'
    ? chunk({ [pageId]: nested(block(pageId, 'page', [id(1)])) })
    : Response.json({ message: 'Unavailable' }, { status: 503 })
  );

  await assert.rejects(client.getPage(pageId), /503/);
  assert.equal(requests.length, 2);
});

test('rejects an inaccessible root instead of rendering a different available block', async (t) => {
  const { client, requests } = mockApi(t, () => chunk({
    [id(1)]: nested(block(id(1))),
    [pageId]: { value: { role: 'none' } },
  }));

  await assert.rejects(client.getPage(pageId), /Notion page not found/);
  assert.equal(requests.length, 1);
});

test('signs file URLs for images fetched in subsequent chunks', async (t) => {
  const { client, requests } = mockApi(t, (endpoint, body) => {
    if (endpoint === 'loadPageChunk') {
      return chunk({ [pageId]: nested(block(pageId, 'page', [id(1)])) });
    }
    if (endpoint === 'syncRecordValuesMain') {
      return chunk({
        [id(1)]: nested({
          ...block(id(1), 'image'),
          file_ids: ['file-id'],
          properties: { source: [['attachment:image.png']] },
        }),
      });
    }
    assert.equal(endpoint, 'getSignedFileUrls');
    assert.deepEqual(body.urls, [{ permissionRecord: { table: 'block', id: id(1) }, url: 'attachment:image.png' }]);
    return { signedUrls: ['https://example.com/signed-image.png'] };
  });

  const map = await client.getPage(pageId);
  assert.equal(map.signed_urls[id(1)], 'https://example.com/signed-image.png');
  assert.equal(requests.length, 3);
});

test('normalizes record tables without mutating input, pruning missing children, or changing query results', () => {
  const query = { collection: { view: { value: { count: 2 } } } };
  const input = {
    block: { [pageId]: nested(block(pageId, 'page', [id(1)])) },
    collection: { collection: nested({ id: 'collection', name: [['Collection']] }) },
    collection_view: { view: nested({ id: 'view', type: 'table' }) },
    notion_user: { user: nested({ id: 'user', given_name: 'Example' }) },
    collection_query: query,
    signed_urls: { [id(1)]: 'https://example.com/image.png' },
  };
  const original = structuredClone(input);
  const result = normalizeRecordMap(input as unknown as ExtendedRecordMap);

  assert.deepEqual(result.block[pageId].value.content, [id(1)]);
  assert.equal(result.collection.collection.value.id, 'collection');
  assert.equal(result.collection_view.view.value.type, 'table');
  assert.equal(result.notion_user.user.value.given_name, 'Example');
  assert.deepEqual(result.collection_query, query);
  assert.deepEqual(result.signed_urls, input.signed_urls);
  assert.deepEqual(input, original);
  assert.deepEqual(normalizeRecordMap(result), result);
});
