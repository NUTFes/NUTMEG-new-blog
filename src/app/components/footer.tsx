import Link from "next/link";
import Image from "next/image";
import "./footer.css"; // CSS ファイルをインポート

const Footer = () => {
  return (
    <footer>
      <div className="footer-contents">
        <div className="menu">
          <div className="column1">
            <Link href="/">
              <Image
                src="/footer_icons/IconWhite.svg"
                alt="NUTMEG"
                height={72}
                width={225}
              />
            </Link>

            <div className="links">
              <Link href="/">Home</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/blogs">Blogs</Link>
              <Link href="/members">Members</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div className="links-sns">
            {/* リンク先は適宜追加してください */}
            <Link href="">
              <Image
                src="/footer_icons/X_Icon.svg"
                alt="x"
                width={25}
                height={25}
              />
            </Link>
            <Link href="">
              <Image
                src="/footer_icons/Instagram_Icon.svg"
                alt="instagram"
                width={25}
                height={25}
              />
            </Link>
            <Link href="">
              <Image
                src="/footer_icons/Git_Icon.svg"
                alt="github"
                width={25}
                height={25}
              />
            </Link>
          </div>
        </div>
        <div className="address">〒940-2188 新潟県長岡市上富岡町1603-1</div>
      </div>
    </footer>
  );
};

export default Footer;
