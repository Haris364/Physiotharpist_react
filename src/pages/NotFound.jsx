import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Home as HomeIcon, Phone } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { Eyebrow } from '../components/ui/SectionHeading';
import { useSeo } from '../lib/seo';
import { contact, navLinks } from '../data/site';

export default function NotFound() {
  useSeo({
    title: 'Page Not Found | Alto Physiotherapy & Rehabilitation',
    description:
      'The page you were looking for could not be found. Find your way back to treatments, conditions or booking at Alto Physiotherapy.',
    path: '/404',
  });

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-paper py-32 sm:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[26rem] w-[26rem] rounded-full bg-mint/45 blur-3xl"
      />
      <Container className="relative">
        <div className="max-w-2xl">
          <Eyebrow>Error 404</Eyebrow>

          <p className="mt-8 font-display text-[5rem] font-light leading-none text-ink/12 sm:text-[7rem]">
            404
          </p>

          <h1 className="-mt-6 text-display-md text-ink sm:-mt-8">
            This page has moved on.
          </h1>

          <p className="mt-6 max-w-lg text-lede text-ink-600">
            The link may be out of date, or the page may have been renamed. Nothing is wrong with
            your recovery — just take one of these routes back.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/" variant="primary" icon={ArrowRight}>
              Back to home
            </Button>
            <Button to="/contact" variant="outline">
              Contact the clinic
            </Button>
          </div>

          <div className="mt-14 border-t border-ink/10 pt-8">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-400">
              Or jump to
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="link-underline text-[0.92rem] text-ink-600 transition-colors hover:text-teal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-[0.88rem] text-ink-500 sm:flex-row sm:gap-7">
            <a href={contact.phoneHref} className="inline-flex items-center gap-2 hover:text-teal">
              <Phone className="h-4 w-4 text-teal" strokeWidth={1.6} aria-hidden="true" />
              {contact.phone}
            </a>
            <span className="inline-flex items-center gap-2">
              <Compass className="h-4 w-4 text-teal" strokeWidth={1.6} aria-hidden="true" />
              {contact.address.full}
            </span>
          </div>

          <Reveal delay={0.3} className="mt-10">
            <span className="inline-flex items-center gap-2 text-[0.82rem] text-ink-400">
              <HomeIcon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              Alto Physiotherapy &amp; Rehabilitation
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
