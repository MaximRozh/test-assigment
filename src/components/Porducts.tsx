import React, { FC } from "react";
import Product from "./Product";
import style from "../styles/Products.module.scss";
import { ProductInterface } from "../types/Product";

interface ProductsProp {
  products: ProductInterface[];
}

const Porducts: FC<ProductsProp> = ({ products }) => {
  return (
    <>
      <div className={style["products-heading"]}>
        <h2>Best Selling Products</h2>
        <p>Speakers of many var</p>
      </div>
      <div className={style["products-container"]}>
        {products?.slice(0, 4).map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </div>
    </>
  );
};

export default Porducts;
