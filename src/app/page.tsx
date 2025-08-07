// pages/index.tsx
import React from "react";
import Card from "./components/BlogCard"; // カードコンポーネントのインポート
import NavigationButton from "./components/NavigationButton"; 
import styles from "./Home.module.css"; // CSSファイルのインポート

const Home = () => {
    const blogData = [
    {
      thumbnail: "/test.png",
      tags: ["Tech", "Next.js"],
      title: "Next.jsでカードコンポーネントを作る",
      abstract: "Next.jsでシンプルなカードコンポーネントを作成しする方法を解説します。",
      authorIcon: "/test-icon.png",
      authorName: "John Doe",
      date: "2025-06-07",
      link: "/article",
    },
    {
      thumbnail: "/test.png",
      tags: ["React", "UI/UX"],
      title: "Reactで美しいUIを作る",
      abstract: "Reactを使って洗練されたUIを作るためのデザインのポイントを解説します。",
      authorIcon: "/test-icon.png",
      authorName: "Jane Smith",
      date: "2025-06-06",
      link: "/article-2",
    },
        {
      thumbnail: "/test.png",
      tags: ["React", "UI/UX"],
      title: "Reactで美しいUIを作る",
      abstract: "Reactを使って洗練されたUIを作るためのデザインのポイントを解説します。",
      authorIcon: "/test-icon.png",
      authorName: "Jane Smith",
      date: "2025-06-06",
      link: "/article-2",
    },
  ];
  return (
    <>
      <div className={styles.HeroImage}>
        <img src="/home/HeroImage.svg" alt="HeroImage"/>
      </div>

      <div className={styles.projects}>
        <div className={`${styles.whiteBox} ${styles.projectsWhiteBox}`} >
          <img src="/home/TitleProjects.svg" className={styles.titleProjects} alt="Projects"/>
          <div className={styles.projectsBox}>
              <img src="/home/Picture_Projects.svg" alt="写真" width={440} height={320}/>
              <div>
                <p>NUTMEGでは現在、8つのプロジェクトが進行中です。<br />
                他学年の学生同士でチームを組み、<br />
                ヒアリングから開発を通じて、技大祭運営のお悩み解決や、<br />
                効率向上に貢献しています。</p>
                <div className={styles.NavigationButtonBox}>
                <NavigationButton text="プロジェクト紹介ページへ" href="/teams&projects"/>
                </div>
              </div>

          </div>
        </div>
      </div>



      <div className={styles.blogs}>
        <div className={styles.whiteBox}>
          <img src="/home/TitleBlogs.svg" className={styles.titleBlogs} alt="blogs"/>
          <p>NUTMEGでは、文書化して記録に残すことと、アウトプットの機会を目的として、<br></br>定期的に学生がブログを投稿しています。</p>
          <div className={styles.blogBox}>
              <div className={styles.cardContainer}>
                {blogData.map((data, index) => (
                  <Card key={index} {...data} />
                ))}
              </div>
              <div className={styles.NavigationButtonBox}>
                <NavigationButton text="ブログ一覧ページへ" href="/blogs"/>
              </div>
          </div>

        </div>
    </div>
    </>
  );
};

export default Home;