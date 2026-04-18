"use client";

// ─── useAnimatedCounter ───────────────────────────────────────
// Triggers a smooth count-up animation when the element scrolls into view.
// Uses IntersectionObserver so it only runs once.
//
// Usage:
//   const ref = useAnimatedCounter({ target: 2000, suffix: "+" });
//   return <span ref={ref}>0+</span>;

import { useEffect, useRef } from "react";

interface UseAnimatedCounterOptions {
  target: number;
  suffix?: string;
  /** Animation duration in ms (default: 2000) */
  duration?: number;
  /** IntersectionObserver threshold (default: 0.3) */
  threshold?: number;
}

export function useAnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  threshold = 0.3,
}: UseAnimatedCounterOptions) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          let current = 0;
          const step = Math.ceil(target / (duration / 16));

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target.toLocaleString() + suffix;
              clearInterval(timer);
            } else {
              el.textContent = current.toLocaleString() + suffix;
            }
          }, 16);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration, threshold]);

  return ref;
}
