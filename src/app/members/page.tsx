import Image from 'next/image';
import { getAllMembers } from '../lib/member';
import Link from 'next/link';

export const revalidate = 60;

export default async function Members() {
  const members = await getAllMembers();

  return (
    <div className='container mx-auto'>
      <main className="flex min-h-screen flex-col items-center justify-center p-8 lg:w-5/6 mx-auto">
        <h1 className="text-md md:text-xl font-bold mb-6">メンバー一覧</h1>
        <div className="grid gap-8 p-3 md:p-10 pt-5 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member, index) => (
            <Link
              href={`/members/${member.id}`}
              key={index}
              className="border rounded-lg p-10 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="mb-4">
                {member.icon && (
                  <Image
                    src={member.icon}
                    alt={`${member.nickname}のアイコン`}
                    width={200}
                    height={200}
                    className="rounded-full object-cover mx-auto mb-4"
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