// components/Layout.tsx
import React from "react";
import TopBar from "./topbar";
import Footer from "./footer";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <TopBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;