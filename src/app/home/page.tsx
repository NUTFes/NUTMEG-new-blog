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
        <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRddj7n0EF3wilAeazD5a1UNbRp-G1UjxbvwRXDtQxxmpH2CGEwjhWMbjKC477d3CtREI3Vrv7_KC1G/pubembed?start=false&loop=false&delayms=3000" frameBorder="none" width="960" height="569" allowFullScreen ></iframe>      </div>
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