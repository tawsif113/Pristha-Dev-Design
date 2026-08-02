import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/discover", "/books/", "/profiles/"],
        disallow: [
          "/library",
          "/reading-history",
          "/bookmarks",
          "/notifications",
          "/settings",
          "/studio/",
          "/house/",
          "/read/",
        ],
      },
    ],
    sitemap: "/sitemap.xml",
  };
}
