import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://alchemeowww.com";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-04-27"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-04-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date("2026-04-27"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events/cafkl-x`,
      lastModified: new Date("2026-05-29"),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/events/af-plus-2026`,
      lastModified: new Date("2026-05-29"),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/nfc`,
      lastModified: new Date("2026-04-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nfc/guide`,
      lastModified: new Date("2026-04-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mist;y-forest`,
      lastModified: new Date("2026-04-27"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mist;y-forest/card`,
      lastModified: new Date("2026-04-27"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
