// ─── GoldCard ─────────────────────────────────────────────────
// The dark card with gold hover border used in Groups, Team, Traction sections.
// Supports an optional top accent line on hover.
//
// Usage:
//   <GoldCard className="p-6">...</GoldCard>
//   <GoldCard topAccent className="p-8">...</GoldCard>

interface GoldCardProps {
  children: React.ReactNode;
  /** Adds a subtle gold line that appears on hover at the top edge */
  topAccent?: boolean;
  /** Additional Tailwind classes (e.g. padding, grid span) */
  className?: string;
  /** HTML id for the card element */
  id?: string;
}

export function GoldCard({ children, topAccent = false, className = "", id }: GoldCardProps) {
  return (
    <div
      id={id}
      className={`group relative rounded-2xl border border-[#C9A227]/15 bg-[#111111]
        hover:border-[#C9A227]/40 hover:bg-[#141414]
        transition-all duration-500
        hover:shadow-[0_0_40px_rgba(201,162,39,0.12)]
        hover:-translate-y-1
        ${className}`}
    >
      {/* Optional top gold line that appears on hover */}
      {topAccent && (
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#C9A227]/0 to-transparent group-hover:via-[#C9A227]/50 transition-all duration-500" />
      )}
      {children}
    </div>
  );
}
