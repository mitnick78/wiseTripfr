import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/login", "/register"],
      disallow: ["/dashboard", "/trips", "/profile"],
    },
    sitemap: "https://wise-tripfr.vercel.app/sitemap.xml",
  };
}
