import dotenv from 'dotenv'

dotenv.config()

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    host: 'https://www.astrosafe.co',
    sitemap: 'https://astrosafe.co/sitemap.xml',
  }
}
