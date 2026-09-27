import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Container from './Container';
import SmartImage from './SmartImage';
import { Eyebrow } from './SectionHeading';
import Reveal, { StaggerText } from './Reveal';
import { cn } from '../../lib/cn';

export default function PageHero({ eyebrow, title, lede, photo, meta, breadcrumb, children, align = 'split' }) {
  const stacked = align === 'stacked';

  return (
    <section className="relative overflow-hidden bg-paper pb-14 pt-32 sm:pb-16 sm:pt-36 lg:pb-20 lg:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-[28rem] w-[28rem] rounded-full bg-mint/45 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent"
      />

      <Container className="relative">
        {breadcrumb?.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] text-ink-400">
              {breadcrumb.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 ? <ChevronRight className="h-3 w-3 text-ink-300" aria-hidden="true" /> : null}
                  {crumb.to ? (
                    <Link to={crumb.to} className="link-underline transition-colors hover:text-teal">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink-600">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div
          className={cn(
            'grid items-center gap-12',
            stacked ? 'grid-cols-1' : 'lg:grid-cols-12 lg:gap-16',
          )}
        >
          <div className={cn(stacked ? 'max-w-3xl' : 'lg:col-span-6')}>
            {eyebrow ? <Eyebrow className="mb-6">{eyebrow}</Eyebrow> : null}

            <h1 className="text-display-lg">
              <StaggerText text={title} />
            </h1>

            {lede ? (
              <Reveal delay={0.15} className="mt-7 max-w-xl">
                <p className="text-lede text-ink-600">{lede}</p>
              </Reveal>
            ) : null}

            {meta?.length ? (
              <Reveal delay={0.25} className="mt-10">
                <dl className="flex flex-wrap gap-x-10 gap-y-5">
                  {meta.map((item) => (
                    <div key={item.label}>
                      <dt className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink-400">
                        {item.label}
                      </dt>
                      <dd className="mt-1.5 font-display text-display-xs text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}

            {children ? (
              <Reveal delay={0.32} className="mt-9 flex flex-wrap gap-3">
                {children}
              </Reveal>
            ) : null}
          </div>

          {photo && !stacked ? (
            <Reveal delay={0.1} className="lg:col-span-6">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -right-3 -top-3 hidden h-full w-full rounded-4xl border border-teal/25 lg:block"
                />
                <SmartImage
                  photo={photo}
                  aspect={4 / 5}
                  sizes="(min-width: 1024px) 44vw, 92vw"
                  priority
                  className="aspect-4/5 w-full rounded-4xl shadow-lift sm:aspect-16/11 lg:aspect-4/5"
                />
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
