/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");

module.exports = withSvgr({
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: [
      "https://astro-monorepo-aw.vercel.app",
    ],
  },
  assetPrefix:
    process.env.VERCEL_ENV === "production"
      ? "https://astro-monorepo-aw.vercel.app"
      : process.env.VERCEL_ENV === "preview"
      ? "https://astro-monorepo-aw.vercel.app"
      : undefined,
});
