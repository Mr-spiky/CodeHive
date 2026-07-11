import { Trophy, Code2, GitBranch, Network, GraduationCap, LucideIcon } from "lucide-react";

const ITEMS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Trophy, title: "Hackathons", desc: "Compete & build real-world solutions" },
  { icon: Code2, title: "Workshops", desc: "Learn from experts & industry leaders" },
  { icon: GitBranch, title: "Open Source", desc: "Contribute to meaningful projects" },
  { icon: Network, title: "Networking", desc: "Connect with like-minded developers" },
  { icon: GraduationCap, title: "Mentorship", desc: "Guidance from experienced mentors" },
];

export function WhatWeDo() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <h2 className="font-sora text-2xl font-bold text-white mb-8">What We Do</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="p-5 rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] hover:border-[var(--ch-gold-500)]/40 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[var(--ch-gold-700)]/15 flex items-center justify-center mb-4">
              <item.icon className="w-5 h-5 text-[var(--ch-gold-500)]" strokeWidth={1.75} />
            </div>
            <h3 className="font-sora font-semibold text-white text-sm mb-1">{item.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
