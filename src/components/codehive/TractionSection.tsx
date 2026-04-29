import { SectionHeader } from "./ui";
import { ACHIEVEMENTS, BIG_STATS } from "@/lib/codehive/data";
import type { AchievementItem, BigStatItem } from "@/lib/codehive/types";
import { DynamicIcon } from "../DynamicIcon";

// ─── BigStatCard ──────────────────────────────────────────────
function BigStatCard({ stat }: { stat: BigStatItem }) {
  return (
    <div className="text-center p-6 rounded-3xl bg-[#0D0D1F]/50 backdrop-blur-sm border border-[#7C3AED]/20 hover:border-[#06B6D4]/50 hover:bg-[#111122]/80 transition-all duration-500 group shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="font-sora text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#06B6D4] to-[#10B981] mb-2 group-hover:scale-105 transition-transform duration-300">
        {stat.value}
      </div>
      <div className="text-white font-semibold text-sm mb-1">{stat.label}</div>
      <div className="text-gray-500 text-xs">{stat.sub}</div>
    </div>
  );
}

// ─── AchievementCard ──────────────────────────────────────────
function AchievementCard({
  achievement,
  isLastOdd,
  index,
}: {
  achievement: AchievementItem;
  isLastOdd: boolean;
  index: number;
}) {
  const borderColors = [
    "group-hover:border-l-[#7C3AED]", // Purple
    "group-hover:border-l-[#06B6D4]", // Cyan
    "group-hover:border-l-[#10B981]", // Emerald
    "group-hover:border-l-[#EC4899]", // Pink
  ];
  const colorClass = borderColors[index % borderColors.length];

  return (
    <div
      className={`group flex gap-4 p-5 rounded-2xl border border-white/5 border-l-4 border-l-transparent bg-[#111122]/40 backdrop-blur-sm hover:bg-[#111122]/80 transition-all duration-500 ${colorClass} ${
        isLastOdd ? "sm:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 flex-shrink-0 group-hover:text-white group-hover:scale-110 transition-all duration-300">
        <DynamicIcon name={achievement.icon} size={22} strokeWidth={1.5} />
      </div>
      <div>
        <div className="font-sora text-white font-semibold text-sm mb-1">{achievement.title}</div>
        <div className="text-gray-400 text-xs leading-relaxed">{achievement.desc}</div>
      </div>
    </div>
  );
}

// ─── TractionSection ──────────────────────────────────────────
export function TractionSection() {
  return (
    <section className="py-24 md:py-32 bg-[#05050F] relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <SectionHeader
          badge="Community Impact"
          title={
            <>
              Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#10B981]">Growth</span>, Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#06B6D4]">Results</span>
            </>
          }
          subtitle="We measure success by the actual impact created for our members."
        />

        {/* Big Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {BIG_STATS.map((stat) => (
            <BigStatCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Achievement badges */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((achievement, i) => (
            <AchievementCard
              key={achievement.title}
              achievement={achievement}
              index={i}
              isLastOdd={i === ACHIEVEMENTS.length - 1 && ACHIEVEMENTS.length % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
