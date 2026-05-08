'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Page = 'home' | 'nfc' | 'events' | 'about' | 'mist;y-forest' | 'projects';

export default function Header({ showLogo = true, activePage = 'home' }: { showLogo?: boolean, activePage?: Page }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>('misty');
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (projectsRef.current && !projectsRef.current.contains(e.target as Node)) {
        setIsProjectsOpen(false);
      }
    };
    if (isProjectsOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProjectsOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const linkClass = (page: Page) =>
    `font-play text-sm transition-colors ${activePage === page ? 'text-primary font-semibold' : 'text-dark-brown/70 hover:text-primary'}`;

  return (
    <div className={`font-play w-full ${showLogo ? 'sticky top-0' : ''} z-60 h-0`} ref={projectsRef}>
      <div className="flex justify-center">
        {/* ── Main bar ── */}
        <header className={`w-full ${showLogo ? 'bg-cream/45 backdrop-blur-lg border-b border-brown/10 shadow-sm' : ''}`}>
          <div className="lg:container lg:mx-auto px-4 md:px-8 flex items-center justify-between h-14 gap-8">

            {/* Logo */}
            {showLogo && (
              <a href="/" className="flex items-center gap-2 shrink-0">
                <Image
                  src="/images/alchemeowww-logo.webp"
                  alt="Alchemeowww Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                  priority
                />
                <span className="font-rye text-dark-brown text-base leading-none">Alchemeowww</span>
              </a>
            )}

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7 flex-1 justify-end">
              <a href="/" className={linkClass('home')}>Home</a>
              <a href="/nfc" className={linkClass('nfc')}>NFC</a>
              <button
                className={`${linkClass('projects')} flex items-center gap-0.5`}
                onClick={() => setIsProjectsOpen((p) => !p)}
              >
                Projects
                <span
                  className="material-symbols-outlined transition-transform duration-200"
                  style={{ fontSize: '16px', transform: isProjectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >expand_more</span>
              </button>
              <a href="/events" className={linkClass('events')}>Events</a>
              <a href="/about" className={linkClass('about')}>About</a>
            </nav>

            {/* Desktop CTA */}
            <a
              href="https://ig.me/m/alchemeowww" target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 bg-[#4F321E] hover:bg-accent text-cream rounded-full font-play text-sm transition-colors shrink-0"
            >
              Let&apos;s Talk
            </a>

            {/* Mobile hamburger */}
            <div className="md:hidden flex-1 justify-end items-center flex">
              <button
                className="text-dark-brown flex items-center"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── Projects dropdown (desktop) ── */}
        <div
          className={`hidden md:block absolute w-full top-14 bg-cream/45 backdrop-blur-lg border-b border-t border-brown/10 shadow-md transition-all duration-300 ease-in-out z-50 ${isProjectsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
        >
          <div className="lg:container lg:mx-auto px-8 py-6 flex items-stretch">
            {/* Project selector */}
            <div className="flex flex-col items-end w-1/5 gap-3 font-play text-sm pr-8 border-r border-brown/15">
              <button
                onClick={() => setSelectedProject('misty')}
                className={`text-left transition-colors ${selectedProject === 'misty' ? 'text-primary font-semibold' : 'text-dark-brown/50 hover:text-primary'}`}
              >
                Mist;y Forest
              </button>
              {/* <button
                onClick={() => setSelectedProject('meownogatari')}
                className={`text-left transition-colors ${selectedProject === 'meownogatari' ? 'text-primary font-semibold' : 'text-dark-brown/50 hover:text-primary'}`}
              >
                Le Meownogatari
              </button> */}
            </div>
            {/* Project card */}
            <div className="flex overflow-hidden pl-8">
              <div className={`w-64 h-46 transition-all duration-300 overflow-hidden ${selectedProject === 'misty' ? 'opacity-100 translate-x-0 max-w-xs' : 'opacity-0 translate-x-4 max-w-0'}`}>
                <a href="/mist;y-forest" onClick={() => setIsMenuOpen(false)}>
                  <div className="relative rounded-2xl bg-white/80 border border-brown/10 overflow-hidden h-46 hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-map.png')" }} />
                    <div className="absolute inset-0 -top-4 bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-standee.png')" }} />
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-linear-to-t from-white/90 to-transparent">
                      <p className="font-rye text-base text-dark-brown">Mist;y Forest</p>
                      <p className="font-play text-xs text-brown/60">Board Game</p>
                    </div>
                  </div>
                </a>
              </div>
              {/* <div className={`w-64 h-46 transition-all duration-300 overflow-hidden ${selectedProject === 'meownogatari' ? 'opacity-100 translate-x-0 max-w-xs' : 'opacity-0 translate-x-4 max-w-0'}`}>
                <a href="/meownogatari" onClick={() => setIsMenuOpen(false)}>
                  <div className="relative rounded-2xl bg-white/80 border border-brown/10 overflow-hidden h-46 hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-map.png')" }} />
                    <div className="absolute inset-0 -top-4 bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-standee.png')" }} />
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-linear-to-t from-white/90 to-transparent">
                      <p className="font-rye text-base text-dark-brown">Le Meownogatari</p>
                      <p className="font-play text-xs text-brown/60">Journey into the Mini Game</p>
                    </div>
                  </div>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        {/* Panel slides in from right */}
        <div className={`absolute top-0 right-0 h-full w-4/5 max-w-xs bg-cream shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-brown/10">
            <a href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Image src="/images/alchemeowww-logo.webp" alt="logo" width={28} height={28} className="h-7 w-auto" />
              <span className="font-rye text-dark-brown text-sm">Alchemeowww</span>
            </a>
            <div className="flex-1 justify-end items-center flex">
              <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="flex items-center">
                <span className="material-symbols-outlined text-dark-brown/60">close</span>
              </button>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-6 py-6 grow">
            {([
              { href: '/', label: 'Home', page: 'home' as Page },
              { href: '/nfc', label: 'NFC', page: 'nfc' as Page },
              { href: '/events', label: 'Events', page: 'events' as Page },
              { href: '/about', label: 'About', page: 'about' as Page },
            ]).map(({ href, label, page }) => (
              <a
                key={page}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`font-play text-lg py-2 border-b border-brown/8 transition-colors ${activePage === page ? 'text-primary font-semibold' : 'text-dark-brown/70'}`}
              >
                {label}
              </a>
            ))}

            {/* Projects accordion */}
            <div className="border-b border-brown/8">
              <button
                onClick={() => setIsProjectsOpen((p) => !p)}
                className={`w-full flex items-center justify-between font-play text-lg py-2 transition-colors ${activePage === 'projects' ? 'text-primary font-semibold' : 'text-dark-brown/70'}`}
              >
                Projects
                <span className="material-symbols-outlined transition-transform duration-200" style={{ fontSize: '20px', transform: isProjectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isProjectsOpen ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pb-2">
                  {/* Project selector tabs */}
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setSelectedProject('misty')}
                      className={`font-play text-xs px-3 py-1 rounded-full border transition-colors ${selectedProject === 'misty' ? 'bg-[#4F321E] text-cream border-transparent' : 'border-brown/20 text-dark-brown/60 hover:text-primary'}`}
                    >Mist;y Forest</button>
                    {/* <button
                      onClick={() => setSelectedProject('meownogatari')}
                      className={`font-play text-xs px-3 py-1 rounded-full border transition-colors ${selectedProject === 'meownogatari' ? 'bg-[#4F321E] text-cream border-transparent' : 'border-brown/20 text-dark-brown/60 hover:text-primary'}`}
                    >Le Meownogatari</button> */}
                  </div>
                  <div className="flex">
                  {/* Misty Forest card */}
                  <div className={`w-64 h-36 transition-all duration-300 overflow-hidden ${selectedProject === 'misty' ? 'opacity-100 translate-x-0 max-w-xs' : 'opacity-0 translate-x-4 max-w-0'}`}>
                    <a href="/mist;y-forest" onClick={() => setIsMenuOpen(false)}>
                      <div className="relative rounded-2xl bg-white/80 overflow-hidden h-36 hover:shadow-md transition-shadow">
                        <div className="absolute inset-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-map.png')" }} />
                        <div className="absolute inset-0 -top-4 bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-standee.png')" }} />
                        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-linear-to-t from-white/90 to-transparent">
                          <p className="font-rye text-base text-dark-brown">Mist;y Forest</p>
                          <p className="font-play text-xs text-brown/60">Board Game</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  {/* Le Meownogatari card */}
                  {/* <div className={`w-64 h-36 transition-all duration-300 overflow-hidden ${selectedProject === 'meownogatari' ? 'opacity-100 translate-x-0 max-w-xs' : 'opacity-0 translate-x-4 max-w-0'}`}>
                    <a href="/meownogatari" onClick={() => setIsMenuOpen(false)}>
                      <div className="relative rounded-2xl bg-white/80 overflow-hidden h-36 hover:shadow-md transition-shadow">
                        <div className="absolute inset-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-map.png')" }} />
                        <div className="absolute inset-0 -top-4 bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-standee.png')" }} />
                        <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-linear-to-t from-white/90 to-transparent">
                          <p className="font-rye text-base text-dark-brown">Le Meownogatari</p>
                          <p className="font-play text-xs text-brown/60">Mini Game</p>
                        </div>
                      </div>
                    </a>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Bottom CTA */}
          <div className="px-6 py-6 border-t border-brown/10">
            <a
              href="https://ig.me/m/alchemeowww" target="_blank" rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#4F321E] hover:bg-accent text-cream rounded-full font-play text-sm transition-colors"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
