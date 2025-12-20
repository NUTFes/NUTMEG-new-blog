"use client";

import Image from "next/image";
import styles from "./OldSitePreview.module.css";
import { SITE_URLS } from "@/app/config";

export default function OldSitePreview() {
  return (
    <div className={styles.container}>
      
      <h2 className={styles.title}>
        <div>2025年12月より、NUTMEGサイトを一新いたしました。</div>
        <div>旧サイトはこちらからご覧いただけます。</div>
      </h2>

      <a
        href={SITE_URLS.oldSite}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
      >
        <Image
          src={SITE_URLS.oldSiteOgp}
          alt="旧サイトのプレビュー"
          className={styles.thumbnail}
          width={1200}
          height={630}
          loading="lazy"
          sizes="(max-width: 768px) 90vw, 70vw"
          unoptimized
        />
      </a>
    </div>
  );
}
