import React from "react";
import Product from "./Product";
import style from "../styles/Products.module.scss";

const Porducts = ({ products }) => {
  return (
    <>
      <div className={style["products-heading"]}>
        <h2>Best Selling Produncts</h2>
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
