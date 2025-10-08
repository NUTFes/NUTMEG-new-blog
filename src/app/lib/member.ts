const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.INTEGRATION_TOKEN,
});


interface MemberProfile {
  id: string;
  nickname: string;
  icon: string;      // 画像URL
  project: string;
  about: string;
}

export async function getAllMembers(): Promise<MemberProfile[]> {
console.log("API KEY:", process.env.INTEGRATION_TOKEN);
console.log("DB ID:", process.env.MEMBER_DATABASE_ID);
  const response = await notion.databases.query({
    database_id: process.env.MEMBER_DATABASE_ID, // メンバー用DBのID
    
  });
// const response = await notion.databases.retrieve({
//   database_id: "28641f1920638072b59a000c65a52f31", // ← .env.localを使わず直接書く
// });
console.log("✅ DB取得成功:", response.id);
  

  const members = response.results;
  const memberProperties = members.map((member: any) => {
    const id = member.id;

    const nickname = member.properties.nickname?.title?.[0]?.plain_text ?? '';
    const project = member.properties.project?.multi_select?.map((p: any) => p.name).join(', ') ?? '';
    const icon =
    member.properties.icon?.files?.[0]?.file?.url ??
    member.properties.icon?.files?.[0]?.external?.url ??
    '';
    const about = member.properties.about?.rich_text?.[0]?.plain_text ?? '';

    return { id, nickname, icon, project, about };
  });
await notion.databases.query({
  database_id: process.env.MEMBER_DATABASE_ID,
});
  return memberProperties;
}

import { NotionToMarkdown } from "notion-to-md";

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPageContent(pageId: string) {
  const mdblocks = await n2m.pageToMarkdown(pageId, 2);
//   console.log("Markdown Content:", mdblocks);
  return mdblocks;
}

interface MemberProfile {
  id: string;
  nickname: string;
  icon: string;      // 画像URL
  project: string;
  about: string;
}

export async function getMemberProfile(pageId: string): Promise<MemberProfile> {
  const response = await notion.pages.retrieve({ page_id: pageId });
  const pageInfo = response.properties;

  const id = response.id;

    const titleProperty = Object.values(response.properties).find(
    (p) => (p as any).type === 'title'
    ) as { type: 'title'; title: { plain_text: string }[] };
    
  const nickname = titleProperty?.title?.[0]?.plain_text ?? '';
  const icon = pageInfo.icon?.files?.[0]?.file?.url ?? '';
  const project = pageInfo.project?.rich_text?.[0]?.plain_text ?? '';
  const about = pageInfo.about?.rich_text?.[0]?.plain_text ?? '';

  return { id, nickname, icon, project, about };
}

