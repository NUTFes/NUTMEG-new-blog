"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FadeInSection.module.css";

type Props = {
  children: React.ReactNode;
};

const FadeInSection: React.FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting); // ← true/false 両方対応
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.fadeInUp} ${isVisible ? styles.visible : ""}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
