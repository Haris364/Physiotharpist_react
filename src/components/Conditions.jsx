import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircleQuestion } from 'lucide-react';
import Container from './ui/Container';
import SmartImage from './ui/SmartImage';
import { Eyebrow, Reveal, RevealGroup, RevealItem } from './ui';
import { conditions } from '../data/conditions';
import { image } from '../data/images';
import { cn } from '../lib/cn';

export default function Conditions() {
  return (
    <section id="conditions" className="relative overflow-hidden bg-paper py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal y={16}>
              <Eyebrow>Conditions</Eyebrow>
              <h2 className="mt-6 max-w-2xl text-display-md">Conditions We Help You Manage</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <Reveal delay={0.12}>
              <p className="max-w-md text-[1.02rem] leading-[1.75] text-ink-600">
                Most people arrive with a symptom rather than a diagnosis. These are the
                presentations we see most often — and the ones we have helped hundreds of people
                through.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal y={30} className="lg:sticky lg:top-28">
              <div className="relative">
                <SmartImage
                  photo={image.clinicSession}
                  aspect={3 / 4}
                  sizes="(min-width: 1024px) 30vw, 92vw"
                  className="aspect-3/4 w-full rounded-3xl shadow-lift"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 hidden h-32 w-32 rounded-full border border-teal/25 sm:block"
                />
              </div>

              <Reveal delay={0.18} className="relative z-10 -mt-8 ml-5 mr-5">
                <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-lift sm:p-6">
                  <p className="font-display text-[2.1rem] font-light leading-none text-ink">
                    8
                    <span className="text-teal">+</span>
                  </p>
                  <p className="mt-2.5 text-[0.85rem] leading-relaxed text-ink-500">
                    Common presentations treated here each week, from desk-related neck pain to
                    ACL reconstruction and chronic arthritis.
                  </p>
                </div>
              </Reveal>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <RevealGroup stagger={0.06} className="grid gap-x-10 sm:grid-cols-2">
              {conditions.map((condition) => (
                <RevealItem key={condition.slug}>
                  <Link
                    to={`/conditions#${condition.slug}`}
                    className="group relative flex items-center justify-between gap-5 border-t border-ink/12 py-5 transition-colors duration-400 hover:border-teal/45 sm:py-6"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.63rem] font-medium uppercase tracking-[0.2em] text-ink-400 transition-colors duration-400 group-hover:text-teal">
                        {condition.line}
                      </span>
                      <span className="mt-2 block font-display text-[1.4rem] font-light leading-tight text-ink transition-transform duration-500 ease-premium group-hover:translate-x-1 sm:text-[1.6rem]">
                        {condition.name}
                      </span>
                      <span className="mt-2 block max-w-xs text-[0.85rem] leading-relaxed text-ink-500">
                        {condition.summary}
                      </span>
                    </span>

                    <span className="relative flex shrink-0 items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'hidden h-[4.5rem] w-20 overflow-hidden rounded-xl bg-paper-200 opacity-0 shadow-soft transition-all duration-500 ease-premium group-hover:opacity-100 lg:block',
                          'lg:group-hover:scale-100 lg:scale-90',
                        )}
                      >
                        <SmartImage
                          photo={condition.image}
                          aspect={4 / 3}
                          widths={[160, 240, 320]}
                          sizes="80px"
                          className="h-full w-full"
                        />
                      </span>
                      <ArrowUpRight
                        className="h-[1.125rem] w-[1.125rem] text-ink-300 transition-all duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.15} className="mt-10">
              <div className="flex flex-col items-start gap-5 rounded-2xl border border-dashed border-ink/15 bg-mint/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-teal">
                    <MessageCircleQuestion className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-display-xs text-ink">
                      Not sure what to call it?
                    </p>
                    <p className="mt-1.5 max-w-md text-[0.88rem] leading-relaxed text-ink-600">
                      Describe your symptoms to the clinic assistant in the corner of the screen and
                      it will point you to the right place to start.
                    </p>
                  </div>
                </div>
                <Link
                  to="/conditions"
                  className="group inline-flex shrink-0 items-center gap-2 text-[0.88rem] font-medium text-ink transition-colors hover:text-teal"
                >
                  <span className="link-underline">Browse all conditions</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-400 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
