import { SectionHeader, GoldText } from "./ui";
import { ACHIEVEMENTS, BIG_STATS } from "@/lib/codehive/data";
import type { AchievementItem, BigStatItem } from "@/lib/codehive/types";

// ─── BigStatCard ──────────────────────────────────────────────
function BigStatCard({ stat }: { stat: BigStatItem }) {
  return (
    <div className="text-center p-6 rounded-2xl bg-[#111111] border border-[#C9A227]/15 hover:border-[#C9A227]/40 hover:bg-[#141414] transition-all duration-400 group">
      <div className="font-sora text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#E5C84A] to-[#C9A227] mb-2">
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
}: {
  achievement: AchievementItem;
  isLastOdd: boolean;
}) {
  return (
    <div
      className={`group flex gap-4 p-5 rounded-2xl border border-[#C9A227]/10 bg-[#111111] hover:border-[#C9A227]/35 hover:bg-[#141414] transition-all duration-400 ${
        isLastOdd ? "sm:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="w-10 h-10 rounded-xl bg-[#C9A227]/12 border border-[#C9A227]/20 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-[#C9A227]/20 transition-colors duration-300">
        {achievement.icon}
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
    <section className="py-24 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#C9A227]/4 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          badge="Community Impact"
          title={
            <>
              Real <GoldText>Growth</GoldText>, Real <GoldText>Results</GoldText>
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
              isLastOdd={i === ACHIEVEMENTS.length - 1 && ACHIEVEMENTS.length % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
