import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Menu, Phone, X } from 'lucide-react';
import Container from './ui/Container';
import Logo from './ui/Logo';
import Button from './ui/Button';
import { navLinks, contact } from '../data/site';
import { useEscapeKey, useLockBodyScroll } from '../hooks/useUi';
import { useScrolledPast } from '../hooks/useCountUp';
import { EASE } from '../lib/motion';
import { cn } from '../lib/cn';

function isActive(link, pathname) {
  if (link.to.includes('#')) return false;
  if (link.to === '/') return pathname === '/';
  return pathname === link.to || pathname.startsWith(`${link.to}/`);
}

function NavLinks({ onNavigate, className }) {
  const { pathname } = useLocation();

  return (
    <ul className={cn('flex items-center gap-1', className)}>
      {navLinks.map((link) => {
        const active = isActive(link, pathname);
        return (
          <li key={link.to}>
            <NavLink
              to={link.to}
              onClick={onNavigate}
              className={cn(
                'relative block rounded-full px-3 py-2 text-[0.83rem] transition-colors duration-300 2xl:px-3.5 2xl:text-[0.875rem]',
                active ? 'text-ink' : 'text-ink-500 hover:text-ink',
              )}
              aria-current={active ? 'page' : undefined}
            >
              {active ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-ink/[0.055]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  aria-hidden="true"
                />
              ) : null}
              {link.label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(16);
  const reduce = useReducedMotion();

  useLockBodyScroll(open);
  useEscapeKey(() => setOpen(false), open);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-premium',
          scrolled || open
            ? 'bg-paper/85 shadow-[0_1px_0_rgba(10,27,42,0.08)] backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <Container size="wide">
          <div
            className={cn(
              'flex items-center justify-between transition-[height] duration-500 ease-premium',
              scrolled ? 'h-[68px]' : 'h-[76px] lg:h-[88px]',
            )}
          >
            <Link to="/" aria-label="Alto Physiotherapy — home" className="shrink-0">
              <Logo />
            </Link>

            <nav aria-label="Primary" className="hidden xl:block">
              <NavLinks />
            </nav>

            <div className="hidden items-center gap-3 xl:flex">
              <a
                href={contact.phoneHref}
                className="hidden items-center gap-2 text-[0.855rem] text-ink-500 transition-colors hover:text-teal 2xl:inline-flex"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                {contact.phone}
              </a>
              <Button to="/contact#appointment" variant="primary" size="sm" icon={CalendarCheck}>
                Book Appointment
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 text-ink transition-colors hover:bg-ink hover:text-white xl:hidden"
            >
              {open ? <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" /> : <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-paper pt-[68px] xl:hidden"
          >
            <nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto px-5 pb-8 pt-6 sm:px-7"
            >
              <ul className="divide-y divide-ink/8 border-t border-ink/8">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.45, ease: EASE }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive: active }) =>
                        cn(
                          'flex items-baseline justify-between py-4 font-display text-[1.6rem] font-light leading-tight transition-colors',
                          active ? 'text-teal' : 'text-ink',
                        )
                      }
                    >
                      {link.label}
                      <span className="font-sans text-[0.65rem] tabular-nums tracking-[0.2em] text-ink-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
                className="mt-9 space-y-3"
              >
                <Button
                  to="/contact#appointment"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={CalendarCheck}
                  onClick={() => setOpen(false)}
                >
                  Book Appointment
                </Button>
                <a
                  href={contact.phoneHref}
                  className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-ink/15 text-[0.95rem] text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  {contact.phone}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
