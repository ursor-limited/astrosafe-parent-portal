/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");

module.exports = withSvgr({
    reactStrictMode: true,
    transpilePackages: ["ui"],
    assetPrefix: "https://astro-monorepo-pedia.vercel.app"
  })
