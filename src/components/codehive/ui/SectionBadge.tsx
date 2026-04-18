// ─── SectionBadge ─────────────────────────────────────────────
// The gold pill badge shown at the top of every section header.
// Usage: <SectionBadge>Community Groups</SectionBadge>

interface SectionBadgeProps {
  children: React.ReactNode;
}

export function SectionBadge({ children }: SectionBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 text-[#C9A227] text-xs font-semibold tracking-widest uppercase mb-4">
      {children}
    </div>
  );
}
