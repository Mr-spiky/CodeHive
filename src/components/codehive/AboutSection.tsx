"use client";

import { SectionHeader, GoldCard, GoldText } from "./ui";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { ABOUT_STATS } from "@/lib/codehive/data";
import type { StatItem } from "@/lib/codehive/types";
import { DynamicIcon } from "../DynamicIcon";

const CARD_COLORS = [
  { text: "text-[#7C3AED]", border: "border-[#7C3AED]/30", hoverBorder: "group-hover:border-[#7C3AED]/60" }, // Purple
  { text: "text-[#06B6D4]", border: "border-[#06B6D4]/30", hoverBorder: "group-hover:border-[#06B6D4]/60" }, // Cyan
  { text: "text-[#10B981]", border: "border-[#10B981]/30", hoverBorder: "group-hover:border-[#10B981]/60" }, // Emerald
  { text: "text-[#EC4899]", border: "border-[#EC4899]/30", hoverBorder: "group-hover:border-[#EC4899]/60" }, // Pink
];

// ─── StatCard ─────────────────────────────────────────────────
// Individual animated stat card — self-contained with its own counter ref.
function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useAnimatedCounter({ target: stat.value, suffix: stat.suffix });
  const theme = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <div
      className="group relative bg-[#111122]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:bg-[#111122]/80 hover:shadow-xl"
      style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
    >
      {/* Icon */}
      <div className={`${theme.text} mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1`}>
        <DynamicIcon name={stat.icon} size={32} strokeWidth={1.5} />
      </div>

      {/* Animated number */}
      <div className={`font-sora text-3xl md:text-4xl font-bold ${theme.text} mb-1`}>
        <span ref={ref}>
          0{stat.suffix}
        </span>
      </div>

      {/* Label */}
      <div className="text-gray-400 text-sm font-medium">{stat.label}</div>

      {/* Corner accent */}
      <div className={`absolute top-3 right-3 w-6 h-6 border-t border-r ${theme.border} ${theme.hoverBorder} transition-colors duration-300`} />
    </div>
  );
}

// ─── AboutSection ─────────────────────────────────────────────
export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#08081A] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text content */}
          <div>
            <SectionHeader
              badge="About CodeHive"
              title={
                <>
                  India's Most <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#10B981]">Execution-Driven</span> Tech Community
                </>
              }
              className="text-left mb-6"
            />
            <div className="space-y-4 text-gray-400 text-base leading-relaxed">
              <p>
                CodeHive is a fast-growing, student-led tech community launched in{" "}
                <span className="text-[#06B6D4] font-semibold">February 2026</span>,
                designed to bridge the gap between academic learning and real-world industry exposure.
              </p>
              <p>
                With <span className="text-white font-semibold">2000+ active members</span>{" "}
                across India, CodeHive connects students and early-stage professionals,
                with strong presence in{" "}
                <span className="text-[#7C3AED] font-semibold">Delhi NCR</span>.
              </p>
              <p>
                We are building a{" "}
                <span className="text-white font-semibold">high-performance ecosystem</span>{" "}
                where people don't just learn — they{" "}
                <span className="text-[#10B981] font-semibold">build, collaborate, and grow</span>.
              </p>
            </div>
          </div>

          {/* Right — Animated stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {ABOUT_STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
