import type { MetadataRoute } from "next";
import { posts } from "@/content/notes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://euansmith.net";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/notes`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: `${base}/notes/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
