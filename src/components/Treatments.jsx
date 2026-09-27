import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Container from './ui/Container';
import SmartImage from './ui/SmartImage';
import { Eyebrow, Reveal } from './ui';
import { EASE } from '../lib/motion';
import { treatments } from '../data/treatments';
import { cn } from '../lib/cn';

export default function Treatments() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = treatments[active];

  return (
    <section id="treatments" className="relative overflow-hidden bg-sand-300 py-16 sm:py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:3.5rem_3.5rem] opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal y={16}>
                <Eyebrow>Treatments</Eyebrow>
                <h2 className="mt-6 text-display-md">Specialized Care for Better Movement</h2>
                <p className="mt-6 max-w-md text-[1.02rem] leading-[1.75] text-ink-600">
                  Eight treatment areas, one consistent method: assess properly, load
                  progressively, measure the result. Hover or focus a treatment to see how we
                  approach it.
                </p>
              </Reveal>

              <Reveal delay={0.15} className="mt-9 hidden lg:block">
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-paper shadow-lift">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current.slug}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
                      animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0.2 : 0.75, ease: EASE }}
                      className="absolute inset-0"
                    >
                      <SmartImage
                        photo={current.image}
                        aspect={4 / 3}
                        sizes="(min-width: 1024px) 38vw, 92vw"
                        className="h-full w-full"
                      />
                    </motion.div>
                  </AnimatePresence>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-mint">
                      {current.duration} · {current.session}
                    </p>
                    <p className="mt-2 font-display text-[1.25rem] font-light leading-snug text-white">
                      {current.short}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2} className="mt-8">
                <Link
                  to="/treatments"
                  className="group inline-flex items-center gap-2 text-[0.9rem] font-medium text-ink transition-colors hover:text-teal"
                >
                  <span className="link-underline">View all treatments in detail</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-400 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="border-t border-ink/12" onMouseLeave={() => setActive(0)}>
              {treatments.map((treatment, index) => {
                const Icon = treatment.icon;
                const isActive = index === active;

                return (
                  <li key={treatment.slug} className="border-b border-ink/12">
                    <Link
                      to={`/treatments#${treatment.slug}`}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'group relative flex items-start gap-5 overflow-hidden px-4 py-6 transition-colors duration-500 ease-premium sm:px-6 lg:py-7',
                        isActive ? 'bg-white/70' : 'hover:bg-white/45',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-y-0 left-0 w-[3px] origin-top bg-teal transition-transform duration-600 ease-premium',
                          isActive ? 'scale-y-100' : 'scale-y-0',
                        )}
                      />

                      <span
                        className={cn(
                          'w-8 shrink-0 pt-1 font-display text-[0.85rem] tabular-nums transition-colors duration-400',
                          isActive ? 'text-teal' : 'text-ink-300',
                        )}
                      >
                        {treatment.number}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-3">
                          <Icon
                            className={cn(
                              'h-4 w-4 shrink-0 transition-all duration-500 ease-premium',
                              isActive
                                ? 'scale-100 text-teal opacity-100'
                                : 'scale-75 text-teal opacity-0',
                            )}
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                          <span
                            className={cn(
                              'font-display text-[1.3rem] font-light leading-tight transition-colors duration-400 sm:text-[1.5rem]',
                              isActive ? 'text-ink' : 'text-ink/70',
                            )}
                          >
                            {treatment.title}
                          </span>
                        </span>

                        <span
                          className={cn(
                            'grid transition-[grid-template-rows,opacity,margin] duration-600 ease-premium',
                            isActive
                              ? 'mt-2.5 grid-rows-[1fr] opacity-100'
                              : 'mt-0 grid-rows-[0fr] opacity-0',
                          )}
                        >
                          <span className="overflow-hidden">
                            <span className="block max-w-xl text-[0.92rem] leading-relaxed text-ink-600">
                              {treatment.summary}
                            </span>
                          </span>
                        </span>
                      </span>

                      <ArrowUpRight
                        className={cn(
                          'mt-1 h-5 w-5 shrink-0 transition-all duration-500 ease-premium',
                          isActive
                            ? 'translate-x-0 text-teal opacity-100'
                            : '-translate-x-2 text-ink/40 opacity-0',
                        )}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </Link>

                    <div className="px-4 pb-6 sm:px-6 lg:hidden">
                      <div className="flex gap-4 overflow-hidden rounded-2xl bg-white shadow-soft">
                        <SmartImage
                          photo={treatment.image}
                          aspect={1}
                          widths={[128, 192, 256]}
                          sizes="128px"
                          className="h-24 w-24 shrink-0 sm:h-28 sm:w-32"
                        />
                        <p className="py-4 pr-4 text-[0.85rem] leading-relaxed text-ink-600">
                          {treatment.summary}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
