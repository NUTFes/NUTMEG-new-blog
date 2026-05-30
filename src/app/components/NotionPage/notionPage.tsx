'use client';

import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { useEffect, useMemo, useState } from 'react';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

const NotionRenderer = dynamic(
  () => import('react-notion-x').then((mod) => mod.NotionRenderer),
  { ssr: false }
);

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
}

type RecordMapTable = Record<string, unknown>;

const RECORD_MAP_TABLES = [
  'block',
  'collection',
  'collection_view',
  'collection_query',
  'notion_user',
  'space',
] as const;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function normalizeRecordMapEntry(entry: unknown) {
  if (!isObject(entry) || !isObject(entry.value) || !('value' in entry.value)) {
    return entry;
  }

  return {
    ...entry,
    role: entry.role ?? entry.value.role,
    value: entry.value.value,
  };
}

function normalizeRecordMap(recordMap: ExtendedRecordMap): ExtendedRecordMap {
  const normalizedRecordMap = { ...recordMap } as Record<string, unknown>;

  for (const tableName of RECORD_MAP_TABLES) {
    const table = normalizedRecordMap[tableName];

    if (!isObject(table)) {
      continue;
    }

    normalizedRecordMap[tableName] = Object.fromEntries(
      Object.entries(table as RecordMapTable).map(([id, entry]) => [
        id,
        normalizeRecordMapEntry(entry),
      ])
    );
  }

  return normalizedRecordMap as unknown as ExtendedRecordMap;
}

export default function NotionPage({ recordMap }: NotionPageProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const normalizedRecordMap = useMemo(() => normalizeRecordMap(recordMap), [recordMap]);

  useEffect(() => {
    // 初期値をユーザー設定から取得
    const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkMediaQuery.matches);

    // ユーザーが切り替えた場合のリスナー
    const listener = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    darkMediaQuery.addEventListener('change', listener);

    return () => {
      darkMediaQuery.removeEventListener('change', listener);
    };
  }, []);

  return (
    <div className="notion-page">
      <NotionRenderer 
        recordMap={normalizedRecordMap}
        fullPage={false}
        darkMode={isDarkMode} // ユーザー設定に応じて切替
        components={{
          Code: Code,
          Equation: Equation,
        }}
      />
    </div>
  );
}
