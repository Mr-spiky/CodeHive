"use client";

import { SectionHeader, GoldCard, GoldText } from "./ui";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { ABOUT_STATS } from "@/lib/codehive/data";
import type { StatItem } from "@/lib/codehive/types";

// ─── StatCard ─────────────────────────────────────────────────
// Individual animated stat card — self-contained with its own counter ref.
function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useAnimatedCounter({ target: stat.value, suffix: stat.suffix });

  return (
    <GoldCard
      className="p-6"
      style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
    >
      {/* Icon */}
      <div className="text-3xl mb-3">{stat.icon}</div>

      {/* Animated number */}
      <div className="font-sora text-3xl md:text-4xl font-bold text-[#C9A227] mb-1">
        <span ref={ref}>
          0{stat.suffix}
        </span>
      </div>

      {/* Label */}
      <div className="text-gray-400 text-sm">{stat.label}</div>

      {/* Corner accent */}
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#C9A227]/30 group-hover:border-[#C9A227]/60 transition-colors duration-300" />
    </GoldCard>
  );
}

// ─── AboutSection ─────────────────────────────────────────────
export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text content */}
          <div>
            <SectionHeader
              badge="About CodeHive"
              title={
                <>
                  India's Most <GoldText>Execution-Driven</GoldText> Tech Community
                </>
              }
              className="text-left mb-6"
            />
            <div className="space-y-4 text-gray-400 text-base leading-relaxed">
              <p>
                CodeHive is a fast-growing, student-led tech community launched in{" "}
                <span className="text-[#C9A227] font-semibold">February 2026</span>,
                designed to bridge the gap between academic learning and real-world industry exposure.
              </p>
              <p>
                With <span className="text-white font-semibold">2000+ active members</span>{" "}
                across India, CodeHive connects students and early-stage professionals,
                with strong presence in{" "}
                <span className="text-[#C9A227] font-semibold">Delhi NCR</span>.
              </p>
              <p>
                We are building a{" "}
                <span className="text-white font-semibold">high-performance ecosystem</span>{" "}
                where people don't just learn — they{" "}
                <span className="text-[#C9A227]">build, collaborate, and grow</span>.
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
