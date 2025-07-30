"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./topbar.module.css";

const TopBar = () => {
  const pathname = usePathname();
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsTransparent(false);
      } else {
        setIsTransparent(true);
      }
    };

    if (pathname === "/home") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsTransparent(false); // 他のページでは白背景
    }
  }, [pathname]);

  const topbarClass = `${styles.topbar} ${
    isTransparent && pathname === "/home" ? styles.transparent : styles.whiteBg
  }`;

  return (
    <header className={topbarClass}>
      <img src="/logo.png" alt="ロゴ" className={styles.logo} />
      <div className={styles.links}>
        <Link href="/" className={pathname === "/" ? styles.active : ""}>Home</Link>
        <Link href="/teams&projects" className={pathname === "/teams&projects" ? styles.active : ""}>Teams & Projects</Link>
        <Link href="/blogs" className={pathname === "/blogs" ? styles.active : ""}>Blogs</Link>
        <Link href="/members" className={pathname === "/members" ? styles.active : ""}>Members</Link>
        <Link href="/contact" className={pathname === "/contact" ? styles.active : ""}>Contact</Link>      </div>
    </header>
  );
};

export default TopBar;
