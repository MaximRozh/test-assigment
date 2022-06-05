import type { NextPage } from "next";
import { FooterBanner, HeroBanner, Porducts } from "../components";
import { client } from "../lib/client";

const IndexPage: NextPage<any> = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData} />
      <Porducts products={products} />
      <FooterBanner footerBanner={bannerData} />
    </>
  );
};

export default IndexPage;

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]{image, name, slug, price, _id}';
  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"][0]{midText, smallText, largeText1, image, product,buttonText, desc}`;
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products, bannerData },
  };
};
