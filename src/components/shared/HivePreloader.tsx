"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 19 Hex coordinates to form a massive honeycomb (Center + Inner Ring 6 + Outer Ring 12)
const HEX_POSITIONS = [
  { x: 0, y: 0 }, // Center
  // Inner Ring
  { x: 0, y: -40 }, { x: 35, y: -20 }, { x: 35, y: 20 },
  { x: 0, y: 40 }, { x: -35, y: 20 }, { x: -35, y: -20 },
  // Outer Ring
  { x: 0, y: -80 }, { x: 35, y: -60 }, { x: 70, y: -40 },
  { x: 70, y: 0 }, { x: 70, y: 40 }, { x: 35, y: 60 },
  { x: 0, y: 80 }, { x: -35, y: 60 }, { x: -70, y: 40 },
  { x: -70, y: 0 }, { x: -70, y: -40 }, { x: -35, y: -60 },
];

const generateStartPositions = () => {
  return HEX_POSITIONS.map((_, i) => {
    // Deterministic golden angle distribution to avoid SSR/Client Math.random() hydration mismatch
    const angle = (i * 137.5) * (Math.PI / 180);
    const distance = 900 + ((i * 113) % 700);
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rotate: ((i * 97) % 720) - 360,
    };
  });
};

export function HivePreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [startPositions] = useState(generateStartPositions());

  useEffect(() => {
    // Only run once per session
    const preloaderPlayed = sessionStorage.getItem("codehive_preloader_played");
    if (preloaderPlayed) {
      setIsLoading(false);
      setHasPlayed(true);
      return;
    }

    // Massive cinematic duration
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("codehive_preloader_played", "true");
    }, 4500); // 4.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (hasPlayed) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#05050F] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 } }}
        >
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 1 }}
            animate={{ 
              scale: [1, 1, 1.1, 40],
              opacity: [1, 1, 1, 0] 
            }}
            transition={{ 
              times: [0, 0.8, 0.9, 1], 
              duration: 4.5, 
              ease: "easeInOut" 
            }}
          >
            {/* The Massive Assembled Hex Group */}
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              initial={{ x: 0, y: 0 }}
              animate={{ 
                x: [0, -6, 6, -6, 6, -4, 4, 0],
                y: [0, 4, -4, 4, -4, 2, -2, 0]
              }}
              transition={{
                delay: 2.2, // Start vibrating after swarm assembly
                duration: 0.7,
                ease: "linear"
              }}
            >
              {HEX_POSITIONS.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-10 h-10 bg-gradient-to-br from-[var(--ch-gold-500)] to-[var(--ch-gold-900)] shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    marginLeft: pos.x,
                    marginTop: pos.y,
                  }}
                  initial={{
                    x: startPositions[i].x,
                    y: startPositions[i].y,
                    scale: 0,
                    rotate: startPositions[i].rotate
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 10,
                    delay: i * 0.08, // Staggered swarm fly-in
                  }}
                />
              ))}
              
              {/* Core Overload Flash */}
              <motion.div
                className="absolute inset-0 bg-white rounded-full blur-[100px]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 5, 10] }}
                transition={{ delay: 2.8, duration: 1.2, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
          
          {/* System Boot Text Overlay */}
          <motion.div 
            className="absolute bottom-10 left-10 font-inter text-[var(--ch-gold-500)] text-xs tracking-widest uppercase opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ delay: 0.5, duration: 2 }}
          >
            <p>Initializing CodeHive Core...</p>
            <p>Connecting to Hive Network...</p>
            <p>Synchronizing nodes...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
