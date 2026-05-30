'use client';

import { useEffect, useRef } from 'react';

export default function BoothLocationAnimation() {
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pathRef.current || !carRef.current) return;

    let carAnim: { pause: () => void } | null = null;
    let drawAnim: { pause: () => void } | null = null;

    import('animejs').then(({ animate, svg }) => {
      carAnim = animate(carRef.current!, {
        ease: 'linear',
        duration: 3000,
        loop: true,
        loopDelay: 1000,
        ...svg.createMotionPath(pathRef.current!),
      });

      drawAnim = animate(svg.createDrawable(pathRef.current!), {
        draw: ['0 0', '0 1'],
        ease: 'linear',
        duration: 3000,
        loop: true,
        loopDelay: 1000,
      });
    });

    return () => {
      carAnim?.pause();
      drawAnim?.pause();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 750"
        style={{
          fillRule: 'evenodd',
          clipRule: 'evenodd',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: 1.5,
        }}
      >
        <path
          ref={pathRef}
          d="M890.25,588.75l0,-84l-62.25,0l0,-95.25l-132,0l0,24.75"
          style={{ fill: 'none', stroke: '#ffb700', strokeWidth: '9px' }}
        />
      </svg>
      {/* Car marker — a small gold square that follows the path */}
      <div
        ref={carRef}
        style={{
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 16,
        background: 'rgb(255, 183, 0)',
        left: '-12px',
        top: '-12px',
        boxShadow: '0 0 8px rgb(0, 0, 0)',
        }}
      />
    </div>
  );
}
