import Image from "next/image";
import { getMemberProfile } from "@/app/lib/member";
import { getAllMembers } from "@/app/lib/member";

import { getBlogPostsByAuthor } from "@/app/lib/notion";
import { BlogPost } from "@/app/types/blog";
import { PageProps } from "@/app/types/page";
import Link from "next/link"; 


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
      <h2 className="text-xl font-semibold mb-4">投稿一覧</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: BlogPost, index: number) => (
          <div key={index} className="border rounded-lg p-6 shadow hover:shadow-md">
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{post.publishedAt}</p>

            {/* タグ */}
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags?.map((tag: string, i: number) => (
                <span key={i} className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* サムネイル画像 */}
            {post.thumbnail && (
              <Image
                src={post.thumbnail}
                alt="投稿画像"
                width={960}
                height={540}
                className="w-full mb-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
