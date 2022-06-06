import React, { FC } from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import style from "../styles/Layout.module.scss";
interface LayoutProp {
  children: React.ReactNode;
}
const Layout: FC<LayoutProp> = ({ children }) => {
  return (
    <div className={style["layout"]}>
      <Head>
        <title>Store</title>
      </Head>
      <header className={style["header"]}>
        <NavBar />
      </header>
      <main className={style["main-container"]}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
