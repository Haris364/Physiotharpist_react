import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../lib/motion';

export default function PageTransition({ children }) {
  const reduce = useReducedMotion();

  if (reduce) return children;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
