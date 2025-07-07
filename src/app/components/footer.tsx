import Link from "next/link";
import Image from "next/image";
import "./footer.css"; // CSS ファイルをインポート

const Footer = () => {
  return (
    <footer>
      <div className="footer-contents">
        <div className="menu">
          <Image src="/logo_footer.png" alt="NUTMEG" height={72} width={225} />
          <div className="links">
            <Link href="/">Home</Link>
            <Link href="/teams-projects">Teams & Projects</Link>
            <Link href="/blogs">Blogs</Link>
            <Link href="/members">Members</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="address">〒940-2188 新潟県長岡市上富岡町1603-1</div>
      </div>
    </footer>
  );
};

export default Footer;
