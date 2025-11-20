// components/Breadcrumb.tsx
"use client";

import React from "react";
import Link from "next/link";
import styles from "./Breadcrumb.module.css";

type BreadcrumbProps = {
  current: string;
};

export default function Breadcrumb({ current }: BreadcrumbProps) {
  return (
    <div className={styles.breadcrumb}>
      <Link href="/" className={styles.breadcrumbLinkSmall}>
        Home
      </Link>
      <span className={styles.breadcrumbLinkArrow}> &gt; </span>
      <Link href="/projects2" className={styles.breadcrumbLinkBig}>
        {current}
      </Link>
    </div>
  );
}
