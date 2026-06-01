import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import BoothLocationAnimation from '@/components/BoothLocationAnimation';

export const metadata: Metadata = {
  title: 'Comic Art Festival KL X - Alchemeowww Events',
  description:
    'Visit Alchemeowww at Comic Art Festival KL X on 13-14 June 2026 at Hextar World, Empire City. Explore exclusive stickers, keychains, NFC cards, and new merchandise drops.',
  keywords:
    'Comic Art Festival KL X, CAFKL X, Alchemeowww, Kuala Lumpur art market, Hextar World Empire City, artist alley Malaysia, sticker sheets, acrylic keychain, NFC card',
  alternates: {
    canonical: 'https://alchemeowww.com/events/cafkl-x',
  },
  openGraph: {
    type: 'website',
    url: 'https://alchemeowww.com/events/cafkl-x',
    title: 'Comic Art Festival KL X - Alchemeowww Events',
    description:
      'Find Alchemeowww at Comic Art Festival KL X (13-14 Jun 2026) at Hextar World Empire City, Kuala Lumpur.',
    images: ['https://alchemeowww.com/images/events/booths/CAFKLX.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comic Art Festival KL X - Alchemeowww Events',
    description:
      'Find Alchemeowww at Comic Art Festival KL X (13-14 Jun 2026) at Hextar World Empire City, Kuala Lumpur.',
    images: ['https://alchemeowww.com/images/events/booths/CAFKLX.webp'],
  },
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Comic Art Festival KL X',
  description:
    'Alchemeowww booth at Comic Art Festival KL X featuring stickers, acrylic keychains, card holders, and NFC interactive cards.',
  startDate: '2026-06-13T10:00:00+08:00',
  endDate: '2026-06-14T19:00:00+08:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: ['https://alchemeowww.com/images/events/booths/CAFKLX.webp'],
  url: 'https://alchemeowww.com/events/cafkl-x',
  location: {
    '@type': 'Place',
    name: 'Hextar World Empire City',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kuala Lumpur',
      addressCountry: 'MY',
    },
  },
  organizer: {
    '@type': 'Person',
    name: 'Alchemeowww',
    url: 'https://alchemeowww.com',
  },
};

const artworks = [
  { src: '/images/products/sticker.webp', label: 'Sticker Sheets' },
  { src: '/images/products/interactive-keychain.webp', label: 'Acrylic Keychain' },
  { src: '/images/products/interactive-standee-01.webp', label: 'Acrylic Standee' },
  { src: '/images/products/magnet.webp', label: 'Acrylic Magnet' },
  { src: '/images/events/af-plus/MIST_Y FOREST/Wooden Cardholder with light.jpg', label: 'Card Holder' },
  { src: '/images/products/nfc.webp', label: 'NFC Interactive Card' },
];

export default function CafKlXPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <Header activePage="events" />

      <div className="flex flex-col bg-cream mt-14">

        {/* ── Hero Band ── */}
        <div className="relative overflow-hidden bg-light-brown">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_30%_50%,var(--color-primary)/8%,transparent_70%)]" />
          <div className="lg:container lg:mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Text block */}
            <div className="flex flex-col gap-5 md:w-2/3">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-brown/30" />
                <span className="font-play text-xs tracking-widest uppercase text-brown/50">✦ Upcoming Event ✦</span>
              </div>
              <h1 className="font-rye text-4xl md:text-5xl text-dark-brown leading-tight">
                Comic Art<br />Festival KL X
              </h1>
              <p className="font-play text-brown/70 text-base leading-relaxed max-w-md">
                Alchemeowww is heading to CAFKL X — one of Malaysia's most beloved art markets. Come say hi, browse the booth, and take home something special.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://maps.app.goo.gl/axRC5Paq6bZEL6x1A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4F321E] hover:bg-accent text-cream rounded-full font-play text-sm transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>map</span>
                  Get Directions
                </a>
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-brown/30 hover:bg-brown/10 text-brown rounded-full font-play text-sm transition-colors"
                >
                  ← All Events
                </Link>
              </div>
            </div>

            {/* Booth image */}
            <div className="md:w-1/3 w-full">
              <div className="rounded-2xl overflow-hidden border border-brown/10 shadow-lg">
                <Image
                  src="/images/events/booths/CAFKLX.webp"
                  alt="CAFKL X booth preview"
                  width={400}
                  height={400}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Event Details ── */}
        <div className="lg:container lg:mx-auto px-8 py-14">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-brown/15" />
              <span className="font-rye text-brown text-sm tracking-widest whitespace-nowrap">✦ Event Details ✦</span>
              <div className="flex-1 h-px bg-brown/15" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Location */}
              <div className="rounded-2xl border border-brown/10 bg-white/60 p-6 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-light-brown flex items-center justify-center">
                  <span className="material-symbols-outlined text-dark-brown" style={{ fontSize: '20px' }}>location_on</span>
                </div>
                <div>
                  <p className="font-play text-xs uppercase tracking-widest text-brown/50 mb-1">Location</p>
                  <p className="font-rye text-dark-brown text-lg leading-snug">Hextar World Empire City<br /><span className='text-accent text-2xl'>ROW C 17-18</span></p>
                  <p className="font-play text-xs text-brown/50 mt-1">Kuala Lumpur</p>
                </div>
              </div>
              
              {/* Date */}
              <div className="rounded-2xl border border-brown/10 bg-white/60 p-6 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-light-brown flex items-center justify-center">
                  <span className="material-symbols-outlined text-dark-brown" style={{ fontSize: '20px' }}>calendar_month</span>
                </div>
                <div>
                  <p className="font-play text-xs uppercase tracking-widest text-brown/50 mb-1">Date</p>
                  <p className="font-rye text-dark-brown text-lg">13 – 14 Jun 2026</p>
                </div>
              </div>

              {/* Time */}
              <div className="rounded-2xl border border-brown/10 bg-white/60 p-6 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-light-brown flex items-center justify-center">
                  <span className="material-symbols-outlined text-dark-brown" style={{ fontSize: '20px' }}>schedule</span>
                </div>
                <div>
                  <p className="font-play text-xs uppercase tracking-widest text-brown/50 mb-1">Time</p>
                  <p className="font-rye text-dark-brown text-lg">10am – 7pm</p>
                  <p className="font-play text-xs text-brown/50 mt-1">Both days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Booth Location ── */}
        <div className="lg:container lg:mx-auto px-8 py-14">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-3 text-center w-full">
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px bg-brown/20" />
                <span className="font-rye text-brown text-sm tracking-widest whitespace-nowrap">✦ Find Us Here ✦</span>
                <div className="flex-1 h-px bg-brown/20" />
              </div>
              <p className="font-play text-brown/60 text-sm max-w-md">
                Our booth at <span className="text-accent text-xl">Row C, Booth 17-18</span> — Near to the entry A! Here's a handy map to help you find us once you're at the venue. We can't wait to see you there!
              </p>
            </div>
            <div className="relative md:h-auto rounded-2xl overflow-hidden border border-brown/10 shadow-md">
              <Image
                src="/images/events/cafkl-x/booth-location.webp"
                alt="Alchemeowww booth location map at CAFKL X"
                width={1200}
                height={800}
                className="h-full w-full object-contain origin-bottom-right scale-[1.55] sm:scale-[1.35] md:h-auto md:origin-center md:scale-100"
              />
              <BoothLocationAnimation className="origin-bottom-right scale-[1.55] sm:scale-[1.35] md:origin-center md:scale-100" />
            </div>
          </div>
        </div>

        {/* ── Artwork Preview ── */}
        <div className="bg-light-brown py-14 px-8">
          <div className="lg:container lg:mx-auto flex flex-col gap-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex items-center gap-3 w-full max-w-xs">
                <div className="flex-1 h-px bg-brown/20" />
                <span className="font-rye text-brown text-sm tracking-widest whitespace-nowrap">✦ At the Booth ✦</span>
                <div className="flex-1 h-px bg-brown/20" />
              </div>
              <p className="font-play text-brown/60 text-sm max-w-md">
                Here's a taste of what you'll find at the Alchemeowww booth — more to be revealed closer to the event!
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center">
              {artworks.map((art) => (
                <div
                  key={art.label}
                  className="group w-[calc((100%-1rem)/2)] lg:w-[calc((100%-4rem)/4)] rounded-2xl border border-brown/10 bg-white/60 overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden bg-cream flex items-center justify-center">
                    <Image
                      src={art.src}
                      alt={art.label}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-4 py-3 bg-linear-to-b from-transparent to-light-brown/60">
                    <p className="font-play text-sm text-dark-brown">{art.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── More Coming Soon ── */}
        <div className="lg:container lg:mx-auto px-8 py-14">
          <div className="rounded-2xl border border-brown/10 bg-white/60 p-10 flex flex-col items-center text-center gap-5">
            <span className="text-3xl">✦</span>
            <h2 className="font-rye text-2xl md:text-3xl text-dark-brown">More to Come</h2>
            <p className="font-play text-brown/70 text-base leading-relaxed max-w-lg">
              Exclusive prints, new merchandise, and surprise reveals are still in the works. Follow Alchemeowww on Instagram to stay updated on everything dropping at CAFKL X.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://www.instagram.com/alchemeowww"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4F321E] hover:bg-accent text-cream rounded-full font-play text-sm transition-colors"
              >
                <i className="fa-brands fa-instagram" />
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}
