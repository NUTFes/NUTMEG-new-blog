// pages/index.tsx
"use client";

import Link from "next/link";

import React from "react";
import styles from './page.module.css'
import { useRouter } from "next/navigation";

const Ds = () => {
    const router = useRouter();
  
  return (
    <>
    <div className={styles.pagebox}>
          <div className={styles.breadcrumb}>
            <button onClick={() => router.replace("/")}className={styles.breadcrumbLinkSmall}>Home</button>
            <span className={styles.breadcrumbLinkArrow}> &gt; </span>
            <button
              className={styles.breadcrumbLinkSmall}
              onClick={() => router.replace("/projects")}
            >
              Projects
            </button>
            <span className={styles.breadcrumbLinkArrow}> &gt; </span>
            <button
              className={styles.breadcrumbLinkBig}
              onClick={() => router.replace("/projects/ds")}
            >
              Data Science Team
            </button>
          </div>

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
    </div>


    </>

    
  );

};

export default Ds;