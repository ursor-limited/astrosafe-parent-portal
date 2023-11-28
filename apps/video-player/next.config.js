/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");

module.exports = withSvgr({
    reactStrictMode: true,
    transpilePackages: ["ui"],
    async redirects() {
      return [
        {
          source: '/v',
          destination: '/video',
          permanent: true,
        }]
      }
  })
