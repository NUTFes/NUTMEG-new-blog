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
        <Link href="/home" className={pathname === "/home" ? styles.active : ""}>Home</Link>
        <Link href="/home/teams&projects" className={pathname === "/home/teams&projects" ? styles.active : ""}>Teams & Projects</Link>
        <Link href="/home/blogs" className={pathname === "/home/blogs" ? styles.active : ""}>Blogs</Link>
        <Link href="/home/members" className={pathname === "/home/members" ? styles.active : ""}>Members</Link>
        <Link href="/home/contact" className={pathname === "/home/contact" ? styles.active : ""}>Contact</Link>
      </div>
    </header>
  );
};

export default TopBar;
