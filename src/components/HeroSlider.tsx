import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  src: string;
  alt: string;
  position?: string;
}

const SLIDES: Slide[] = [
  {
    src: '/hero-slides/comfort-solutions.jpeg',
    alt: 'Nordic Air Comfort Solutions brand poster',
    position: 'center',
  },
  {
    src: '/hero-slides/hero-1.jpeg',
    alt: 'Split air conditioner installed above a framed zebra photograph',
    position: 'center 32%',
  },
  {
    src: '/hero-slides/hero-2.jpeg',
    alt: 'Two split air conditioners installed in an office',
    position: 'center 40%',
  },
  {
    src: '/hero-slides/hero-3.jpeg',
    alt: 'Alaska split air conditioner installed near a skylight',
    position: 'center 30%',
  },
];

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD_PX = 40;

export const HeroSlider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragged = useRef(false);

  const count = SLIDES.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || count < 2) return;
    const timer = window.setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, reducedMotion, count, goTo]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
    dragged.current = false;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    if (Math.abs(event.clientX - dragStartX.current) > 6) dragged.current = true;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    if (delta < 0) next();
    else prev();
  };

  const onPointerCancel = () => {
    dragStartX.current = null;
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Nordic Air installation gallery"
      className="mt-5 rounded-[1.4rem] bg-[#E7F2FC] aspect-[3/2] relative overflow-hidden select-none touch-pan-y"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onPointerLeave={onPointerCancel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {SLIDES.map((slide, slideIndex) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          draggable={false}
          aria-hidden={slideIndex !== index}
          loading="eager"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none ${
            slideIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectPosition: slide.position ?? 'center' }}
        />
      ))}

      <div
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#042B60]/55 via-[#042B60]/10 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => {
              if (dragged.current) return;
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#042B60] border border-white/70 shadow-sm backdrop-blur-sm transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (dragged.current) return;
              next();
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#042B60] border border-white/70 shadow-sm backdrop-blur-sm transition-colors cursor-pointer"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>

          <div className="absolute inset-x-0 bottom-2.5 z-10 flex items-center justify-center">
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-[#042B60]/45 backdrop-blur-sm">
              {SLIDES.map((slide, slideIndex) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => goTo(slideIndex)}
                  aria-label={`Show image ${slideIndex + 1} of ${count}`}
                  aria-current={slideIndex === index}
                  className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none cursor-pointer ${
                    slideIndex === index ? 'w-4 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/85'
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
