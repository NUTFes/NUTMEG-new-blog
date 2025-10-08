import Image from "next/image";
import Link from "next/link";
import { getMemberProfile, getAllMembers } from "@/app/lib/member";
import { getBlogPostsByAuthor } from "@/app/lib/notion";
import { BlogPost } from "@/app/types/blog";
import BlogCard from "@/app/components/BlogCard/BlogCard"; // ← BlogCard を使う

export async function generateStaticParams() {
  const members = await getAllMembers();
  return members.map(member => ({ id: member.id }));
}

export default async function MemberPage({
  params,
}: {
  params: { id: string };
}) {
  const member = await getMemberProfile(params.id);
  const posts: BlogPost[] = await getBlogPostsByAuthor(member.nickname);

  return (
    <div className="container mx-auto p-10 md:w-4/5 lg:w-3/5">
      {/* メンバー一覧に戻るボタン */}
      <div className="mt-10 text-center">
        <Link
          href="/members"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          メンバー一覧に戻る
        </Link>
      </div>

      {/* メンバー情報 */}
      <div className="text-center mb-10">
        {member.icon && (
          <Image
            src={member.icon}
            alt={`${member.nickname}のアイコン`}
            width={160}
            height={160}
            className="rounded-full mx-auto mb-4"
          />
        )}
        <h1 className="text-2xl font-bold">{member.nickname}</h1>
        <p className="text-gray-600">{member.project}</p>
        <p className="mt-2 text-sm text-gray-700">{member.about}</p>
      </div>

      {/* 投稿一覧 */}
{/* 投稿一覧 */}
<h2 className="text-xl font-semibold mb-4">投稿一覧</h2>
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {posts.map((post: BlogPost) => (
    <BlogCard key={post.id} post={post} />
  ))}
</div>
    </div>
  );
}