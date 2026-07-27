import { LucideIcon, Users, Calendar, Trophy, Globe, Award, Star } from "lucide-react";
import { CountUpStat } from "./CountUpStat";
import { Reveal } from "@/components/shared/Reveal";

interface StatStripItem {
  value: string;
  label: string;
}

const ICON_CYCLE: LucideIcon[] = [Users, Star, Calendar, Globe, Trophy, Award];

// Generic compact stat strip, used under every page hero. Always fed real
// data via props - never hardcodes numbers internally.
export function StatStrip({ stats }: { stats: StatStripItem[] }) {
  return (
    <section className="bg-[#05050F] border-y border-[var(--ch-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => {
            const Icon = ICON_CYCLE[i % ICON_CYCLE.length];
            return (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#111122] border border-[var(--ch-gold-700)]/25 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[var(--ch-gold-500)]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="font-sora text-lg font-bold text-white leading-none">
                      <CountUpStat value={stat.value} />
                    </div>
                    <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
