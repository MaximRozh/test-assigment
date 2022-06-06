import { GetServerSideProps, NextPage } from "next";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Product } from "../components";
import { useAppDispatch } from "../hooks";
import { client } from "../lib/client";
import { addProductToCart } from "../store/cart";
import style from "../styles/Category.module.scss";
import { ProductInterface } from "../types/Product";

interface CategoryProp {
  products: ProductInterface[];
}

const Category: NextPage<CategoryProp> = ({ products }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const dispatch = useAppDispatch();

  const addToCart = (product) => {
    dispatch(addProductToCart(product));
    toast.success(`${product.name} added to the cart.`);
  };

  const handleSelect = (e) => {
    const value = e.target?.ariaLabel;
    if (value) {
      setSelectedFilter(value);
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedFilter === "All") return products;
    return products.filter((item) => item.device === selectedFilter);
  }, [selectedFilter]);

  const categories = products.reduce(
    (acc, next) => {
      if (!acc.includes(next.device)) {
        acc.push(next.device);
      }
      return acc;
    },
    ["All"]
  );

  return (
    <div className={style["category-container"]}>
      <ul className={style["side-category"]} onClick={handleSelect}>
        {categories.map((item: string) => (
          <li
            key={item}
            aria-label={item}
            className={selectedFilter === item ? style["active"] : ""}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className={style["product-container"]}>
        {filteredProducts.map((item) => (
          <div className={style["card-wrapper"]} key={item._id}>
            <Product product={item} />
            <button className={style["button"]} onClick={() => addToCart(item)}>
              add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async () => {
  const query =
    '*[_type == "product"]{image, name, slug, price, _id, mark, device}';
  const products = await client.fetch(query);
  return {
    props: { products },
  };
};
