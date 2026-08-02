import type { MetadataRoute } from "next";
import { discoverBooks } from "@/src/mocks/books";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://pristha-dev.tawsif1804113.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/discover", "/profiles/rumana-kabir"];
  return [
    ...staticPages.map((path) => ({
      url: siteUrl + path,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...discoverBooks.map((book) => ({
      url: siteUrl + "/books/" + book.slug,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
