import "dotenv/config";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.INTEGRATION_TOKEN });

(async () => {
  console.log("Testing Notion DB access...");
  console.log("DB ID:", process.env.MEMBER_DATABASE_ID);

  try {
    const db = await notion.databases.retrieve({
      database_id: process.env.MEMBER_DATABASE_ID!,
    });

    const dbTitle = (db as any).title?.[0]?.plain_text ?? "(no title)";
    console.log("✅ DB found:", dbTitle);
  } catch (err: any) {
    console.error("❌ Error:", err.body ?? err);
  }
})();
