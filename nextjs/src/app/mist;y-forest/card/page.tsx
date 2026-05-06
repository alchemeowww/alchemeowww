'use client';

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';

const SPARKLES = [
  { top: '12%', left: '7%', delay: '0s' },
  { top: '22%', right: '6%', delay: '0.6s' },
  { top: '55%', left: '3%', delay: '1.1s' },
  { top: '68%', right: '9%', delay: '1.7s' },
  { top: '82%', left: '14%', delay: '0.4s' },
  { top: '40%', right: '4%', delay: '1.4s' },
  { top: '8%', left: '45%', delay: '0.9s' },
  { top: '90%', right: '18%', delay: '0.2s' },
];

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
    return `position:fixed;top:50%;left:50%;width:${finalW}px;height:${finalH}px;transform:translate(-50%,-50%);z-index:100;transition:all 0.28s ease-in-out;border:0px;`;
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
  lastCard: { type: CardType; id: number } | null;
}

function CardItem({ card, index, total, activeCard, spread, cardType, deckRef, onToggle, lastCard }: CardItemProps) {
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

  const isTrap = cardType === 'trap';
  const borderClass = isTrap
    ? 'border-red-700/50'
    : 'border-amber-500/50';

  const isKarmaCard = isTrap && card.id === 5;
  const karmaTarget = isKarmaCard && lastCard
    ? CARD_DESCRIPTIONS[lastCard.type][lastCard.id]
    : null;

  return (
    <div
      ref={ref}
      className={`card absolute bottom-0 rounded-xl smooth-transform cursor-pointer${isActive ? ' flipped' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onToggle(card.id)}
    >
      <div className="card-inner w-full h-full relative">
        {/* Front (face down) */}
        <div className={`border ${borderClass} card-face p-1 gap-2 absolute inset-0 bg-[#D0B68F] rounded-xl flex flex-col items-center justify-center text-gray-700 font-semibold overflow-hidden`}>
          <img src="/images/mistiy-forest/images/MIST;Y FOREST.png" alt="MIST;Y FOREST" />
          <div className="text-center card-text px-2 font-young-serif">
            {isTrap ? 'Trap Card' : 'Alchemy Card'}
          </div>
        </div>
        {/* Back (revealed) */}
        <div className={`p-1 drop-shadow-2xl card-face card-back absolute inset-0 bg-light-cream rounded-xl flex items-center justify-center overflow-hidden`}>
          <div
            className="flex flex-col items-center justify-center w-full h-full bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('/images/mistiy-forest/images/Frame 4.png')" }}
          >
            <div className="card-description-text text-black gap-1 font-young-serif grow h-full w-full pt-14 px-8 pb-4 text-center flex flex-col justify-center">
              {isKarmaCard && karmaTarget ? (
                <>
                  <div className="text-[0.7em]">{CARD_DESCRIPTIONS[cardType][card.id]}</div>
                  <div className="text-[0.6em] opacity-60">Repeat last card:</div>
                  <div>{karmaTarget}</div>
                </>
              ) : isKarmaCard ? (
                <>
                  <div>{CARD_DESCRIPTIONS[cardType][card.id]}</div>
                  <div className="text-[0.6em] opacity-50 mt-1">(No card opened yet)</div>
                </>
              ) : (
                <div>{CARD_DESCRIPTIONS[cardType][card.id]}</div>
              )}
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
  const [instructionVisible, setInstructionVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [spread, setSpread] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [labelVisible, setLabelVisible] = useState(true);
  const [displayedCardType, setDisplayedCardType] = useState<CardType>('trap');
  const deckRef = useRef<HTMLDivElement>(null);
  const lastCard = useRef<{ type: CardType; id: number } | null>(null);

  useEffect(() => {
    setLabelVisible(false);
    const t = setTimeout(() => {
      setDisplayedCardType(cardType);
      setLabelVisible(true);
    }, 150);
    return () => clearTimeout(t);
  }, [cardType]);

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

  const openInstructionModal = () => {
    setOpenInstruction(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setInstructionVisible(true)));
  };

  const closeInstructionModal = () => {
    setInstructionVisible(false);
    setTimeout(() => setOpenInstruction(false), 300);
  };

  const toggleCard = (id: number) => {
    if (animating) return;
    setActiveCard((prev) => {
      // When opening a card (not closing), save it as lastCard — but skip the Karma card itself
      if (prev !== id) {
        const isKarma = cardType === 'trap' && id === 5;
        if (!isKarma) lastCard.current = { type: cardType, id };
      }
      return prev === id ? null : id;
    });
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

  const typeConfig = {
    trap: {
      label: 'Trap Cards',
      textColor: 'text-[#A3371D]',
      activeTab: 'bg-[#A3371D]/20 border border-[#A3371D]/40 text-[#A3371D] shadow-sm',
      inactiveTab: 'text-brown/40 hover:text-[#A3371D] hover:bg-[#A3371D]/10',
    },
    alchemy: {
      label: 'Alchemy Cards',
      textColor: 'text-dark-brown',
      activeTab: 'bg-[#4F321E]/20 border border-[#4F321E]/40 text-dark-brown shadow-sm',
      inactiveTab: 'text-brown/40 hover:text-dark-brown hover:bg-[#4F321E]/10',
    },
  };
  const cfg = typeConfig[cardType];
  const displayedCfg = typeConfig[displayedCardType];

  return (
    <div className="font-play w-screen h-screen flex flex-col items-start overflow-hidden relative bg-cream">

      {/* Atmospheric mist overlay */}
      <div
        className="absolute inset-0 opacity-5 bg-center bg-cover bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/images/mistiy-forest/images/Miwusenlin.gif')" }}
      />
      {/* Radial depth glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(199,186,168,0.5) 0%, transparent 70%)' }}
      />

      {/* Floating sparkles */}
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="absolute text-brown/20 animate-pulse pointer-events-none select-none text-base"
          style={{ top: s.top, left: (s as { left?: string }).left, right: (s as { right?: string }).right, animationDelay: s.delay }}
        >✦</span>
      ))}

      {/* ── Header HUD ── */}
      <header className="relative w-full py-3 px-4 z-50 border-b border-brown/10 bg-cream/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <a
            href="/mist;y-forest"
            className="w-9 h-9 bg-light-brown/40 hover:bg-light-brown border border-brown/20 text-dark-brown rounded-full flex items-center justify-center cursor-pointer transition"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
          </a>
          <div className="flex flex-col items-center gap-0.5">
            <span className="font-rye text-brown/50 text-[10px] tracking-[0.2em] uppercase">Mist;y Forest</span>
            <span
              className={`font-rye text-base leading-tight transition-opacity duration-150 ${displayedCfg.textColor} ${labelVisible ? 'opacity-100' : 'opacity-0'}`}
            >{displayedCfg.label}</span>
          </div>
          <button
            onClick={() => openInstructionModal()}
            className="w-9 h-9 bg-light-brown/40 hover:bg-light-brown border border-brown/20 text-dark-brown rounded-full flex items-center justify-center cursor-pointer transition"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>menu_book</span>
          </button>
        </div>
      </header>

      {/* ── Instruction Modal ── */}
      {openInstruction && (
        <div
          className={`fixed inset-0 backdrop-blur-md flex items-center justify-center z-101 p-4 transition-[opacity,background-color] duration-300 ${
            instructionVisible ? 'opacity-100' : 'bg-brown/0 opacity-0'
          }`}
          onClick={closeInstructionModal}
        >
          <div
            className={`relative w-full max-w-lg flex flex-col items-center gap-4 bg-cream border border-brown/15 rounded-2xl p-6 shadow-2xl transition-all duration-300 ${
              instructionVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-brown" style={{ fontSize: '20px' }}>menu_book</span>
              <h3 className="font-rye text-dark-brown text-lg">Game Instructions</h3>
            </div>
            <div className="w-full rounded-xl overflow-hidden border border-brown/15">
              <img className="w-full" src="/images/mistiy-forest/images/GameInstruction.webp" alt="Game Instruction" />
            </div>
            <button
              onClick={closeInstructionModal}
              className="px-7 py-2 bg-[#4F321E] hover:bg-accent text-cream rounded-full text-sm transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Active card backdrop ── */}
      {activeCard !== null && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40"
          onClick={() => setActiveCard(null)}
        />
      )}

      {/* ── Card Deck Area ── */}
      <div className="flex flex-col items-center justify-center gap-4 grow w-full relative">
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
              lastCard={lastCard.current}
            />
          ))}
        </div>
      </div>

      {/* ── Bottom HUD Controls ── */}
      <div className={`relative w-full py-4 px-4 z-50 border-t border-brown/10 bg-cream/80 backdrop-blur-sm flex flex-col items-center gap-3 transition-transform duration-300 ease-in-out ${instructionVisible ? 'translate-y-full' : 'translate-y-0'}`}>
        {/* Card type switcher */}
        <div className="flex gap-1 p-1 bg-light-brown/30 border border-brown/15 rounded-full">
          <button
            disabled={animating}
            onClick={() => toggleSpread('trap')}
            className={`px-4 py-1.5 text-xs rounded-full font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:cursor-default ${cardType === 'trap' ? typeConfig.trap.activeTab : typeConfig.trap.inactiveTab}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>warning</span>
            Trap
          </button>
          <button
            disabled={animating}
            onClick={() => toggleSpread('alchemy')}
            className={`px-4 py-1.5 text-xs rounded-full font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:cursor-default ${cardType === 'alchemy' ? typeConfig.alchemy.activeTab : typeConfig.alchemy.inactiveTab}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>wand_shine</span>
            Alchemy
          </button>
        </div>
        {/* Shuffle button */}
        <button
          disabled={animating}
          onClick={() => toggleSpread()}
          className="px-7 py-2 bg-[#4F321E] hover:bg-accent disabled:opacity-30 text-cream rounded-full text-sm font-semibold shadow-md transition flex items-center gap-2 cursor-pointer disabled:cursor-default"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>shuffle</span>
          Shuffle Deck
        </button>
      </div>
    </div>
  );
}
