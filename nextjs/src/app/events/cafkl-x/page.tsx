import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const artworks = [
  { src: '/images/products/sticker-sheets.png', label: 'Sticker Sheets' },
  { src: '/images/products/keychain.png', label: 'Acrylic Keychain' },
  { src: '/images/products/cardholder.webp', label: 'Card Holder' },
  { src: '/images/products/nfc.png', label: 'NFC Interactive Card' },
];

export default function CafKlXPage() {
  return (
    <>
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

              {/* Location */}
              <div className="rounded-2xl border border-brown/10 bg-white/60 p-6 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-light-brown flex items-center justify-center">
                  <span className="material-symbols-outlined text-dark-brown" style={{ fontSize: '20px' }}>location_on</span>
                </div>
                <div>
                  <p className="font-play text-xs uppercase tracking-widest text-brown/50 mb-1">Location</p>
                  <p className="font-rye text-dark-brown text-lg leading-snug">Hextar World<br />Empire City</p>
                  <p className="font-play text-xs text-brown/50 mt-1">Kuala Lumpur</p>
                </div>
              </div>
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {artworks.map((art) => (
                <div key={art.label} className="group rounded-2xl border border-brown/10 bg-white/60 overflow-hidden">
                  <div className="aspect-square overflow-hidden bg-cream flex items-center justify-center p-4">
                    <Image
                      src={art.src}
                      alt={art.label}
                      width={300}
                      height={300}
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
