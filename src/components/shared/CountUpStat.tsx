"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

// Parses "2000+", "4.9/5", "25+" etc. into a numeric target + surrounding
// text, so the number can tween while everything else stays intact.
function parseStatValue(value: string) {
  const match = value.match(/^([^\d]*)(\d+(\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: value, isDecimal: false };
  return {
    prefix: match[1],
    target: parseFloat(match[2]),
    suffix: match[4],
    isDecimal: match[2].includes("."),
  };
}

export function CountUpStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { prefix, target, suffix, isDecimal } = parseStatValue(value);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(v) {
        setDisplay(`${prefix}${isDecimal ? v.toFixed(1) : Math.round(v)}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, target, prefix, suffix, isDecimal]);

  return <span ref={ref}>{display}</span>;
}
