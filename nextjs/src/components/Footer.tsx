'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Footer() {
  const [year, setYear] = useState(2023);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-brown text-white/80" id="contact">
      <div className="lg:container lg:mx-auto px-8 py-10 flex flex-col md:flex-row gap-8 md:gap-0 items-start justify-between">
        {/* Brand block */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/images/alchemeowww-logo.webp"
              alt="Alchemeowww Logo"
              width={28}
              height={28}
              className="h-7 w-auto"
            />
            <span className="font-rye text-white text-lg">Alchemeowww</span>
          </div>
          <p className="font-play text-xs text-white/50 max-w-[200px] leading-relaxed">
            Random Alchemist who always make fancy lil labbish.
          </p>
          <p className="font-play text-xs tracking-widest uppercase text-white/30">
            Est. 2023 · Tabletop · Collectibles · NFC
          </p>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-2">
          <span className="font-play text-xs tracking-widest uppercase text-white/30 mb-1">Navigate</span>
          {[
            { label: 'Home', href: '/' },
            { label: 'NFC', href: '/nfc' },
            { label: 'Mist;y Forest', href: '/mist;y-forest' },
            { label: 'Events', href: '/events' },
            { label: 'About', href: '/about' },
          ].map(link => (
            <a key={link.href} href={link.href} className="font-play text-sm text-white/60 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        {/* Social / contact block */}
        <div className="flex flex-col gap-3">
          <span className="font-play text-xs tracking-widest uppercase text-white/30 mb-1">Find Us</span>
          <a
            href="https://www.instagram.com/alchemeowww"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-play text-sm text-white/60 hover:text-white transition-colors"
          >
            {/* <i className="fa-brands fa-instagram text-base" /> */}
            @instagram.com/alchemeowww
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="font-play text-xs text-white/30">
          &copy; {year} Alchemist Cat Studio (JM1041071-T). All Rights Reserved.
        </p>
        <p className="font-play text-xs text-white/20">
          Made with ✦ in Malaysia
        </p>
      </div>
    </footer>
  );
}