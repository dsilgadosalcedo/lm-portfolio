import { MetadataRoute } from "next";
import { siteConfig, sitemapRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = sitemapRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency as MetadataRoute.Sitemap[0]["changeFrequency"],
    priority: route.priority,
  }));

  return [...staticRoutes];
}
