// "use client";
// import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import Image from "next/image";
import NavigationButton from "./components/NavigationButton";
import styles from "./Home.module.css"; // CSSファイルのインポート
import FadeInSection from "./components/FadeInSection/FadeInSection";
import Carousel from "./components/carousel";
import BlogList from "./components/BlogList/BlogList";
import { getBlogPosts } from "./../app/lib/notion";
import OldSitePreview from "./components/OldSitePreview";


export default async function Home() {

  const posts = await getBlogPosts();
  return (
    <>
      <div className={styles.HeroImage}>
        <Image
          src="/home/HeroImage_Mission.svg"
          alt="HeroImage"
          className={styles.HeroImageimageMisson}
          width={437}
          height={256}
          priority
          sizes="(max-width: 768px) 40vw, 25vw"
        />
        <Image
          src="/home/HeroImage_BackImage.png"
          alt="HeroImage"
          className={styles.HeroImageimage}
          width={5232}
          height={2496}
          priority
          sizes="100vw"
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
            src="https://speakerdeck.com/player/932e848101334f1db860ffc35d581f8c"
            title="NUTMEG紹介スライド"
            allowFullScreen
            style={{
              border: "0px",
              background: "padding-box padding-box rgba(0, 0, 0, 0.1)",
              margin: "0px",
              padding: "0px",
              borderRadius: "20px",
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 40px",
              width: "85%",
              height: "auto",
              aspectRatio: "560 / 315"
            }}
            data-ratio="1.7777777777777777"
          />
          </div>
      </FadeInSection>

      <FadeInSection>
        <div className={styles.projects}>
          <div className={`${styles.whiteBox} ${styles.projectsWhiteBox}`}>
            <Image
              src="/home/TitleProjects.svg"
              className={styles.titleProjects}
              alt="Projects"
              width={251}
              height={61}
              loading="lazy"
              sizes="(max-width: 768px) 180px, 251px"
            />
            {/* <h1 className={styles.Sectiontitle}>Projects</h1> */}
            <div className={styles.projectsBox}>
              <Image
                src="/home/Picture_Projects.svg"
                alt="写真"
                width={440}
                height={320}
                loading="lazy"
                sizes="(max-width: 768px) 90vw, 440px"
              />
              <div>
                <p>
                  NUTMEGでは現在、8つのプロジェクトが進行中です。
                  他学年の学生同士でチームを組み、
                  ヒアリングから開発を通じて、技大祭運営のお悩み解決や、
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
          <Image
            src="/decoration.svg"
            alt="decoration"
            width={155}
            height={139}
            className={styles.decoration1}
            loading="lazy"
            sizes="(max-width: 768px) 0px, 155px"
          />
          <Image
            src="/decoration2.svg"
            alt="decoration"
            width={171}
            height={194}
            className={styles.decoration2}
            loading="lazy"
            sizes="(max-width: 768px) 0px, 171px"
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
              <Image
                src="/home/TitleBlog.svg"
                className={styles.titleBlogs}
                alt="Blog"
                width={134}
                height={61}
                sizes="(max-width: 768px) 180px, 134px"
                loading="lazy"
              />
            {/* <h1 className={styles.Sectiontitle}>Blog</h1> */}


            </div>
              <p className={styles.BlogExplanation}>
                NUTMEGでは、外部の方へ活動の様子を伝えることと、アウトプットの機会を目的として、定期的に学生がブログを投稿しています。
              </p>          
            <Suspense fallback={<div>読み込み中...</div>}>
              <BlogList posts={posts.slice(0, 3)} />
            </Suspense>
            <div className={styles.BlogNavigationButtonBox}>
              <NavigationButton
                      text="ブログ一覧ページへ"
                      href="/blogs"
              />
            </div>
          </div>
        </div>

      </FadeInSection>
      <FadeInSection>
        <OldSitePreview />
      </FadeInSection>

    </>
  );
};

// export default Home;
