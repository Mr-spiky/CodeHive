"use client";

import { SectionHeader } from "./ui";
import Link from "next/link";
import { COMPARISONS } from "@/lib/codehive/data";
import type { ComparisonItem } from "@/lib/codehive/types";
import { DynamicIcon } from "../DynamicIcon";
import { COMMUNITY_LINK } from "@/lib/codehive/constants";

// ─── ComparisonCard ────────────────────────────────────────────
function ComparisonCard({ item }: { item: ComparisonItem }) {
  return (
    <div className="bg-[#0D0D1F]/40 border border-white/5 rounded-2xl p-6 md:p-8 hover:bg-[#0D0D1F]/80 transition-colors duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10">
          <DynamicIcon name={item.icon} size={22} strokeWidth={1.5} />
        </div>
        <h3 className="font-sora text-xl font-bold text-white">
          {item.title}
        </h3>
      </div>

      {/* Comparison Grid */}
      <div className="flex flex-col gap-6 flex-grow">
        
        {/* The "Not" Side (Average Community) */}
        <div className="relative pl-6">
          <span className="absolute left-0 top-0.5 text-red-500 font-bold text-lg leading-none">×</span>
          <p className="text-gray-500 text-sm leading-relaxed">
             {item.not}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* The "Yes" Side (CodeHive) */}
        <div className="relative pl-6">
          <span className="absolute left-0 top-0.5 text-[#10B981] font-bold text-lg leading-none">✓</span>
          <p className="text-gray-200 text-sm font-medium leading-relaxed">
             {item.yes}
          </p>
        </div>

      </div>
    </div>
  );
}

export function WhatsCodeHiveDifferentSection() {
  return (
    <section className="py-20 bg-[#070711] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <SectionHeader
          badge="What Makes Us Different"
          title={
            <>
              We're Not Your <span className="text-[#10B981]">Average</span> Community
            </>
          }
          subtitle="This is where you stand out. See exactly why joining CodeHive accelerates your growth."
        />

        {/* 3-Column Grid Layout for Comparisons */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          {COMPARISONS.map((item) => (
            <ComparisonCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link 
            href={COMMUNITY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#10B981]/50 hover:bg-[#10B981]/10 text-white font-semibold text-sm transition-all group"
          >
            Join CodeHive Now 
            <span className="group-hover:translate-x-1 transition-transform text-[#10B981]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
