import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { BlogPost } from '@/types/blog';
import { BlogPost } from '../../types/blog';
import { DEFAULT_BLUR_DATA_URL } from '../../lib/imagePlaceholder';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // postが未定義の場合の安全性チェック
  if (!post || !post.id) {
    console.error('BlogCard: Invalid post data:', post);
    return null;
  }
  
  // 日付をフォーマットする関数
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // クエリパラメータを生成
  // これによって、ブログカードをクリックしたときに必要な情報をURLに含める
  // const queryParams = new URLSearchParams({
  //   title: post.title,                    // タイトル
  //   thumbnail: post.thumbnail || '',      // サムネイルURL
  //   publishedAt: post.publishedAt || '',  // 公開日
  //   tags: post.tags ? post.tags.join(',') : '', // タグ (カンマ区切りの文字列)
  //   summary: post.summary || '',          // 要約
  //   // author: post.author || '',         // 著者名
  // }).toString();
  const queryParams = new URLSearchParams({
  title: post.title ?? '',
  thumbnail: post.thumbnail ?? '',
  publishedAt: post.publishedAt ?? '',
  tags: post.tags?.join(',') ?? '',
  summary: post.summary ?? '',
}).toString();


  return (
    <Link href={`/blogs/${post.id}?${queryParams}`} className="block">
      {/* <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"> */}
      <div className="bg-[var(--card-color)] rounded-lg shadow-[0_12px_24px_0_rgba(188,99,4,0.10)] hover:shadow-[0_12px_24px_0_rgba(188,99,4,0.30)] active:shadow-[0_12px_24px_0_rgba(188,99,4,0.15)] transition-shadow transition-transform duration-300 hover:-translate-y-1 active:translate-y-0 overflow-hidden">
        {/* サムネイル画像が存在する場合は表示 */}
        {/* {post.thumbnail && (
          <div className="relative h-48 w-full">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )} */}

        {post.thumbnail ? (
          <div className="relative h-48 w-full">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={DEFAULT_BLUR_DATA_URL}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>
        ) : (
<div className="
  h-48 w-full 
  bg-gray-200 dark:bg-gray-400 
  bg-opacity-100
  flex items-center justify-center
  text-gray-500 dark:text-gray-300
">
  No Image
</div>



        )}


<div className="p-6">

  {/* タイトル */}
  <h3 className="text-xl font-semibold 
                 text-gray-900 dark:text-white 
                 mb-2 line-clamp-2">
    {post.title}
  </h3>

  {/* 作者情報 */}
  {post.author && (
    <div className="flex items-center mb-4">
      {post.authorIcon && (
        <Image
          src={post.authorIcon}
          alt={post.author}
          width={32}
          height={32}
          className="rounded-full mr-2 border border-gray-300 dark:border-gray-600"
          unoptimized
        />
      )}
      <span className="text-gray-700 dark:text-gray-300 text-sm">
        {post.author}
      </span>
    </div>
  )}

  {/* 要約 */}
  {post.summary && (
    <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
      {post.summary}
    </p>
  )}

  {/* タグ */}
  {post.tags && post.tags.length > 0 && (
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
      {post.tags.map((tag, index) => (
        <span key={index} className="mr-1">#{tag}</span>
      ))}
    </p>
  )}

  {/* 公開日 */}
  {post.publishedAt && (
    <p className="text-gray-500 dark:text-gray-400 text-sm">
      {formatDate(post.publishedAt)}
    </p>
  )}
</div>
      </div>
    </Link>
  );
}
