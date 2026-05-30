'use client';

import { useEffect, useRef } from 'react';

export default function BoothLocationAnimation() {
  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pathRef.current || !carRef.current) return;

    let carAnim: { pause: () => void } | null = null;
    let drawAnim: { pause: () => void } | null = null;
    let lineAnim: { pause: () => void } | null = null;

    import('animejs').then(({ animate, svg, stagger }) => {
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

      lineAnim = animate(svg.createDrawable('.line'), {
        keyframes: [
          { draw: '0 1', ease: 'inQuad', duration: 2000 },
          { draw: '0 1', ease: 'linear', duration: 1500 },
          { draw: '1 1', ease: 'outQuad', duration: 500 },
        ],
        delay: stagger(100),
        loop: true,
      });
    });

    return () => {
      carAnim?.pause();
      drawAnim?.pause();
      lineAnim?.pause();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="absolute inset-0 z-10"
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

      <svg
        className="absolute inset-0 z-20"
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
        <g>
          <path
            className="line"
            d="M610.5,395.55c0,10.928 19.324,19.8 43.125,19.8c3.773,0 7.53,-0.227 11.174,-0.676l19.014,10.576l-5.442,-13.484c11.52,-3.706 18.379,-9.758 18.379,-16.216c0,-10.928 -19.324,-19.8 -43.125,-19.8c-23.801,0 -43.125,8.872 -43.125,19.8Z"
                style={{ fill: '#fff', fillOpacity: 0.67, stroke: '#ffb700', strokeWidth: '4px' }}
          />
          <g transform="matrix(0.596708,0,0,0.596708,118.055956,93.534013)">
            <rect x="842" y="482.195" width="106.954" height="62.059" style={{ fill: '#fff', fillOpacity: 0 }} />
            <g transform="matrix(40.220646,0,0,40.220646,948.953925,520)" />
            <text
              className="line"
              x="842px"
              y="520px"
              style={{
                fontFamily: "'Papyrus', sans-serif",
                fontSize: '40.221px',
                fill: '#ffb700',
                fillOpacity: 0,
                stroke: '#ffb700',
                strokeWidth: '2.51px',
                strokeLinecap: 'butt',
                strokeMiterlimit: 2,
              }}
            >
              C17-18
            </text>
          </g>
        </g>
      </svg>
      {/* Car marker — a small gold square that follows the path */}
      <div
        ref={carRef}
        className="absolute z-30 h-2 w-2 -top-1 -left-1 rounded-full bg-[#ffb700] shadow-[0_0_8px_rgb(0,0,0)] 
              sm:h-5 sm:w-5 sm:-top-2.5 sm:-left-2.5 
              md:h-6 md:w-6 md:-top-3 md:-left-3"
      />
    </div>
  );
}
