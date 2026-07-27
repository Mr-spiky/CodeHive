"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  yOffset: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function AmbientParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles only on the client to avoid hydration mismatch
    const generatedParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage of screen width
      yOffset: Math.random() * 100 + 100, // start below screen
      size: Math.random() * 15 + 5, // 5px to 20px
      duration: Math.random() * 20 + 15, // 15s to 35s
      delay: Math.random() * 10, // 0s to 10s delay
      opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4 opacity
    }));
    setParticles(generatedParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-0 bg-[var(--ch-gold-500)] shadow-[0_0_8px_rgba(255,215,0,0.8)]"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Hex shape
          }}
          initial={{ y: p.yOffset, opacity: 0, rotate: 0 }}
          animate={{
            y: -window.innerHeight - 100, // Float all the way up off-screen
            opacity: [0, p.opacity, p.opacity, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
