/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A1B2A',
          900: '#0A1B2A',
          800: '#12293D',
          700: '#1B3348',
          600: '#2E4A61',
          500: '#48627A',
          400: '#6C8397',
          300: '#98A8B5',
        },
        paper: {
          DEFAULT: '#FBF9F5',
          50: '#FFFFFF',
          100: '#F6F2EA',
          200: '#EDE5D7',
          300: '#E2D8C6',
        },
        teal: {
          DEFAULT: '#0E7C74',
          800: '#063C39',
          700: '#084B47',
          600: '#0A625C',
          500: '#0E7C74',
          400: '#3E9C93',
          300: '#7FC3BA',
          200: '#C3E3DD',
        },
        mint: { DEFAULT: '#D9EFE9', 300: '#A9D8CB' },
        sand: { DEFAULT: '#E7DCC9', 300: '#F1EADC' },
        clay: { DEFAULT: '#B96A3C', 400: '#D08A5C' },
        stone: '#5F6F7B',
      },
      fontFamily: {
        display: ['Fraunces', 'Iowan Old Style', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.6rem, 1.35rem + 5.6vw, 5.4rem)', { lineHeight: '0.98', letterSpacing: '-0.032em' }],
        'display-lg': ['clamp(2.15rem, 1.3rem + 3.9vw, 3.9rem)', { lineHeight: '1.03', letterSpacing: '-0.028em' }],
        'display-md': ['clamp(1.8rem, 1.25rem + 2.6vw, 2.95rem)', { lineHeight: '1.08', letterSpacing: '-0.022em' }],
        'display-sm': ['clamp(1.45rem, 1.16rem + 1.5vw, 2.05rem)', { lineHeight: '1.16', letterSpacing: '-0.016em' }],
        'display-xs': ['clamp(1.2rem, 1.05rem + 0.8vw, 1.5rem)', { lineHeight: '1.22', letterSpacing: '-0.012em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.2em' }],
        lede: ['clamp(1.0625rem, 1.005rem + 0.32vw, 1.22rem)', { lineHeight: '1.62' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.75' }],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,27,42,0.04), 0 10px 30px -16px rgba(10,27,42,0.12)',
        lift: '0 2px 4px rgba(10,27,42,0.04), 0 28px 56px -24px rgba(10,27,42,0.20)',
        panel: '0 -8px 40px -12px rgba(10,27,42,0.16), 0 40px 80px -40px rgba(10,27,42,0.35)',
        ring: '0 0 0 1px rgba(10,27,42,0.07)',
        'ring-strong': '0 0 0 1px rgba(10,27,42,0.14)',
      },
      borderRadius: { '4xl': '1.75rem', '5xl': '2.25rem' },
      transitionTimingFunction: { premium: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      transitionDuration: { 400: '400ms', 600: '600ms', 900: '900ms' },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        caret: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.15' } },
        drawIn: { from: { strokeDashoffset: '1' }, to: { strokeDashoffset: '0' } },
        'assistant-in': {
          from: { opacity: '0', transform: 'scale(0.86) translateY(10px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        floaty: 'floaty 7s ease-in-out infinite',
        caret: 'caret 1.1s steps(1) infinite',
        'assistant-in': 'assistant-in 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(10,27,42,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,27,42,0.045) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
