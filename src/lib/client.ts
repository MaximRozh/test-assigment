import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const tokenId =
  process.env.NEXT_PUBLIC_SANITY_TOKEN ||
  "skJNnnuTP2Cz3IOvTfbgcBdfggwChUOP2o4NMAMBFpc4EOkAVTCpNmhkz0lKQYtnm7LSA8VSALIetHjzCsjKTUMzI7nBT7gCaRkZCThqJEVp56oqbk9vFPhXMfAHSIFiJTNRd55PGXjogdW3rX91yzlJq66Mjvc3apsXzMk3qdS3duuM4iWX";

export const client = sanityClient({
  projectId: "nhoz9xby",
  dataset: "production",
  apiVersion: "2022-04-10",
  useCdn: true,
  token: tokenId,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
