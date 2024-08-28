import dotenv from 'dotenv';

dotenv.config();

export default function robots() {
  return process.env.NODE_ENV === 'production'
    ? {
        rules: [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
        host: 'https://www.astrosafe.co',
        sitemap: 'https://astrosafe.co/sitemap.xml',
      }
    : {
        rules: [
          {
            userAgent: '*',
            disallow: '/',
          },
        ],
        host: 'https://dev.astrosafe.co',
      };
}
