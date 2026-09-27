import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full text-[0.9rem] font-medium transition-all duration-400 ease-premium disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary:
    'bg-ink text-white shadow-soft hover:bg-ink-700 hover:shadow-lift active:scale-[0.985] focus-visible:ring-offset-paper',
  teal: 'bg-teal text-white shadow-soft hover:bg-teal-600 hover:shadow-lift active:scale-[0.985]',
  mint: 'bg-mint text-ink hover:bg-mint-300 active:scale-[0.985]',
  outline:
    'border border-ink/15 bg-transparent text-ink hover:border-ink/40 hover:bg-ink/[0.03] active:scale-[0.985]',
  outlineLight:
    'border border-white/25 bg-transparent text-white hover:border-white/60 hover:bg-white/10 active:scale-[0.985]',
  ghost: 'text-ink hover:bg-ink/[0.05]',
  light: 'bg-white text-ink shadow-soft hover:bg-paper-100 active:scale-[0.985]',
};

const sizes = {
  sm: 'h-10 px-5 text-[0.82rem]',
  md: 'h-12 px-6',
  lg: 'h-14 px-7 text-[0.95rem] sm:h-[3.75rem] sm:px-8',
};

const Button = forwardRef(function Button(
  { as, to, href, variant = 'primary', size = 'md', className = '', children, icon: Icon, ...rest },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {Icon ? (
          <Icon
            className="h-4 w-4 shrink-0 transition-transform duration-400 ease-premium group-hover:translate-x-1"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        ) : null}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-600 ease-premium group-hover:translate-x-0"
      />
    </>
  );

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  const Tag = as ?? 'button';
  return (
    <Tag ref={ref} className={classes} {...rest}>
      {content}
    </Tag>
  );
});

export default Button;
