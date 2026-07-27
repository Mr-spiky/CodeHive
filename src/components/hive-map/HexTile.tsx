"use client";
import type { LucideIcon } from "lucide-react";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

interface HexTileProps {
  zoneId: string;
  label: string;
  icon: LucideIcon;
  locked: boolean;
  onSelect?: (zoneId: string) => void;
}

export function HexTile({ zoneId, label, icon: Icon, locked, onSelect }: HexTileProps) {
  return (
    <motion.button
      type="button"
      whileHover={!locked ? { scale: 1.08, y: -4 } : undefined}
      whileTap={!locked ? { scale: 0.96 } : undefined}
      onClick={() => !locked && onSelect?.(zoneId)}
      disabled={locked}
      className={`hex-tile ${locked ? "hex-tile--locked" : "hex-tile--unlocked"}`}
      aria-label={locked ? `${label} (locked)` : label}
    >
      <span className="hex-tile__inner">
        <span className="hex-tile__icon">
          {locked
            ? <Lock className="w-7 h-7 text-[var(--ch-gold-950)]/40" strokeWidth={1.5} />
            : <Icon className="w-7 h-7 text-[var(--ch-gold-300)]" strokeWidth={1.5} />
          }
        </span>
        <span className="hex-tile__label">{label}</span>
      </span>
    </motion.button>
  );
}
