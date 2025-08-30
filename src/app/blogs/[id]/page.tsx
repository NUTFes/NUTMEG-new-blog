import React from 'react';
import Layout from '../../../app/layout';
// import { getNotionPage } from '@/lib/notion'; // Notionからページを取得する関数
import { getNotionPage } from '../../lib/notion'; // Notionからページを取得する関数

// import NotionPage from '@/app/components/NotionPage/notionPage';
import NotionPage from '../../../app/components/NotionPage/notionPage';

import Image from 'next/image';

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
  searchParams: {
    title?: string; // タイトル (オプション)
    thumbnail?: string; // サムネイルURL (オプション)
    publishedAt?: string; // 公開日 (オプション)
    tags?: string; // タグ (カンマ区切りの文字列)
    summary?: string; // 要約 (オプション)
    author?: string; // 著者名 (オプション)
  };
}

export default async function BlogPostPage({ params, searchParams }: BlogPostPageProps) {
  const { id } = await params;
  const NOTION_PAGE_ID = id;  // NotionのページIDを取得
  
  // クエリパラメータから一部データを取得
  const preloadedData = {
    title: searchParams.title,
    thumbnail: searchParams.thumbnail,
    publishedAt: searchParams.publishedAt,
    tags: searchParams.tags,
    summary: searchParams.summary,
    author: searchParams.author,
  };

  try {
    const recordMap = await getNotionPage(NOTION_PAGE_ID);
    // レコードマップを取得してNotionPageコンポーネント(clientコンポーネント)に渡す
    return (
      <Layout>
        <div className='align-left text-left'>
          <div className='max-w-[688px] mt-32 mx-auto px-4'>
            {/* クエリパラメータから取得したデータを表示 */}
              {/* タイトルを表示 */}
              <h2 className="text-4xl font-bold ">
                {preloadedData.title}
              </h2>
              {/* サムネイル画像が存在する場合は表示 */}
              {preloadedData.thumbnail && (
                <div className="relative h-64">
                  <Image
                    src={preloadedData.thumbnail}
                    alt={preloadedData.title ?? ''}
                    fill
                    className="object-contain rounded-lg mb-4"
                  />
                </div>
              )}
              {/* 公開日、著者名、要約、タグを表示 */}
              <p className="text-gray-600 mb-2">公開日: {preloadedData.publishedAt}</p>
              {/* <p className="text-gray-600 mb-2">著者: {preloadedData.author}</p> */}
              {/* <p className="text-gray-600 mb-2">要約: {preloadedData.summary}</p> */}
              <p className="text-gray-600 mb-2">タグ: {preloadedData.tags}</p>
            {/* Notionページの内容を表示 */}
          </div>
          <NotionPage recordMap={recordMap} />
        </div>
      </Layout>
    );
  } catch (error) {
    console.error('Failed to load Notion page:', error);
    return (
      <div className="error-page">
        <h1>ページの読み込みに失敗しました</h1>
        <p>Notionページが公開されているか確認してください。</p>
      </div>
    );
  }
}
