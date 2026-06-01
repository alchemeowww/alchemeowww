'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const events = [
  {
    date: '26 - 27 Sep 2026',
    title: 'Anime Fest+ 2026(Round 2) - TBC',
    location: 'World Trade Center, Kuala Lumpur',
    type: 'Anime Convention',
    image: "/images/events/booths/AF-tbc.webp",
    upcoming: true,
    link: '/events/af-plus-2026',
  },
  {
    date: '28 - 30 Aug 2026',
    title: 'Animangaki 2026',
    location: 'The Mines - MIECC',
    type: 'Anime Convention',
    image: '/images/events/booths/amg2026.webp',
    upcoming: true,
  },
  {
    date: '13 - 14 Jun 2026',
    title: 'Comic Art Festival KL X',
    location: 'Hextar World Empire City',
    type: 'Art Market',
    image: '/images/events/booths/CAFKLX.webp',
    upcoming: true,
    link: '/events/cafkl-x',
  },
  {
    date: '25 - 26 Apr 2026',
    title: 'Cosmic Spring 2026',
    location: 'Lalaport Bukit Bintang City Centre, Kuala Lumpur',
    type: 'Anime Convention',
    image: '/images/events/booths/2604-CosmicSpring.webp',
    upcoming: false,
  },
  {
    date: 'Dec 2025',
    title: 'Comic Fiesta 2025',
    location: 'Kuala Lumpur Convention Center',
    type: 'Anime Convention',
    image: '/images/events/booths/2512-CF.webp',
    upcoming: false,
  },
  {
    date: 'Sep 2025',
    title: 'Cosmic 2025',
    location: 'Sunway Pyramid Convention Center',
    type: 'Anime Convention',
    image: '/images/events/booths/202509-Cosmic.webp',
    upcoming: false,
  },
  {
    date: 'Aug 2025',
    title: 'Animangaki 2025',
    location: 'The Mines - MIECC',
    type: 'Anime Convention',
    image: '/images/events/booths/202508-AMG.webp',
    upcoming: false,
  },
  {
    date: 'Jul 2025',
    title: 'Design Fiesta 2025',
    location: 'Tokyo Big Sight, Japan',
    type: 'Expo',
    image: '/images/events/booths/2507-DesignFesta.webp',
    upcoming: false,
  },
  {
    date: 'May 2025',
    title: 'Comic Art Festival KL 9',
    location: 'Fahrenheit88',
    type: 'Art Market',
    image: '/images/events/booths/2505-CAFKL9.webp',
    upcoming: false,
  },
  {
    date: 'May 2025',
    title: 'CosWorld Festival 2025',
    location: 'Pavilion Bukit Jalil Exhibition Centre',
    type: 'Anime Convention',
    image: '/images/events/booths/2505-Cosworld2U.webp',
    upcoming: false,
  },
  {
    date: 'Feb 2025',
    title: 'Nijigen Expo',
    location: 'The Mines - MIECC',
    type: 'Anime Convention',
    image: '/images/events/booths/2502-NijigenExpo.webp',
    upcoming: false,
  },
];

const ITEMS_PER_PAGE = 6;

export default function Events() {
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldScrollOnPageChange = useRef(false);

  useEffect(() => {
    if (!shouldScrollOnPageChange.current) {
      return;
    }
    shouldScrollOnPageChange.current = false;
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentPage]);

  const changePage = (page: number) => {
    shouldScrollOnPageChange.current = true;
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const paginatedEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header activePage="events" />

      <div className="flex grow flex-col bg-cream mt-14">

        {/* Page header */}
        <div className="relative overflow-hidden bg-light-brown">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_70%_50%,var(--color-primary)/8%,transparent_70%)]" />
          <div className="lg:container lg:mx-auto px-8 py-16 flex flex-col gap-4">
            <span className="font-play text-xs tracking-widest uppercase text-brown/50">✦ Where to Find Us ✦</span>
            <h1 className="font-rye text-4xl md:text-5xl text-brown drop-shadow">
              Events &amp; Markets
            </h1>
            <p className="font-play text-base text-brown/70 leading-relaxed max-w-xl">
              A curated collection of conventions, art fairs, and pop-up markets where Alchemeowww has been featured. Explore the journey through the years and upcoming opportunities.
            </p>
          </div>
        </div>

        {/* Events grid */}
          <div ref={gridRef} className="lg:container lg:mx-auto px-8 py-12 flex flex-col gap-8">
          {/* Section label */}
          <div className="flex items-center gap-3">
            <span className="font-play text-xs tracking-widest uppercase text-secondary/40">✦ All Events ✦</span>
            <div className="h-px flex-1 bg-secondary/10" />
            <span className="font-play text-xs text-secondary/30">{events.length} events</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedEvents.map((event) => {
              const cardClass = `group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border
                  ${event.upcoming ? 'bg-white border-amber-200' : 'bg-white/60 border-brown/10'}`;
              const inner = (<>
                {/* Image */}
                <div className="relative aspect-4/3 overflow-hidden bg-light-brown">
                  <img
                    src={event.image}
                    alt={`${event.title} booth`}
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105`}
                  />
                  {/* Upcoming badge */}
                  {event.upcoming && (
                    <div className="absolute top-3 left-3 flex items-center gap-1 bg-amber-100 border border-amber-300 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold font-play shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Upcoming
                    </div>
                  )}
                  {/* Type tag */}
                  <div className="absolute top-3 right-3 flex items-center bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
                    <span className="font-play text-[10px] uppercase tracking-widest text-brown/70">{event.type}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2 p-4">
                  <h3 className={`font-rye text-lg leading-snug group-hover:text-primary transition-colors ${event.upcoming ? 'text-brown' : 'text-brown/60'}`}>
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-1 text-brown/60">
                    <span className="material-symbols-outlined text-[15px] mt-0.5 shrink-0">location_on</span>
                    <span className="font-play text-xs leading-relaxed">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-brown/50">
                    <span className="material-symbols-outlined text-[15px] shrink-0">calendar_month</span>
                    <span className="font-play text-xs">{event.date}</span>
                  </div>
                </div>
              </>);
              return event.link ? (
                <a key={event.title} href={event.link} className={cardClass}>
                  {inner}
                </a>
              ) : (
                <article key={event.title} className={cardClass}>
                  {inner}
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1 pt-4">
              <button
                onClick={() => changePage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-light-brown transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-brown" style={{ fontSize: 20 }}>chevron_left</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full font-play text-sm transition-colors
                    ${page === currentPage
                      ? 'bg-[#4F321E] text-white font-bold shadow-md'
                      : 'text-brown/60 hover:bg-light-brown'
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => changePage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-light-brown transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-brown" style={{ fontSize: 20 }}>chevron_right</span>
              </button>
            </div>
          )}
        </div>

      </div>

      <Footer />
    </>
  );
}

