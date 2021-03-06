import type { GetServerSideProps, NextPage } from "next";
import React, { FC } from "react";
import { FooterBanner, HeroBanner, Porducts } from "../components";
import { client } from "../lib/client";
import { BannerInterface, ProductInterface } from "../types/Product";

interface HomeProps {
  products: ProductInterface[];
  bannerData: BannerInterface;
}

const IndexPage: FC<HomeProps> = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData} />
      <Porducts products={products} />
      <FooterBanner footerBanner={bannerData} />
    </>
  );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = '*[_type == "product"]{image, name, slug, price, _id}';
  const bannerQuery = `*[_type == "banner"][0]{midText, smallText, largeText1, image, product,buttonText, desc}`;

  let products = null;
  let bannerData = null;

  try {
    products = await client.fetch(query);
    bannerData = await client.fetch(bannerQuery);
  } catch (e) {
    console.log(e);
  }

  return {
    props: { products, bannerData },
  };
};
