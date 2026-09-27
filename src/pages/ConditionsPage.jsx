import { ArrowUpRight, Phone, TriangleAlert } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import SmartImage from '../components/ui/SmartImage';
import PageHero from '../components/ui/PageHero';
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import { useSeo } from '../lib/seo';
import { conditions, redFlags, selfCare } from '../data/conditions';
import { contact } from '../data/site';
import { image } from '../data/images';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need a referral to see a physiotherapist?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. You can contact the clinic directly and book your own appointment. Most insurers do require a GP or specialist referral before claiming, so bring one to your first visit if you intend to claim.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I see a physiotherapist rather than wait?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Book an assessment if pain is limiting your work, sleep or activity for more than two weeks, if an injury is not settling, or if you want a structured plan after surgery. Seek medical attention first for new neurological symptoms, a hot swollen joint with fever, or loss of bladder or bowel control.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many treatments will I need?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the condition and your goal. Uncomplicated spinal or neck pain often needs 4 to 10 weeks, joint rehabilitation 8 to 20 weeks, and ACL reconstruction 6 to 16 months. Progress is re-tested every 4 to 6 weeks.',
      },
    },
  ],
};

export default function ConditionsPage() {
  useSeo({
    title: 'Conditions We Treat | Alto Physiotherapy & Rehabilitation',
    description:
      'Back pain, neck pain, sciatica, knee pain, shoulder pain, arthritis, sports injuries and post-surgery recovery treated with active, evidence-based physiotherapy in Lakeside.',
    path: '/conditions',
    breadcrumbs: [
      { label: 'Home', to: '/' },
      { label: 'Conditions', to: '/conditions' },
    ],
    schema: faqSchema,
  });

  return (
    <>
      <PageHero
        eyebrow="Conditions"
        title="Conditions We Help You Manage"
        lede="Most people arrive with a symptom rather than a diagnosis. These are the presentations we see most often — and the ones we have helped hundreds of people through."
        photo={image.contactCard}
        aspect={4 / 5}
        sizes="(min-width: 1024px) 44vw, 92vw"
        align="split"
      >
        <Button to="/contact#appointment" variant="primary" icon={ArrowUpRight}>
          Book an Assessment
        </Button>
        <Button href="#red-flags" variant="outline">
          When to seek help first
        </Button>
      </PageHero>

      <section className="bg-paper pb-16 pt-4 sm:pb-20 lg:pb-28">
        <Container>
          <RevealGroup stagger={0.07} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {conditions.map((condition) => (
              <RevealItem key={condition.slug}>
                <article
                  id={condition.slug}
                  className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative overflow-hidden">
                    <SmartImage
                      photo={condition.image}
                      aspect={4 / 3}
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                      className="aspect-4/3 w-full"
                      imgClassName="transition-transform duration-900 ease-premium group-hover:scale-[1.06]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink-600 backdrop-blur-sm">
                      {condition.line}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="font-display text-[1.35rem] font-light text-ink">{condition.name}</h2>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-600">{condition.summary}</p>
                    <p className="mt-4 border-t border-ink/10 pt-4 text-[0.82rem] italic leading-relaxed text-ink-400">
                      {condition.note}
                    </p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section
        id="red-flags"
        className="relative scroll-mt-24 overflow-hidden bg-ink py-16 sm:py-20 lg:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-clay/20 blur-3xl"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal y={16}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-clay/20 text-clay-400">
                  <TriangleAlert className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h2 className="mt-7 text-display-sm text-white">See a medical professional first</h2>
                <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-white/60">
                  Physiotherapy is not the right first step for every symptom. If any of the following
                  apply, speak to your GP or urgent care service first. We are happy to start straight
                  afterwards.
                </p>
                <Button href={contact.phoneHref} variant="outlineLight" size="md" className="mt-8" icon={Phone}>
                  {contact.phone}
                </Button>
              </Reveal>
            </div>

            <RevealGroup className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:col-span-7" stagger={0.06}>
              {redFlags.map((flag) => (
                <RevealItem key={flag}>
                  <div className="flex gap-3 border-t border-white/10 pt-4">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-400" aria-hidden="true" />
                    <p className="text-[0.92rem] leading-relaxed text-white/75">{flag}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="While you wait"
            title="Four things that genuinely help between appointments."
            lede="None of these replace an assessment, but used sensibly they make the first few weeks of treatment noticeably easier."
          />

          <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2" stagger={0.08}>
            {selfCare.map((item, index) => (
              <RevealItem key={item.title}>
                <div className="flex h-full flex-col rounded-3xl bg-sand-300 p-7">
                  <span className="font-display text-[2rem] font-light leading-none text-teal/60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 font-display text-[1.2rem] font-normal text-ink">{item.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-600">{item.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-14">
            <div className="flex flex-col items-start gap-6 rounded-3xl border border-ink/10 bg-mint/50 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <h3 className="max-w-lg font-display text-display-sm text-ink">
                Ready to get it properly assessed?
              </h3>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button to="/contact#appointment" variant="primary" icon={ArrowUpRight}>
                  Book an Appointment
                </Button>
                <Button to="/treatments" variant="outline">
                  View Treatments
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
