/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");

module.exports = withSvgr({
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: [
      "https://www.astrosafe.co",
      "https://www.astrosafe.co/_next/image",
      "https://astrosafe.co",
      "https://dev.astrosafe.co",
      "https://admin.astrosafe.co",
      "ursorassets.s3.eu-west-1.amazonaws.com",
      "ursorimagespublic.s3.us-east-1.amazonaws.com",
      "i.ytimg.com",
      "assets-global.website-files.com",
      "images.unsplash.com",
      "static01.nyt.com",
    ],
  },
  assetPrefix:
    process.env.VERCEL_ENV === "production"
      ? "https://admin.astrosafe.co"
      : process.env.VERCEL_ENV === "preview"
      ? "https://dev.astrosafe.co"
      : undefined,
});
