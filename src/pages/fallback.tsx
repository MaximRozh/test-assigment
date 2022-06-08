import React from "react";
import style from "../styles/Fallback.module.scss";
const fallback = () => {
  return (
    <div className={style["fallback-container"]}>
      <div className={style["fallback-wrapper"]}>
        <h1 className={style["text"]}>
          Sorry, web-page is unavailable. Check your internet connection and try
          again
        </h1>
        <div className={style["fallback-wrapper"]}>
          <div className={style["fallback"]}></div>
        </div>
      </div>
    </div>
  );
};

export default fallback;
