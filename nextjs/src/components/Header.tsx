'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full top-0 z-10 h-0">
      <div className="px-4 flex justify-center py-5">
        <header className="flex w-full max-w-[1536px] items-center justify-between whitespace-nowrap border-b border-solid md:border-none border-secondary/10 px-4 md:px-10 py-3">
          <div className="flex items-center gap-4 text-primary">
            <h2 className="hidden font-rye text-secondary dark:text-background-light text-lg font-bold leading-tight tracking-[-0.015em] font-display">
              Alchemeowww
            </h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-primary text-sm font-bold leading-normal" href="/">Home</a>
              <a className="text-secondary text-sm font-medium leading-normal hover:text-primary transition-colors" href="/nfc">NFC</a>
              <a className="text-secondary text-sm font-medium leading-normal hover:text-primary transition-colors" href="/events">Events</a>
              <a className="text-secondary dark:text-background-light text-sm font-medium leading-normal hover:text-primary transition-colors" href="/about">About</a>
            </div>
            <a href="#contact" className="hidden flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <span>Let's Talk</span>
            </a>
          </div>
          {/* Mobile Menu Icon */}
          <div id="menu-open" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <span className="material-symbols-outlined text-secondary dark:text-background-light">menu</span>
          </div>
          <div id="mobile-menu" className={`fixed inset-0 bg-cream z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex justify-end p-6">
              <button id="menu-close" className="text-brown focus:outline-none" onClick={() => setIsMenuOpen(false)}>
                <span className="material-symbols-outlined text-secondary dark:text-background-light">close</span>
              </button>
            </div>
            <div className="flex flex-col items-center justify-start gap-8 h-full">
              <a href="/" className="font-rye text-3xl text-dark-brown">Home</a>
              <a href="/nfc" className="font-rye text-3xl text-dark-brown">NFC</a>
              <a href="/events" className="font-rye text-3xl text-dark-brown">Events</a>
              <a href="/about" className="font-rye text-3xl text-dark-brown">About</a>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}