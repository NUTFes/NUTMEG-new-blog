import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getNotionPage, getBlogPosts } from '../../lib/notion';
import NotionPage from '../../../app/components/NotionPage/notionPage';
import { BlogPost } from '../../types/blog';
import BackButtonClient from './BackButtonClient';

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
  searchParams: {
    title?: string;
    thumbnail?: string;
    publishedAt?: string;
    tags?: string;
    summary?: string;
    author?: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const NOTION_PAGE_ID = id;

  // ブログ記事データを取得
  const allPosts = await getBlogPosts();
  const postData = allPosts.find((p: BlogPost) => p.id === id);

  if (!postData) {
    return (
      <div className="error-page">
        <h1>記事が見つかりません</h1>
      </div>
    );
  }

  const recordMap = await getNotionPage(NOTION_PAGE_ID);

  return (
    <div className="align-left text-left">
      <div className="max-w-[688px] mt-32 mx-auto px-4 space-y-6">
        {/* --- 上の戻るボタン --- */}
        <BackButtonClient />
        {/* --- サムネイル --- */}
        {postData.thumbnail && (
          <div className="relative h-64">
            <Image
              src={postData.thumbnail}
              alt={postData.title ?? ""}
              fill
              className="object-contain rounded-lg mb-4"
            />
          </div>
        )}
        {/* --- 記事タイトル --- */}
        <h2 className="text-4xl font-bold">{postData.title}</h2>



{/* --- 作成者情報 --- */}
<div className="flex items-center mb-4 text-gray-600">
  作成者:
  {postData.authorSlug ? (
    <Link
      href={`/members/${postData.authorSlug}`}
      className="flex items-center group ml-2"
    >
      {postData.authorIcon && (
        <Image
          src={postData.authorIcon}
          alt={postData.author ?? "Author"}
          width={40}
          height={40}
          className="rounded-full mr-2 transition-transform group-hover:scale-105"
        />
      )}
      <span className="underline decoration-gray-700 group-hover:decoration-orange-500 group-hover:text-orange-500 transition-colors">
        {postData.author}
      </span>
    </Link>
  ) : (
    <div className="flex items-center group ml-2">
      {postData.authorIcon && (
        <Image
          src={postData.authorIcon}
          alt={postData.author ?? "Author"}
          width={40}
          height={40}
          className="rounded-full mr-2"
        />
      )}
      <span className="text-gray-700">{postData.author}</span>
    </div>
  )}
</div>


        {/* --- 公開日・タグ --- */}
        <p className="text-gray-600 mb-2">公開日: {postData.publishedAt}</p>
        <p className="text-gray-600 mb-2">タグ: {postData.tags?.join(", ")}</p>

        {/* --- Notion本文 --- */}
        <div className="mb-32">
          <NotionPage recordMap={recordMap} />
          <div className="mb-32"></div>

            {/* --- 下の戻るボタン --- */}
            <BackButtonClient />
        </div>


      </div>
    </div>
  );
}
