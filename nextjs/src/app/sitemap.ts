import { MetadataRoute } from "next";

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
