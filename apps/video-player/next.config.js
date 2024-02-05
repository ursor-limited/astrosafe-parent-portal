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
      "https://astro-monorepo-video-player.vercel.app",
      "https://astro-monorepo-video-player-git-dev-astros-afe.vercel.app",
      "ursorassets.s3.eu-west-1.amazonaws.com",
      "i.ytimg.com",
    ],
  },
  assetPrefix:
    process.env.VERCEL_ENV === "production"
      ? "https://astro-monorepo-video-player.vercel.app"
      : process.env.VERCEL_ENV === "preview"
      ? "https://astro-monorepo-video-player-git-dev-astros-afe.vercel.app"
      : undefined,
  async redirects() {
    return [
      {
        source: "/v",
        destination: "/video",
        permanent: true,
      },
    ];
  },
});
