"use client";
import React from "react";
import Image from "next/image";
import styles from "./carousel.module.css";

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
            width={640}
            height={640}
            loading="lazy"
            sizes="(max-width: 768px) 220px, 400px"
          />
        ))}
      </div>
    </div>
  );
}
