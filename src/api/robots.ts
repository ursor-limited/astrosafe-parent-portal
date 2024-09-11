export default function handler(req: any, res: any) {
  const robotsProd = `
        # *
        User-agent: *
        Allow: /

        # Host
        Host: https://www.astrosafe.co

        # Sitemaps
        Sitemap: https://astrosafe.co/sitemap.xml
        `

  res.send(robotsProd)

  return
}
