/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  pwa: {
    dest: "public",
    // register: true,
    // skipWaiting: true,
    // runtimeCaching,
    disable: process.env.NODE_ENV === "development",
    swSrc: "service-worker.js",
  },
});

module.exports = nextConfig;
