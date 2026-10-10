import type { BlockMap, ExtendedRecordMap, RecordMap } from 'notion-types';

const RECORD_MAP_TABLES = [
  'block',
  'collection',
  'collection_view',
  'notion_user',
  'space',
] as const;

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeEntry(entry: unknown) {
  if (
    !isObject(entry) ||
    !isObject(entry.value) ||
    (!('value' in entry.value) && entry.value.role !== 'none')
  ) {
    return entry;
  }

  return {
    ...entry,
    role: entry.role ?? entry.value.role,
    value: entry.value.value,
  };
}

export function isUnavailableBlock(entry: unknown): boolean {
  return isObject(entry) && entry.role === 'none';
}

// An entry whose record actually arrived, as opposed to role:none or an
// incomplete placeholder such as `{ value: { role: 'reader' } }`.
export function isValidRecordEntry(entry: unknown): boolean {
  return isObject(entry) && isObject(entry.value) && typeof entry.value.id === 'string';
}

export function isValidBlockEntry(entry: unknown): entry is BlockMap[string] {
  return (
    isObject(entry) &&
    !isUnavailableBlock(entry) &&
    isObject(entry.value) &&
    typeof entry.value.id === 'string' &&
    typeof entry.value.type === 'string'
  );
}

// Keep child IDs here: the client still needs them to fetch subsequent chunks.
export function normalizeRecordMap<T extends RecordMap>(recordMap: T): T {
  const normalized = { ...recordMap } as Record<string, unknown>;

  for (const tableName of RECORD_MAP_TABLES) {
    const table = normalized[tableName];
    if (!isObject(table)) continue;

    normalized[tableName] = Object.fromEntries(
      Object.entries(table).map(([id, entry]) => [id, normalizeEntry(entry)])
    );
  }

  return normalized as unknown as T;
}

// Rendering may omit inaccessible or incomplete records, but only after
// fetching is complete.
export function prepareRecordMapForRendering(
  recordMap: ExtendedRecordMap
): ExtendedRecordMap {
  const normalized = normalizeRecordMap(recordMap) as unknown as Record<string, unknown>;
  const result = { ...normalized };

  // react-notion-x reads `.value.schema`, `.value.format` etc. straight off
  // these tables, so an entry without its record must not reach it.
  for (const tableName of RECORD_MAP_TABLES) {
    const table = normalized[tableName];
    if (tableName === 'block' || !isObject(table)) continue;

    result[tableName] = Object.fromEntries(
      Object.entries(table).filter(([, entry]) => isValidRecordEntry(entry))
    );
  }

  const blockTable = isObject(normalized.block) ? normalized.block : {};
  const blocks = Object.fromEntries(
    Object.entries(blockTable).filter(([, entry]) => isValidBlockEntry(entry))
  ) as BlockMap;
  const validIds = new Set(Object.keys(blocks));

  result.block = Object.fromEntries(
    Object.entries(blocks).map(([id, entry]) => [
      id,
      {
        ...entry,
        value: {
          ...entry.value,
          ...(Array.isArray(entry.value.content) && {
            content: entry.value.content.filter(
              (childId) => typeof childId === 'string' && validIds.has(childId)
            ),
          }),
        },
      },
    ])
  );

  return result as unknown as ExtendedRecordMap;
}
