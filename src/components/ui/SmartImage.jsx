import { useState } from 'react';
import { url, srcSet } from '../../data/images';
import { cn } from '../../lib/cn';

function Fallback({ alt, className }) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-gradient-to-br from-paper-200 via-mint to-teal-200 p-4 text-center',
        className,
      )}
      role="img"
      aria-label={alt || 'Clinic photograph'}
    >
      <svg viewBox="0 0 100 100" className="h-1/2 max-h-14 w-1/2 max-w-14 text-teal/45" aria-hidden="true">
        <path
          d="M50 12 78 74a6 6 0 0 1-5 9H27a6 6 0 0 1-5-9L50 12Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M36 56h28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const DEFAULT_WIDTHS = [480, 900, 1400, 1800];

export default function SmartImage({
  photo,
  aspect = 4 / 3,
  sizes = '100vw',
  widths = DEFAULT_WIDTHS,
  className = '',
  imgClassName = '',
  priority = false,
  alt: altOverride,
}) {
  const [status, setStatus] = useState('loading');
  const alt = altOverride ?? photo.alt ?? '';
  const w = widths[widths.length - 1];

  return (
    <div className={cn('relative overflow-hidden bg-paper-200', className)}>
      {status === 'loading' ? <div className="skeleton absolute inset-0" aria-hidden="true" /> : null}
      {status === 'error' ? <Fallback alt={alt} /> : null}
      {status !== 'error' ? (
        <img
          src={url(photo, w, Math.round(w / aspect))}
          srcSet={srcSet(photo, aspect, widths)}
          sizes={sizes}
          alt={alt}
          width={w}
          height={Math.round(w / aspect)}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-700',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      ) : null}
    </div>
  );
}
