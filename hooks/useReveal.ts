import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export function useReveal<T extends HTMLElement>(
  opts: IntersectionObserverInit = { threshold: 0.1 }
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, opts);

    io.observe(el);
    return () => io.disconnect();
  }, [opts, prefersReducedMotion]);

  useLayoutEffect(() => {
    if (prefersReducedMotion) setVisible(true);
  }, [prefersReducedMotion]);

  return { ref, visible };
}
