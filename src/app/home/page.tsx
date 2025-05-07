// pages/index.tsx
import React from "react";
import Layout from "../components/layout";
import HeroSlider from "../components/HeroSlider";
import styles from "./Home.module.css"; // CSSファイルのインポート

const Home = () => {
  return (
    <Layout>
      <HeroSlider/>
      <div className={styles.aboutUs}>
        <p className={styles.title}>About Us</p>
        <img src="/logo_mark_vertical_color.png" alt="ロゴ" />
        <p>NUTMEG [ナツメグ] は、長岡技術科学大学の文化祭運営を円滑にするためにアプリケーション開発を行う学生団体です。<br />
        スライドから詳しい活動内容をぜひご覧ください。</p>
      </div>    
      <div className={styles.slide}>
        <p>ここにスライドを埋め込み</p>
      </div>
      <div className={styles.projects}>
        <p className={styles.title}>Projects</p>
      </div>
      <div className={styles.blogs}>
        <p className={styles.title}>Blogs</p>
      </div>
    </Layout>
  );
};

export default Home;