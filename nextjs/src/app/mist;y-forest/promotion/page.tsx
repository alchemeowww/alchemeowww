'use client';

import Link from 'next/link';

const BASE = '/images/mistiy-forest/images';

const characters = [
  {
    key: 'koro',
    name: 'Koro',
    title: 'Time Alchemist',
    art: `${BASE}/characters/koro/Art1.png`,
    banner: `${BASE}/characters/koro/character_banner.png`,
    char: `${BASE}/characters/koro/koro.png`,
  },
  {
    key: 'sese',
    name: 'Sese',
    title: 'Forest Botanist',
    art: `${BASE}/characters/sese/Art1.png`,
    banner: `${BASE}/characters/sese/character_banner.png`,
    char: `${BASE}/characters/sese/sese.png`,
  },
  {
    key: 'rye',
    name: 'Rye',
    title: 'Apprentice Knight',
    art: `${BASE}/characters/rye/Art1.png`,
    banner: `${BASE}/characters/rye/character_banner.png`,
    char: `${BASE}/characters/rye/rye.png`,
  },
];

export default function MistyForestPromotion() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tangerine:wght@400;700&family=Play:wght@400;700&family=Young+Serif&display=swap');
        .font-play  { font-family: "Play", sans-serif; }
        .font-young { font-family: "Young Serif", serif; }
        .font-tang  { font-family: "Tangerine", cursive; }

        /* ── A4 wrapper ── */
        .a4-page {
          width: 210mm;
          max-height: 297mm;
          margin: 2rem auto;
          background: #fdf6ec;
          box-shadow: 0 8px 40px rgba(0,0,0,0.18);
          overflow: hidden;
          position: relative;
        }
        @media print {
          body { margin: 0; }
          .a4-page { margin: 0; box-shadow: none; }
        }

        .float-a, .float-b, .float-c { /* no animation for print */ }
        .fog-anim { /* no animation for print */ }
      `}</style>

      {/* ── outer scroll wrapper so A4 centres on screen ── */}
      <div style={{ background: '#e8ddd0', minHeight: '100vh', padding: '0 0 3rem' }}>
        <div className="a4-page">

          {/* ════════════════════════════════════════
              BOARD GAME SECTION
          ════════════════════════════════════════ */}
          <div className="px-10 py-6" style={{ background: '#fdf6ec' }}>
            {/* section title */}
            <div className="flex items-center gap-3 mb-4 relative">
              <div className="w-1 rounded-full self-stretch" style={{ background: '#a8783a' }} />
              <div>
                <p className="font-play text-[#a8783a] uppercase tracking-widest" style={{ fontSize: '3mm' }}>Discover</p>
                <h2 className="font-young text-[#5c3a1e] leading-none" style={{ fontSize: '9mm' }}>Board Game</h2>
              </div>
              <div className="absolute top-0 right-0 flex justify-center items-center" style={{ background: '#fff8ee' }}>
                <img src="/images/alchemeowww-logo.webp" alt="Alchemeowww Logo" style={{ height: '30mm', width: 'auto', objectFit: 'contain' }} />
              </div>
            </div>

            <div className="flex gap-5 items-start">
              {/* instruction image */}
              <div className="rounded-xl overflow-hidden shadow-lg border-2 border-[#D0B68F]" style={{ width: '55mm', flexShrink: 0 }}>
                <div className="relative bg-white/80 border border-brown/10 overflow-hidden h-46 hover:shadow-md transition-shadow">
                  <div className="absolute inset-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-map.png')" }} />
                  <div className="absolute inset-0 -top-4 bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-standee.png')" }} />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-linear-to-t from-white/90 to-transparent">
                    <p className="font-rye text-base text-dark-brown">Mist;y Forest</p>
                    <p className="font-play text-xs text-brown/60">Board Game</p>
                  </div>
                </div>
              </div>

              {/* cards + copy */}
              <div className="flex flex-col gap-4 flex-1">
                <p className="font-play text-[#5c3a1e] leading-relaxed w-90" style={{ fontSize: '3.5mm' }}>
                  Draw cards, cast alchemy spells, set traps and outsmart your friends to escape the enchanted forest first.
                </p>

                {/* card previews */}
                <div className="flex gap-4 items-end">
                  <div
                    className="float-a rounded-xl overflow-hidden shadow-md border border-[#D0B68F] h-full flex-stretch"
                    style={{ width: '55mm', background: '#D0B68F' }}
                  >
                    <img src={`${BASE}/MIST;Y FOREST.png`} alt="Card Front" className="w-full p-2 object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════
              WARM DIVIDER
          ════════════════════════════════════════ */}
          <div style={{ height: '2mm', background: 'linear-gradient(90deg, #fdf6ec, #D0B68F, #c4994a, #D0B68F, #fdf6ec)' }} />

          {/* ════════════════════════════════════════
              CHARACTERS SECTION
          ════════════════════════════════════════ */}
          <div className="px-10 py-6" style={{ background: '#fef9f2' }}>
            {/* section title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 rounded-full self-stretch" style={{ background: '#a8783a' }} />
              <div>
                <p className="font-play text-[#a8783a] uppercase tracking-widest" style={{ fontSize: '3mm' }}>Meet</p>
                <h2 className="font-young text-[#5c3a1e] leading-none" style={{ fontSize: '9mm' }}>Characters</h2>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {characters.map((c, i) => (
                <div
                  key={c.key}
                  className="relative rounded-2xl overflow-hidden shadow-md border border-[#D0B68F]/60 flex flex-col"
                  style={{ background: '#fff8ee' }}
                >
                  {/* banner */}
                  <div className="relative overflow-hidden" style={{ height: '60mm' }}>
                    <img
                      src={c.char}
                      alt={c.name}
                      className="w-full h-full object-cover object-bottom"
                    />
                  </div>
                  {/* label */}
                  <div className="absolute top-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-transparent to-white/90">
                    <p className="font-play text-[#a8783a] uppercase tracking-widest" style={{ fontSize: '2.5mm' }}>{c.title}</p>
                    <h3 className="font-young text-[#5c3a1e]" style={{ fontSize: '6mm' }}>{c.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════
              WARM DIVIDER
          ════════════════════════════════════════ */}
          <div style={{ height: '2mm', background: 'linear-gradient(90deg, #fdf6ec, #D0B68F, #c4994a, #D0B68F, #fdf6ec)' }} />

          {/* ════════════════════════════════════════
              ART PRINTS SECTION
          ════════════════════════════════════════ */}
          <div className="px-10 py-6" style={{ background: '#fdf6ec' }}>
            {/* section title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 rounded-full self-stretch" style={{ background: '#a8783a' }} />
              <div>
                <p className="font-play text-[#a8783a] uppercase tracking-widest" style={{ fontSize: '3mm' }}>Collect</p>
                <h2 className="font-young text-[#5c3a1e] leading-none" style={{ fontSize: '9mm' }}>Art Prints</h2>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {characters.map((c) => (
                <div
                  key={c.key}
                  className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#D0B68F] group"
                  style={{ background: '#fff8ee', height: '60mm' }}
                >
                  <img
                    src={c.art}
                    alt={`${c.name} Art`}
                    className="w-full object-cover object-bottom"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════
              FOOTER BAND
          ════════════════════════════════════════ */}
          <div
            className="relative flex items-center justify-between px-10 overflow-hidden"
            style={{ background: 'linear-gradient(90deg, #7a5230, #c4994a, #a8783a)', minHeight: '18mm' }}
          >
            <img
              src={`${BASE}/Miwusenlin.gif`} alt=""
              className="fog-anim absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            />
            <Link
              href="/mist;y-forest"
              className="font-play relative z-10 text-[#fff8ee] underline underline-offset-4"
              style={{ fontSize: '4mm' }}
            >
              https://alchemeowww.com
            </Link>
            <img src={`${BASE}/MIST;Y FOREST.png`} alt="MIST;Y FOREST" className="relative z-10 opacity-90" style={{ width: '28mm', filter: 'brightness(10)' }} />
            
            <div className="flex justify-center items-center gap-4">
              <p className="font-tang relative z-10 text-[#fff8ee]" style={{ fontSize: '7mm' }}>
                Step into the mist.
              </p>
              <img src="/images/web-qr.png" style={{ height: '15mm', width: 'auto', objectFit: 'contain' }} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
