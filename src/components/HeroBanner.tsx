import React, { FC } from "react";
import Link from "next/link";
import SanityImage from "./SanityImage";
import style from "../styles/HeroBanner.module.scss";
import { BannerInterface } from "../types/Product";

interface HeroBannerProp {
  heroBanner: BannerInterface;
}

const HeroBanner: FC<HeroBannerProp> = ({ heroBanner }) => {
  return (
    <div className={style["hero-banner-container"]}>
      <div className={style["hero-banner-content"]}>
        <div className={style["hero-banner-text"]}>
          <p className={style["beats-solo"]}>{heroBanner?.smallText}</p>
          <h3>{heroBanner?.midText}</h3>
          <h1>{heroBanner?.largeText1}</h1>
        </div>
        <div className={style["hero-banner-image"]}>
          <SanityImage
            imageData={heroBanner?.image}
            alt="footer-banner-image"
          />
        </div>
        <div>
          <Link href={`product/${heroBanner?.product}`}>
            <button type="button">{heroBanner?.buttonText}</button>
          </Link>
          <div className={style["desc"]}>
            <h3>{heroBanner?.desc}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
