'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const sparkles = [
  { top: '12%', left: '8%',  delay: '0s',    size: 'text-lg',  opacity: 'opacity-20' },
  { top: '25%', left: '15%', delay: '0.6s',  size: 'text-sm',  opacity: 'opacity-15' },
  { top: '60%', left: '5%',  delay: '1.2s',  size: 'text-xl',  opacity: 'opacity-10' },
  { top: '75%', left: '20%', delay: '0.3s',  size: 'text-xs',  opacity: 'opacity-20' },
  { top: '10%', left: '80%', delay: '0.9s',  size: 'text-xl',  opacity: 'opacity-15' },
  { top: '30%', left: '88%', delay: '0.2s',  size: 'text-sm',  opacity: 'opacity-10' },
  { top: '55%', left: '92%', delay: '1.5s',  size: 'text-lg',  opacity: 'opacity-20' },
  { top: '80%', left: '75%', delay: '0.7s',  size: 'text-xs',  opacity: 'opacity-15' },
  { top: '45%', left: '50%', delay: '1.8s',  size: 'text-xs',  opacity: 'opacity-10' },
];

export default function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="snap-start snap-always md:min-h-dvh h-dvh shrink-0 relative overflow-hidden">
      {/* Ambient radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,_var(--color-primary)/8%,_transparent_70%)]" />

      {/* Floating sparkles */}
      {sparkles.map((s, i) => (
        <span
          key={i}
          className={`pointer-events-none select-none absolute text-primary ${s.size} ${s.opacity} animate-pulse`}
          style={{ top: s.top, left: s.left, animationDelay: s.delay, animationDuration: '3s' }}
          aria-hidden="true"
        >✦</span>
      ))}

      <div className="lg:container lg:mx-auto px-4 py-8 h-full flex flex-col md:flex-row justify-center items-center gap-8 relative">
        {/* Logo with glow halo */}
        <div className="shrink-0 relative" data-aos="fade-up" data-aos-delay="300" data-aos-once="true">
          <div className="absolute inset-0 rounded-full bg-primary/15 blur-2xl scale-110 pointer-events-none" />
          <Image
            src="/images/alchemeowww-logo.webp"
            alt="Alchemeowww Logo"
            width={256}
            height={256}
            className="relative h-32 md:h-48 lg:h-64 w-auto"
            priority
          />
        </div>

        <div className="flex flex-col gap-6 justify-center items-center md:items-start">
          <h1 data-aos="fade-up" data-aos-delay="300" data-aos-once="true" className="font-rye text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary drop-shadow-md text-center md:text-left">
            Welcome to <span className="text-primary">Alchemeowww</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="400" data-aos-once="true" className="font-play text-lg md:text-2xl text-text-dark drop-shadow-md text-center md:text-left">
            Random Alchemist who always make fancy lil labbish
          </p>
          {/* Social proof micro-line */}
          <p data-aos="fade-up" data-aos-delay="500" data-aos-once="true" className="font-play text-xs tracking-widest uppercase text-secondary/40 text-center md:text-left">
            Est. 2023 &nbsp;·&nbsp; Tabletop &nbsp;·&nbsp; Collectibles &nbsp;·&nbsp; NFC
          </p>
        </div>

        {/* Upcoming event promo (desktop/tablet) */}
        {/* <div className={`absolute right-3 bottom-6 z-20 flex flex-row items-end transition-all duration-500 ${hasScrolled ? 'translate-x-[120%] opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}>
        <a
          href="/events/cafkl-x"
          className="rounded-full"
          aria-label="View upcoming Comic Art Festival KL X event"
        >
          <Image
            src="/images/mistiy-forest/images/characters/koro/koro.png"
            alt="Koro character"
            width={70}
            height={70}
            className="h-14 w-auto -scale-x-100 drop-shadow-md"
          />
        </a>
        <a
          href="/events/cafkl-x"
          className={`md:right-6 md:bottom-6 z-20 w-[230px] md:w-[280px] rounded-2xl border border-primary/20 bg-white/85 backdrop-blur-sm shadow-xl p-3 md:p-4 hover:-translate-y-1 hover:shadow-2xl`}
          aria-label="View upcoming Comic Art Festival KL X event"
        >
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Upcoming Event
          </span>

          <div className="mt-2 flex items-center gap-3">
            <div className="min-w-0">
              <p className="font-rye text-sm md:text-base text-secondary leading-tight">Comic Art Festival KL X</p>
              <p className="font-play text-[11px] md:text-xs text-text-dark/70 mt-1 leading-snug">
                Catch us at Hextar World, 13 - 14 Jun 2026. Tap to see booth location.
              </p>
            </div>
          </div>
        </a>
        </div> */}

        {/* Scroll cue */}
        <div className="absolute bottom-18 md:bottom-8 flex flex-col items-center gap-1 text-brown animate-bounce" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-delay="300" data-aos-once="true">
          <span className="font-play text-[10px] tracking-widest uppercase text-secondary/40 hidden md:block">Scroll</span>
          <a href="#projects" className="rounded-full bg-light-brown p-2 w-10 h-10 shadow-lg flex flex-col items-center">
            <div className="block md:hidden">
              <span className="material-symbols-outlined">swipe_down</span>
            </div>
            <div className="hidden md:block">
              <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}