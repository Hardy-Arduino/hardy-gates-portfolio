import type {
  MetadataRoute,
} from "next";

import {
  getPublishedProjectSlugs,
} from "@/lib/supabase/projects";


export default async function sitemap():
  Promise<MetadataRoute.Sitemap> {

  const baseUrl =
    "https://hardy-gates-portfolio.vercel.app";


  const projectSlugs =
    await getPublishedProjectSlugs();


  const projectPages:
    MetadataRoute.Sitemap =
    projectSlugs.map(
      (slug) => ({
        url:
          `${baseUrl}/projects/${slug}`,

        lastModified:
          new Date(),

        changeFrequency:
          "monthly",

        priority:
          0.8,
      })
    );


  return [
    {
      url: baseUrl,

      lastModified:
        new Date(),

      changeFrequency:
        "monthly",

      priority:
        1,
    },

    ...projectPages,
  ];
}