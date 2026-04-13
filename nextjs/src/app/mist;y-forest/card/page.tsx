'use client';

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';

const CARD_DESCRIPTIONS = {
  trap: [
    'Fall into trap. Skip 1 round.',
    'Overslept! Go back to original step.',
    'Majo found you. Go back to cage.',
    'Swap position with any players.',
    'Stop any player for 1 round.',
    'Karma strikes! Repeat the last card any players opened.',
    'EVIL CARD! Throw any player to cage.',
    'Found magic spell! Next player skip one round.',
    'Fall into hole. Skip one round.',
    'Nightmare! Go backward 3 steps.',
    'The birds ate the trail. Skip one round.',
    'Thick fog. Ask a player roll dice for you.',
    'Lost in the forest. Skip one round.',
    'Failed to escape from Candy house. Go back to original step.',
    'Fairy Pranks! Swap any 2 players.',
  ] as string[],
  alchemy: [
    'Get out of cage. This maybe keep until needed.',
    'Fairy wishes you. Roll dice again.',
    'Lucky day! Go to the nearest ladder.',
    'Found a treasure box! Roll dice and everyone walk the same steps.',
    'Unexpected treat! Walk the same steps again.',
    'Nap time. Skip 1 round.',
    'You are generous! Every player walk the steps of you.',
    'Get a magic scroll! Go forward 5 steps.',
    'Follow the fireflies. Go to the nearest ✌️✊✋.',
    'Found a secret trail. Go to the nearest ladder.',
    'Got some candy and snacks from Majo. Everyone go forward 3 steps.',
    "Steal Majo's jewel! Go forward 2 steps.",
    'Sleep well in Candy house. Skip one round.',
    'Get a Magic Book! Roll dice for next player.',
    'Happily eat Candy! Roll dice again.',
  ] as string[],
};

type CardType = 'trap' | 'alchemy';
interface CardData { id: number; }

function getCardStyleStr(
  index: number,
  id: number,
  activeCard: number | null,
  spread: boolean,
  total: number,
  deckEl: HTMLElement | null
): string {
  if (activeCard === id) {
    const sampleCard = deckEl?.querySelector<HTMLElement>('.card');
    const rawCardW = sampleCard?.offsetWidth ?? 80;
    const rawCardH = sampleCard?.offsetHeight ?? 112;
    const maxW = window.innerWidth * 0.6;
    const maxH = window.innerHeight * 0.6;
    const usedScale = Math.min(maxW / rawCardW, maxH / rawCardH);
    const finalW = Math.round(rawCardW * usedScale);
    const finalH = Math.round(rawCardH * usedScale);
    return `position:fixed;top:50%;left:50%;width:${finalW}px;height:${finalH}px;transform:translate(-50%,-50%);z-index:100;transition:all 0.28s ease-in-out;border:0px;box-shadow:0 20px 40px rgba(0,0,0,0.3)`;
  }

  if (!spread) {
    return `box-shadow:0 1px 2px rgba(0,0,0,0.05);transform:rotate(0deg) translateX(0px) translateY(0px);z-index:${index};transition:transform 0.6s ease-in-out`;
  }

  const deckW = Math.min((deckEl?.clientWidth ?? window.innerWidth) - 32, 440);
  const sampleCard = deckEl?.querySelector<HTMLElement>('.card');
  const cardW = sampleCard?.offsetWidth ?? 80;
  const centerIndex = (total - 1) / 2;
  const maxSpacing = total > 1 ? Math.max(10, (deckW - cardW) / (total - 1)) : cardW;
  const spacing = Math.min(cardW * 0.85, maxSpacing);
  const offset = (index - centerIndex) * spacing;
  const rotation = (index - total / 2) * 2;
  return `left:50%;transform:translateX(calc(-50% + ${offset}px)) rotate(${rotation}deg) translateY(0px);z-index:${index};transition:transform 0.8s cubic-bezier(0.4,0,0.2,1)`;
}

interface CardItemProps {
  card: CardData;
  index: number;
  total: number;
  activeCard: number | null;
  spread: boolean;
  cardType: CardType;
  deckRef: React.RefObject<HTMLDivElement | null>;
  onToggle: (id: number) => void;
}

function CardItem({ card, index, total, activeCard, spread, cardType, deckRef, onToggle }: CardItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isActive = activeCard === card.id;

  // Staggered entrance
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80 + 200);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply positional style synchronously before paint
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.cssText = getCardStyleStr(index, card.id, activeCard, spread, total, deckRef.current);
    el.style.opacity = visible ? '1' : '0';
    if (visible) el.style.transition = (el.style.transition || '') + ', opacity 0.3s ease-out';
  });

  const handleMouseEnter = () => {
    const el = ref.current;
    if (!el || isActive) return;
    el.style.cssText = getCardStyleStr(index, card.id, null, spread, total, deckRef.current);
    el.style.opacity = '1';
    el.style.transform = el.style.transform + ' translateY(-15px) scale(1.05)';
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.cssText = getCardStyleStr(index, card.id, activeCard, spread, total, deckRef.current);
    el.style.opacity = visible ? '1' : '0';
  };

  return (
    <div
      ref={ref}
      className={`card absolute bottom-0 rounded-xl shadow-lg border border-gray-200 smooth-transform cursor-pointer${isActive ? ' flipped' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onToggle(card.id)}
    >
      <div className="card-inner w-full h-full relative">
        {/* Front */}
        <div className="card-face p-1 gap-2 absolute inset-0 bg-[#D0B68F] rounded-xl flex flex-col items-center justify-center text-gray-700 font-semibold">
          <img src="/images/mistiy-forest/images/MIST;Y FOREST.png" alt="MIST;Y FOREST" />
          <div className="text-center card-text px-2 font-young-serif">
            {cardType === 'trap' ? 'Trap Card' : 'Alchemy Card'}
          </div>
        </div>
        {/* Back */}
        <div className="p-1 card-face card-back absolute inset-0 bg-[#f9e4c6] rounded-xl flex items-center justify-center overflow-hidden">
          <div
            className="flex flex-col items-center justify-center w-full h-full bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('/images/mistiy-forest/images/Frame 4.png')" }}
          >
            <div className="card-description-text text-black font-young-serif grow h-full w-full pt-14 px-8 pb-4 text-center flex flex-col justify-center">
              <div>{CARD_DESCRIPTIONS[cardType][card.id] ?? 'Coming Soon'}</div>
            </div>
            <img
              className="koro-size self-end mr-2 mb-2 md:mr-4 md:mb-4"
              src="/images/mistiy-forest/images/koro.png"
              alt="koro"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MistyForestCardPage() {
  const [cards, setCards] = useState<CardData[]>(() =>
    Array.from({ length: 15 }, (_, i) => ({ id: i }))
  );
  const [cardType, setCardType] = useState<CardType>('trap');
  const [openInstruction, setOpenInstruction] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [spread, setSpread] = useState(false);
  const [animating, setAnimating] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll while on this page
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const shuffleCards = useCallback(() => {
    setCards((prev) => {
      const arr = [...prev];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });
  }, []);

  const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

  // Initial spread
  useEffect(() => {
    shuffleCards();
    const timer = setTimeout(() => setSpread(true), 300);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCard = (id: number) => {
    if (animating) return;
    setActiveCard((prev) => (prev === id ? null : id));
  };

  const toggleSpread = async (newType?: CardType) => {
    if (animating) return;
    setAnimating(true);
    setActiveCard(null);
    if (newType) setCardType(newType);
    const currentSpread = spread;
    if (currentSpread) {
      setSpread(false);
      await wait(600);
      shuffleCards();
      await wait(400);
      setSpread(true);
    } else {
      shuffleCards();
      await wait(300);
      setSpread(true);
    }
    await wait(900);
    setAnimating(false);
  };

  return (
    <div className="font-play w-screen h-screen bg-gradient-to-br from-[#f9e4c6] to-[#D0B68F]/50 flex flex-col items-start gap-6 overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 w-full text-white py-3 px-3 z-50">
        <div className="flex items-center justify-between">
          <a
            href="/mist;y-forest"
            className="w-10 h-10 bg-[#4F321E] text-[#D0B68F] rounded-full flex items-center justify-center hover:bg-[#6A442A] shadow-xl cursor-pointer transform transition-all duration-100 ease-linear hover:scale-110"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
          </a>
          <button
            className="cursor-pointer px-6 py-2 bg-[#4F321E]/50 hover:bg-[#4F321E]/80 text-white rounded-lg font-semibold shadow-md transition flex flex-row items-center gap-2"
            onClick={() => setOpenInstruction(true)}
          >
            <span className="material-symbols-outlined">info</span> Instruction
          </button>
        </div>
      </header>

      {/* Instruction Modal */}
      {openInstruction && (
        <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50">
          <div className="w-full h-full md:w-1/2 flex flex-col items-center font-play overflow-hidden">
            <div className="flex flex-col items-center justify-center w-full h-full gap-4">
              <div className="w-full max-h-[80%] flex items-center justify-center">
                <img
                  className="max-h-full"
                  src="/images/mistiy-forest/images/GameInstruction.png"
                  alt="Game Instruction"
                />
              </div>
              <button
                className="cursor-pointer px-6 py-2 bg-[#4F321E]/50 hover:bg-[#4F321E]/80 text-white rounded-lg font-semibold shadow-md transition flex flex-row items-center gap-2"
                onClick={() => setOpenInstruction(false)}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for active card */}
      {activeCard !== null && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
          onClick={() => setActiveCard(null)}
        />
      )}

      {/* Main */}
      <div className="flex flex-col items-center justify-center gap-6 grow w-full">
        <div className="font-young-serif text-2xl">
          {cardType === 'trap' ? 'Trap Cards' : 'Alchemy Cards'}
        </div>

        {/* Deck */}
        <div ref={deckRef} className="relative w-full card-div max-h-full flex items-end justify-center">
          {cards.map((card, index) => (
            <CardItem
              key={card.id}
              card={card}
              index={index}
              total={cards.length}
              activeCard={activeCard}
              spread={spread}
              cardType={cardType}
              deckRef={deckRef}
              onToggle={toggleCard}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center">
          <button
            className="cursor-pointer px-6 py-2 mt-10 bg-[#4F321E] hover:bg-[#4F321E]/80 text-white rounded-lg font-semibold shadow-md transition flex flex-row items-center gap-2"
            onClick={() => toggleSpread()}
          >
            <span className="material-symbols-outlined">shuffle</span> shuffle
          </button>
          <div className="flex flex-row gap-4">
            <button
              className="cursor-pointer px-6 py-2 mt-10 bg-[#4F321E]/70 hover:bg-[#4F321E]/80 text-white rounded-lg font-semibold shadow-md transition flex flex-row items-center gap-2"
              onClick={() => toggleSpread('trap')}
            >
              <span className="material-symbols-outlined">bomb</span> Trap Card
            </button>
            <button
              className="cursor-pointer px-6 py-2 mt-10 bg-[#4F321E]/50 hover:bg-[#4F321E]/80 text-white rounded-lg font-semibold shadow-md transition flex flex-row items-center gap-2"
              onClick={() => toggleSpread('alchemy')}
            >
              <span className="material-symbols-outlined">wand_shine</span> Alchemy Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
