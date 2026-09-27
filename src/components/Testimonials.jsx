import Container from './ui/Container';
import TestimonialCarousel from './ui/TestimonialCarousel';
import { Eyebrow, Reveal } from './ui';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-sand-300 py-16 sm:py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-mint/40 blur-3xl"
      />

      <Container className="relative">
        <Reveal y={16} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Patient stories</Eyebrow>
            <h2 className="mt-6 text-display-md">Real People. <span className="italic text-teal">Real Progress.</span></h2>
          </div>
          <p className="max-w-xs text-[0.88rem] leading-relaxed text-ink-500">
            Individual experiences vary. These are the words patients chose to share after a course
            of treatment.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 lg:mt-16">
          <TestimonialCarousel items={testimonials} />
        </Reveal>
      </Container>
    </section>
  );
}
