// src/app/members/[id]/page.tsx
import MemberPageClient from './MemberPageClient';
import { getMemberProfile, getAllMembers } from '@/app/lib/member';
import { getBlogPostsByAuthor } from '@/app/lib/notion';
import { BlogPost } from '@/app/types/blog';

export async function generateStaticParams() {
  const members = await getAllMembers();
  return members.map(member => ({ id: member.id }));
}

interface MemberPageProps {
  params: { id: string };
}

export default async function MemberPage({ params }: MemberPageProps) {
  const member = await getMemberProfile(params.id);
  const posts: BlogPost[] = await getBlogPostsByAuthor(member.nickname);

  return <MemberPageClient member={member} posts={posts} />;
}
