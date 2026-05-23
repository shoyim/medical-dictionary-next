import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/seo";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://medterm.uz";

const routes = [
  { path: "", priority: 1.0, changeFrequency: "daily" as const },
  { path: "/terms", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/abbreviation", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/stats", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LOCALES) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${lang}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return entries;
}
