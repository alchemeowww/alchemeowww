'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const events = [
  {
    date: '28 - 30 Aug 2026',
    title: 'Animangaki 2026',
    location: 'The Mines - MIECC',
    type: 'Anime Convention',
    image: '/images/events/booths/amg2026.webp',
  },
  {
    date: '13 - 14 Jun 2026',
    title: 'Comic Art Festival KL X',
    location: 'Hextar World Empire City',
    type: 'Art Market',
    image: '/images/events/booths/CAFKLX.webp',
  },
  {
    date: '25 - 26 Apr 2026',
    title: 'Cosmic Spring 2026',
    location: 'Lalaport Bukit Bintang City Centre, Kuala Lumpur',
    type: 'Anime Convention',
    image: '/images/events/booths/2604-CosmicSpring.webp',
  },
  {
    date: 'Dec 2025',
    title: 'Comic Fiesta 2025',
    location: 'Kuala Lumpur Convention Center',
    type: 'Anime Convention',
    image: '/images/events/booths/2512-CF.webp',
  },
  {
    date: 'Sep 2025',
    title: 'Cosmic 2025',
    location: 'Sunway Pyramid Convention Center',
    type: 'Anime Convention',
    image: '/images/events/booths/202509-Cosmic.webp',
  },
  {
    date: 'Aug 2025',
    title: 'Animangaki 2025',
    location: 'The Mines - MIECC',
    type: 'Anime Convention',
    image: '/images/events/booths/202508-AMG.webp',
  },
  {
    date: 'Jul 2025',
    title: 'Design Fiesta 2025',
    location: 'Tokyo Big Sight, Japan',
    type: 'Expo',
    image: '/images/events/booths/2507-DesignFesta.webp',
  },
  {
    date: 'May 2025',
    title: 'Comic Art Festival KL 9',
    location: 'Fahrenheit88',
    type: 'Art Market',
    image: '/images/events/booths/2505-CAFKL9.webp',
  },
  {
    date: 'May 2025',
    title: 'CosWorld Festival 2025',
    location: 'Pavilion Bukit Jalil Exhibition Centre',
    type: 'Anime Convention',
    image: '/images/events/booths/2505-Cosworld2U.webp',
  },
  {
    date: 'Feb 2025',
    title: 'Nijigen Expo',
    location: 'The Mines - MIECC',
    type: 'Anime Convention',
    image: '/images/events/booths/2502-NijigenExpo.webp',
  },
];

const ITEMS_PER_PAGE = 6;

export default function Events() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const paginatedEvents = events.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header activePage="events" />

      <div className="relative flex grow w-full flex-col overflow-x-hidden mt-[95px]">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center py-12 px-4 sm:px-8 lg:px-40">
            <div className="layout-content-container flex flex-col w-full max-w-[1024px] flex-1 gap-8">

              {/* Header */}
              <div className="flex flex-col items-center text-center gap-2">
                <h2 className="font-rye text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-primary dark:text-[#cc6a3d]">
                  Upcoming Events &amp; Markets
                </h2>
                <p className="text-secondary dark:text-[#d0c0b8] text-base md:text-lg font-normal leading-relaxed max-w-2xl">
                  A curated collection of fairs, gallery shows, and pop-up events where my work has been featured.
                  Explore the journey through the years and upcoming opportunities.
                </p>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {paginatedEvents.map((event) => (
                  <article
                    key={event.title}
                    className="group flex flex-col h-full bg-white/30 dark:bg-card-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-primary/20 dark:border-[#3a2d28]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                      <img
                        src={event.image}
                        alt={`Event image for ${event.title}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 dark:bg-[#201612]/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                        <p className="text-primary font-bold text-xs uppercase tracking-wider">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 p-5 gap-3">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-bold text-[#1a120f] dark:text-white group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-secondary dark:text-[#a09088]">
                          <span className="material-symbols-outlined text-[18px]">location_on</span>
                          <span className="text-sm font-medium">{event.location}</span>
                        </div>
                      </div>
                      <div className="mt-auto pt-3 border-t border-gray-100 dark:border-[#3a2d28] flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase">
                          {event.type}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center p-4 mt-4">
                  <nav aria-label="Pagination" className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="group flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#3a2d28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-[#1a120f] dark:text-white group-hover:text-primary" style={{ fontSize: 20 }}>
                        chevron_left
                      </span>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={
                          page === currentPage
                            ? 'flex size-10 items-center justify-center text-sm font-bold leading-normal text-white rounded-full bg-primary shadow-md'
                            : 'flex size-10 items-center justify-center text-sm font-normal leading-normal text-secondary dark:text-[#d0c0b8] rounded-full hover:bg-gray-100 dark:hover:bg-[#3a2d28] transition-colors'
                        }
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="group flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-[#3a2d28] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-[#1a120f] dark:text-white group-hover:text-primary" style={{ fontSize: 20 }}>
                        chevron_right
                      </span>
                    </button>
                  </nav>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
