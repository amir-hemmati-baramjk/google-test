const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.playnoqat.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "demo.myfatoorah.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "portal.myfatoorah.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "noqatmediamain.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "faltamediamain.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

https: module.exports = withNextIntl(nextConfig);
