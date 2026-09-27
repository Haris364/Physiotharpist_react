import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CalendarCheck, Sparkles } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import SmartImage from './ui/SmartImage';
import { StaggerText } from './ui/Reveal';
import { EASE } from '../lib/motion';
import { image } from '../data/images';

const trustPoints = ['Personalized Care', 'Evidence-Based Treatment', 'One-on-One Sessions'];

const rise = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: EASE },
});

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-paper pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-28 lg:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_36rem_at_78%_-8%,rgba(217,239,233,0.9),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-mint/30 blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12 xl:gap-20">
          <div className="lg:col-span-6 xl:col-span-5">
            <motion.p
              {...(reduce ? { initial: false } : rise(0.05))}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-teal"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
              Physiotherapy
              <span className="text-ink-300" aria-hidden="true">
                /
              </span>
              Rehabilitation
              <span className="text-ink-300" aria-hidden="true">
                /
              </span>
              Wellness
            </motion.p>

            <h1 className="mt-7 text-display-xl">
              <StaggerText text="Move Better." delay={0.1} className="block" />
              <StaggerText
                text="Live Stronger."
                delay={0.32}
                className="block italic text-teal"
              />
            </h1>

            <motion.p
              {...(reduce ? { initial: false } : rise(0.5))}
              className="mt-8 max-w-lg text-lede text-ink-600"
            >
              Personalized physiotherapy, rehabilitation and movement care built around one
              person — your body, your goals, your lifestyle. No conveyor-belt appointments, no
              guesswork.
            </motion.p>

            <motion.div
              {...(reduce ? { initial: false } : rise(0.62))}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button to="/contact#appointment" variant="primary" size="lg" icon={CalendarCheck}>
                Book an Appointment
              </Button>
              <Button to="/treatments" variant="outline" size="lg" icon={ArrowRight}>
                Explore Treatments
              </Button>
            </motion.div>

            <motion.ul
              {...(reduce ? { initial: false } : rise(0.74))}
              className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink/10 pt-6"
            >
              {trustPoints.map((point, i) => (
                <li key={point} className="flex items-center gap-3">
                  {i > 0 ? (
                    <span className="hidden h-1 w-1 rounded-full bg-ink/20 sm:block" aria-hidden="true" />
                  ) : null}
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-teal" strokeWidth={1.6} aria-hidden="true" />
                  <span className="text-[0.82rem] text-ink-500">{point}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="relative lg:col-span-6 xl:col-span-7">
            <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
              <div className="h-[68%] w-[78%] -translate-x-[14%] rounded-[42%_58%_52%_48%/46%_40%_60%_54%] bg-mint" />
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 1.05, y: 26 }}
              animate={reduce ? {} : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
              className="relative"
            >
              <SmartImage
                photo={image.hero}
                aspect={4 / 5}
                sizes="(min-width: 1024px) 52vw, 92vw"
                priority
                className="aspect-4/5 w-full rounded-4xl shadow-lift sm:aspect-16/12 lg:aspect-4/5"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-5 -left-5 hidden h-28 w-28 rounded-full border border-teal/30 lg:block"
              />
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
              className="absolute -bottom-6 left-0 w-[10.5rem] rounded-2xl border border-ink/8 bg-paper/92 p-4 shadow-lift backdrop-blur-md sm:-bottom-8 sm:w-[11.5rem] sm:p-5 lg:-left-10"
            >
              <p className="font-display text-[2rem] font-light leading-none text-ink">
                10<span className="text-teal">+</span>
              </p>
              <p className="mt-2 text-[0.72rem] leading-snug text-ink-500">Years of experience</p>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
              className="absolute -right-1 top-6 w-[9.5rem] rounded-2xl border border-ink/8 bg-paper/92 p-4 shadow-lift backdrop-blur-md sm:top-10 sm:w-[10.5rem] sm:p-5 lg:-right-8"
            >
              <p className="font-display text-[2rem] font-light leading-none text-ink">
                500<span className="text-teal">+</span>
              </p>
              <p className="mt-2 text-[0.72rem] leading-snug text-ink-500">Patients supported</p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
