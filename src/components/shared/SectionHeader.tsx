import { ReactNode } from "react";

export function SectionHeader({
  badge,
  title,
  subtitle,
  action,
}: {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      <div>
        {badge && <span className="text-xs font-bold tracking-widest uppercase text-[var(--ch-gold-500)] mb-2 block">{badge}</span>}
        <h2 className="font-sora text-2xl md:text-3xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-gray-400 mt-2 max-w-xl">{subtitle}</p>}
      </div>
      {action && (
        <a href={action.href} className="text-sm font-semibold text-[var(--ch-gold-500)] hover:text-[var(--ch-gold-300)] whitespace-nowrap">
          {action.label} →
        </a>
      )}
    </div>
  );
}
