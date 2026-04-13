import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alchemeowww - Random Alchemist",
  description: "Welcome to Alchemeowww (aka Alchemeow, Alchemeoww) - Random Alchemist who creates fancy little labbish. Explore MIST;Y FOREST adventures, unique merchandises like board games, interactive standees, keychains, card holders, and NFC lights. Check out past events and markets.",
  keywords: "alchemist, art, merchandise, board games, interactive standee, keychain, card holder, NFC, events, comic fiesta, cosmic, animangaki, design fiesta, MIST;Y FOREST, Alchemeowww, Alchemeow, Alchemeoww",
  authors: [{ name: "Alchemeowww" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://alchemeowww.com/",
    title: "Alchemeowww - Random Alchemist",
    description: "Random Alchemist who always make fancy lil labbish. Explore MIST;Y FOREST, merchandises, and past events.",
    images: ["https://alchemeowww.com/images/alchemeowww-logo.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen md:snap-y md:snap-mandatory overflow-y-scroll scrollbar-hide">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />
        <meta name="theme-color" content="#E4DDD3" />
        <link rel="stylesheet" href="/css/material-icon.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&family=Rye&family=Lato:wght@400;700&family=Play:wght@400;700&family=Tangerine:wght@400;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Alchemeowww",
          "alternateName": ["Alchemeow", "Alchemeoww"],
          "description": "Random Alchemist who creates fancy little labbish",
          "url": "https://alchemeowww.com/",
          "image": "https://alchemeowww.com/images/alchemeowww-logo.png",
          "sameAs": [
            "https://alchemeowww.com/index.html",
            "https://www.instagram.com/alchemeowww/"
          ],
          "knowsAbout": [
            "Art",
            "Board Games",
            "Interactive Design",
            "Merchandise",
            "Alchemist"
          ]
        })}
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} w-full bg-cream relative texture min-w-[360px] flex flex-col grow`}
      >
        {children}
      </body>
    </html>
  );
}
