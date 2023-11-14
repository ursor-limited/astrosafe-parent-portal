/** @type {import('next').NextConfig} */

module.exports = {
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
  };
