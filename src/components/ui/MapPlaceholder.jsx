import { cn } from '../../lib/cn';

const streets = [
  { top: '22%', left: '-6%', width: '78%', rotate: -3 },
  { top: '58%', left: '18%', width: '92%', rotate: 2 },
  { top: '80%', left: '4%', width: '70%', rotate: -1 },
  { top: '12%', left: '62%', width: '62%', rotate: 74 },
  { top: '44%', left: '72%', width: '58%', rotate: 96 },
];

const blocks = [
  { top: '6%', left: '4%', w: '20%', h: '12%' },
  { top: '30%', left: '6%', w: '15%', h: '18%' },
  { top: '46%', left: '38%', w: '22%', h: '16%' },
  { top: '64%', left: '10%', w: '18%', h: '16%' },
  { top: '70%', left: '52%', w: '24%', h: '18%' },
  { top: '26%', left: '80%', w: '16%', h: '20%' },
];

export default function MapPlaceholder({ className }) {
  return (
    <div
      className={cn(
        'relative isolate w-full overflow-hidden rounded-3xl border border-ink/10 bg-[#EFEAE0]',
        className,
      )}
      role="img"
      aria-label={`Map showing the clinic location at ${'214 Willow Creek Drive, Lakeside'}`}
    >
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="map-grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M8 0H0v8" fill="none" stroke="rgba(10,27,42,0.055)" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#map-grid)" />
        <path d="M0 84c22-6 44 4 100-10v26H0Z" fill="rgba(169,216,203,0.45)" />
        {streets.map((s) => (
          <rect
            key={s.top + s.left}
            x={s.left}
            y={s.top}
            width={s.width}
            height="3.2"
            fill="#FFFFFF"
            opacity="0.9"
            transform={`rotate(${s.rotate} 50 50)`}
          />
        ))}
        {blocks.map((b, i) => (
          <rect
            key={i}
            x={b.left}
            y={b.top}
            width={b.w}
            height={b.h}
            rx="1"
            fill="rgba(10,27,42,0.055)"
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-full rounded-full bg-teal/15" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-ink text-mint shadow-lift ring-4 ring-paper/70">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="10" r="2.4" fill="currentColor" />
          </svg>
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 bg-paper/85 px-4 py-3 backdrop-blur-sm sm:px-5">
        <p className="text-[0.78rem] text-ink-500">
          Free patient parking at the rear · Step-free access
        </p>
        <span className="rounded-full border border-ink/12 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ink-400">
          Map preview
        </span>
      </div>
    </div>
  );
}
