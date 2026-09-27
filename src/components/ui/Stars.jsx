import { Star } from 'lucide-react';
import { cn } from '../../lib/cn';

export default function Stars({ rating = 5, className, size = 'h-3.5 w-3.5', label }) {
  return (
    <span
      className={cn('inline-flex items-center gap-1', className)}
      role="img"
      aria-label={label ?? `Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(size, i < rating ? 'fill-clay text-clay' : 'fill-transparent text-ink/20')}
          strokeWidth={1.4}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
