// src/app/layout.tsx

import TopBar from './components/topbar';
import Footer from './components/footer';
import './globals.css';

export const metadata = {
  title: "NUTMEG",
  description: "長岡技術科学大学、技大祭実行委員会情報局、NUTMEG の公式サイトです。",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "NUTMEG",
    description: "多様な学生が活躍するプロジェクトチーム",
    url: "https://blog.nutmeg.cloud",
    siteName: "NUTMEG",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
      }
    ],
    locale: "ja_JP",
    type: "website",
  },
    keywords: [
    "NUTMEG",
    "長岡技術科学大学",
    "技大祭",
    "学生プロジェクト",
    "学生エンジニア",
    "デザイン",
    "アプリ開発",
    "大学生",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <TopBar />
        <main>{children}</main>
        <div className='hide-on-mobile'>
          <Footer />
        </div>
      </body>
    </html>
  );
}
