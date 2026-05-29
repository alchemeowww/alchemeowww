import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events - Alchemeowww",
  description: "Find Alchemeowww at anime conventions and art markets across Malaysia and Japan — Animangaki 2026, Comic Art Festival KL X, Cosmic Spring 2026, Comic Fiesta, Design Fiesta Tokyo, and more.",
  keywords: "Alchemeowww events, Animangaki 2026, Comic Art Festival KL, CAFKL, Cosmic Spring 2026, Comic Fiesta 2025, Design Fiesta Tokyo, CosWorld Festival, Nijigen Expo, anime convention Malaysia, art market Malaysia, MIECC, Sunway Pyramid, Fahrenheit88, Lalaport Bukit Bintang",
  alternates: {
    canonical: "https://alchemeowww.com/events",
  },
  openGraph: {
    type: "website",
    url: "https://alchemeowww.com/events",
    title: "Events - Alchemeowww",
    description: "Find Alchemeowww at Animangaki 2026, Comic Art Festival KL X, Cosmic Spring 2026, Comic Fiesta, Design Fiesta Tokyo, and more anime conventions and art markets.",
    images: ["https://alchemeowww.com/images/alchemeowww-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events - Alchemeowww",
    description: "Find Alchemeowww at Animangaki 2026, Comic Art Festival KL X, Cosmic Spring 2026, Comic Fiesta, Design Fiesta Tokyo, and more.",
    images: ["https://alchemeowww.com/images/alchemeowww-logo.png"],
  },
};

const eventsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Alchemeowww Events",
  "url": "https://alchemeowww.com/events",
  "itemListElement": [
    {
      "@type": "Event",
      "position": 1,
      "name": "Anime Fest+ 2026 (Round 2)",
      "startDate": "2026-09-26",
      "endDate": "2026-09-27",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "World Trade Center Kuala Lumpur", "address": { "@type": "PostalAddress", "addressCountry": "MY" } },
      "organizer": { "@type": "Person", "name": "Alchemeowww", "url": "https://alchemeowww.com" },
      "image": "https://alchemeowww.com/images/events/booths/AF-tbc.webp",
      "url": "https://alchemeowww.com/events/af-plus-2026",
    },
    {
      "@type": "Event",
      "position": 2,
      "name": "Animangaki 2026",
      "startDate": "2026-08-28",
      "endDate": "2026-08-30",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "The Mines - MIECC", "address": { "@type": "PostalAddress", "addressCountry": "MY" } },
      "organizer": { "@type": "Person", "name": "Alchemeowww", "url": "https://alchemeowww.com" },
      "image": "https://alchemeowww.com/images/events/booths/amg2026.webp",
      "url": "https://alchemeowww.com/events",
    },
    {
      "@type": "Event",
      "position": 3,
      "name": "Comic Art Festival KL X",
      "startDate": "2026-06-13",
      "endDate": "2026-06-14",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "Hextar World Empire City", "address": { "@type": "PostalAddress", "addressCountry": "MY" } },
      "organizer": { "@type": "Person", "name": "Alchemeowww", "url": "https://alchemeowww.com" },
      "image": "https://alchemeowww.com/images/events/booths/CAFKLX.webp",
      "url": "https://alchemeowww.com/events/cafkl-x",
    },
    {
      "@type": "Event",
      "position": 4,
      "name": "Cosmic Spring 2026",
      "startDate": "2026-04-25",
      "endDate": "2026-04-26",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "Lalaport Bukit Bintang City Centre", "address": { "@type": "PostalAddress", "addressLocality": "Kuala Lumpur", "addressCountry": "MY" } },
      "organizer": { "@type": "Person", "name": "Alchemeowww", "url": "https://alchemeowww.com" },
      "image": "https://alchemeowww.com/images/events/booths/2604-CosmicSpring.webp",
    },
    {
      "@type": "Event",
      "position": 5,
      "name": "Comic Fiesta 2025",
      "startDate": "2025-12-01",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "Kuala Lumpur Convention Center", "address": { "@type": "PostalAddress", "addressCountry": "MY" } },
      "organizer": { "@type": "Person", "name": "Alchemeowww", "url": "https://alchemeowww.com" },
      "image": "https://alchemeowww.com/images/events/booths/2512-CF.webp",
    },
    {
      "@type": "Event",
      "position": 6,
      "name": "Cosmic 2025",
      "startDate": "2025-09-01",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "Sunway Pyramid Convention Center", "address": { "@type": "PostalAddress", "addressCountry": "MY" } },
      "organizer": { "@type": "Person", "name": "Alchemeowww", "url": "https://alchemeowww.com" },
      "image": "https://alchemeowww.com/images/events/booths/202509-Cosmic.webp",
    },
    {
      "@type": "Event",
      "position": 7,
      "name": "Animangaki 2025",
      "startDate": "2025-08-01",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "The Mines - MIECC", "address": { "@type": "PostalAddress", "addressCountry": "MY" } },
      "organizer": { "@type": "Person", "name": "Alchemeowww", "url": "https://alchemeowww.com" },
      "image": "https://alchemeowww.com/images/events/booths/202508-AMG.webp",
    },
    {
      "@type": "Event",
      "position": 8,
      "name": "Design Fiesta 2025",
      "startDate": "2025-07-01",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "Tokyo Big Sight", "address": { "@type": "PostalAddress", "addressLocality": "Tokyo", "addressCountry": "JP" } },
      "organizer": { "@type": "Person", "name": "Alchemeowww", "url": "https://alchemeowww.com" },
      "image": "https://alchemeowww.com/images/events/booths/2507-DesignFesta.webp",
    },
    {
      "@type": "Event",
      "position": 9,
      "name": "Comic Art Festival KL 9",
      "startDate": "2025-05-01",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "Fahrenheit88", "address": { "@type": "PostalAddress", "addressCountry": "MY" } },
      "organizer": { "@type": "Person", "name": "Alchemeowww", "url": "https://alchemeowww.com" },
      "image": "https://alchemeowww.com/images/events/booths/2505-CAFKL9.webp",
    },
    {
      "@type": "Event",
      "position": 10,
      "name": "CosWorld Festival 2025",
      "startDate": "2025-05-01",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "Pavilion Bukit Jalil Exhibition Centre", "address": { "@type": "PostalAddress", "addressCountry": "MY" } },
      "organizer": { "@type": "Person", "name": "Alchemeowww", "url": "https://alchemeowww.com" },
      "image": "https://alchemeowww.com/images/events/booths/2505-Cosworld2U.webp",
    },
    {
      "@type": "Event",
      "position": 11,
      "name": "Nijigen Expo",
      "startDate": "2025-02-01",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "The Mines - MIECC", "address": { "@type": "PostalAddress", "addressCountry": "MY" } },
      "organizer": { "@type": "Person", "name": "Alchemeowww", "url": "https://alchemeowww.com" },
      "image": "https://alchemeowww.com/images/events/booths/2502-NijigenExpo.webp",
    },
  ],
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
      />
      {children}
    </>
  );
}
