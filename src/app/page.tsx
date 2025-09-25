// "use client";
// import React, { useEffect, useState } from "react";
import Card from "./components/BlogCard"; // カードコンポーネントのインポート
import NavigationButton from "./components/NavigationButton";
import styles from "./Home.module.css"; // CSSファイルのインポート
import FadeInSection from "./components/FadeInSection/FadeInSection";
import Carousel from "./components/carousel";
import LoadingScreen from "./components/LoadingScreen";

import BlogList from "./components/BlogList/BlogList";
import { getBlogPosts } from "./../app/lib/notion";
import Link from "next/link";


export default async function Home() {

  const posts = await getBlogPosts();
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  // const blogData = [
  //   {
  //     thumbnail: "/test.png",
  //     tags: ["Tech", "Next.js"],
  //     title: "Next.jsでカードコンポーネントを作る",
  //     abstract: "Next.jsでシンプルなカードコンポーネントを作成する方法を解説します。",
  //     authorIcon: "/test-icon.png",
  //     authorName: "John Doe",
  //     date: "2025-06-07",
  //     link: "/article",
  //   },
  //   {
  //     thumbnail: "/test.png",
  //     tags: ["React", "UI/UX"],
  //     title: "Reactで美しいUIを作る",
  //     abstract: "Reactを使って洗練されたUIを作るためのデザインのポイントを解説します。",
  //     authorIcon: "/test-icon.png",
  //     authorName: "Jane Smith",
  //     date: "2025-06-06",
  //     link: "/article-2",
  //   },
  //       {
  //     thumbnail: "/test.png",
  //     tags: ["React", "UI/UX"],
  //     title: "Reactで美しいUIを作る",
  //     abstract: "Reactを使って洗練されたUIを作るためのデザインのポイントを解説します。",
  //     authorIcon: "/test-icon.png",
  //     authorName: "Jane Smith",
  //     date: "2025-06-06",
  //     link: "/article-2",
  //   },
  //       {
  //     thumbnail: "/test.png",
  //     tags: ["React", "UI/UX"],
  //     title: "Reactで美しいUIを作る",
  //     abstract: "Reactを使って洗練されたUIを作るためのデザインのポイントを解説します。",
  //     authorIcon: "/test-icon.png",
  //     authorName: "Jane Smith",
  //     date: "2025-06-06",
  //     link: "/article-2",
  //   },
  //       {
  //     thumbnail: "/test.png",
  //     tags: ["React", "UI/UX"],
  //     title: "Reactで美しいUIを作る",
  //     abstract: "Reactを使って洗練されたUIを作るためのデザインのポイントを解説します。",
  //     authorIcon: "/test-icon.png",
  //     authorName: "Jane Smith",
  //     date: "2025-06-06",
  //     link: "/article-2",
  //   },
  //   {
  //     thumbnail: "/test.png",
  //     tags: ["React", "UI/UX"],
  //     title: "Reactで美しいUIを作る",
  //     abstract: "Reactを使って洗練されたUIを作るためのデザインのポイントを解説します。",
  //     authorIcon: "/test-icon.png",
  //     authorName: "Jane Smith",
  //     date: "2025-06-06",
  //     link: "/article-2",
  //   },
  // ];

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <>
      <div className={styles.HeroImage}>
        <img
          src="/home/HeroImage_Mission.svg"
          alt="HeroImage"
          className={styles.HeroImageimageMisson}
        />
        <img
          src="/home/HeroImage_backImage.svg"
          alt="HeroImage"
          className={styles.HeroImageimage}
        />
      </div>

      <FadeInSection>
        <Carousel />
      </FadeInSection>

      <FadeInSection>
        <div className={styles.slide}>
          <iframe
            className="speakerdeck-iframe"
            frameBorder="0"
            src="https://speakerdeck.com/player/1819b163900a490d8153268b8ef1b0f1"
            title="Test-NUTMEG紹介スライド"
            allowFullScreen
            style={{
              border: "0px",
              background: "rgba(0, 0, 0, 0.1)",
              margin: "0px",
              padding: "0px",
              borderRadius: "20px",
              boxShadow: "0px 5px 40px rgba(240, 147, 46, 0.40)",
              width: "80vw",
              height: "auto",
              aspectRatio: "560 / 315",
            }}
            data-ratio="1.7777777777777777"
          />
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className={styles.projects}>
          <div className={`${styles.whiteBox} ${styles.projectsWhiteBox}`}>
            <img
              src="/home/TitleProjects.svg"
              className={styles.titleProjects}
              alt="Projects"
            />
            <div className={styles.projectsBox}>
              <img
                src="/home/Picture_Projects.svg"
                alt="写真"
                width={440}
                height={320}
              />
              <div>
                <p>
                  NUTMEGでは現在、8つのプロジェクトが進行中です。<br />
                  他学年の学生同士でチームを組み、<br />
                  ヒアリングから開発を通じて、技大祭運営のお悩み解決や、<br />
                  効率向上に貢献しています。
                </p>
                <div className={styles.NavigationButtonBox}>
                  <NavigationButton
                    text="プロジェクト紹介ページへ"
                    href="/projects"
                  />
                </div>
              </div>
            </div>
          </div>
          <img
            src="/decoration.svg"
            alt="decoration"
            width={154.96}
            height={138.2}
            className={styles.decoration1}
          />
          <img
            src="/decoration2.svg"
            alt="decoration"
            width={170.9}
            height={193.2}
            className={styles.decoration2}
          />
        </div>
      </FadeInSection>

      <FadeInSection>
        <div className={styles.blogs}>
          <div className={styles.BlogwhiteBox}>
            {/* <img
              src="/home/TitleBlogs.svg"
              className={styles.titleBlogs}
              alt="blogs"
            /> */}
            <div className={styles.flexBox}>
              {/* <h1 className={styles.BlogTitle}>Blog</h1> */}
            <img
              src="/home/TitleBlog.svg"
              className={styles.titleBlogs}
              alt="Blog"
            />
                  {/* <div className={styles.NavigationButtonBox}>
                  <a href="/blogs">ブログ一覧ページへ</a> */}

                {/* </div> */}
            </div>
            {/* <div className={styles.description}>
              NUTMEGでは、外部の方へ活動の様子を伝えることと、文面でのアウトプットを目的として、
              定期的にメンバーがブログの更新を行っています。
            </div> */}

            {/* <p>
              NUTMEGでは、文書化して記録に残すことと、アウトプットの機会を目的として、<br />
              定期的に学生がブログを投稿しています。
            </p> */}
            <BlogList posts={posts.slice(0, 3)} />{/*             
            <div className={styles.blogBox}>
              <div className={styles.cardContainer}>
                {blogData.map((data, index) => (
                  <Card key={index} {...data} />
                ))}

              </div>

            </div> */}
            <div className={styles.BlogNavigationButtonBox}>
              <NavigationButton
                      text="ブログ一覧ページへ"
                      href="/blogs"
              />
            </div>
          </div>
        </div>

      </FadeInSection>
    </>
  );
};

// export default Home;