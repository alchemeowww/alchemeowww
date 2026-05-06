'use client';

import Header from '@/components/Header';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Footer from "@/components/Footer";

type CharacterKey = 'Koro' | 'Sese' | 'Rye';

interface Character {
  name: string;
  description: string;
  image: string;
  charImage: string;
  info: string[];
}

const characters: Record<CharacterKey, Character> = {
  Koro: {
    name: 'Koro',
    description:
      "Koro is a <strong>time alchemist</strong> who lives in a small wooden house with grey rooftop.<br/><br/>He loves planting but is bad at planting, thus most of the plants are dead in his garden.<br/><br/>Koro is wearing an hourglass necklace which is inherited from his mom who was also a time alchemist. This hourglass has <strong>secret power</strong>.",
    image: '/images/mistiy-forest/images/characters/koro/Art1.png',
    charImage: '/images/mistiy-forest/images/characters/koro/koro.png',
    info: [
      'Name: Koro (Korokke)',
      'Species: Cat (Oyen)',
      'Eyes colour: Green',
      'Fav food: Corn',
      'Hobby: Study alchemy about time',
    ],
  },
  Sese: {
    name: 'Sese',
    description:
      "Sese is a <strong>forest botanist</strong> and has been exploring many different forests.<br/><br/>However, he always gets lost in the forest.<br/><br/>Sese is not a local person in MIST;Y FOREST, he came here to find the <strong>'Legendary Leaf'</strong>.<br/><br/>He believes that the leaf can fulfill his wish.",
    image: '/images/mistiy-forest/images/characters/sese/Art1.png',
    charImage: '/images/mistiy-forest/images/characters/sese/sese.png',
    info: [
      'Name: Sese (Sesame)',
      'Species: Cat (Tabby Siamese)',
      'Eyes colour: Blue',
      'Fav food: Tofu',
      'Hobby: Collect different kinds of leaves',
    ],
  },
  Rye: {
    name: 'Rye',
    description:
      "Rye is an <strong>apprentice knight</strong> from Kingdom Tsavorite.<br/><br/>He is traveling around to help people solve problems.<br/><br/>Under his scarf, there is a gold pendant underneath, which seems to be a secret of his identity.<br/><br/>Rye has a serious face and looks very strong, but he is actually a <strong>coward</strong>.",
    image: '/images/mistiy-forest/images/characters/rye/Art1.png',
    charImage: '/images/mistiy-forest/images/characters/rye/rye.png',
    info: [
      'Name: Rye',
      'Species: Cat (Tuxedo)',
      'Eyes colour: Amber',
      'Fav food: Cherry',
      'Hobby: Reading novel from different places',
    ],
  },
};

export default function MistyForestPage() {
  const [showButton, setShowButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterKey | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const openModal = (key: CharacterKey) => {
    setSelectedCharacter(key);
    setOpen(true);
    // Defer to next frame so the element is mounted before transition starts
    requestAnimationFrame(() => requestAnimationFrame(() => setModalVisible(true)));
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setOpen(false);
      setSelectedCharacter(null);
      panelRef.current?.scrollTo({ top: 0 });
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const char = selectedCharacter ? characters[selectedCharacter] : null;

  return (
    <>
      <Header activePage="mist;y-forest" showLogo={false} />

      {/* ── Character Modal ── */}
      {open && char && (
        <div
          className={`fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50 p-4 transition-[opacity,background-color] duration-300 ${
            modalVisible ? 'bg-black/30 opacity-100' : 'bg-black/0 opacity-0'
          }`}
          onClick={closeModal}
        >
          <div
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            className={`bg-cream rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] shadow-2xl flex flex-col items-center overflow-y-auto border border-brown/10 transition-all duration-300 ${
              modalVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}
          >
            <h2 className="font-rye text-3xl text-dark-brown mb-6">{char.name}</h2>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 w-full">
              <div
                className="md:w-1/2 w-full h-[55vh] bg-center bg-no-repeat bg-cover rounded-2xl shrink-0"
                style={{ backgroundImage: `url('${char.image}')` }}
              />
              <div className="flex flex-col items-center md:items-start gap-4 font-play text-brown text-base">
                <p dangerouslySetInnerHTML={{ __html: char.description }} />
                <button
                  onClick={closeModal}
                  className="mt-2 px-8 py-2 bg-[#4F321E] hover:bg-accent text-cream rounded-full font-play text-base transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full bg-cream flex flex-col">

        {/* ── Hero: Parallax Landing ── */}
        <div className="relative w-full h-screen bg-[#D0B68F]/60 overflow-hidden flex flex-col">
          {/* Parallax art layers */}
          <div className="relative h-2/3 sm:h-4/5 bg-size-[auto_450px] sm:bg-size-[auto_650px]">
            <div className="parallax absolute w-full h-full bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/mistiy-forest/images/MIST;Y.png')", zIndex: 30 }} />
            <div className="parallax absolute w-full h-full bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/mistiy-forest/images/FOREST.png')", zIndex: 20 }} />
            <div className="parallax absolute w-full h-full bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/mistiy-forest/images/leave.png')", zIndex: 20 }} />
            <div className="parallax absolute w-full h-full bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/mistiy-forest/images/Mist.gif')", zIndex: 20 }} />
            <div className="parallax absolute w-full h-full bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/mistiy-forest/images/Miwusenlin.gif')", zIndex: 10 }} />
            <div className="parallax absolute w-full h-full bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/mistiy-forest/images/tree.png')", zIndex: 10 }} />
          </div>

          {/* Tagline + CTA */}
          <div className="flex items-center justify-center grow pb-8 px-4">
            <div
              className="z-30 flex gap-6 flex-col items-center text-center"
              style={{ transform: `translate(${mouse.x * 0.4}px, ${mouse.y * 0.4}px)` }}
            >
              <p className="font-rye text-2xl md:text-3xl text-[#4F321E] max-w-lg leading-snug">
                A tale is unfolding in the mist...
              </p>
              <div className="relative flex justify-center items-center w-full min-h-12">
                {!showButton && (
                  <div className="absolute flex justify-center items-center gap-4">
                    <div className="misty-ball-1 w-2 h-2 bg-[#7C5B38] rounded-full" />
                    <div className="misty-ball-2 w-2 h-2 bg-[#7C5B38] rounded-full" />
                    <div className="misty-ball-3 w-2 h-2 bg-[#7C5B38] rounded-full" />
                  </div>
                )}
                {showButton && (
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <a
                      href="#characters"
                      className="px-8 py-2 bg-[#4F321E] hover:bg-accent text-cream rounded-full font-play text-base transition-colors"
                    >
                      Characters
                    </a>
                    <a
                      href="/mist;y-forest/card"
                      className="px-8 py-2 bg-[#4F321E] hover:bg-accent text-cream rounded-full font-play text-base transition-colors"
                    >
                      Board Game
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Lore Section ── */}
        <div className="bg-light-brown py-16 px-6">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3 w-full max-w-sm">
              <div className="flex-1 h-px bg-brown/20" />
              <span className="font-rye text-brown text-sm tracking-widest whitespace-nowrap">✦ The World ✦</span>
              <div className="flex-1 h-px bg-brown/20" />
            </div>
            <h2 className="font-rye text-3xl md:text-4xl text-dark-brown">MIST;Y FOREST</h2>
            <p className="font-play text-brown text-base md:text-lg leading-relaxed max-w-2xl">
              Deep within an ancient forest where the mist never fully clears, a small community of cats lives in harmony with nature and alchemy. Here, time behaves strangely, plants have memories, and every creature carries a secret. Three paths cross — and together, they might unravel the mystery hidden at the heart of the forest.
            </p>
            <p className="font-play text-brown/60 text-sm italic">More to be revealed soon...</p>
          </div>
        </div>

        {/* ── Characters Section ── */}
        <div id="characters" className="py-16 px-6 bg-cream">
          <div className="max-w-5xl mx-auto flex flex-col gap-10">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3 w-full max-w-xs">
                <div className="flex-1 h-px bg-brown/20" />
                <span className="font-rye text-brown text-sm tracking-widest whitespace-nowrap">✦ Characters ✦</span>
                <div className="flex-1 h-px bg-brown/20" />
              </div>
              <p className="font-play text-brown/60 text-sm">Click a character to learn their story</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(['Koro', 'Sese', 'Rye'] as CharacterKey[]).map((key) => {
                const c = characters[key];
                return (
                  <div
                    key={key}
                    onClick={() => openModal(key)}
                    className="group rounded-2xl border border-brown/10 bg-white/60 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow flex flex-col"
                  >
                    {/* Character art */}
                    <div className="relative h-80 bg-[#D0B68F]/30 overflow-hidden">
                      <div
                        className="misty-character absolute inset-0 bg-center bg-no-repeat bg-contain"
                        style={{ backgroundImage: `url('${c.charImage}')` }}
                      />
                    </div>
                    {/* Card footer */}
                    <div className="bg-linear-to-b from-light-brown/60 to-light-brown px-5 py-4 flex flex-col gap-3">
                      <h3 className="font-rye text-xl text-dark-brown">{c.name}</h3>
                      <ul className="font-play text-xs text-brown/80 space-y-0.5">
                        {c.info.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                      <button className="mt-1 self-start px-5 py-1.5 bg-[#4F321E] hover:bg-accent text-cream rounded-full font-play text-xs transition-colors">
                        Read More →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Board Game Section ── */}
        <div className="bg-light-brown py-16 px-6">
          <div className="max-w-5xl mx-auto flex flex-col gap-10">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-brown/20" />
              <span className="font-rye text-brown text-sm tracking-widest whitespace-nowrap">✦ The Game ✦</span>
              <div className="flex-1 h-px bg-brown/20" />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex gap-4 md:w-1/2 justify-cent relative w-50 h-50 bg-white rounded-2xl shadow-lg
                overflow-hidden">
                <div className="absolute w-full h-full top-0 bg-top-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-map.png')" }} />
                <div className="absolute w-full h-full md:right-10 bg-right bg-no-repeat bg-contain" style={{ backgroundImage: "url('/images/products/board-game-standee.png')" }} />
              </div>
              <div className="flex flex-col gap-4 text-center md:text-left md:w-1/2">
                <h2 className="font-rye text-3xl text-dark-brown">MIST;Y FOREST<br />Board Game</h2>
                <p className="font-play text-brown text-base leading-relaxed">
                  A tabletop adventure set in the world of Mist;y Forest. Collect legendary leaves, uncover hidden secrets, and see whose path leads to the heart of the forest.
                </p>
                <a
                  href="/mist;y-forest/card"
                  className="self-center md:self-start px-8 py-2.5 bg-[#4F321E] hover:bg-accent text-cream rounded-full font-play text-base transition-colors"
                >
                  Explore the Game →
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}
