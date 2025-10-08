import Image from "next/image";
import Link from "next/link";
import { getMemberProfile, getAllMembers } from "@/app/lib/member";
import { getBlogPostsByAuthor } from "@/app/lib/notion";
import { BlogPost } from "@/app/types/blog";
import BlogCard from "@/app/components/BlogCard/BlogCard"; // ← BlogCard を使う
import NavigationButton from "@/app/components/NavigationButton";

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
  <div className="container mx-auto mb-40 p-10 md:w-4/5 lg:w-3/5">
      {/* メンバー一覧に戻るボタン */}
    <div className="mt-10 text-center">
      <NavigationButton
        text="メンバーページに戻る"
        href="/members"
        arrowLeft={true} // 左矢印
      />
    </div>



      {/* メンバー情報 */}
      <div className="text-center mb-10">
        {member.icon && (
          <Image
            src={member.icon}
            alt={`${member.nickname}のアイコン`}
            width={160}
            height={160}
            className="rounded-full object-cover mx-auto mb-4 aspect-square w-40 h-40"
          />
        )}

        <h1 className="text-2xl font-bold">{member.nickname}</h1>
        <p className="text-gray-600">{member.project}</p>
        <p className="mt-2 text-sm text-gray-700">{member.about}</p>
      </div>

      {/* 投稿一覧 */}
{/* 投稿一覧 */}
<h2 className="text-xl font-semibold mb-4">投稿一覧</h2>
<div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
  {posts.map((post: BlogPost) => (
    <BlogCard key={post.id} post={post} />
  ))}
</div>
    </div>
  );
}