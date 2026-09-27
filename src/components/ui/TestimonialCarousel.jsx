import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { EASE } from '../../lib/motion';
import { cn } from '../../lib/cn';
import Stars from './Stars';
import SmartImage from './SmartImage';

export default function TestimonialCarousel({ items, className }) {
  const [[index, direction], setState] = useState([0, 0]);
  const reduce = useReducedMotion();
  const liveId = useId();
  const touchStart = useRef(null);

  const go = useCallback(
    (next) => {
      setState(([current]) => {
        const length = items.length;
        const wrapped = (next + length) % length;
        return [wrapped, wrapped > current ? 1 : -1];
      });
    },
    [items.length],
  );

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight') go(index + 1);
      if (event.key === 'ArrowLeft') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index]);

  const active = items[index];
  const variants = {
    enter: (dir) => ({ opacity: 0, x: reduce ? 0 : dir * 40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
    exit: (dir) => ({ opacity: 0, x: reduce ? 0 : dir * -40, transition: { duration: 0.35, ease: EASE } }),
  };

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(delta) > 48) go(index + (delta < 0 ? 1 : -1));
    touchStart.current = null;
  };

  return (
    <div
      className={cn('relative', className)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Patient testimonials"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <div className="relative min-h-[19rem] sm:min-h-[17rem] lg:min-h-[21rem]">
            <Quote
              className="absolute -left-1 -top-6 h-16 w-16 text-teal/10"
              strokeWidth={1}
              aria-hidden="true"
            />
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.figure
                key={active.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                id={liveId}
                aria-live="polite"
                className="relative"
              >
                <Stars rating={active.rating} className="mb-7" />
                <blockquote>
                  <p className="font-display text-display-md font-light italic leading-[1.32] text-ink">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-9 flex items-center gap-4">
                  <SmartImage
                    photo={active.avatar}
                    aspect={1}
                    widths={[56, 112, 168]}
                    sizes="56px"
                    className="h-14 w-14 shrink-0 rounded-full"
                  />
                  <span>
                    <span className="block font-medium text-ink">{active.name}</span>
                    <span className="mt-0.5 block text-[0.82rem] text-ink-500">{active.type}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6 lg:col-span-4 lg:flex-col lg:items-end lg:justify-end">
          <div className="hidden w-full max-w-[13rem] lg:block" aria-hidden="true">
            <div className="h-px w-full bg-ink/12">
              <motion.div
                className="h-px bg-teal"
                animate={{ width: `${((index + 1) / items.length) * 100}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <span className="font-display text-sm text-ink-400 tabular-nums">
              <span className="text-ink">{String(index + 1).padStart(2, '0')}</span>
              <span className="mx-1.5">/</span>
              {String(items.length).padStart(2, '0')}
            </span>
            <span className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-400 ease-premium hover:border-ink/45 hover:bg-ink hover:text-white active:scale-95"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-400 ease-premium hover:border-ink/45 hover:bg-ink hover:text-white active:scale-95"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </span>
          </div>

          <ul className="flex gap-2 lg:mt-6">
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show testimonial ${i + 1} of ${items.length}`}
                  aria-current={i === index ? 'true' : undefined}
                  className={cn(
                    'block h-1.5 rounded-full transition-all duration-400 ease-premium',
                    i === index ? 'w-8 bg-teal' : 'w-1.5 bg-ink/20 hover:bg-ink/40',
                  )}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
