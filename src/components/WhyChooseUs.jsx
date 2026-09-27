import Container from './ui/Container';
import { Eyebrow, Reveal, RevealGroup, RevealItem } from './ui';
import { whyChooseUs } from '../data/process';

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 sm:py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/4 h-[30rem] w-[30rem] rounded-full bg-teal/18 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:4rem_4rem] opacity-[0.06] [mask-image:radial-gradient(70%_60%_at_30%_20%,black,transparent)]"
      />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal y={16}>
                <Eyebrow light>Why patients choose us</Eyebrow>
                <h2 className="mt-6 text-display-md text-white">
                  Your Recovery Deserves a{' '}
                  <span className="italic text-mint">Personal Approach.</span>
                </h2>
                <p className="mt-7 max-w-md text-[1.02rem] leading-[1.75] text-white/60">
                  Six things that are not a feature list — they are simply how a well-run
                  physiotherapy practice should work.
                </p>
              </Reveal>
            </div>
          </div>

          <RevealGroup stagger={0.07} className="grid gap-x-12 sm:grid-cols-2 lg:col-span-7">
            {whyChooseUs.map((item) => (
              <RevealItem key={item.number}>
                <div className="group border-t border-white/12 py-7 transition-colors duration-500 hover:border-mint/50 lg:py-8">
                  <span className="font-display text-[2.4rem] font-light leading-none text-white/18 transition-colors duration-500 group-hover:text-mint/60">
                    {item.number}
                  </span>
                  <h3 className="mt-4 font-display text-display-xs text-white">{item.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-white/55">{item.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
