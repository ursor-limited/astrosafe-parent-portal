/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");

module.exports = withSvgr({
  reactStrictMode: true,
  transpilePackages: ["ui"],
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://astro-monorepo-pedia.vercel.app"
      : undefined,
});
