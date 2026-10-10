# NUTMEG new Blog

このリポジトリは **Next.js** で構築したNUTMEGブログのソースコードです。
Next.js **App Router** を採用しています。

## 前提条件

| ツール         | 推奨バージョン               |
| ----------- | --------------------- |
| **Node.js** | >= 22.16.0 (LTS 版を推奨) |
| **npm**     | Node.js に同梱 (v11 以上推奨) |
| **Git**     | 2.34.1 以上                |

> Node.js をまだインストールしていない場合は [nodejs.org](https://nodejs.org) から LTS 版をダウンロードすることをお勧めします。

## クイックスタート

```bash
# 1. リポジトリをクローン
git clone https://github.com/NUTFes/NUTMEG-new-blog.git
cd NUTMEG-new-blog

# 2. 依存パッケージをインストール
npm install

# 3. 開発サーバを起動
npm run dev
```

ブラウザで [**http://localhost:3000**](http://localhost:3000) を開くと、ライブリロード付きでサイトを確認できます。

## 利用可能なスクリプト

| コマンド            | 説明                                  |
| --------------- | ----------------------------------- |
| `npm run dev`   | 開発モードでアプリを起動 (ホットリロード対応)            |
| `npm run build` | 本番用に最適化された静的ファイルをビルド                |
| `npm run build:pages` | 固定したツールでCloudflare Pages向けにビルド |
| `npm start`     | `npm run build` 後に生成物をプロダクションモードで実行 |
| `npm run lint`  | ESLint による静的解析を実行 (`next lint`)     |
| `npm test`      | Notion本文取得の回帰テストを実行（外部APIへの接続不要） |

Notion本文のテストでは、初回取得を超える長い記事、後から取得する表の行、
新旧の応答形式、権限不足・不完全な応答、画像URLの署名を確認します。

## Cloudflare Pages向けのビルド

```bash
npm ci
npm run build:pages
```

出力先は `.vercel/output/static` です。ビルドツールは
`@cloudflare/next-on-pages@1.13.16` と `wrangler@4.107.1` に固定しています。
Wrangler 4.108.0以降は `@cloudflare/workers-types` v5を要求し、
`next-on-pages` のv4要求と衝突するため、この組み合わせを維持してください。
既存のCloudflareビルドコマンド `npx @cloudflare/next-on-pages@1` も、
`npm ci` でインストールされたローカルの固定版を使用します。

`next-on-pages` のNext.js上限指定は15.5.2で止まっているため、
同パッケージの `next` だけを `overrides` でアプリの依存指定（`$next`）に揃えています。

## ディレクトリ構成 (抜粋)

```
.
├── app/               # App Router 用ページ
│   └── layout.tsx
│   └── home/          # ホームページ
│       └── page.tsx
├── components/        # 再利用可能な React コンポーネント
├── public/            # 静的アセット (画像など)
├── styles/            # グローバル / モジュール CSS
└── next.config.ts     # Next.js 設定ファイル
```
