import Link from "next/link";
import "./footer.css"; // CSS ファイルをインポート

const Footer = () => {
  return (
    <footer className="footer">
      <Link href="/">Home</Link>
      <Link href="/teams-projects">Teams & Projects</Link>
      <Link href="/blogs">Blogs</Link>
      <Link href="/members">Members</Link>
      <Link href="/contact">Contact</Link>
    </footer>
  );
};

export default Footer;