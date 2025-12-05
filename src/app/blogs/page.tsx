import React, { Suspense } from "react";
import styles from "./page.module.css";
import BlogList from "../components/BlogList/BlogList";
import { getBlogPosts } from "../../app/lib/notion";
import Link from "next/link";

const Blogs = async () => {
  const posts = await getBlogPosts();

  return (
    <div className={styles.container}>
      
      <div className={styles.title}>
        <div className={styles.breadcrumbWrapper}>
          <Link href="/" className={styles.breadcrumbLinkSmall}>Home</Link>
          <span className={styles.breadcrumbLinkArrow}>&gt;</span>
          <Link href="/blogs" className={styles.breadcrumbLinkBig}>Blog</Link>
        </div>
      </div>


      <p className={styles.description}>
        NUTMEGでは、外部の方へ活動の様子を伝えることと、文面でのアウトプットを目的として、
        定期的にメンバーがブログの更新を行っています。
      </p>

      <Suspense fallback={<div>読み込み中...</div>}>
        <BlogList posts={posts} />
      </Suspense>
      
    </div>
  );
};

export default Blogs;