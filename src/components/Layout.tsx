import React from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";
import style from "../styles/Layout.module.scss";

const Layout = ({ children }) => {
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
