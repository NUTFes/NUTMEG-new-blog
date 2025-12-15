// "use client";
// import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Suspense } from "react";
import NavigationButton from "./components/NavigationButton";
import styles from "./Home.module.css"; // CSSファイルのインポート
import FadeInSection from "./components/FadeInSection/FadeInSection";
import Carousel from "./components/carousel";
import BlogList from "./components/BlogList/BlogList";
import { getBlogPosts } from "./lib/notion";
import OldSitePreview from "./components/OldSitePreview";
import { DEFAULT_BLUR_DATA_URL } from "./lib/imagePlaceholder";

export const revalidate = 1800; // 30 minutes

export default async function Home() {

  const posts = await getBlogPosts();
  return (
    <>
      <div className={styles.HeroImage}>
        <Image
          src="/home/HeroImage_BackImage.png"
          alt="HeroImage"
          className={styles.HeroImageimage}
          fill
          priority
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_DATA_URL}
          sizes="100vw"
        />
        <Image
          src="/home/HeroImage_Mission.svg"
          alt="HeroImage"
          className={styles.HeroImageimageMisson}
          width={1200}
          height={360}
          priority
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_DATA_URL}
          sizes="(max-width: 768px) 40vw, 25vw"
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
              width={258}
              height={74}
              placeholder="blur"
              blurDataURL={DEFAULT_BLUR_DATA_URL}
            />
            {/* <h1 className={styles.Sectiontitle}>Projects</h1> */}
            <div className={styles.projectsBox}>
              <Image
                src="/home/Picture_Projects.svg"
                alt="写真"
                width={440}
                height={320}
                placeholder="blur"
                blurDataURL={DEFAULT_BLUR_DATA_URL}
                loading="lazy"
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
            width={154.96}
            height={138.2}
            className={styles.decoration1}
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
            loading="lazy"
          />
          <Image
            src="/decoration2.svg"
            alt="decoration"
            width={170.9}
            height={193.2}
            className={styles.decoration2}
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
            loading="lazy"
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
              width={192}
              height={64}
              placeholder="blur"
              blurDataURL={DEFAULT_BLUR_DATA_URL}
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
