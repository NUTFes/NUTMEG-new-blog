import { Client } from '@notionhq/client';
import { 
  BlogPost, 
  NotionPage, 
  NotionProperty, 
  // NotionBlock 
} from '../types/blog';
import { NotionAPI } from 'notion-client';
import { ExtendedRecordMap } from 'notion-types';

const notionAPI = new NotionAPI();
const notion = new Client({
  auth: process.env.INTEGRATION_TOKEN,
});

// ブログ記事を取得する関数
import { getAllMembers } from './member';

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.BLOG_DATABASE_ID!,
      sorts: [
        { property: '日付', direction: 'descending' },
      ],
    });

    const members = await getAllMembers(); // ここで全メンバー情報を取得

    const posts: BlogPost[] = [];

    for (const page of response.results) {
      const notionPage = page as unknown as NotionPage;

      const authorName = getAuthor(notionPage.properties);
      const authorMember = members.find(m => m.nickname === authorName);

      const post: BlogPost = {
        id: notionPage.id,
        title: getTitle(notionPage.properties),
        thumbnail: getThumbnail(notionPage.properties),
        publishedAt: getPublishedAt(notionPage.properties),
        slug: notionPage.id,
        tags: getTags(notionPage.properties),
        summary: getSummary(notionPage.properties),
        author: authorName,
        authorIcon: authorMember?.icon,  // アイコンを紐付け
      };

      posts.push(post);
    }

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}


// Notionページ構成を取得する関数
export async function getNotionPage(pageId: string): Promise<ExtendedRecordMap> {
  return await notionAPI.getPage(pageId);
}

// // ブログ記事の詳細を取得する関数
// export async function getBlogPost(pageId: string): Promise<BlogPost | null> {
//   try {
//     const page = await notion.pages.retrieve({ page_id: pageId });
//     const blocks = await notion.blocks.children.list({ block_id: pageId });
    
//     const notionPage = page as unknown as NotionPage;
    
//     // プロパティが存在しない場合のフォールバック
//     if (!notionPage.properties) {
//       console.error('No properties found for page:', pageId);
//       return null;
//     }
    
//     const content = extractContentFromBlocks(blocks.results as NotionBlock[]);

//     return {
//       id: notionPage.id,
//       title: getTitle(notionPage.properties),
//       thumbnail: getThumbnail(notionPage.properties),
//       content,
//       publishedAt: getPublishedAt(notionPage.properties),
//       slug: notionPage.id,
//     };
//   } catch (error) {
//     console.error('Error fetching blog post:', error);
//     return null;
//   }
// }

// ==== ヘルパー関数群 ====
// Notionのタイトルプロパティから値を取得
function getTitle(properties: Record<string, NotionProperty>): string {
  // Notionのタイトルプロパティから値を取得
  if (!properties || typeof properties !== 'object') {
    return 'Untitled';
  }
  
  const titleProperty = Object.values(properties).find(
    (prop) => prop.type === 'title'
  );
  
  if (titleProperty?.title?.[0]?.plain_text) {
    return titleProperty.title[0].plain_text;
  }
  
  return 'Untitled';
}

// サムネイル画像を取得する関数
function getThumbnail(properties: Record<string, NotionProperty>): string | undefined {
  // サムネ画像プロパティから画像URLを取得
  if (!properties || typeof properties !== 'object') {
    return undefined;
  }
  
  const thumbnailProperty = properties['サムネ画像'];
  
  if (thumbnailProperty?.type === 'files' && thumbnailProperty.files && Array.isArray(thumbnailProperty.files) && thumbnailProperty.files.length > 0) {
    const file = thumbnailProperty.files[0];
    if (file.type === 'file' && file.file?.url) {
      return file.file.url;
    } else if (file.type === 'external' && file.external?.url) {
      return file.external.url;
    }
  }
  
  return undefined;
}

// 日付プロパティから公開日を取得する関数
function getPublishedAt(properties: Record<string, NotionProperty>): string | undefined {
  // 日付プロパティを取得
  if (!properties || typeof properties !== 'object') {
    return undefined;
  }
  
  const dateProperty = properties['日付'];
  
  if (dateProperty?.type === 'date' && dateProperty.date?.start) {
    return dateProperty.date.start;
  }
  
  return undefined;
}

// タグプロパティからタグを取得する関数
function getTags(properties: Record<string, NotionProperty>): string[] {
  // タグプロパティを取得
  if (!properties || typeof properties !== 'object') {
    return [];
  }
  
  const tagsProperty = properties['タグ'];
  
  if (tagsProperty?.type === 'multi_select' && Array.isArray(tagsProperty.multi_select)) {
    return tagsProperty.multi_select.map((tag: { name: string }) => tag.name);
  }
  
  return [];
}

// // ユーザープロパティから著者名を取得する関数
// function getAuthor(properties: Record<string, NotionProperty>): string {
//   // ユーザープロパティを取得
//   if (!properties || typeof properties !== 'object') {
//     return '';
//   }
//   const userProperty = properties['ユーザー'];
//   if (userProperty?.type === 'rich_text' && Array.isArray(userProperty.rich_text) && userProperty.rich_text.length > 0) {
//     return userProperty.rich_text[0].plain_text || '';
//   }
//   return '';
// }
function getAuthor(properties: Record<string, NotionProperty>): string {
  if (!properties || typeof properties !== 'object') {
    return '';
  }

  const userProperty = properties['ユーザー'];

  if (userProperty?.type === 'select' && userProperty.select?.name) {
    return userProperty.select.name;
  }

  return '';
}


// 要約プロパティから要約を取得する関数
function getSummary(properties: Record<string, NotionProperty>): string {
  // 要約プロパティを取得
  if (!properties || typeof properties !== 'object') {
    return '';  
  }
  const summaryProperty = properties['アブスト'];
  if (summaryProperty?.type === 'rich_text' && Array.isArray(summaryProperty.rich_text) && summaryProperty.rich_text.length > 0) {
    return summaryProperty.rich_text[0].plain_text || '';
  }
  return '';
}

// // ブロックからコンテンツを抽出するヘルパー関数
// function extractContentFromBlocks(blocks: NotionBlock[]): string {
//   return blocks
//     .map((block) => {
//       switch (block.type) {
//         // 各ブロックタイプに応じてコンテンツを抽出
//         case 'paragraph': // パラグラフブロック
//           return block.paragraph?.rich_text?.map((text) => text.plain_text).join('') || '';
//         case 'heading_1': // 見出し1ブロック
//           return block.heading_1?.rich_text?.map((text) => text.plain_text).join('') || '';
//         case 'heading_2': // 見出し2ブロック
//           return block.heading_2?.rich_text?.map((text) => text.plain_text).join('') || '';
//         case 'heading_3': // 見出し3ブロック
//           return block.heading_3?.rich_text?.map((text) => text.plain_text).join('') || '';
//         case 'bulleted_list_item':  // 箇条書きリストブロック
//           return '• ' + (block.bulleted_list_item?.rich_text?.map((text) => text.plain_text).join('') || '');
//         case 'numbered_list_item':  // 番号付きリストブロック
//           return '1. ' + (block.numbered_list_item?.rich_text?.map((text) => text.plain_text).join('') || '');
//         default:
//           return '';
//       }
//     })
//     .filter(Boolean)
//     .join('\n\n');
// }
export async function getBlogPostsByAuthor(authorName: string): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();
  return allPosts.filter(post => post.author?.trim() === authorName.trim());
}
