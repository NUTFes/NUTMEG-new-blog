export interface BlogPost {
  id: string;
  title: string;
  thumbnail?: string;
  publishedAt?: string;
  slug: string;
  tags?: string[];
  summary?: string;
  author?: string;
  authorIcon?: string;  // ← これを追加
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
  rich_text?: NotionRichText[];
  date?: {
    start: string;
    end?: string;
  };
  files?: NotionFile[];
  multi_select?: {
    name: string;
  }[];
  select?: {
    name: string;
  };
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
