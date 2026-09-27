import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { EASE } from '../../lib/motion';
import { cn } from '../../lib/cn';

export default function Accordion({ items, light = false, defaultOpen = null, className }) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();
  const baseId = useId();

  return (
    <div className={cn('divide-y', light ? 'divide-white/12' : 'divide-ink/10', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.title ?? item.question ?? index}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn(
                  'group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-300 sm:py-6',
                  light ? 'text-white hover:text-mint' : 'text-ink hover:text-teal',
                )}
              >
                <span className="flex items-baseline gap-4">
                  <span
                    className={cn(
                      'font-display text-[0.8rem] tabular-nums',
                      light ? 'text-mint/60' : 'text-teal/60',
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-display-xs">{item.title}</span>
                </span>
                <span
                  className={cn(
                    'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-400 ease-premium',
                    isOpen ? 'rotate-45' : '',
                    light
                      ? 'border-white/20 text-white group-hover:border-mint/50'
                      : 'border-ink/15 text-ink group-hover:border-teal/50',
                  )}
                  aria-hidden="true"
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      'pb-6 pl-9 pr-2 text-[0.95rem] leading-relaxed sm:pl-12',
                      light ? 'text-white/70' : 'text-ink-600',
                    )}
                  >
                    {item.body}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
