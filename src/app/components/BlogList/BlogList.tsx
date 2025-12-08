'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogCard from '@/app/components/BlogCard/BlogCard';
import Pagination from '@/app/components/Pagination/Pagination';
// import { BlogPost } from '@/types/blog';
import { BlogPost } from '../../types/blog';

interface BlogListProps {
  posts: BlogPost[];
}

// 1ページあたりの表示件数
const POSTS_PER_PAGE = 9;

// ブログ記事の一覧を表示するコンポーネント
export default function BlogList({ posts }: BlogListProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); // URLの検索パラメータ
  const [currentPage, setCurrentPage] = useState(1);  // 現在のページ番号

  useEffect(() => {
    const page = searchParams.get('page');
    if (page && !isNaN(Number(page))) {
      setCurrentPage(Math.max(1, Number(page)));
    }
  }, [searchParams]);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;  // 開始インデックス
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  // ページを変更する関数
  const handlePageChange = (page: number) => {
    // ページ番号を更新
    setCurrentPage(page);
    // URLの検索パラメータを更新
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      newSearchParams.delete('page');
    } else {
      newSearchParams.set('page', page.toString());
    }
    const newUrl = newSearchParams.toString() 
      ? `/blogs?${newSearchParams.toString()}`
      : '/blogs';
    // 新しいURLを生成してルーターを更新
    router.push(newUrl);
  };

  if (posts.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        ブログ記事がまだありません。
      </p>
    );
  }

  return (
    <>
      {/* 最新の記事の場合、New!と表示 */}
      {currentPage === 1 ? (
        <p className="text-[#ff9500] text-lg font-bold col-span-full">
          New!
        </p>
      ) : (
        <></>
      )}
      {/* ブログ記事のカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* ページネーションコンポーネント */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
      {/* ページ情報 */}
      <div className="text-center text-gray-500 text-sm mt-4">
        {posts.length}件中 {startIndex + 1}-{Math.min(endIndex, posts.length)}件を表示
      </div>
    </>
  );
}
