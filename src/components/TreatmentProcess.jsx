import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Container from './ui/Container';
import { Eyebrow, Reveal, RevealGroup, RevealItem } from './ui';
import { EASE } from '../lib/motion';
import { processSteps } from '../data/process';

function Node({ step, index, isLast }) {
  const reduce = useReducedMotion();

  return (
    <RevealItem className="relative">
      <div className="flex items-center lg:block">
        <span
          aria-hidden="true"
          className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-paper font-display text-[0.8rem] tabular-nums text-ink transition-colors duration-500 ease-premium lg:h-12 lg:w-12"
        >
          <motion.span
            initial={reduce ? false : { scale: 0.4, opacity: 0 }}
            whileInView={reduce ? {} : { scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            className="flex h-full w-full items-center justify-center rounded-full bg-ink text-mint"
          >
            {index + 1}
          </motion.span>
        </span>
        {!isLast ? (
          <span
            aria-hidden="true"
            className="mx-4 hidden h-px flex-1 bg-ink/12 lg:block lg:mx-0 lg:mb-6 lg:h-px lg:w-full"
          />
        ) : null}
      </div>

      <div className="pb-8 lg:pb-0 lg:pt-6">
        <p className="text-[0.63rem] font-medium uppercase tracking-[0.2em] text-teal">
          {step.number} · {step.duration}
        </p>
        <h3 className="mt-2.5 font-display text-display-xs text-ink">{step.title}</h3>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-600">{step.body}</p>
        <ul className="mt-4 space-y-1.5">
          {step.detail.map((item) => (
            <li key={item} className="flex gap-2.5 text-[0.82rem] text-ink-500">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal/60" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </RevealItem>
  );
}

export default function TreatmentProcess() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.72', 'end 0.62'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const scaleX = useTransform(smooth, [0, 1], [0, 1]);
  const scaleY = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section id="process" ref={ref} className="relative bg-paper py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal y={16} className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-6 text-display-md">Your Journey to Better Movement</h2>
          <p className="mt-6 text-[1.02rem] leading-[1.75] text-ink-600">
            Five stages, from the first conversation to independent recovery. You always know
            which stage you are in and what comes next.
          </p>
        </Reveal>

        <div className="relative mt-14 lg:mt-20">
          <div
            aria-hidden="true"
            className="absolute left-[1.375rem] top-0 hidden h-full w-px -translate-x-1/2 bg-ink/12 lg:left-0 lg:top-6 lg:h-px lg:w-full lg:translate-x-0"
          >
            <motion.div
              className="absolute inset-0 origin-top bg-teal lg:origin-left"
              style={reduce ? { scaleY: 1, scaleX: 1 } : { scaleY, scaleX }}
            />
          </div>

          <RevealGroup
            stagger={0.12}
            className="grid gap-y-2 lg:grid-cols-5 lg:gap-x-8"
          >
            {processSteps.map((step, index) => (
              <Node key={step.number} step={step} index={index} isLast={index === processSteps.length - 1} />
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
