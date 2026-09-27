import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import Container from './ui/Container';
import SmartImage from './ui/SmartImage';
import { MapPlaceholder } from './ui';
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal';
import { contact, openingHours, social } from '../data/site';
import { image } from '../data/images';

const items = [
  {
    icon: MapPin,
    label: 'Address',
    lines: [contact.address.line1, `${contact.address.line2} ${contact.address.postcode}`],
    href: contact.mapsUrl,
    action: 'Get directions',
  },
  { icon: Phone, label: 'Phone', lines: [contact.phone], href: contact.phoneHref, action: 'Call now' },
  {
    icon: Mail,
    label: 'Email',
    lines: [contact.email],
    href: contact.emailHref,
    action: 'Send an email',
  },
  {
    icon: Clock,
    label: 'Opening hours',
    lines: openingHours.map((row) => `${row.day} · ${row.label}`),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-paper py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal y={16}>
            <p className="eyebrow">Visit the clinic</p>
            <h2 className="mt-6 max-w-2xl text-display-md">Get in Touch With the Practice</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink-600">
              Walk-ins are welcome for consultations, but booking ahead guarantees a full
              appointment slot with no waiting.
            </p>
          </Reveal>
        </div>

        <RevealGroup stagger={0.08} className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem key={item.label}>
                <div className="border-t border-ink/12 pt-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mint text-teal">
                    <Icon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-ink-400">
                    {item.label}
                  </h3>
                  {item.lines.map((line) => (
                    <p key={line} className="mt-2 text-[0.95rem] leading-relaxed text-ink-700">
                      {line}
                    </p>
                  ))}
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.label === 'Address' ? '_blank' : undefined}
                      rel={item.label === 'Address' ? 'noreferrer noopener' : undefined}
                      className="group mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-teal"
                    >
                      <span className="link-underline">{item.action}</span>
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-400 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </a>
                  ) : null}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal y={26} className="lg:col-span-7">
            <MapPlaceholder className="aspect-16/11 h-full min-h-[18rem] w-full" />
          </Reveal>

          <Reveal delay={0.1} y={26} className="lg:col-span-5">
            <div className="flex h-full flex-col gap-6">
              <SmartImage
                photo={image.clinicRoom}
                aspect={16 / 10}
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="aspect-16/10 w-full rounded-3xl shadow-soft"
              />
              <div className="flex-1 rounded-3xl border border-ink/10 bg-white p-6 sm:p-7">
                <h3 className="font-display text-display-xs text-ink">Find us on social</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-600">
                  Exercise guidance, clinic news and the occasional myth about backs.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {social.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group inline-flex h-10 items-center gap-2 rounded-full border border-ink/12 px-4 text-[0.82rem] text-ink-600 transition-colors duration-400 ease-premium hover:border-ink hover:bg-ink hover:text-white"
                      >
                        {item.name}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 opacity-50 transition-transform duration-400 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
