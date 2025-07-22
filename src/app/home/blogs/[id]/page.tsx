import React from 'react';
// import Layout from '../../../components/layout';
import { getNotionPage } from '../../../../lib/notion'; // Notionページを取得する関数
import NotionPage from '../../../components/NotionPage/notionPage';

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const NOTION_PAGE_ID = id;  // NotionのページIDを取得

  try {
    const recordMap = await getNotionPage(NOTION_PAGE_ID);
    // レコードマップを取得してNotionPageコンポーネント(clientコンポーネント)に渡す
    return <NotionPage recordMap={recordMap} />;
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
