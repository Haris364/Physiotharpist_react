import { cn } from '../../lib/cn';

export default function Section({ as: Tag = 'section', id, className = '', children, tone = 'paper', size = 'default' }) {
  const tones = {
    paper: 'bg-paper',
    white: 'bg-white',
    sand: 'bg-sand-300',
    ink: 'bg-ink text-white',
    mint: 'bg-mint',
    none: '',
  };

  const paddings = {
    default: 'py-16 sm:py-20 lg:py-28',
    tight: 'py-12 sm:py-16 lg:py-20',
    loose: 'py-20 sm:py-24 lg:py-36',
  };

  return (
    <Tag id={id} className={cn('relative', tones[tone], paddings[size], className)}>
      {children}
    </Tag>
  );
}
