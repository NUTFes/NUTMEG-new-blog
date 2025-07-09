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

ブラウザで [**http://localhost:3000/home**](http://localhost:3000/home) を開くと、ライブリロード付きでサイトを確認できます。

## 利用可能なスクリプト

| コマンド            | 説明                                  |
| --------------- | ----------------------------------- |
| `npm run dev`   | 開発モードでアプリを起動 (ホットリロード対応)            |
| `npm run build` | 本番用に最適化された静的ファイルをビルド                |
| `npm start`     | `npm run build` 後に生成物をプロダクションモードで実行 |
| `npm run lint`  | ESLint による静的解析を実行 (`next lint`)     |

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
