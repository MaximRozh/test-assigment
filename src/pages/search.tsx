import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Product } from "../components";
import { client } from "../lib/client";
import style from "../styles/SearchPage.module.scss";
import { ProductInterface } from "../types/Product";

interface SearchProp {
  products: ProductInterface[];
  query: string;
}

const Search: NextPage<SearchProp> = ({ products, query }) => {
  if (!products.length)
    return (
      <p>
        There are no products that match <b>"{query}"</b>
      </p>
    );
  return (
    <div className={style["conteiner"]}>
      {products.map((item) => (
        <Product key={item._id} product={item} />
      ))}
    </div>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query;
  const query = `*[_type == "product" && [name, mark] match '${q}*']`;
  const products = await client.fetch(query);

  return {
    props: { products: products, query: q },
  };
};
