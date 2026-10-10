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

// Rendering may omit inaccessible records, but only after fetching is complete.
export function prepareRecordMapForRendering(
  recordMap: ExtendedRecordMap
): ExtendedRecordMap {
  const normalized = normalizeRecordMap(recordMap);
  const blocks = Object.fromEntries(
    Object.entries(normalized.block).filter(([, entry]) => isValidBlockEntry(entry))
  );
  const validIds = new Set(Object.keys(blocks));

  return {
    ...normalized,
    block: Object.fromEntries(
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
    ),
  };
}
