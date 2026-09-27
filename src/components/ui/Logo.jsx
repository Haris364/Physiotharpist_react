import { cn } from '../../lib/cn';

export default function Logo({ className = '', tone = 'ink', compact = false }) {
  const toneMap = {
    ink: { mark: 'text-ink', text: 'text-ink', sub: 'text-ink-400' },
    light: { mark: 'text-white', text: 'text-white', sub: 'text-white/55' },
  };
  const t = toneMap[tone] ?? toneMap.ink;

  return (
    <span className={cn('flex items-center gap-3', className)}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink">
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
          <path
            d="M9 23 16 8l7 15"
            fill="none"
            stroke="#7FC3BA"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M11.6 18.6h8.8" stroke="#FBF9F5" strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className={cn('font-display text-[1.12rem] font-medium tracking-[-0.01em]', t.text)}>
          Alto Physiotherapy
        </span>
        {!compact ? (
          <span className={cn('mt-1 text-[0.6rem] font-medium uppercase tracking-[0.22em]', t.sub)}>
            Rehabilitation &amp; Wellness
          </span>
        ) : null}
      </span>
    </span>
  );
}
