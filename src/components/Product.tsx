import React, { FC } from "react";
import Link from "next/link";
import SanityImage from "./SanityImage";
import style from "../styles/Products.module.scss";
import { ProductInterface } from "../types/Product";

interface ProductProp {
  product: ProductInterface;
}

const Product: FC<ProductProp> = ({
  product: { image, name, slug, price },
}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className={style["product-card"]}>
          <div className={style["product-image"]}>
            <SanityImage imageData={image && image[0]} alt="product-image" />
          </div>
          <p className={style["product-name"]}>{name}</p>
          <p className={style["product-price"]}>${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
