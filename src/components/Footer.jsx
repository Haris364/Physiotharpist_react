import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import Container from './ui/Container';
import Logo from './ui/Logo';
import Button from './ui/Button';
import { Reveal } from './ui/Reveal';
import { treatments } from '../data/treatments';
import { clinic, contact, footerLinks, openingHours, social } from '../data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-teal/12 blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid gap-12 border-b border-white/10 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="lg:col-span-4">
            <Reveal>
              <Logo tone="light" />
              <p className="mt-6 max-w-sm text-[0.92rem] leading-relaxed text-white/60">
                {clinic.description} Serving the Lakeside community since {clinic.founded}, always
                one-to-one.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {social.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${item.name} (opens in a new tab)`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[0.7rem] font-medium uppercase tracking-wider text-white/70 transition-all duration-400 ease-premium hover:border-mint hover:bg-mint hover:text-ink"
                    >
                      {item.name.slice(0, 2)}
                      <span className="sr-only">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <nav aria-label="Footer quick links" className="lg:col-span-2">
            <h2 className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/40">
              Explore
            </h2>
            <ul className="mt-6 space-y-3.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="link-underline text-[0.92rem] text-white/70 hover:text-mint">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer treatments" className="lg:col-span-3">
            <h2 className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/40">
              Treatments
            </h2>
            <ul className="mt-6 space-y-3.5">
              {treatments.slice(0, 6).map((treatment) => (
                <li key={treatment.slug}>
                  <Link
                    to={`/treatments#${treatment.slug}`}
                    className="link-underline text-[0.92rem] text-white/70 hover:text-mint"
                  >
                    {treatment.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/40">
              Visit the clinic
            </h2>
            <ul className="mt-6 space-y-4 text-[0.92rem]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint" strokeWidth={1.5} aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  {contact.address.line1}
                  <br />
                  {contact.address.line2} {contact.address.postcode}
                </address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-mint" strokeWidth={1.5} aria-hidden="true" />
                <a href={contact.phoneHref} className="link-underline hover:text-mint">
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-mint" strokeWidth={1.5} aria-hidden="true" />
                <a href={contact.emailHref} className="link-underline break-all hover:text-mint">
                  {contact.email}
                </a>
              </li>
            </ul>

            <dl className="mt-6 space-y-1.5 text-[0.82rem]">
              {openingHours.map((row) => (
                <div key={row.day} className="flex justify-between gap-4">
                  <dt className="text-white/45">{row.day}</dt>
                  <dd className={row.open ? 'text-white/75' : 'text-white/35'}>{row.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8rem] text-white/45">
            &copy; {year} {clinic.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[0.8rem] text-white/35">{contact.emergencyNote}</p>
            <Button to="/contact#appointment" variant="mint" size="sm" icon={ArrowUpRight}>
              Book Appointment
            </Button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
