import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current && !hash) {
      firstRender.current = false;
      return;
    }

    if (hash) {
      const id = hash.replace('#', '');
      const attempt = (retries) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 92;
          window.scrollTo({ top, behavior: 'smooth' });
          return;
        }
        if (retries > 0) window.setTimeout(() => attempt(retries - 1), 90);
      };
      attempt(6);
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
