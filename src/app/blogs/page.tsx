import React from "react";
// import Layout from "@/app/layout";
import Layout from "../layout";
// import BlogList from "@/app/components/BlogList/BlogList";
import BlogList from "../components/BlogList/BlogList";
// import { getBlogPosts } from "@/lib/notion"; // ブログ記事を取得する関数
import { getBlogPosts } from "../../app/lib/notion"; // ブログ記事を取得する関数
const Blogs = async () => {
  // ブログ記事を取得
  const posts = await getBlogPosts();

  return (
    // <Layout>
      <div className="mt-16 px-32 py-8 text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Blogs
        </h1>
        <p className="text-gray-900 mb-8">
          NUTMEGでは、外部の方へ活動の様子を伝えることと、文面でのアウトプットを目的として、定期的にメンバーがブログの更新を行っています。
        </p>
        
        {/* ブログ記事の一覧 */}
        <BlogList posts={posts} />
      </div>
    // </Layout>
  );
};

export default Blogs;