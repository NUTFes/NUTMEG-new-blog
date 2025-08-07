// TopBar.tsx

'use client' // ← クライアントコンポーネントであることを明示（必要なら）

import { useState } from "react"; // ← これを忘れずに！
import Link from "next/link";
import styles from "./topbar.module.css";
import { usePathname } from "next/navigation";




const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  
  const pathname = usePathname(); 

  return (
    <header>
      <div className={styles.topbar}>
        <Link href="/">
          <img src="/topbar_icons/NUTMEG_Icon.svg" alt="NUTMEG" className={styles.icon} />
        </Link>

        <div className={styles.topbarRight}>
          <Link href="/contact">
            <img src="/topbar_icons/ContactButton.svg" alt="Contact" className={styles.icon} />
          </Link>
          <div className={styles.hamburgerButton} onClick={toggleMenu}>
          </div>
        </div>
      </div>

      {/* ハンバーガーメニュー */}
      <nav className={`${styles.menuPanel} ${menuOpen ? styles.menuOpen : ""}`}>
        <div className={styles.hamburgerMenuTop}>
          <Link href="/">
            <img src="/topbar_icons/NUTMEG_Icon_White.svg" alt="NUTMEG" className={styles.icon} />
          </Link>
          <div className={styles.hamburgerButton} onClick={toggleMenu}></div>
        </div>

      <ul>
        <li className={pathname === "/" ? styles.active : ""}>
          <Link href="/">Home</Link>
        </li>
        <li className={pathname === "/teams&projects" ? styles.active : ""}>
          <Link href="/teams&projects">Projects</Link>
        </li>
        <li className={pathname === "/blogs" ? styles.active : ""}>
          <Link href="/blogs">Blogs</Link>
        </li>
        <li className={pathname === "/members" ? styles.active : ""}>
          <Link href="/members">Members</Link>
        </li>
        <li className={pathname === "/contact" ? styles.active : ""}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      </nav>
    </header>
  );
};

export default TopBar;
