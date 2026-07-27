"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Plays once per browser session (sessionStorage-gated) - a returning
// member mid-session doesn't have to sit through it on every navigation
// back to /hive, only on their first entry that session.
export function HiveEntryGate({ username, children }: { username: string; children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [showGate, setShowGate] = useState(true);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem("hive-entry-seen");
    if (seen) {
      setShowGate(false);
      return;
    }
    sessionStorage.setItem("hive-entry-seen", "1");
    const timer = setTimeout(() => setShowGate(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
      <AnimatePresence>
        {mounted && showGate && (
          <motion.div
            className="hive-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
          >
            <svg viewBox="0 0 200 200" width="160" height="160">
              <defs>
                <linearGradient id="gateStroke" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F4A227" />
                  <stop offset="100%" stopColor="#C9A227" />
                </linearGradient>
                <linearGradient id="gateFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C9A227" />
                  <stop offset="100%" stopColor="#6B5412" />
                </linearGradient>
              </defs>
              <motion.polygon
                points="100,10 175,55 175,145 100,190 25,145 25,55"
                fill="none"
                stroke="url(#gateStroke)"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
              <motion.polygon
                points="100,10 175,55 175,145 100,190 25,145 25,55"
                fill="url(#gateFill)"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "center" }}
              />
            </svg>
            <motion.p
              className="hive-gate__text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Entering the Hive...
            </motion.p>
            <motion.p
              className="hive-gate__subtext"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Welcome back, {username}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
