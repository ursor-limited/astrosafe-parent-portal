/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");

module.exports = withSvgr({
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
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
