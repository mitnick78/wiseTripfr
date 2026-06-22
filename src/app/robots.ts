import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/login", "/register"],
      disallow: ["/dashboard", "/trips", "/profile"],
    },
    sitemap:
      "https://wise-tripfr-3jemjtr7d-mitnick78s-projects.vercel.app/sitemap.xml",
  };
}
