// lib/project.ts
import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

const notion = new Client({
  auth: process.env.INTEGRATION_TOKEN,
});

const notionClient = new NotionAPI();

/* ===========================
       型定義
=========================== */
export interface ProjectProfile {
  id: string;
  name: string;
  logo?: string;
  thumbnail?: string;
  summary?: string;
  pmId?: string;     // リレーション先ページID
  pmName?: string;   // PMの名前
  pmIcon?: string;   // PMのアイコンURL
}

/* ===========================
       データベース全件取得
=========================== */
export async function getAllProjects(): Promise<ProjectProfile[]> {
  const response = await notion.databases.query({
    database_id: process.env.PROJECT_DATABASE_ID!,
    sorts: [{ property: "Order", direction: "ascending" }],
  });

  return response.results.map((project: any) => {
    const props = project.properties;

    // プロジェクト名
    const titleProperty = Object.values(props).find((p: any) => p.type === "title") as any;
    const name = titleProperty?.title?.[0]?.plain_text ?? "";

    // ロゴ / サムネイル
    const logo = props.logo?.files?.[0]?.file?.url ?? "";
    const thumbnail = props.thumbnail?.files?.[0]?.file?.url ?? "";

    // 概要
    const summary = props.summary?.rich_text?.[0]?.plain_text ?? "";

    // PM情報
    const pmId = props.pm?.relation?.[0]?.id;
    const pmName = props.pmName?.rich_text?.[0]?.plain_text ?? "未設定";
    const pmIcon = props.pmIcon?.files?.[0]?.file?.url ?? "";

    return { id: project.id, name, logo, thumbnail, summary, pmId, pmName, pmIcon };
  });
}

/* ===========================
       Notionページ本文取得
=========================== */
export async function getProjectRecordMap(pageId: string) {
  const recordMap = await notionClient.getPage(pageId);
  return recordMap;
}

/* ===========================
       Markdown変換
=========================== */
import { NotionToMarkdown } from "notion-to-md";
const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getProjectContent(pageId: string) {
  const mdblocks = await n2m.pageToMarkdown(pageId, 2);
  return mdblocks;
}

/* ===========================
       1件取得
=========================== */
export async function getProjectProfile(pageId: string): Promise<ProjectProfile> {
  const project = await getAllProjects();
  return project.find((p) => p.id === pageId)!;
}
