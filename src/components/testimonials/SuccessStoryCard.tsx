import { Trophy, Briefcase, Rocket, Users } from "lucide-react";
import Link from "next/link";

const ICONS: Record<string, typeof Trophy> = { trophy: Trophy, briefcase: Briefcase, rocket: Rocket, users: Users };

export function SuccessStoryCard({ title, summary, iconKey, linkUrl }: { title: string; summary: string; iconKey: string; linkUrl: string | null }) {
  const Icon = ICONS[iconKey] ?? Trophy;
  return (
    <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-5">
      <div className="w-11 h-11 rounded-xl bg-[var(--ch-gold-700)]/15 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-[var(--ch-gold-500)]" strokeWidth={1.75} />
      </div>
      <h4 className="font-sora font-semibold text-white text-sm mb-1.5">{title}</h4>
      <p className="text-gray-500 text-xs mb-3 leading-relaxed">{summary}</p>
      {linkUrl && <Link href={linkUrl} className="text-xs font-semibold text-[var(--ch-gold-500)]">Read Story →</Link>}
    </div>
  );
}
