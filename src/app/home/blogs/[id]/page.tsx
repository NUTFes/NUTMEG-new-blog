import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Layout from '../../../components/layout';
import { getBlogPost } from '../../../../lib/notion';

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
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
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            {post.publishedAt && (
              <p className="text-gray-500 text-lg">
                {formatDate(post.publishedAt)}
              </p>
            )}
          </header>

          {post.thumbnail && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {post.content ? (
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {post.content}
              </div>
            ) : (
              <p className="text-gray-500">コンテンツがありません。</p>
            )}
          </div>
        </article>
      </div>
    </Layout>
  );
}
