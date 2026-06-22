import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://wise-tripfr-3jemjtr7d-mitnick78s-projects.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://wise-tripfr-3jemjtr7d-mitnick78s-projects.vercel.app/login",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://wise-tripfr-3jemjtr7d-mitnick78s-projects.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
