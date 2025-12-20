// src/app/members/[id]/page.tsx
import MemberPageClient from './MemberPageClient';
import { getMemberProfile } from '@/app/lib/member';
import { getBlogPostsByAuthor } from '@/app/lib/notion';
import { BlogPost } from '@/app/types/blog';

// Cloudflare PagesではISRが非対応のため、動的レンダリングを使用
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

interface MemberPageProps {
  params: Promise<{ id: string }>;
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params;
  const member = await getMemberProfile(id);
  const posts: BlogPost[] = await getBlogPostsByAuthor(member.nickname);

  return <MemberPageClient member={member} posts={posts} />;
}
