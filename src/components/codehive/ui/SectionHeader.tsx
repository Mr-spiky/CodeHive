// ─── SectionHeader ────────────────────────────────────────────
// Combines SectionBadge + h2 title + optional subtitle.
// Eliminates ~15 lines of identical markup from every section.
//
// Usage:
//   <SectionHeader badge="Community Groups" title={<>Find Your <GoldText>Tribe</GoldText></>} subtitle="Join the groups..." />

import { SectionBadge } from "./SectionBadge";

interface SectionHeaderProps {
  /** Text inside the gold pill badge */
  badge: string;
  /** Section h2 — can include <GoldText> spans */
  title: React.ReactNode;
  /** Optional paragraph below the heading */
  subtitle?: string;
  /** Extra classes for the wrapper div */
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <SectionBadge>{badge}</SectionBadge>
      <h2 className="font-sora text-4xl md:text-5xl font-bold text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
