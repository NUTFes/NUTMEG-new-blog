import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getNotionPage, getBlogPosts } from '../../lib/notion';
import NotionPage from '../../../app/components/NotionPage/notionPage';
import { BlogPost } from '../../types/blog';
import BackButtonClient from './BackButtonClient';
import NavigationButton from '../../components/NavigationButton';

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    title?: string;
    thumbnail?: string;
    publishedAt?: string;
    tags?: string;
    summary?: string;
    author?: string;
  }>;
}

export const runtime = 'edge';

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { id } = await params;
    const NOTION_PAGE_ID = id;

    // ブログ記事データを取得
    let allPosts: BlogPost[];
    try {
      allPosts = await getBlogPosts();
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      return (
        <div className="max-w-2xl mx-auto mt-32 px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            記事一覧の取得に失敗しました
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            しばらく時間をおいてから再度お試しください。
          </p>
          <div className="flex justify-center mb-8">
            <NavigationButton text="ブログ一覧に戻る" href="/blogs" arrowLeft={true} />
          </div>
        </div>
      );
    }

    const postData = allPosts.find((p: BlogPost) => p.id === id);

    if (!postData) {
      return (
        <div className="max-w-2xl mx-auto mt-32 px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            記事が見つかりません
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            お探しの記事は削除されたか、URLが間違っている可能性があります。
          </p>
          <div className="flex justify-center mb-8">
            <NavigationButton text="ブログ一覧に戻る" href="/blogs" arrowLeft={true} />
          </div>
        </div>
      );
    }

    // Notionページデータを取得
    let recordMap;
    try {
      recordMap = await getNotionPage(NOTION_PAGE_ID);
    } catch (error) {
      console.error('Failed to fetch Notion page:', error);
      return (
        <div className="max-w-2xl mx-auto mt-32 px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            記事の読み込みに失敗しました
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            記事取得に失敗しました。<br />
            しばらく時間をおいてから再度お試しください。
          </p>
          <div className="flex justify-center mb-20">
            <NavigationButton text="ブログ一覧に戻る" href="/blogs" arrowLeft={true} />
          </div>
        </div>
      );
    }

    return (
<div className="align-left text-left dark:text-white">
  <div className="max-w-[688px] mt-32 mx-auto px-4 space-y-6">

    <BackButtonClient />

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

    <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
      {postData.title}
    </h2>

    <div className="flex items-center mb-4 text-gray-600 dark:text-gray-300">
      作成者:
      {postData.authorSlug ? (
        <Link href={`/members/${postData.authorSlug}`} className="flex items-center group ml-2">
          {postData.authorIcon && (
            <Image
              src={postData.authorIcon}
              alt={postData.author ?? "Author"}
              width={40}
              height={40}
              className="rounded-full mr-2 border border-gray-300 dark:border-gray-600"
            />
          )}
          <span className="underline decoration-gray-700 dark:text-gray-200 group-hover:decoration-orange-500 group-hover:text-orange-500 transition-colors">
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
              className="rounded-full mr-2 border border-gray-300 dark:border-gray-600"
            />
          )}
          <span className="text-gray-700 dark:text-gray-300">{postData.author}</span>
        </div>
      )}
    </div>

    <p className="text-gray-600 dark:text-gray-300 mb-2">
      公開日: {postData.publishedAt}
    </p>
    <p className="text-gray-600 dark:text-gray-300 mb-2">
      タグ: {postData.tags?.join(", ")}
    </p>

    <div className="mb-32">
      <NotionPage recordMap={recordMap} />
      <div className="mb-32"></div>
      <BackButtonClient />
    </div>

  </div>
</div>
    );
  } catch (error) {
    console.error('Unexpected error in BlogPostPage:', error);
    return (
      <div className="max-w-2xl mx-auto mt-32 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          エラーが発生しました
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          予期しないエラーが発生しました。しばらく時間をおいてから再度お試しください。
        </p>
        <div className="flex justify-center mb-8">
          <NavigationButton text="ブログ一覧に戻る" href="/blogs" arrowLeft={true} />
        </div>
      </div>
    );
  }
}
