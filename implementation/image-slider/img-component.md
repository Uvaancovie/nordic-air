# Hero Image Slider

Interactive image slider that replaces the static AC illustration inside the Hero product card.

- Component: `src/components/HeroSlider.tsx`
- Mounted in: `src/components/Hero.tsx` (inside the product panel, below the "Inverter Mid-Wall Split" header)
- Images: `public/hero-slides/`

## Behaviour

| Feature | Detail |
| --- | --- |
| Transition | Crossfade, 700ms ease-out (`motion-reduce:transition-none`) |
| Autoplay | Advances every 5s; disabled when `prefers-reduced-motion: reduce` |
| Pausing | Pauses on hover, on touch, and when the browser tab is hidden |
| Controls | Prev/next chevrons + clickable dot indicators |
| Swipe | Pointer drag; horizontal movement > 40px changes slide |
| Layout | `aspect-[3/2]` frame (`rounded-[1.4rem]`) inside the product card |
| Accessibility | `role="region"` + `aria-roledescription="carousel"`, labelled buttons, per-slide `alt`, inactive slides `aria-hidden` |

## Slide configuration

Slides are declared in the `SLIDES` array at the top of `HeroSlider.tsx`:

```ts
interface Slide {
  src: string;       // path under /public
  alt: string;       // accessible description
  position?: string; // CSS object-position for the crop focal point
}
```

The current set (from the `nordic-air-logo` storage bucket):

1. `/hero-slides/comfort-solutions.jpeg` — brand poster (converted from PNG for web), `center`
2. `/hero-slides/hero-1.jpeg` — wall split install, `center 32%`
3. `/hero-slides/hero-2.jpeg` — office installs, `center 40%`
4. `/hero-slides/hero-3.jpeg` — Alaska unit install, `center 30%`

## Adding or swapping images

1. Drop the file into `public/hero-slides/` (JPEG/PNG/WebP).
2. Add an entry to `SLIDES` with `src`, `alt`, and optionally `position` (e.g. `'center 30%'`) to frame the unit in the compact crop.
3. To replace an existing slide, reuse its filename — no code edit needed.

Portrait photos are cropped to the wide frame with `object-cover`. Adjust `position` per slide if the AC unit sits outside the visible strip.

## Notes

- No new dependencies; icons come from `lucide-react`.
- No text copy was added besides accessible labels/alt text.
- Placeholder slides are not generated — the slider ships with the four real bucket images above.
