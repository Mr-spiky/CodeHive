"use client";
import { motion } from "framer-motion";

interface HexTileProps {
  zoneId: string;
  label: string;
  icon: string;
  locked: boolean;
  onSelect?: (zoneId: string) => void;
}

export function HexTile({ zoneId, label, icon, locked, onSelect }: HexTileProps) {
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
        <span className="hex-tile__icon">{locked ? "🔒" : icon}</span>
        <span className="hex-tile__label">{label}</span>
      </span>
    </motion.button>
  );
}
