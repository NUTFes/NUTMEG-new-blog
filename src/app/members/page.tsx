import Image from 'next/image';
import { getAllMembers } from '../lib/member';
import Link from 'next/link';
import styles from './members.module.css';

// NotionのS3署名付きURLは1時間で期限切れになるため、
// 30分ごとに再検証して新しいURLを取得する
export const revalidate = 1800;

export default async function Members() {
  const members = await getAllMembers();

  return (
    <div className="container mx-auto mb-20">
      {/* ✅ パンくず */}
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLinkSmall}>Home</Link>
        <span className={styles.breadcrumbLinkArrow}> &gt; </span>
        <Link href="/members" className={styles.breadcrumbLinkBig}>Members</Link>
      </div>

      {/* ✅ カード群（幅揃え） */}
<main className="flex min-h-screen flex-col items-center justify-center px-8 pt-0 pb-8 mx-auto">
        <div className={`${styles.cardsWrapper} grid gap-8 p-3 md:p-10 pt-5 md:grid-cols-2 lg:grid-cols-3`}>
          {members.map((member, index) => (
            <Link
              href={`/members/${member.id}`}
              key={index}
              className="bg-[var(--card-color)] rounded-lg p-10 transition-shadow shadow-[0_4px_20px_rgba(255,184,8,0.05)] hover:shadow-[0_8px_30px_rgba(255,184,8,0.3)]"
            >
              <div className="mb-4">
                {member.icon && (
                  <Image
                    src={member.icon}
                    alt={`${member.nickname}のアイコン`}
                    width={200}
                    height={200}
                    className="rounded-full object-cover mx-auto mb-4 aspect-square w-40 h-40"
                    unoptimized
                  />
                )}
              </div>
              <h2 className="text-md md:text-lg font-semibold mb-2 text-center">{member.nickname}</h2>
              <p className="mb-2 text-gray-600 text-center">{member.project}</p>
              <p className="text-sm text-gray-700">{member.about}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
