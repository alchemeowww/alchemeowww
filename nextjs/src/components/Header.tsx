'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Page = 'home' | 'nfc' | 'events' | 'about' | 'mist;y-forest' | 'projects';

export default function Header({ showLogo = true, activePage = 'home' }: { showLogo?: boolean, activePage?: Page  }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>('misty');
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

  const activeClass = 'text-primary text-sm font-bold leading-normal';
  const inactiveClass = 'text-secondary text-sm font-medium leading-normal hover:text-primary transition-colors';

  return (
    <div className="w-full top-0 z-60 h-0" ref={projectsRef}>
      <div className="px-4 flex justify-center relative">
        <header className={`z-10 flex w-full max-w-8xl min-h-14 items-center justify-between whitespace-nowrap px-4 md:px-10 py-8 ${showLogo ? 'border-b border-solid md:border-none border-secondary/10' : ''}`}>
          <div className="flex items-center gap-4 text-primary">
            {showLogo && (
              <h2 className="flex flex-row gap-2 items-center font-rye text-primary dark:text-background-light text-lg font-bold leading-tight tracking-[-0.015em] font-display">
                <Image
                  src="/images/alchemeowww-logo.webp"
                  alt="Alchemeowww Logo"
                  width={16}
                  height={16}
                  className="h-8 w-auto"
                  priority
                />Alchemeowww
              </h2>
            )}
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9 font-rye text-3xl">
              <a className={activePage === 'home' ? activeClass : inactiveClass} href="/">Home</a>
              <a className={activePage === 'nfc' ? activeClass : inactiveClass} href="/nfc">NFC</a>
              <button
                className={`${activePage === 'projects' ? activeClass : inactiveClass} flex items-center gap-1`}
                onClick={() => setIsProjectsOpen((p) => !p)}
              >
                Projects
                <span className="material-symbols-outlined transition-transform duration-200" style={{ fontSize: '16px', transform: isProjectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
              </button>
              <a className={activePage === 'events' ? activeClass : inactiveClass} href="/events">Events</a>
              <a className={activePage === 'about' ? activeClass : inactiveClass} href="/about">About</a>
            </div>
            <a href="#contact" className="hidden flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <span>Let's Talk</span>
            </a>
          </div>
          {/* Mobile Menu Icon */}
          <div id="menu-open" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <span className="material-symbols-outlined text-secondary">menu</span>
          </div>
          <div id="mobile-menu" className={`fixed inset-0 bg-cream z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-end p-6">
              <button id="menu-close" className="text-brown focus:outline-none" onClick={() => setIsMenuOpen(false)}>
                <span className="material-symbols-outlined text-secondary">close</span>
              </button>
            </div>
            <div className="flex flex-col items-end justify-start gap-8 h-full px-6 font-rye text-3xl text-dark-brown">
              <a href="/" className={`${activePage === 'home' ? 'text-primary' : ''}`}>Home</a>
              <a href="/nfc" className={`${activePage === 'nfc' ? 'text-primary' : ''}`}>NFC</a>
              {/* Projects accordion for mobile */}
              <div className="flex flex-col items-end w-full">
                <button
                  className={`${activePage === 'projects' ? 'text-primary' : ''} flex items-center gap-1`}
                  onClick={() => setIsProjectsOpen((p) => !p)}
                >
                  Projects
                  <span className="material-symbols-outlined transition-transform duration-200" style={{ fontSize: '30px', transform: isProjectsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out w-full ${isProjectsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="mt-3 flex flex-col items-end gap-4 text-2xl pr-4 border-r-2 border-primary/30">
                    <button
                      className={`transition-colors ${selectedProject === 'misty' ? 'text-primary' : 'text-dark-brown/60'}`}
                      onClick={() => setSelectedProject('misty')}
                    >Mist;y Forest</button>
                    {/* <button
                      className={`transition-colors ${selectedProject === 'meownogatari' ? 'text-primary' : 'text-dark-brown/60'}`}
                      onClick={() => setSelectedProject('meownogatari')}
                    >Le Meownogatari</button> */}
                    <div className="flex overflow-x-auto w-full justify-end [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 ${selectedProject === 'misty' ? 'max-w-xs opacity-100 translate-x-0' : 'max-w-0 opacity-0 translate-x-8'}`}>
                        <a href="/mist;y-forest" onClick={() => setIsMenuOpen(false)}>
                          <div className="overflow-hidden w-40 h-40 relative rounded-xl bg-white">
                            <div className="absolute w-full h-full top-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-map.png')" }}></div>
                            <div className="absolute w-full h-full -top-4 bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-standee.png')" }}></div>
                            <div className="absolute bottom-2 px-3 flex flex-col gap-0.5">
                              <div className="font-rye text-sm text-brown">Board Game</div>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 ${selectedProject === 'meownogatari' ? 'max-w-xs opacity-100 translate-x-0' : 'max-w-0 opacity-0 translate-x-8'}`}>
                        <a href="/le-meownogatari" onClick={() => setIsMenuOpen(false)}>
                          <div className="overflow-hidden w-40 h-40 relative rounded-xl bg-white">
                            <div className="absolute w-full h-full top-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-map.png')" }}></div>
                            <div className="absolute w-full h-full -top-4 bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-standee.png')" }}></div>
                            <div className="absolute bottom-2 px-3 flex flex-col gap-0.5">
                              <div className="font-rye text-sm text-brown">Mini Game</div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a href="/events" className={`${activePage === 'events' ? 'text-primary' : ''}`}>Events</a>
              <a href="/about" className={`${activePage === 'about' ? 'text-primary' : ''}`}>About</a>
            </div>
          </div>
        </header>
        {/* Projects full-width accordion */}
        <div className={`hidden md:block z-5 w-full absolute insert-0 pt-21 backdrop-blur-lg md:shadow-md
            transform transition-transform duration-300 ease-in-out ${isProjectsOpen ? 'translate-y-0' : '-translate-y-full'}`} ref={projectsRef}>
          <div className="max-w-4/5 mx-auto px-10 py-6 gap-8 flex flex-row items-stretch">
            <div className="selection flex flex-col gap-4 font-rye text-dark-brown/60 transition-colors text-lg">
              <a
                href="#"
                className={`hover:text-primary transition-colors ${selectedProject === 'misty' ? 'text-primary font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); setSelectedProject((p) => 'misty'); }}
              >Mist;y Forest</a>
              {/* <a
                href="#"
                className={`hover:text-primary transition-colors ${selectedProject === 'meownogatari' ? 'text-primary font-bold' : ''}`}
                onClick={(e) => { e.preventDefault(); setSelectedProject((p) => 'meownogatari'); }}
              >Le Meownogatari</a> */}
            </div>
            <div className="flex flex-row overflow-hidden">
              {/* Mist;y Forest */}
              <div className={`transform transition-all duration-300 ease-in-out overflow-hidden ${selectedProject === 'misty' ? 'max-w-xs opacity-100 translate-x-0' : 'max-w-0 opacity-0 translate-x-8'}`}>
                <div className="flex flex-row gap-8 overflow-x-auto">
                  <a href="/mist;y-forest" onClick={() => setIsProjectsOpen(false)}>
                    <div className="overflow-hidden w-70 h-70 relative rounded-2xl bg-white">
                      <div className="absolute w-full h-full top-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-map.png')" }}></div>
                      <div className="absolute w-full h-full -top-8 bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-standee.png')" }}></div>
                      <div className="absolute bottom-4 px-5 flex flex-col gap-1">
                        <div className="font-rye text-2xl text-brown">Board Game</div>
                        <div className="text-xs">Journey into the fog-veiled MIST;Y FOREST</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              {/* Le Meownogatari */}
              <div className={`transform transition-all duration-300 ease-in-out overflow-hidden ${selectedProject === 'meownogatari' ? 'max-w-xs opacity-100 translate-x-0' : 'max-w-0 opacity-0 translate-x-8'}`}>
                <div className="flex flex-row gap-8 overflow-x-auto">
                  <a href="/le-meownogatari" onClick={() => setIsProjectsOpen(false)}>
                    <div className="overflow-hidden w-70 h-70 relative rounded-2xl bg-white">
                      <div className="absolute w-full h-full top-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-map.png')" }}></div>
                      <div className="absolute w-full h-full -top-8 bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-standee.png')" }}></div>
                      <div className="absolute bottom-4 px-5 flex flex-col gap-1">
                        <div className="font-rye text-2xl text-brown">Mini Game</div>
                        <div className="text-xs">LE MEOWNOGATARI the world of mini games</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}