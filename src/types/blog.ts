export interface BlogPost {
  id: string;
  title: string;
  thumbnail?: string;
  content?: string;
  publishedAt?: string;
  slug?: string;
}

export interface NotionPage {
  id: string;
  properties: {
    [key: string]: NotionProperty;
  };
  cover?: NotionCover;
}

export interface NotionProperty {
  type: string;
  title?: NotionRichText[];
  created_time?: string;
  date?: {
    start: string;
    end?: string;
  };
  files?: NotionFile[];
  [key: string]: unknown;
}

export interface NotionFile {
  type: 'file' | 'external';
  file?: {
    url: string;
  };
  external?: {
    url: string;
  };
  name: string;
}

export interface NotionRichText {
  plain_text: string;
  [key: string]: unknown;
}

export interface NotionCover {
  type: 'file' | 'external';
  file?: {
    url: string;
  };
  external?: {
    url: string;
  };
}

export interface NotionBlock {
  type: string;
  paragraph?: {
    rich_text: NotionRichText[];
  };
  heading_1?: {
    rich_text: NotionRichText[];
  };
  heading_2?: {
    rich_text: NotionRichText[];
  };
  heading_3?: {
    rich_text: NotionRichText[];
  };
  bulleted_list_item?: {
    rich_text: NotionRichText[];
  };
  numbered_list_item?: {
    rich_text: NotionRichText[];
  };
  [key: string]: unknown;
}
