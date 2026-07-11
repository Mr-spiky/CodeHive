import { Code, Palette, Megaphone, Calendar, FileText, Share2 } from "lucide-react";

const DEPT_ICONS: Record<string, typeof Code> = {
  "Technical Team": Code, "Design Team": Palette, "Marketing Team": Megaphone,
  "Event Team": Calendar, "Content Team": FileText, "Outreach Team": Share2,
};

export function OrgDeptCard({ department, memberCount }: { department: string; memberCount: number }) {
  const Icon = DEPT_ICONS[department] ?? Code;
  return (
    <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-5 text-center hover:border-[var(--ch-gold-500)]/40 transition-colors">
      <div className="w-11 h-11 rounded-xl bg-[var(--ch-gold-700)]/15 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-5 h-5 text-[var(--ch-gold-500)]" strokeWidth={1.75} />
      </div>
      <h4 className="font-sora font-semibold text-white text-sm">{department}</h4>
      <p className="text-gray-500 text-xs mt-1">{memberCount} Members</p>
    </div>
  );
}
