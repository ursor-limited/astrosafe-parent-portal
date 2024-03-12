import axios from "axios";
import { DOMParser, XMLSerializer } from "xmldom";
import { MetadataRoute } from "next";

export interface ISitemap {
  url: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return await fetchAndRenameSitemap("https://proxy.astrosafe.co/sitemap.xml");
}
async function fetchAndRenameSitemap(sitemapUrl: string): Promise<ISitemap[]> {
  try {
    // Fetch the sitemap
    const response = await axios.get(sitemapUrl);
    const sitemapText = response.data;

    // Create a new parser for XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(sitemapText, "text/xml");

    // Find and replace 'proxy.' with 'www.'
    const urls = xmlDoc.getElementsByTagName("url");
    const urlArray = [];
    for (let i = 0; i < urls.length; i++) {
      const loc = urls[i].getElementsByTagName("loc")[0];
      if (loc.textContent) {
        let url = loc.textContent.trim();
        urlArray.push({ url: url.replace(/proxy\./g, "www.") });
      }
    }
    urlArray.push({ url: "https://www.astrosafe.co/tools/video/create" });
    // Create a new URL element for the new URL
    console.log(urlArray);
    return urlArray;
  } catch (error) {
    console.error("Error fetching or parsing the sitemap:", error);
  }
  return [];
}
