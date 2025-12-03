'use client'

import { useState } from "react";
import Link from "next/link";
import styles from "./topbar.module.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    // ページが変わったらメニューを閉じる
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header>
      
        <div
          className={styles.topbar}
          style={{ display: menuOpen ? "none" : "flex" }}
        >
        <Link href="/">
          <img
            src="/topbar_icons/NUTMEG_Icon.svg"
            alt="NUTMEG"
            className={styles.icon}
          />
        </Link>

        <div className={styles.topbarRight}>
          <Link href="/contact">
            <img
              src="/topbar_icons/ContactButton.svg"
              alt="Contact"
              className={styles.icon}
            />
          </Link>

          {/* ←ここを修正して棒2本を入れる */}
          <div className={styles.hamburgerButton} onClick={toggleMenu}>
            <span
              className={`${styles.bar} ${menuOpen ? styles.bar1Open : ""}`}
            ></span>
            <span
              className={`${styles.bar} ${menuOpen ? styles.bar2Open : ""}`}
            ></span>
          </div>
        </div>
      </div>

      {/* ハンバーガーメニュー */}
      <nav
        className={`${styles.menuPanel} ${menuOpen ? styles.menuOpen : ""}`}
      >
        <div className={styles.hamburgerMenuTop}>
          <Link href="/">
            <img
              src="/topbar_icons/NUTMEG_Icon_White.svg"
              alt="NUTMEG"
              className={styles.icon}
            />
          </Link>
          <div className={styles.hamburgerButton} onClick={toggleMenu}>
            <span
              className={`${styles.bar} ${menuOpen ? styles.bar1Open : ""}`}
            ></span>
            <span
              className={`${styles.bar} ${menuOpen ? styles.bar2Open : ""}`}
            ></span>
          </div>
        </div>

      <ul>
        <li className={pathname === "/" ? styles.active : ""}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li className={pathname === "/projects" ? styles.active : ""}>
          <Link href="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
        </li>
        <li className={pathname === "/blogs" ? styles.active : ""}>
          <Link href="/blogs" onClick={() => setMenuOpen(false)}>Blog</Link>
        </li>
        <li className={pathname === "/members" ? styles.active : ""}>
          <Link href="/members" onClick={() => setMenuOpen(false)}>Members</Link>
        </li>
        <li className={pathname === "/contact" ? styles.active : ""}>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </li>
      </ul>

      </nav>
    </header>
  );
};

export default TopBar;
