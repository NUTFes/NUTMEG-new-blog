import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '../../types/blog';

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
  const queryParams = new URLSearchParams({
    title: post.title,                    // タイトル
    thumbnail: post.thumbnail || '',      // サムネイルURL
    publishedAt: post.publishedAt || '',  // 公開日
    tags: post.tags ? post.tags.join(',') : '', // タグ (カンマ区切りの文字列)
    summary: post.summary || '',          // 要約
    // author: post.author || '',         // 著者名
  }).toString();

  return (
    <Link href={`/home/blogs/${post.id}?${queryParams}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* サムネイル画像が存在する場合は表示 */}
        {post.thumbnail && (
          <div className="relative h-48 w-full">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-6">
          {/* タイトルを表示 */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>
          {/* 要約が存在する場合は表示 */}
          {post.summary && (
            <p className="text-gray-700 mb-4 line-clamp-3">
              {post.summary}
            </p>
          )}
          {/* タグを#で区切って表示 */}
          {post.tags && post.tags.length > 0 && (
            <p className="text-gray-500 text-sm mb-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="mr-1">
                  #{tag}
                </span>
              ))}
            </p>
          )}
          {/* 公開日が存在する場合は表示 */}
          {post.publishedAt && (
            <p className="text-gray-500 text-sm">
              {formatDate(post.publishedAt)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
