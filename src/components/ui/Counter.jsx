import { useReducedMotion } from 'framer-motion';
import { formatNumber } from '../../lib/cn';
import { useCountUp } from '../../hooks/useCountUp';
import { cn } from '../../lib/cn';

export default function Counter({ value, suffix = '', prefix = '', decimals = 0, className, duration = 1.6 }) {
  const reduce = useReducedMotion();
  const { ref, value: current } = useCountUp(value, { duration, decimals });

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {reduce ? formatNumber(value) : formatNumber(current)}
      {suffix}
    </span>
  );
}
