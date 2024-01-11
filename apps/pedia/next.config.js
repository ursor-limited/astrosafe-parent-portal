/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");

module.exports = withSvgr({
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: [
      'https://www.astrosafe.co',
      'https://astro-monorepo-pedia.vercel.app',
    ]
  },
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://astro-monorepo-pedia.vercel.app"
      : undefined,
});
