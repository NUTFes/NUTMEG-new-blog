// src/app/layout.tsx
import TopBar from './components/topbar';
import Footer from './components/footer';
import './globals.css'; // 必要なスタイルをここで

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <TopBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}