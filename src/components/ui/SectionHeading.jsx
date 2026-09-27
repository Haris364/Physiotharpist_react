import { cn } from '../../lib/cn';
import { Reveal } from './Reveal';

export function Eyebrow({ children, light = false, className }) {
  return <span className={cn('eyebrow', light && 'eyebrow-light', className)}>{children}</span>;
}

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  light = false,
  className,
  children,
  as: Tag = 'h2',
  maxWidth = 'max-w-2xl',
}) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';
  const centered = align === 'center';

  return (
    <div className={cn(alignment, className, centered && 'flex flex-col items-center')}>
      {eyebrow ? (
        <Reveal y={14} className={cn('mb-6 flex', centered && 'justify-center')}>
          <Eyebrow light={light}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <Tag
          className={cn(
            maxWidth,
            'text-display-md',
            light && 'text-white',
            centered && 'mx-auto',
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {lede ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              'mt-6 max-w-xl text-lede',
              light ? 'text-white/70' : 'text-ink-600',
              centered && 'mx-auto',
            )}
          >
            {lede}
          </p>
        </Reveal>
      ) : null}

      {children}
    </div>
  );
}
