'use client';

import Header from '@/components/Header';
import { useState, useEffect, useRef } from 'react';

type CharacterKey = 'Koro' | 'Sese' | 'Rye';

interface Character {
  name: string;
  description: string;
  image: string;
  charImage: string;
  bannerImage: string;
  info: string[];
}

const characters: Record<CharacterKey, Character> = {
  Koro: {
    name: 'Koro',
    description:
      "Koro is a <strong>time alchemist</strong> who lives in a small wooden house with grey rooftop.<br/><br/>He loves planting but is bad at planting, thus most of the plants are dead in his garden.<br/><br/>Koro is wearing an hourglass necklace which is inherited from his mom who was also a time alchemist. This hourglass has <strong>secret power</strong>.",
    image: '/images/mistiy-forest/images/characters/koro/Art1.png',
    charImage: '/images/mistiy-forest/images/characters/koro/koro.png',
    bannerImage: '/images/mistiy-forest/images/characters/koro/character_banner.png',
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
    bannerImage: '/images/mistiy-forest/images/characters/sese/character_banner.png',
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
    bannerImage: '/images/mistiy-forest/images/characters/rye/character_banner.png',
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
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterKey | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000);
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
    {page !== 1 && (
      <div className="w-full bg-[#D0B68F] py-3 px-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="w-10 h-10 bg-[#4F321E] text-[#D0B68F] rounded-full flex items-center justify-center shadow-xl cursor-pointer transform transition-all duration-100 ease-linear hover:scale-110 hover:bg-[#6A442A]"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
        </button>
      </div>
    )}
    <div className="w-full bg-[#D0B68F]" style={{ fontFamily: '"Tangerine", cursive' }}>
      {/* Character Modal */}
      {open && char && (
        <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50">
          <div
            ref={panelRef}
            className="bg-white p-6 md:m-4 md:rounded-lg max-h-full shadow-lg flex flex-col items-center text-2xl overflow-y-auto"
            style={{ fontFamily: '"Play", sans-serif' }}
          >
            <h2 className="text-3xl font-bold text-[#4F321E] mb-4">{char.name}</h2>
            <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10">
              <div
                className="md:w-1/2 w-full h-[70vh] bg-center bg-no-repeat rounded-lg"
                style={{ backgroundImage: `url('${char.image}')`, backgroundSize: 'cover' }}
              />
              <div className="md:max-w-[50%] flex flex-col items-center md:items-start">
                <p dangerouslySetInnerHTML={{ __html: char.description }} />
                <button
                  onClick={() => {
                    setOpen(false);
                    panelRef.current?.scrollTo({ top: 0 });
                  }}
                  className="px-12 py-2 bg-[#4F321E] text-[#D0B68F] rounded-full mt-5 shadow-xl text-2xl transform transition-all duration-100 ease-linear hover:scale-110 hover:bg-[#6A442A] cursor-pointer"
                  style={{ fontFamily: '"Play", sans-serif' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      <div className="flex flex-col h-[100vh] w-full overflow-hidden">
        {/* Page 1: Landing */}
        {page === 1 && (
          <div className="flex flex-col grow w-full overflow-hidden">
            <div className="h-[10vh]" />
            <div className="relative h-1/2 sm:h-3/5">
              {/* Parallax layers — mouse transform applied inline; CSS bounce subtle float */}
              <div
                className="misty-p1 absolute w-full h-full bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/mistiy-forest/images/MIST;Y.png')",
                  backgroundSize: 'auto 450px',
                  transform: `translate(${mouse.x}px, ${mouse.y}px)`,
                  zIndex: 30,
                }}
              />
              <div
                className="misty-p2 absolute w-full h-full bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/mistiy-forest/images/FOREST.png')",
                  backgroundSize: 'auto 450px',
                  transform: `translate(${mouse.x * 0.9}px, ${mouse.y * 0.9}px)`,
                  zIndex: 20,
                }}
              />
              <div
                className="misty-p3 absolute w-full h-full bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/mistiy-forest/images/leave.png')",
                  backgroundSize: 'auto 450px',
                  transform: `translate(${mouse.x * 0.8}px, ${mouse.y * 0.8}px)`,
                  zIndex: 20,
                }}
              />
              <div
                className="misty-p4 absolute w-full h-full bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/mistiy-forest/images/Mist.gif')",
                  backgroundSize: 'auto 450px',
                  transform: `translate(${mouse.x * 0.8}px, ${mouse.y * 0.8}px)`,
                  zIndex: 20,
                }}
              />
              <div
                className="misty-p5 absolute w-full h-full bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/mistiy-forest/images/Miwusenlin.gif')",
                  backgroundSize: 'auto 450px',
                  transform: `translate(${mouse.x * 0.7}px, ${mouse.y * 0.7}px)`,
                  zIndex: 10,
                }}
              />
              <div
                className="misty-p6 absolute w-full h-full bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/mistiy-forest/images/tree.png')",
                  backgroundSize: 'auto 450px',
                  transform: `translate(${mouse.x * 0.4}px, ${mouse.y * 0.4}px)`,
                  zIndex: 10,
                }}
              />
            </div>

            <div className="flex items-center justify-center">
              <div
                className="z-30 flex flex-col items-center text-3xl md:text-5xl font-bold p-4 text-center text-[#4F321E]"
                style={{ transform: `translate(${mouse.x * 0.4}px, ${mouse.y * 0.4}px)` }}
              >
                <div>A tale is unfolding in the mist... More to be revealed soon.</div>
                <div className="relative flex justify-center items-center w-full h-[100px] mt-4">
                  {!showButton && (
                    <div className="absolute flex justify-center items-center gap-5">
                      <div className="misty-ball-1 w-[1vh] h-[1vh] bg-[#7C5B38] rounded-full" />
                      <div className="misty-ball-2 w-[1vh] h-[1vh] bg-[#7C5B38] rounded-full" />
                      <div className="misty-ball-3 w-[1vh] h-[1vh] bg-[#7C5B38] rounded-full" />
                    </div>
                  )}
                  {showButton && (
                    <div className="flex flex-col md:flex-row gap-4">
                      <button
                        onClick={() => setPage(2)}
                        className="px-12 py-2 bg-[#4F321E] text-[#D0B68F] rounded-full shadow-xl text-2xl transform transition-all duration-100 ease-linear hover:scale-110 hover:bg-[#6A442A] cursor-pointer"
                        style={{ fontFamily: '"Play", sans-serif' }}
                      >
                        Characters
                      </button>
                      <a
                        href="/mist;y-forest/card"
                        className="text-center px-12 py-2 bg-[#4F321E] text-[#D0B68F] rounded-full shadow-xl text-2xl transform transition-all duration-100 ease-linear hover:scale-110 hover:bg-[#6A442A] cursor-pointer"
                        style={{ fontFamily: '"Play", sans-serif' }}
                      >
                        Board Game
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Page 2: Characters */}
        {page === 2 && (
          <div className="grow flex flex-col items-center justify-center text-[#D0B68F] h-full">
            <div className="flex overflow-x-auto snap-x snap-mandatory space-x-4 p-4 w-full grow items-center px-[10vw]">
              {(['Koro', 'Sese', 'Rye'] as CharacterKey[]).map((key) => {
                const c = characters[key];
                return (
                  <div
                    key={key}
                    className="snap-center snap-always flex-shrink-0 w-[85vw] md:w-[75vw] h-[70vh] bg-[#f9e4c6] text-[#D0B68F] flex items-center justify-center text-2xl font-bold rounded-lg"
                  >
                    <div className="flex flex-col">
                      <div
                        className="relative items-center justify-center w-[90vw] md:w-[40vw] h-[55vh]"
                        style={{ fontFamily: '"Play", sans-serif' }}
                      >
                        <div className="misty-character-description absolute w-[170px] md:w-[250px] text-left bg-white rounded-lg p-2 text-xs md:text-base">
                          {c.info.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                        <div
                          onClick={() => {
                            setSelectedCharacter(key);
                            setOpen(true);
                          }}
                          className="misty-character cursor-pointer absolute top-10 w-[90vw] md:w-[40vw] h-[50vh] z-10 bg-center bg-no-repeat bg-contain"
                          style={{ backgroundImage: `url('${c.charImage}')` }}
                        />
                      </div>
                      <div
                        onClick={() => {
                          setSelectedCharacter(key);
                          setOpen(true);
                        }}
                        className="misty-banner cursor-pointer h-[20vh] flex flex-row items-center justify-center bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('${c.bannerImage}')` }}
                      >
                        <div className="w-16 h-16 bg-[#D0B68F]/30 rounded-full animate-ping" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="w-full bg-[#543100] text-[#D0B68F] text-center p-4">
        {year} &copy; Alchemeowww. All Rights Reserved.
      </div>
    </div>
    </>
  );
}
