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

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/home/blogs/${post.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>
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
