export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 1.04 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.85, ease: EASE } },
};

export const clipReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 1, ease: EASE } },
};

export const staggerParent = (stagger = 0.09, delayChildren = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const wordUp = {
  hidden: { opacity: 0, y: '0.42em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const viewportOnce = { once: true, amount: 0.25, margin: '0px 0px -80px 0px' };
export const viewportSoft = { once: true, amount: 0.15, margin: '0px 0px -60px 0px' };
