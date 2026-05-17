'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const CAT_IMAGES = Array.from({ length: 17 }, (_, i) => `/images/cat_head/cat${i + 1}.png`);

const LEVELS = [
  { level: 1, pairs: 2,  cols: 2, time: 30,  label: 'Kitten'   },
  { level: 2, pairs: 4,  cols: 4, time: 45,  label: 'Cat'      },
  { level: 3, pairs: 6,  cols: 4, time: 60,  label: 'Tomcat'   },
  { level: 4, pairs: 8,  cols: 4, time: 75,  label: 'Elder Cat' },
  { level: 5, pairs: 10, cols: 4, time: 90,  label: 'Alchemist' },
];

interface Card {
  id: number;
  value: number;
  flipped: boolean;
  matched: boolean;
}

type Phase = 'idle' | 'playing' | 'won' | 'lost';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildCards(pairs: number): Card[] {
  const values = shuffle([...Array(pairs).keys(), ...Array(pairs).keys()].map(v => v + 1));
  return values.map((value, id) => ({ id, value, flipped: false, matched: false }));
}

export default function LeMeownogatariPage() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [timer, setTimer] = useState(0);
  const [pairsMatched, setPairsMatched] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [shake, setShake] = useState<number | null>(null);
  const [cardSize, setCardSize] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const level = LEVELS[levelIdx];

  // Compute square card size from container dimensions
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const compute = () => {
      const GAP = 8;
      const cols = LEVELS[levelIdx].cols;
      const rows = Math.ceil(cards.length / cols);
      const maxW = (el.clientWidth  - GAP * (cols - 1)) / cols;
      const maxH = rows > 0 ? (el.clientHeight - GAP * (rows - 1)) / rows : maxW;
      setCardSize(Math.floor(Math.min(maxW, maxH)));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [levelIdx, cards.length]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startLevel = useCallback((idx: number) => {
    stopTimer();
    const lv = LEVELS[idx];
    const newCards = buildCards(lv.pairs);
    setCards(newCards);
    setFlipped([]);
    setPhase('playing');
    setTimer(lv.time);
    setPairsMatched(0);
    setTotalPairs(lv.pairs);
    setLocked(false);
    setCombo(0);
    setShake(null);
  }, [stopTimer]);

  // countdown
  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          stopTimer();
          setPhase('lost');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return stopTimer;
  }, [phase, stopTimer]);

  const flipCard = useCallback((id: number) => {
    if (phase !== 'playing' || locked) return;
    setCards(prev => {
      const card = prev.find(c => c.id === id);
      if (!card || card.flipped || card.matched || flipped.length === 2) return prev;
      return prev.map(c => c.id === id ? { ...c, flipped: true } : c);
    });
    setFlipped(prev => {
      if (prev.length === 2 || prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, [phase, locked, flipped]);

  // check match when 2 cards flipped
  useEffect(() => {
    if (flipped.length !== 2) return;
    setLocked(true);
    const [id1, id2] = flipped;

    setCards(prev => {
      const c1 = prev.find(c => c.id === id1)!;
      const c2 = prev.find(c => c.id === id2)!;
      if (c1.value === c2.value) {
        // match
        const newCombo = combo + 1;
        const points = 100 * newCombo + (timer > level.time / 2 ? 50 : 0);
        setCombo(newCombo);
        setScore(s => s + points);
        const newPairs = pairsMatched + 1;
        setPairsMatched(newPairs);

        const updated = prev.map(c =>
          c.id === id1 || c.id === id2 ? { ...c, matched: true } : c
        );

        if (newPairs === totalPairs) {
          stopTimer();
          setTimeout(() => {
            setBestScore(bs => Math.max(bs, score + points));
            if (levelIdx < LEVELS.length - 1) {
              setPhase('won');
            } else {
              setPhase('won'); // final win
            }
          }, 600);
        }

        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 400);
        return updated;
      } else {
        // no match
        setCombo(0);
        setShake(id1);
        setTimeout(() => setShake(null), 500);
        setTimeout(() => {
          setCards(p => p.map(c =>
            c.id === id1 || c.id === id2 ? { ...c, flipped: false } : c
          ));
          setFlipped([]);
          setLocked(false);
        }, 800);
        return prev;
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped]);

  const timerPct = (timer / level.time) * 100;
  const timerColor =
    timerPct > 50 ? '#3a9e5f' :
    timerPct > 25 ? '#e07b20' : '#d63031';

  return (
    <main className="h-dvh w-full flex flex-col items-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fdf0e0 0%, #fce4c0 50%, #f8d4a0 100%)', fontFamily: 'Lato, sans-serif' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rye&family=Lato:wght@400;700&display=swap');
        .font-rye { font-family: "Rye", serif; }

        .card-wrap {
          perspective: 800px;
        }
        .card-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .card-inner.flipped {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 0.75rem;
          overflow: hidden;
        }
        .card-back  { transform: rotateY(0deg); }
        .card-front { transform: rotateY(180deg); }

        @keyframes shake {
          0%,100% { transform: rotateY(180deg) translateX(0); }
          25%      { transform: rotateY(180deg) translateX(-6px); }
          75%      { transform: rotateY(180deg) translateX(6px); }
        }
        .shake .card-inner { animation: shake 0.45s ease; }

        @keyframes matchPop {
          0%   { transform: rotateY(180deg) scale(1); }
          50%  { transform: rotateY(180deg) scale(1.12); }
          100% { transform: rotateY(180deg) scale(1); }
        }
        .matched-pop .card-inner { animation: matchPop 0.35s ease; }

        @keyframes comboFloat {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(1.3); }
        }
        .combo-float { animation: comboFloat 0.8s ease forwards; }

        .timer-bar {
          transition: width 1s linear, background-color 0.5s;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        .fade-in { animation: fadeIn 0.35s ease; }
      `}</style>

      {/* ── HEADER ── */}
      <header className="w-full flex items-center justify-between px-4 py-3 max-w-2xl">
        <div>
          <h1 className="font-rye text-[#6b3410] text-lg sm:text-2xl leading-none">Le Meownogatari</h1>
          <p className="text-[#a0622a]/70 text-[10px] tracking-widest uppercase mt-0.5">Purrfect Memory</p>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[#a0622a]/60 text-[10px] uppercase tracking-widest">Best</span>
          <span className="font-rye text-[#e07b20] text-base sm:text-lg">{bestScore}</span>
        </div>
      </header>

      {/* ── LEVEL + SCORE BAR ── */}
      <div className="w-full max-w-2xl px-4 flex items-center justify-between mb-2 gap-2">
        {/* mobile: dots; sm+: label pills */}
        <div className="flex gap-1.5 sm:gap-2 items-center">
          {LEVELS.map((lv, i) => (
            <div key={lv.level} className="flex items-center">
              {/* dot on mobile */}
              <div
                className="sm:hidden w-2.5 h-2.5 rounded-full transition-all"
                style={{ background: i === levelIdx ? '#e07b20' : i < levelIdx ? '#3a9e5f' : '#c8a882' }}
              />
              {/* pill on sm+ */}
              <div
                className="hidden sm:block rounded-full text-xs font-bold px-3 py-1 transition-all"
                style={{
                  background: i === levelIdx ? '#e07b20' : i < levelIdx ? '#3a9e5f' : '#e8d0b0',
                  color: i <= levelIdx ? '#fff8ee' : '#a0622a',
                }}
              >
                {lv.label}
              </div>
            </div>
          ))}
          {/* current level name on mobile */}
          <span className="sm:hidden font-bold text-xs ml-1" style={{ color: '#e07b20' }}>{level.label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#a0622a]/60 text-xs uppercase tracking-widest">Score</span>
          <span className="font-rye text-[#6b3410] text-lg sm:text-xl">{score}</span>
        </div>
      </div>

      {/* ── TIMER BAR ── */}
      {phase === 'playing' && (
        <div className="w-full max-w-2xl px-4 mb-2">
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: '#e8c898' }}>
            <div
              className="timer-bar h-full rounded-full"
              style={{ width: `${timerPct}%`, background: timerColor }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs" style={{ color: timerColor }}>
            <span className="uppercase tracking-widest">Time</span>
            <span className="font-bold">{timer}s</span>
          </div>
        </div>
      )}

      {/* ── IDLE / START SCREEN ── */}
      {phase === 'idle' && (
        <div className="fade-in flex-1 flex flex-col items-center justify-center gap-3 px-5 max-w-sm text-center overflow-y-auto w-full py-4">
          <img src="/images/cat_head/cat1.png" alt="cat" className="w-16 h-16 sm:w-24 sm:h-24 object-contain drop-shadow-xl rounded-full" style={{ background: '#f5c98044', padding: '0.5rem' }} />
          <h2 className="font-rye text-[#6b3410] text-2xl sm:text-3xl">Match the Cats!</h2>
          <p className="text-[#8b4a1a] text-xs sm:text-sm leading-relaxed">
            Flip cards to find matching cat pairs. Build combos for bonus points. Beat all 5 levels to become the ultimate Cat Alchemist!
          </p>
          <div className="w-full rounded-2xl p-3 flex flex-col gap-1.5" style={{ background: '#00000010' }}>
            {LEVELS.map(lv => (
              <div key={lv.level} className="flex justify-between text-xs sm:text-sm" style={{ color: '#a0622a' }}>
                <span className="font-bold" style={{ color: '#e07b20' }}>{lv.label}</span>
                <span>{lv.pairs} pairs · {lv.time}s</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setScore(0); setLevelIdx(0); startLevel(0); }}
            className="w-full max-w-xs py-4 rounded-full font-bold text-white shadow-xl transition-all active:scale-95 text-base"
            style={{ background: 'linear-gradient(135deg, #e07b20, #f5a623)' }}
          >
            Start Game
          </button>
        </div>
      )}

      {/* ── GAME BOARD ── */}
      {phase === 'playing' && (
        <div className="flex-1 w-full max-w-2xl px-3 pb-3 flex flex-col overflow-hidden">
          {/* stats row */}
          <div className="flex justify-between items-center mb-2 px-1">
            <div className="flex items-center gap-2">
              <span className="text-[#a0622a]/70 text-xs uppercase tracking-widest">Level</span>
              <span className="font-rye text-[#e07b20]">{level.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {combo >= 2 && (
                <span className="combo-float font-bold px-2 py-0.5 rounded-full text-xs" style={{ background: '#e07b20', color: '#fff' }}>
                  x{combo} Combo!
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#a0622a]/70 text-xs uppercase tracking-widest">Pairs</span>
              <span className="font-rye text-[#6b3410]">{pairsMatched}/{totalPairs}</span>
            </div>
          </div>

          {/* card grid */}
          <div
            ref={gridRef}
            className="flex-1 min-h-0 flex items-center justify-center"
          >
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${level.cols}, ${cardSize}px)`,
              }}
            >
            {cards.map(card => (
              <div
                key={card.id}
                className={`card-wrap cursor-pointer select-none
                  ${shake === card.id ? 'shake' : ''}
                  ${card.matched ? 'matched-pop' : ''}
                `}
                style={{ width: cardSize, height: cardSize }}
                onClick={() => flipCard(card.id)}
              >
                <div className={`card-inner ${card.flipped || card.matched ? 'flipped' : ''}`}>
                  {/* back */}
                  <div
                    className="card-face card-back flex items-center justify-center shadow-lg border-2"
                    style={{ background: 'linear-gradient(135deg, #f5a623, #e07b20)', borderColor: '#c4730055' }}
                  >
                    <span className="text-2xl">🐾</span>
                  </div>
                  {/* front */}
                  <div
                    className="card-face card-front flex items-center justify-center shadow-lg border-2 p-1"
                    style={{
                      background: card.matched
                        ? 'linear-gradient(135deg, #d4f0dc, #a8e0b8)'
                        : 'linear-gradient(135deg, #fff8ee, #fce4c0)',
                      borderColor: card.matched ? '#3a9e5f' : '#e07b20',
                    }}
                  >
                    <img
                      src={CAT_IMAGES[card.value - 1]}
                      alt="cat"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      )}

      {/* ── WIN OVERLAY ── */}
      {phase === 'won' && (
        <div className="fade-in fixed inset-0 flex flex-col items-center justify-center z-50 px-5"
          style={{ background: 'rgba(253,240,220,0.92)', backdropFilter: 'blur(8px)' }}>
          <div className="fade-in flex flex-col items-center gap-4 w-full max-w-xs text-center">
            <div className="text-5xl">🎉</div>
            <h2 className="font-rye text-[#6b3410] text-2xl sm:text-3xl">
              {levelIdx === LEVELS.length - 1 ? 'Cat Alchemist!' : 'Level Clear!'}
            </h2>
            <p className="text-[#8b4a1a] text-sm">
              {levelIdx < LEVELS.length - 1
                ? `Onwards to ${LEVELS[levelIdx + 1].label}!`
                : 'You matched all cats across all levels. You are legendary.'}
            </p>
            <div className="w-full rounded-2xl px-6 py-4 flex flex-col gap-1 items-center" style={{ background: '#00000010' }}>
              <span className="text-[#a0622a] text-xs uppercase tracking-widest">Score</span>
              <span className="font-rye text-[#e07b20] text-4xl">{score}</span>
              {score > bestScore - score && (
                <span className="text-xs text-[#3a9e5f] font-bold mt-1">✦ New Best!</span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full mt-1">
              {levelIdx < LEVELS.length - 1 && (
                <button
                  onClick={() => { const next = levelIdx + 1; setLevelIdx(next); startLevel(next); }}
                  className="w-full py-4 rounded-full font-bold text-white shadow-xl active:scale-95 text-base"
                  style={{ background: 'linear-gradient(135deg, #e07b20, #f5a623)' }}
                >
                  Next Level →
                </button>
              )}
              <button
                onClick={() => { setScore(0); setLevelIdx(0); startLevel(0); }}
                className="w-full py-4 rounded-full font-bold active:scale-95 text-base border-2"
                style={{ background: 'transparent', color: '#a0622a', borderColor: '#d0a070' }}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── LOSS OVERLAY ── */}
      {phase === 'lost' && (
        <div className="fade-in fixed inset-0 flex flex-col items-center justify-center z-50 px-5"
          style={{ background: 'rgba(253,240,220,0.92)', backdropFilter: 'blur(8px)' }}>
          <div className="fade-in flex flex-col items-center gap-4 w-full max-w-xs text-center">
            <div className="text-5xl">⏰</div>
            <h2 className="font-rye text-[#6b3410] text-2xl sm:text-3xl">Time's Up!</h2>
            <p className="text-[#8b4a1a] text-sm">
              You reached <span className="text-[#e07b20] font-bold">{level.label}</span> with {pairsMatched} of {totalPairs} pairs matched.
            </p>
            <div className="w-full rounded-2xl px-6 py-4 flex flex-col gap-1 items-center" style={{ background: '#00000010' }}>
              <span className="text-[#a0622a] text-xs uppercase tracking-widest">Score</span>
              <span className="font-rye text-[#e07b20] text-4xl">{score}</span>
            </div>
            <div className="flex flex-col gap-2 w-full mt-1">
              <button
                onClick={() => startLevel(levelIdx)}
                className="w-full py-4 rounded-full font-bold text-white shadow-xl active:scale-95 text-base"
                style={{ background: 'linear-gradient(135deg, #e07b20, #f5a623)' }}
              >
                Try Again
              </button>
              <button
                onClick={() => { setScore(0); setLevelIdx(0); startLevel(0); }}
                className="w-full py-4 rounded-full font-bold active:scale-95 text-base border-2"
                style={{ background: 'transparent', color: '#a0622a', borderColor: '#d0a070' }}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
