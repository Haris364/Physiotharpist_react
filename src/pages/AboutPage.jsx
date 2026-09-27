import { Link } from 'react-router-dom';
import { ArrowUpRight, Quote } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import SmartImage from '../components/ui/SmartImage';
import Stars from '../components/ui/Stars';
import { Eyebrow, Reveal, RevealGroup, RevealItem, SectionHeading } from '../components/ui';
import { Reveal as RevealBlock } from '../components/ui/Reveal';
import { useSeo } from '../lib/seo';
import { image } from '../data/images';
import { clinic, practitioner } from '../data/site';
import { credentials, philosophy } from '../data/process';
import { gallery } from '../data/images';

const milestones = [
  { year: '2015', title: 'Alto opens in Lakeside', body: 'A single treatment room, a waiting list from week one, and a plan to keep everything one-to-one.' },
  { year: '2018', title: 'Post-surgical service launched', body: 'Formal protocols built with local surgeons so patients had one consistent pathway after surgery.' },
  { year: '2021', title: 'Rehabilitation gym added', body: 'A dedicated space for progressive loading, return-to-sport testing and balance work.' },
  { year: '2024', title: 'Stroke & neurological rehab', body: 'Task-specific neurological programme launched with goal-based reviews every six weeks.' },
];

const values = [
  { title: 'Plain language', body: 'If we cannot explain it clearly, we have not understood it well enough ourselves.' },
  { title: 'Evidence first', body: 'Techniques are chosen because the research supports them, not because they have become habit.' },
  { title: 'Realistic timelines', body: 'We will tell you how long this is likely to take — and we will tell you if it is taking longer.' },
  { title: 'Your time matters', body: 'Sessions run to time, appointments are not double-booked, and you are never rushed out.' },
];

export default function AboutPage() {
  useSeo({
    title: 'About the Practice | Alto Physiotherapy & Rehabilitation',
    description:
      'Meet Dr. Elena Marsh, DPT — a physiotherapist with 12 years of experience in orthopaedic, neurological and age-related rehabilitation in Lakeside. Learn about the practice philosophy and clinic.',
    path: '/about',
    breadcrumbs: [{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }],
  });

  return (
    <>
      <section className="relative overflow-hidden bg-paper pb-14 pt-32 sm:pt-36 lg:pb-20 lg:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-mint/45 blur-3xl"
        />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[0.75rem] text-ink-400">
              <li>
                <Link to="/" className="link-underline hover:text-teal">
                  Home
                </Link>
              </li>
              <li aria-current="page" className="text-ink-600">
                About
              </li>
            </ol>
          </nav>

          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>About the practice</Eyebrow>
              <h1 className="mt-6 text-display-lg">
                A small practice, built deliberately around one thing: how you actually feel when
                you walk out.
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pb-3">
              <p className="text-lede text-ink-600">
                Alto Physiotherapy &amp; Rehabilitation has treated the Lakeside community since{' '}
                {clinic.founded}. One physiotherapist, one patient at a time, and a plan you can
                see written down.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/contact#appointment" variant="primary">
                  Book an Appointment
                </Button>
                <Button to="/treatments" variant="outline" icon={ArrowUpRight}>
                  Explore Treatments
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative bg-paper pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealBlock y={30}>
                <div className="relative">
                  <SmartImage
                    photo={image.practitionerAlt}
                    aspect={4 / 5}
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="aspect-4/5 w-full rounded-4xl shadow-lift"
                  />
                </div>
              </RevealBlock>
              <RevealBlock delay={0.15} className="mt-8 grid grid-cols-2 gap-6">
                <SmartImage
                  photo={image.clinicSession}
                  aspect={1}
                  sizes="(min-width: 640px) 20vw, 42vw"
                  className="aspect-square w-full rounded-2xl shadow-soft"
                />
                <SmartImage
                  photo={gallery[0]}
                  aspect={1}
                  sizes="(min-width: 640px) 20vw, 42vw"
                  className="aspect-square w-full rounded-2xl shadow-soft"
                />
              </RevealBlock>
            </div>

            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="The practitioner"
                title="Physiotherapy that starts with listening, not a list of symptoms."
                maxWidth="max-w-2xl"
              />

              <RevealBlock delay={0.1} className="mt-8 space-y-5 text-[1.02rem] leading-[1.78] text-ink-600">
                <p>
                  {practitioner.name} qualified as a Doctor of Physical Therapy in 2013 and has
                  spent twelve years in practice, starting in orthopaedics and widening into
                  neurological rehabilitation and falls prevention for older adults. She is an
                  Orthopaedic Certified Specialist, which means the techniques she uses for
                  spinal, shoulder and knee problems are formally examined and peer-reviewed.
                </p>
                <p>
                  She founded Alto because she kept meeting people who had been passed between
                  three different clinicians without anyone writing down a plan. Here, the
                  assessment is thorough, the plan is explained, and the same person is there
                  from the first appointment to the last.
                </p>
                <p>
                  Outside the clinic she is a clinical lecturer on musculoskeletal rehabilitation
                  and has contributed to two published audits on post-operative knee protocols.
                </p>
              </RevealBlock>

              <RevealGroup className="mt-11 grid gap-8 sm:grid-cols-2" stagger={0.08}>
                {credentials.map((item) => (
                  <RevealItem key={item.title} className="border-l-2 border-teal/25 pl-5">
                    <h3 className="font-display text-[1.1rem] font-normal text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-[0.85rem] text-ink-500">{item.note}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-16 sm:py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-teal/20 blur-3xl"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal y={16}>
                <Eyebrow light>Philosophy</Eyebrow>
                <h2 className="mt-6 text-display-sm text-white">
                  Three rules we do not break, whatever the presentation.
                </h2>
              </Reveal>
            </div>
            <RevealGroup className="grid gap-8 lg:col-span-8 sm:grid-cols-3" stagger={0.1}>
              {philosophy.map((item, index) => (
                <RevealItem key={item.title}>
                  <span className="font-display text-[2.2rem] font-light leading-none text-white/20">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-[1.15rem] font-normal text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-white/55">{item.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <RevealGroup className="mt-16 grid gap-8 border-t border-white/12 pt-12 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {values.map((value) => (
              <RevealItem key={value.title}>
                <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-mint">
                  {value.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-white/60">{value.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal y={16} className="lg:sticky lg:top-28">
                <Eyebrow>Milestones</Eyebrow>
                <h2 className="mt-6 text-display-sm">How the practice developed</h2>
                <p className="mt-6 text-[0.98rem] leading-relaxed text-ink-600">
                  Nothing about Alto was designed around a business model. It grew one referral at
                  a time, around what patients in this area actually needed.
                </p>
                <Reveal delay={0.2} className="mt-8">
                  <figure className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
                    <Quote className="h-6 w-6 text-teal/30" strokeWidth={1.4} aria-hidden="true" />
                    <blockquote className="mt-4">
                      <p className="font-display text-[1.15rem] font-light italic leading-relaxed text-ink">
                        “The best outcome I have had came from being told exactly what was wrong
                        and then being shown how to fix it myself.”
                      </p>
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      <Stars rating={5} size="h-3 w-3" />
                      <span className="text-[0.8rem] text-ink-500">Long-standing patient, 2019</span>
                    </figcaption>
                  </figure>
                </Reveal>
              </Reveal>
            </div>

            <RevealGroup className="lg:col-span-8" stagger={0.1}>
              {milestones.map((milestone) => (
                <RevealItem
                  key={milestone.year}
                  className="grid gap-4 border-t border-ink/12 py-8 sm:grid-cols-12 sm:gap-8"
                >
                  <p className="font-display text-[1.6rem] font-light text-teal sm:col-span-3">
                    {milestone.year}
                  </p>
                  <div className="sm:col-span-9">
                    <h3 className="font-display text-[1.25rem] font-normal text-ink">
                      {milestone.title}
                    </h3>
                    <p className="mt-2.5 max-w-xl text-[0.95rem] leading-relaxed text-ink-600">
                      {milestone.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>
    </>
  );
}
