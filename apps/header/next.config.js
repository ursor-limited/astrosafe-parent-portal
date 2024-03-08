/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");

module.exports = withSvgr({
  output: 'export',
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: [
      "https://www.astrosafe.co",
      "https://www.astrosafe.co/_next/image",
      "https://astrosafe.co",
      "https://dev.astrosafe.co",
      "https://astro-monorepo-canvas.vercel.app",
      "https://astro-monorepo-canvas-git-dev-astros-afe.vercel.app",
      "ursorassets.s3.eu-west-1.amazonaws.com",
      "i.ytimg.com",
      "assets-global.website-files.com",
    ],
  },
  assetPrefix:
    process.env.VERCEL_ENV === "production"
      ? "https://dev.astrosafe.co"
      : process.env.VERCEL_ENV === "preview"
      ? "https://dev.astrosafe.co"
      : undefined,
});
