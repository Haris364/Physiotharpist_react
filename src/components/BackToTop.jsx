import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { EASE } from '../lib/motion';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const onScroll = () => setVisible(window.scrollY > 700);
    const initial = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          key="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="fixed bottom-[5.25rem] right-5 z-40 hidden h-11 w-11 items-center justify-center rounded-full border border-ink/12 bg-paper/90 text-ink shadow-soft backdrop-blur transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white lg:flex"
        >
          <ArrowUp className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
