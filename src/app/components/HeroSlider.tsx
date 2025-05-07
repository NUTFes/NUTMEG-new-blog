"use client"; // 👈 Next.js の Client Component にする
import Slider from "react-slick";
import styles from "./heroSlider.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = () => {
  const settings = {
    infinite: true,
    speed: 9000,           // ← ここが重要。高くするとぬるぬる
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,        // ← 自動スクロールをON
    autoplaySpeed: 0,      // ← スクロール間隔ゼロにすると「連続」で動く
    cssEase: "linear",     // ← これで一定速度のアニメーションになる
    arrows: false,         // ← 矢印非表示でより自然に
    pauseOnHover: false    // ← ホバーしても止まらないように
  };
  

  return (
    <div className={styles.sliderWrapper}>
      <Slider {...settings}>
        <div className={styles.slide}><img src="/hero-image1.png" alt="イベント画像1" /></div>
        <div className={styles.slide}><img src="/hero-image2.png" alt="イベント画像2" /></div>
        <div className={styles.slide}><img src="/hero-image3.png" alt="イベント画像3" /></div>
      </Slider>
      <div className={styles.overlayText}>技大祭を円滑に</div>
      <img src="/scroll-icon.png" alt="スクロールアイコン" className={styles.scrollIcon} />
      <div className={styles.gradientOverlay}></div> {/* 👈 追加！ */}
    </div>
  );
};

export default HeroSlider;