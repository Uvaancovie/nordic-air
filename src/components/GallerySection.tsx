import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  position?: string;
}

const IMAGES: GalleryImage[] = [
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

const SWIPE_THRESHOLD_PX = 40;

export const GallerySection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragged = useRef(false);

  const count = IMAGES.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') prev();
      if (event.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [prev, next]);

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
    <section id="gallery" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#042B60] font-mono">
                Installation Gallery
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#39A9EC]" />
              <span className="text-xs font-semibold text-slate-600">
                Real Work, Real Homes
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#042B60]">
              See the standard behind every install.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Tap a thumbnail, swipe, or use the arrow keys to browse recent Nordic Air work across Durban homes and offices.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono font-bold text-slate-600 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#39A9EC]/5 text-[#042B60] border border-slate-200 hover:bg-[#39A9EC]/15 hover:border-[#39A9EC]/30 transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#39A9EC]/5 text-[#042B60] border border-slate-200 hover:bg-[#39A9EC]/15 hover:border-[#39A9EC]/30 transition-colors cursor-pointer"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Nordic Air installation gallery"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onPointerLeave={onPointerCancel}
            className="lg:col-span-9 rounded-3xl bg-[#E7F2FC] aspect-[16/10] relative overflow-hidden select-none touch-pan-y border border-slate-200 shadow-[0_30px_80px_-40px_rgba(4,43,96,0.35)]"
          >
            {IMAGES.map((image, imageIndex) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                draggable={false}
                aria-hidden={imageIndex !== index}
                loading="eager"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${
                  imageIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ objectPosition: image.position ?? 'center' }}
              />
            ))}

            <div
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#042B60]/60 via-[#042B60]/10 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
              <div className="flex items-end justify-between gap-4">
                <p className="text-[11px] font-semibold text-white/90 line-clamp-1">
                  {IMAGES[index].alt}
                </p>
                <div className="flex items-center gap-1.5 shrink-0">
                  {IMAGES.map((image, imageIndex) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => goTo(imageIndex)}
                      aria-label={`Show image ${imageIndex + 1} of ${count}`}
                      aria-current={imageIndex === index}
                      className={`h-1.5 rounded-full transition-all duration-300 motion-reduce:transition-none cursor-pointer ${
                        imageIndex === index ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/85'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (dragged.current) return;
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#042B60] border border-white/70 shadow-sm backdrop-blur-sm transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (dragged.current) return;
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/85 hover:bg-white text-[#042B60] border border-white/70 shadow-sm backdrop-blur-sm transition-colors cursor-pointer"
            >
              <ChevronRight size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div className="lg:col-span-3 grid grid-cols-4 lg:grid-cols-2 gap-3 w-full">
            {IMAGES.map((image, imageIndex) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(imageIndex)}
                aria-label={`Show image ${imageIndex + 1} of ${count}`}
                aria-current={imageIndex === index}
                className={`group relative aspect-[4/3] rounded-xl overflow-hidden border transition-all cursor-pointer ${
                  imageIndex === index
                    ? 'border-[#088DD4] ring-2 ring-[#088DD4]/40 shadow-sm'
                    : 'border-slate-200 hover:border-[#39A9EC]/50'
                }`}
              >
                <img
                  src={image.src}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    imageIndex === index ? 'opacity-100 scale-100' : 'opacity-70 group-hover:opacity-100 group-hover:scale-[1.03]'
                  }`}
                  style={{ objectPosition: image.position ?? 'center' }}
                />
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#042B60]/70 text-[10px] font-mono font-bold text-white">
                  {String(imageIndex + 1).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
