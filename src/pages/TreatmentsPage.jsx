import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Clock, Users } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import SmartImage from '../components/ui/SmartImage';
import Accordion from '../components/ui/Accordion';
import PageHero from '../components/ui/PageHero';
import { Eyebrow, Reveal, RevealGroup, RevealItem, SectionHeading } from '../components/ui';
import { useSeo } from '../lib/seo';
import { treatments } from '../data/treatments';
import { treatmentFaqs } from '../data/faqs';
import { contact } from '../data/site';
import { image } from '../data/images';

const meta = [
  { label: 'Treatment areas', value: '8' },
  { label: 'Session length', value: '45–60 min' },
  { label: 'Waiting time', value: '1–5 days' },
  { label: 'Format', value: 'One-on-one' },
];

export default function TreatmentsPage() {
  useSeo({
    title: 'Treatments | Alto Physiotherapy & Rehabilitation',
    description:
      'Sports injury rehabilitation, back and neck pain, knee and joint rehabilitation, post-surgery recovery, stroke rehabilitation, posture correction, muscle rehabilitation and elderly care in Lakeside.',
    path: '/treatments',
    breadcrumbs: [
      { label: 'Home', to: '/' },
      { label: 'Treatments', to: '/treatments' },
    ],
  });

  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title="Specialized Care for Better Movement"
        lede="Eight treatment areas, one consistent method — assess properly, load progressively, and measure the result. Every plan is written for the person in front of us."
        photo={image.guidedExercise}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Treatments', to: '/treatments' },
        ]}
        meta={meta}
      >
        <Button to="/contact#appointment" variant="primary" icon={ArrowUpRight}>
          Book an Appointment
        </Button>
        <Button href={`#${treatments[0].slug}`} variant="outline">
          Jump to treatments
        </Button>
      </PageHero>

      <section className="relative bg-paper py-16 sm:py-20 lg:py-28">
        <Container>
          <RevealGroup className="space-y-16 lg:space-y-24" stagger={0.06}>
            {treatments.map((treatment, index) => {
              const Icon = treatment.icon;
              const flipped = index % 2 === 1;

              return (
                <RevealItem
                  key={treatment.slug}
                  className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-12 lg:gap-14"
                >
                  <div
                    id={treatment.slug}
                    className={`lg:col-span-6 ${flipped ? 'lg:order-2 lg:col-start-7' : ''}`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-[0.9rem] tabular-nums text-teal">
                        {treatment.number}
                      </span>
                      <span className="h-px flex-1 bg-ink/12" aria-hidden="true" />
                    </div>

                    <h2 className="mt-5 font-display text-display-sm">{treatment.title}</h2>
                    <p className="mt-4 text-[1.02rem] leading-[1.75] text-ink-600">
                      {treatment.summary}
                    </p>

                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {treatment.detail.map((item) => (
                        <li key={item} className="flex gap-3 text-[0.9rem] leading-relaxed text-ink-600">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" strokeWidth={2} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
                      {[
                        { icon: Clock, label: 'Typical duration', value: treatment.duration },
                        { icon: Users, label: 'Suited to', value: treatment.audience },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center gap-2.5">
                          <row.icon className="h-4 w-4 text-teal" strokeWidth={1.6} aria-hidden="true" />
                          <div>
                            <dt className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink-400">
                              {row.label}
                            </dt>
                            <dd className="mt-0.5 text-[0.85rem] text-ink-700">{row.value}</dd>
                          </div>
                        </div>
                      ))}
                    </dl>

                    <Link
                      to="/contact#appointment"
                      className="group mt-8 inline-flex items-center gap-2 text-[0.9rem] font-medium text-ink transition-colors hover:text-teal"
                    >
                      <span className="link-underline">
                        Request {treatment.title.toLowerCase()}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-400 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  <Reveal
                    y={26}
                    className={`lg:col-span-6 ${flipped ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}
                  >
                    <div className="relative">
                      <SmartImage
                        photo={treatment.image}
                        aspect={4 / 3}
                        sizes="(min-width: 1024px) 44vw, 92vw"
                        className="aspect-4/3 w-full rounded-3xl shadow-lift"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute -left-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-paper text-teal shadow-soft"
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                    </div>
                  </Reveal>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-sand-300 py-16 sm:py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal y={16} className="lg:sticky lg:top-28">
                <Eyebrow>Good to know</Eyebrow>
                <h2 className="mt-6 text-display-sm">
                  Questions people ask before their first appointment.
                </h2>
                <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-ink-600">
                  If your question is not here, the clinic assistant in the corner of the screen
                  can answer it, or call {contact.phone} and ask.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-8">
              <Accordion items={treatmentFaqs} defaultOpen={0} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Not sure which to book?"
                title="Start with an assessment, not a diagnosis."
                lede="You do not need to know what to call it. Book a first consultation and we will tell you what it most likely is, what we can do, and what we cannot."
                maxWidth="max-w-xl"
              />
            </div>
            <Reveal delay={0.12} className="lg:col-span-5">
              <div className="rounded-3xl border border-ink/10 bg-white p-7 shadow-soft">
                <ul className="space-y-3">
                  {[
                    'First appointment 45 minutes',
                    'Written plan before you leave',
                    'Home exercise programme included',
                    'Re-test every 4–6 weeks',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.9rem] text-ink-600">
                      <Check className="h-4 w-4 shrink-0 text-teal" strokeWidth={2} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button to="/contact#appointment" variant="teal" className="mt-7 w-full" icon={ArrowUpRight}>
                  Request Appointment
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
