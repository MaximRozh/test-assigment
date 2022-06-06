import React, { useState, useMemo } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Product, SanityImage } from "../../components";
import { client } from "../../lib/client";
import style from "../../styles/SingleProduct.module.scss";
import { default as FastMarquee } from "react-fast-marquee";
import { addProductToCart, openCart } from "../../store/cart";
import { useAppDispatch } from "../../hooks";
import toast from "react-hot-toast";

const ProductDetails = ({ product, products }) => {
  const { image, name, price, details } = product;
  const dispatch = useAppDispatch();

  const [index, setIndex] = useState(0);

  const mayLikeProduct = useMemo(
    () => products.filter((item) => item._id !== product._id),
    [products, product]
  );

  const handleBuyNow = () => {
    dispatch(addProductToCart(product));
    dispatch(openCart());
  };

  const addToCart = () => {
    dispatch(addProductToCart(product));
    toast.success(`${product.name} added to the cart.`);
  };

  const handleChangeImageIndex = (i) => {
    if (i !== index) {
      setIndex(i);
    }
  };

  return (
    <>
      <div className={style["product-detail-container"]}>
        <div className={style["product-detail"]}>
          <div className={style["image-container"]}>
            <div className={style["product-detail-image"]}>
              <SanityImage
                imageData={image[index] ? image[index] : image[0]}
                alt="product-detail-image"
              />
            </div>
          </div>
          <div className={style["small-images-container"]}>
            {image?.map((item, i) => (
              <div
                className={
                  i === index
                    ? `${style["small-image"]} ${style["selected-image"]}`
                    : style["small-image"]
                }
                key={i}
                onMouseEnter={() => handleChangeImageIndex(i)}
              >
                <SanityImage imageData={item} alt="product-detail-image" />
              </div>
            ))}
          </div>
        </div>
        <div className={style["product-detail-desc"]}>
          <h1>{name}</h1>
          <div className={style["reviews"]}>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <p>(20)</p>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className={style["price"]}>${price}</p>

          <div className={style["buttons"]}>
            <button
              type="button"
              className={style["add-to-cart"]}
              onClick={addToCart}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className={style["buy-now"]}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className={style["maylike-products-wrapper"]}>
        <h2>You may also like</h2>
        <div className={style["marquee"]}>
          <FastMarquee
            gradient={false}
            className={`${style["maylike-products-container"]}`}
          >
            {mayLikeProduct.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </FastMarquee>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
