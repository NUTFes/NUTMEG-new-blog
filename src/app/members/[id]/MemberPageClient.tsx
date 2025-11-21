// src/app/members/[id]/MemberPageClient.tsx
'use client';
import Image from 'next/image';
import BlogCard from '@/app/components/BlogCard/BlogCard';
import NavigationButton from '@/app/components/NavigationButton';
import { BlogPost } from '@/app/types/blog';
import './MemberPage.css';

interface MemberPageClientProps {
  member: any;
  posts: BlogPost[];
}

export default function MemberPageClient({ member, posts }: MemberPageClientProps) {
  return (
    <div className="member-page-container">
      <div className="member-page-content">
        {/* 戻るボタン */}
        <div className="member-page-back-button">
          <NavigationButton
            text="前のページに戻る"
            onClick={() => window.history.back()} // 前ページに戻る
            arrowLeft
          />
        </div>

        {/* メンバー情報 */}
        <div className="member-info">
          {member.icon && (
            <Image
              src={member.icon}
              alt={`${member.nickname}のアイコン`}
              width={160}
              height={160}
              className="member-icon"
            />
          )}
          <h1 className="member-name">{member.nickname}</h1>
          <p className="member-project">{member.project}</p>
          <p className="member-about">{member.about}</p>
        </div>

        {/* 投稿一覧 */}
        <h2 className="post-list-title">投稿一覧</h2>
        {posts.length > 0 ? (
          <div className="post-grid">
            {posts.map((post: BlogPost) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="no-posts">
            <p>まだ投稿記事はありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
