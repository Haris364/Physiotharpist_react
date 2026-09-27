import { Award, ArrowRight, Check } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import SmartImage from './ui/SmartImage';
import { Eyebrow, Reveal, RevealGroup, RevealItem, SectionHeading } from './ui';
import { credentials, philosophy } from '../data/process';
import { image } from '../data/images';
import { practitioner } from '../data/site';

const expertise = [
  'Sports & orthopaedic rehabilitation',
  'Spinal pain and nerve-related symptoms',
  'Post-surgical recovery and gait retraining',
  'Balance, falls prevention and geriatrics',
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-paper py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative lg:sticky lg:top-28">
              <Reveal y={34} soft>
                <div className="relative">
                  <SmartImage
                    photo={image.practitioner}
                    aspect={4 / 5}
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="aspect-4/5 w-full rounded-4xl shadow-lift"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -right-4 -top-4 hidden h-full w-full rounded-4xl border border-teal/25 lg:block"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.2} className="relative z-10 -mt-10 ml-4 mr-6 sm:ml-8">
                <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-lift sm:p-6">
                  <p className="font-display text-[1.4rem] font-light italic leading-tight text-ink">
                    {practitioner.name}
                  </p>
                  <p className="mt-1.5 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-teal">
                    {practitioner.credentials}
                  </p>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-500">
                    {practitioner.role} · {practitioner.yearsExperience} years in practice
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-4">
            <SectionHeading
              eyebrow="About the practice"
              title="Care that understands your body, your goals, and your lifestyle."
              maxWidth="max-w-2xl"
            />

            <Reveal delay={0.1} className="mt-7 space-y-5 text-[1.02rem] leading-[1.78] text-ink-600">
              <p>
                Alto Physiotherapy is a small, deliberately unhurried practice. Every appointment
                is one-to-one, every plan is written for the person in front of me, and every
                clinical decision is something we discuss rather than something that happens to you.
              </p>
              <p>
                I qualified as a Doctor of Physical Therapy and have spent twelve years working
                across orthopaedic, neurological and age-related rehabilitation — from elite
                athletes returning to sport, to people relearning how to walk after a stroke. The
                common thread is measured, progressive loading and the confidence to trust your own
                body again.
              </p>
            </Reveal>

            <RevealGroup className="mt-11 space-y-0" stagger={0.08}>
              {philosophy.map((item) => (
                <RevealItem
                  key={item.title}
                  className="flex gap-5 border-t border-ink/10 py-5 first:border-t-0 first:pt-0"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-teal" strokeWidth={2} aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-display-xs text-ink">{item.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">{item.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="mt-11 grid gap-8 sm:grid-cols-2 sm:gap-10">
              <Reveal delay={0.1}>
                <h3 className="flex items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-400">
                  <Award className="h-3.5 w-3.5 text-teal" strokeWidth={1.7} aria-hidden="true" />
                  Credentials
                </h3>
                <ul className="mt-5 space-y-4">
                  {credentials.map((item) => (
                    <li key={item.title} className="border-l-2 border-teal/25 pl-4">
                      <p className="text-[0.92rem] font-medium text-ink">{item.title}</p>
                      <p className="mt-1 text-[0.8rem] text-ink-500">{item.note}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.18}>
                <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-400">
                  Areas of expertise
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {expertise.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.92rem] text-ink-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal delay={0.24} className="mt-11">
              <Eyebrow className="sr-only">Practice philosophy</Eyebrow>
              <Button to="/about" variant="outline" icon={ArrowRight}>
                Learn More About the Practice
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
