"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./OldSitePreview.module.css";
import { SITE_URLS } from "@/app/config";
import { DEFAULT_BLUR_DATA_URL } from "../lib/imagePlaceholder";

export default function OldSitePreview() {
  const [ogImage, setOgImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/ogp?url=${encodeURIComponent(SITE_URLS.oldSite)}`)
      .then((res) => res.json())
      .then((data) => setOgImage(data.ogImage));
  }, []);

  return (
    <div className={styles.container}>
      
      <h2 className={styles.title}>
        <div>2025年12月より、NUTMEGサイトを一新いたしました。</div>
        <div>旧サイトはこちらからご覧いただけます。</div>
        </h2>

      {ogImage ? (
        <a
            href={SITE_URLS.oldSite}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.card}
        >
        <Image
          src={ogImage}
          alt="旧サイトのプレビュー"
          className={styles.thumbnail}
          width={1200}
          height={630}
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_DATA_URL}
          loading="lazy"
          sizes="(max-width: 768px) 90vw, 70vw"
        />

        </a>
      ) : (
        <p>プレビューを読み込み中...</p>
      )}
    </div>
  );
}
