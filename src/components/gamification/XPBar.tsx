"use client";
import { motion } from "framer-motion";

interface XPBarProps { xp: number; percent: number; currentLabel: string; nextLabel?: string; }

export function XPBar({ xp, percent, currentLabel, nextLabel }: XPBarProps) {
  return (
    <div className="xp-bar">
      <div className="xp-bar__labels">
        <span className="xp-bar__current">{currentLabel}</span>
        {nextLabel && <span className="xp-bar__next">Next: {nextLabel}</span>}
      </div>
      <div className="xp-bar__track">
        <motion.div className="xp-bar__fill" initial={{ width: 0 }} animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }} />
      </div>
      <span className="xp-bar__value">{xp} XP</span>
    </div>
  );
}
