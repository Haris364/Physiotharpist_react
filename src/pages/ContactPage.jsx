import { Clock3, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import Accordion from '../components/ui/Accordion';
import AppointmentForm from '../components/AppointmentForm';
import Contact from '../components/Contact';
import { useSeo } from '../lib/seo';
import { contact, openingHours, social } from '../data/site';
import { image } from '../data/images';
import { contactFaqs } from '../data/faqs';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: contactFaqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const channels = [
  {
    icon: Phone,
    label: 'Call the clinic',
    value: contact.phone,
    href: contact.phoneHref,
    note: 'Fastest for anything urgent or to reschedule.',
  },
  {
    icon: Mail,
    label: 'Email us',
    value: contact.email,
    href: contact.emailHref,
    note: 'Best for reports, referrals and insurance paperwork.',
  },
  {
    icon: MapPin,
    label: 'Visit the clinic',
    value: contact.address.full,
    href: contact.mapsUrl,
    note: 'Free patient parking at the rear · step-free access.',
  },
];

export default function ContactPage() {
  useSeo({
    title: 'Contact & Book | Alto Physiotherapy & Rehabilitation',
    description:
      'Request an appointment at Alto Physiotherapy in Lakeside. Call +1 (555) 018-4420, email care@altophysio.com, or book online — same-week appointments often available.',
    path: '/contact',
    breadcrumbs: [
      { label: 'Home', to: '/' },
      { label: 'Contact', to: '/contact' },
    ],
    schema: faqSchema,
  });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book an Appointment"
        lede="Three ways to reach us, all answered by a person. Requests sent through the form are usually replied to within one working day."
        photo={image.clinicWide}
        aspect={4 / 5}
        sizes="(min-width: 1024px) 44vw, 92vw"
        align="split"
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Contact', to: '/contact' },
        ]}
        meta={[
          { label: 'Response time', value: 'Within 1 working day' },
          { label: 'Urgent slots', value: 'Same week, often' },
          { label: 'Formats', value: 'In-clinic or video' },
        ]}
      >
        <Button href={contact.phoneHref} variant="primary" icon={Phone}>
          {contact.phone}
        </Button>
        <Button to="#appointment" variant="outline">
          Use the booking form
        </Button>
      </PageHero>

      <section className="bg-paper pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-4xl border border-ink/10 bg-ink/10 md:grid-cols-3">
            {channels.map((channel) => (
              <Reveal key={channel.label} className="bg-white">
                <a
                  href={channel.href}
                  className="group flex h-full flex-col p-8 transition-colors duration-400 ease-premium hover:bg-paper-100 sm:p-9"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint text-teal transition-colors duration-400 group-hover:bg-teal group-hover:text-white">
                    <channel.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="mt-6 text-[0.63rem] font-medium uppercase tracking-[0.18em] text-ink-400">
                    {channel.label}
                  </span>
                  <span className="mt-2 font-display text-[1.2rem] font-normal text-ink">
                    {channel.value}
                  </span>
                  <span className="mt-3 text-[0.85rem] leading-relaxed text-ink-500">{channel.note}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <AppointmentForm id="appointment" />

      <Contact />

      <section className="bg-paper pb-20 sm:pb-24 lg:pb-32">
        <Container>
          <SectionHeading
            eyebrow="Before you come"
            title="Practical answers, so the visit goes smoothly."
            lede="What to bring, how cancellation works, and what the room is actually like."
          />

          <Reveal delay={0.1} className="mt-12 max-w-3xl">
            <Accordion items={contactFaqs} defaultOpen={0} />
          </Reveal>

          <Reveal delay={0.2} className="mt-16">
            <div className="grid gap-10 border-t border-ink/10 pt-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <h3 className="font-display text-display-xs text-ink">Opening hours</h3>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-ink-500">
                  Evening appointments run until 7pm Monday to Thursday, which is useful if you are
                  working during the day. Outside opening hours you will reach our answerphone with
                  booking and urgent-care guidance.
                </p>
                <Button
                  href={contact.mapsUrl}
                  variant="outline"
                  size="sm"
                  className="mt-7"
                  icon={Navigation}
                >
                  Get directions
                </Button>
              </div>

              <div className="lg:col-span-7">
                <dl className="space-y-0">
                  {openingHours.map((row) => (
                    <div
                      key={row.day}
                      className="flex items-baseline justify-between gap-6 border-b border-ink/8 py-3.5"
                    >
                      <dt className="flex items-center gap-2.5 text-[0.9rem] text-ink-600">
                        <Clock3
                          className="h-3.5 w-3.5 text-teal"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                        {row.day}
                      </dt>
                      <dd className={row.open ? 'font-medium text-ink' : 'text-ink-300'}>{row.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25} className="mt-16">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-ink/10 bg-mint/40 p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <h3 className="font-display text-display-xs text-ink">Follow the clinic</h3>
                <p className="mt-2 text-[0.88rem] text-ink-500">
                  Exercise ideas and clinic updates — posted a few times a month, never more.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-11 items-center rounded-full border border-ink/15 px-5 text-[0.82rem] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <p className="text-[0.8rem] leading-relaxed text-ink-400">
              Not sure whether physiotherapy is the right first step?{' '}
              <a href={contact.phoneHref} className="link-underline text-teal">
                Give us a call
              </a>{' '}
              and we will tell you honestly — or point you to someone better suited. For medical
              emergencies, always call your local emergency number first.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
