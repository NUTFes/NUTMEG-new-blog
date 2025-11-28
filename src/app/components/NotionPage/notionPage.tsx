'use client';

import dynamic from 'next/dynamic';
import { ExtendedRecordMap } from 'notion-types';
import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

// 動的インポートでNotionRendererをクライアントサイドでのみ読み込む
const NotionRenderer = dynamic(
  () => import('react-notion-x').then((mod) => mod.NotionRenderer),
  { ssr: false }
);

interface NotionPageProps {
  recordMap: ExtendedRecordMap;
}

export default function NotionPage({ recordMap }: NotionPageProps) {
  return (
    <div className="notion-page">
      <NotionRenderer 
        recordMap={recordMap} // レコードマップ(Notionのデータ構造)を渡す
        fullPage={false} // フルページ表示を無効化 (レスポンシブ対応)
        darkMode={true} // ダークモードを無効化
        // 独自のコンポーネントを指定したい場合は、ここで指定
        components={{
          Code: Code,     // コードブロックのコンポーネント
          Equation: Equation, // 数式のコンポーネント
        }}
      />
    </div>
  );
}