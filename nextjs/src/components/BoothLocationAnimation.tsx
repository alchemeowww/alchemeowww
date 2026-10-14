'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type BoothLocationAnimationProps = {
  imageSrc: string;
  imageAlt: string;
  svgSrc: string;
  drawSvgSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  motionPathSelector?: string;
  drawSelector?: string;
  markerColor?: string;
  markerSize?: number;
  pathDuration?: number;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
};

const DRAWABLE_SHAPES = 'path, line, polyline, polygon, circle, ellipse, rect';

function useSvgMarkup(src?: string) {
  const [markup, setMarkup] = useState('');

  useEffect(() => {
    setMarkup('');
    if (!src) return;
    const controller = new AbortController();

    fetch(src, { signal: controller.signal })
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
        setMarkup(new XMLSerializer().serializeToString(svgElement));
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) console.error(error);
      });

    return () => controller.abort();
  }, [src]);

  return markup;
}

export default function BoothLocationAnimation({
  imageSrc,
  imageAlt,
  svgSrc,
  drawSvgSrc,
  imageWidth = 1200,
  imageHeight = 800,
  motionPathSelector = '[data-motion-path], path',
  drawSelector = 'path, text',
  markerColor = '#ffb700',
  markerSize = 20,
  pathDuration = 3000,
  className = '',
  imageClassName = 'h-auto w-full object-contain',
  overlayClassName = '',
}: BoothLocationAnimationProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawOverlayRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const svgMarkup = useSvgMarkup(svgSrc);
  const drawSvgMarkup = useSvgMarkup(drawSvgSrc);

  useEffect(() => {
    const svgElement = overlayRef.current?.querySelector('svg');
    const motionPath = svgElement?.querySelector<SVGPathElement>(motionPathSelector);
    const drawTargets = Array.from(
      svgElement?.querySelectorAll<SVGGraphicsElement>(drawSelector) ?? []
    );
    const drawSvg = drawOverlayRef.current?.querySelector('svg');
    if (drawSvg) {
      const tagged = drawSvg.querySelectorAll<SVGGraphicsElement>(drawSelector);
      drawTargets.push(
        ...(tagged.length ? tagged : drawSvg.querySelectorAll<SVGGraphicsElement>(DRAWABLE_SHAPES))
      );
    }
    if (!motionPath || !markerRef.current) return;

    let cancelled = false;
    const animations: Array<{ pause: () => void }> = [];

    import('animejs').then(({ animate, svg, stagger }) => {
      if (cancelled) return;

      animations.push(
        animate(markerRef.current!, {
          ease: 'linear',
          duration: pathDuration,
          loop: true,
          loopDelay: 1000,
          ...svg.createMotionPath(motionPath),
        }),
        animate(svg.createDrawable(motionPath), {
          draw: ['0 0', '0 1'],
          ease: 'linear',
          duration: pathDuration,
          loop: true,
          loopDelay: 1000,
        })
      );

      if (drawTargets.length) {
        animations.push(
          animate(svg.createDrawable(drawTargets), {
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
  }, [svgMarkup, drawSvgMarkup, pathDuration, motionPathSelector, drawSelector]);

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
          ref={drawOverlayRef}
          className="absolute inset-0"
          dangerouslySetInnerHTML={{ __html: drawSvgMarkup }}
        />
        <div
          ref={markerRef}
          className="absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_8px_rgb(0,0,0)]"
          style={{ backgroundColor: markerColor, width: markerSize, height: markerSize }}
        />
      </div>
    </div>
  );
}
