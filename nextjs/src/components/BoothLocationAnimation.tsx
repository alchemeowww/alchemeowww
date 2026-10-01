'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type BoothLocationAnimationProps = {
  imageSrc: string;
  imageAlt: string;
  svgSrc: string;
  imageWidth?: number;
  imageHeight?: number;
  motionPathSelector?: string;
  drawSelector?: string;
  markerColor?: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
};

export default function BoothLocationAnimation({
  imageSrc,
  imageAlt,
  svgSrc,
  imageWidth = 1200,
  imageHeight = 800,
  motionPathSelector = '[data-motion-path]',
  drawSelector = '[data-draw]',
  markerColor = '#ffb700',
  className = '',
  imageClassName = 'h-auto w-full object-contain',
  overlayClassName = '',
}: BoothLocationAnimationProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setSvgMarkup('');

    fetch(svgSrc, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load SVG: ${response.status}`);
        return response.text();
      })
      .then((source) => {
        const document = new DOMParser().parseFromString(source, 'image/svg+xml');
        const svgElement = document.documentElement;
        if (svgElement.localName !== 'svg' || document.querySelector('parsererror')) {
          throw new Error('The animation asset must be a valid SVG document.');
        }

        svgElement.querySelectorAll('script, foreignObject').forEach((element) => element.remove());
        svgElement.querySelectorAll('*').forEach((element) => {
          for (const attribute of Array.from(element.attributes)) {
            if (/^on/i.test(attribute.name) || /^javascript:/i.test(attribute.value.trim())) {
              element.removeAttribute(attribute.name);
            }
          }
        });
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', '100%');
        svgElement.setAttribute('class', 'absolute inset-0 h-full w-full');
        setSvgMarkup(new XMLSerializer().serializeToString(svgElement));
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) console.error(error);
      });

    return () => controller.abort();
  }, [svgSrc]);

  useEffect(() => {
    const svgElement = overlayRef.current?.querySelector('svg');
    const motionPath = svgElement?.querySelector<SVGPathElement>(motionPathSelector);
    const drawTargets = svgElement?.querySelectorAll<SVGGraphicsElement>(drawSelector);
    if (!motionPath || !markerRef.current) return;

    let cancelled = false;
    const animations: Array<{ pause: () => void }> = [];

    import('animejs').then(({ animate, svg, stagger }) => {
      if (cancelled) return;

      animations.push(
        animate(markerRef.current!, {
          ease: 'linear',
          duration: 3000,
          loop: true,
          loopDelay: 1000,
          ...svg.createMotionPath(motionPath),
        }),
        animate(svg.createDrawable(motionPath), {
          draw: ['0 0', '0 1'],
          ease: 'linear',
          duration: 3000,
          loop: true,
          loopDelay: 1000,
        })
      );

      if (drawTargets?.length) {
        animations.push(
          animate(svg.createDrawable(Array.from(drawTargets)), {
            keyframes: [
              { draw: '0 1', ease: 'inQuad', duration: 2000 },
              { draw: '0 1', ease: 'linear', duration: 1500 },
              { draw: '1 1', ease: 'outQuad', duration: 500 },
            ],
            delay: stagger(100),
            loop: true,
          })
        );
      }
    });

    return () => {
      cancelled = true;
      animations.forEach((animation) => animation.pause());
    };
  }, [svgMarkup, motionPathSelector, drawSelector]);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        unoptimized
        className={imageClassName}
      />
      <div
        className={`pointer-events-none absolute inset-0 ${overlayClassName}`}
      >
        <div
          ref={overlayRef}
          className="absolute inset-0"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
        <div
          ref={markerRef}
          className="absolute left-0 top-0 z-30 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_8px_rgb(0,0,0)] sm:h-5 sm:w-5"
          style={{ backgroundColor: markerColor }}
        />
      </div>
    </div>
  );
}
