"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

interface DecodeTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per tick
}

export function DecodeText({ text, className = "", speed = 40 }: DecodeTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    let interval: NodeJS.Timeout;

    // Start scrambled
    setDisplayText(text.replace(/./g, () => CHARS[Math.floor(Math.random() * CHARS.length)]));

    interval = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index]; // Resolved
            }
            if (letter === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)]; // Scrambled
          })
          .join("");
      });

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // Controls how many characters resolve per tick
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
