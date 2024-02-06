import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      }
    ],
    host: "https://www.astrosafe.co",
    sitemap: 'https://astrosafe.co/sitemap.xml',
  }
}


// export default function handler(req: any, res: any) {
//     if (process.env.VERCEL_ENV === "production") {
//         const robotsProd = `
//         # *
//         User-agent: *
//         Allow: /

//         # Host
//         Host: https://www.astrosafe.co

//         # Sitemaps
//         Sitemap: https://astrosafe.co/sitemap.xml
//         `;
//         res.send(robotsProd);
//         return
//     } else {
//         const robotsDev = `
//         # *
//         User-agent: *
//         Disallow: /

//         # Host
//         Host: https://dev.astrosafe.co
//         `;
//         res.send(robotsDev);
//         return
//     }
// }
