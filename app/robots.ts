import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
      ],
    },

    sitemap:
      "https://hardy-gates-portfolio.vercel.app/sitemap.xml",
  };
}