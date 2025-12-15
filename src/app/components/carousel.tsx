"use client";
import React from "react";
import Image from "next/image";
import styles from "./carousel.module.css";
import { DEFAULT_BLUR_DATA_URL } from "../lib/imagePlaceholder";

const images = [
  "/pics/2_3.png",
  "/pics/2_4.png",
  "/pics/2_7.png",
  "/pics/2_8.png",
  "/pics/2_10.png",
  "/pics/2_11.png",
  "/pics/2_12.png",
];

export default function Carousel() {
  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderTrack}>
        {/* 画像を2回繰り返すことで途切れない無限ループにする */}
        {[...images, ...images].map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt="活動写真"
            className={styles.pics}
            width={400}
            height={400}
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
            loading="lazy"
            sizes="(max-width: 430px) 180px, (max-width: 768px) 220px, 400px"
          />
        ))}
      </div>
    </div>
  );
}
