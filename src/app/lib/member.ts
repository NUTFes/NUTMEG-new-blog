import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.INTEGRATION_TOKEN,
});

export interface MemberProfile {
  id: string;
  nickname: string;
  icon: string;
  project: string;
  about: string;
  slug: string;
}
// 全メンバー情報を取得
export async function getAllMembers(): Promise<MemberProfile[]> {
  if (!process.env.MEMBER_DATABASE_ID) throw new Error("MEMBER_DATABASE_ID is not set");

  const response = await notion.databases.query({
    database_id: process.env.MEMBER_DATABASE_ID,
  });

  const members: MemberProfile[] = response.results.map((member: any) => {
    const id = member.id;
    const nickname = member.properties.nickname?.title?.[0]?.plain_text ?? '';
    const project = member.properties.project?.multi_select?.map((p: any) => p.name).join(', ') ?? '';
    const icon =
      member.properties.icon?.files?.[0]?.file?.url ??
      member.properties.icon?.files?.[0]?.external?.url ??
      '';
    const about = member.properties.about?.rich_text?.[0]?.plain_text ?? '';
    const slug = member.properties.slug?.rich_text?.[0]?.plain_text ?? '';

    return { id, nickname, icon, project, about, slug };
  });

  return members;
}

// NotionページをMarkdownに変換するサンプル関数
import { NotionToMarkdown } from "notion-to-md";
const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPageContent(pageId: string) {
  const mdblocks = await n2m.pageToMarkdown(pageId, 2);
  return mdblocks;
}
export async function getMemberProfile(pageId: string): Promise<MemberProfile> {
  const response = await notion.pages.retrieve({ page_id: pageId });

  // 型ガードで PageObjectResponse にキャスト
  if (!("properties" in response)) {
    throw new Error("ページに properties が存在しません");
  }

  const page = response as PageObjectResponse;
  const properties = page.properties;

  const id = page.id;

  const titleProperty = Object.values(properties).find(
    (p: any) => p.type === 'title'
  ) as { type: 'title'; title: { plain_text: string }[] } | undefined;

  const nickname = titleProperty?.title?.[0]?.plain_text ?? '';
  const icon =
    (properties.icon as any)?.files?.[0]?.file?.url ??
    (properties.icon as any)?.files?.[0]?.external?.url ??
    '';
  const project = (properties.project as any)?.rich_text?.[0]?.plain_text ?? '';
  const about = (properties.about as any)?.rich_text?.[0]?.plain_text ?? '';
  const slug = (properties.slug as any)?.rich_text?.[0]?.plain_text ?? '';

  return { id, nickname, icon, project, about, slug };
}