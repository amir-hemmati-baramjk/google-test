const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

const withSerwistInit = require("@serwist/next").default;

const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",

  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "api.befalta.com", pathname: "/**" },
      { protocol: "https", hostname: "demo.myfatoorah.com", pathname: "/**" },
      { protocol: "https", hostname: "portal.myfatoorah.com", pathname: "/**" },
      {
        protocol: "https",
        hostname: "noqatmediamain.s3.eu-central-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "faltamediamain.s3.eu-central-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = withSerwist(withNextIntl(nextConfig));
