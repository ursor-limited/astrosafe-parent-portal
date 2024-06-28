/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");

module.exports = withSvgr({
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    domains: [
      "https://browser.astrosafe.co",
      "https://browser.astrosafe.co/_next/image",
      "https://dev.browser.astrosafe.co",
      "https://dev.browser.astrosafe.co/_next/image",
      "https://astrosafe.co",
      "https://dev.astrosafe.co",
      "https://astro-monorepo-canvas.vercel.app",
      "https://astro-monorepo-canvas-git-dev-astros-afe.vercel.app",
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
      ? "https://browser.astrosafe.co"
      : process.env.VERCEL_ENV === "preview"
      ? "https://dev.browser.astrosafe.co"
      : undefined,
  async redirects() {
    return [
      {
        source: "/video/create",
        destination: "/tools/safetube/create",
        permanent: true,
      },
      {
        source: "/websites-for-kids",
        destination: "/tools/websites-for-kids",
        permanent: true,
      },
      {
        source: "/15-minutes-meditation-for-family-time-and-kids",
        destination: "/tools/15-minutes-meditation-for-family-time-and-kids",
        permanent: true,
      },
      {
        source: "/chore-charts-for-kids",
        destination: "/tools/chore-charts-for-kids",
        permanent: true,
      },
      {
        source: "/features/kids-safe-search-engine",
        destination: "/tools/kids-safe-search-engine",
        permanent: true,
      },
      {
        source: "/kids-safe-search-engine",
        destination: "/tools/kids-safe-search-engine",
        permanent: true,
      },
      {
        source: "/safetube/create",
        destination: "/tools/safetube/create",
        permanent: true,
      },
      {
        source: "/video",
        destination: "/tools/safetube",
        permanent: true,
      },
      {
        source: "/safetube",
        destination: "/tools/safetube",
        permanent: true,
      },
      {
        source: "/v",
        destination: "/tools/safetube",
        permanent: true,
      },
    ];
  },
});