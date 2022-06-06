import React from "react";
import { Product } from "../components";
import { client } from "../lib/client";
import style from "../styles/SearchPage.module.scss";

const Search = ({ product, query }) => {
  if (!product.length)
    return (
      <p>
        There are no products that match <b>"{query}"</b>
      </p>
    );
  return (
    <div className={style["conteiner"]}>
      {product.map((item) => (
        <Product key={item._id} product={item} />
      ))}
    </div>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  const { q } = context.query;
  const query = `*[_type == "product" && [name, mark] match '${q}*']`;
  const product = await client.fetch(query);

  return {
    props: { product: product, query: q },
  };
};
