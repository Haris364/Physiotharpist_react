import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

export function useCountUp(target, { duration = 1.6, decimals = 0, start = 0 } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? target : start);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return;

    const controls = animate(start, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(Number(latest.toFixed(decimals))),
    });
    return () => controls.stop();
  }, [inView, target, duration, decimals, start, reduce]);

  return { ref, value: reduce ? target : value };
}

export function useScrolledPast(offset = 24) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => setPast(window.scrollY > offset);
    const initial = requestAnimationFrame(onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener('scroll', onScroll);
    };
  }, [offset]);

  return past;
}
