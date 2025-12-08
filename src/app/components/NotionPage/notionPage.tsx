'use client';

import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { useEffect, useState } from 'react';
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

export default function NotionPage({ recordMap }: NotionPageProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        recordMap={recordMap}
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
