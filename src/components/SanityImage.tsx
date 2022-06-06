import React from "react";
import Img from "next/image";
import { client } from "../lib/client";
import { useNextSanityImage } from "next-sanity-image";

const SanityImage = ({
  imageData,
  layout = "intrinsic",
  className = "",
  alt,
}) => {
  const imageProps = useNextSanityImage(client, imageData);

  return (
    <Img
      // @ts-ignore: Unreachable code error
      {...imageProps}
      layout={layout}
      className={className}
      alt={alt}
    />
  );
};

export default SanityImage;
