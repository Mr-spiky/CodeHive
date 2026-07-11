import { Linkedin, Github, Twitter } from "lucide-react";

interface TeamMemberCardProps {
  name: string;
  role: string;
  photoUrl: string | null;
  linkedin: string | null;
  github: string | null;
  twitter: string | null;
}

export function TeamMemberCard({ name, role, photoUrl, linkedin, github, twitter }: TeamMemberCardProps) {
  return (
    <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-5 text-center hover:border-[var(--ch-gold-500)]/40 transition-colors">
      <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-[var(--ch-gold-700)]/20 flex items-center justify-center overflow-hidden">
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-lg font-bold text-[var(--ch-gold-500)]">{name.charAt(0)}</span>
        )}
      </div>
      <h4 className="font-sora font-semibold text-white text-sm">{name}</h4>
      <p className="text-[var(--ch-gold-500)] text-xs mb-3">{role}</p>
      <div className="flex justify-center gap-2">
        {linkedin && <a href={linkedin} className="text-gray-500 hover:text-[var(--ch-gold-500)]"><Linkedin size={14} /></a>}
        {github && <a href={github} className="text-gray-500 hover:text-[var(--ch-gold-500)]"><Github size={14} /></a>}
        {twitter && <a href={twitter} className="text-gray-500 hover:text-[var(--ch-gold-500)]"><Twitter size={14} /></a>}
      </div>
    </div>
  );
}
