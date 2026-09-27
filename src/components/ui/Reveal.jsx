import { motion, useReducedMotion } from 'framer-motion';
import { EASE, viewportOnce, viewportSoft } from '../../lib/motion';
import { cn } from '../../lib/cn';

export function Reveal({
  children,
  delay = 0,
  y = 26,
  duration = 0.75,
  className,
  as = 'div',
  once = true,
  soft = false,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={once ? (soft ? viewportSoft : viewportOnce) : { amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({ children, className, stagger = 0.09, delay = 0, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportSoft}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 22, as = 'div', ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerText({ text, className, as = 'span', delay = 0, wordClassName }) {
  const reduce = useReducedMotion();
  const Tag = as;
  const words = text.split(' ');

  if (reduce) {
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className={wordClassName}>
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </Tag>
    );
  }

  const MotionTag = motion[as] ?? motion.span;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportSoft}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={cn('inline-block', wordClassName)}
            variants={{ hidden: { y: '105%' }, show: { y: '0%', transition: { duration: 0.8, ease: EASE } } }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export default Reveal;
