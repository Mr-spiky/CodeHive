import { SectionHeader, GoldButton, GoldText } from "./ui";
import { COMPARISONS } from "@/lib/codehive/data";
import type { ComparisonItem } from "@/lib/codehive/types";

// ─── Icons ────────────────────────────────────────────────────
function CrossIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#C9A227]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ─── ComparisonRow ────────────────────────────────────────────
function ComparisonRow({ item }: { item: ComparisonItem }) {
  return (
    <div className="group grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#C9A227]/10 hover:border-[#C9A227]/30 transition-all duration-400 hover:shadow-[0_0_30px_rgba(201,162,39,0.08)]">
      {/* Left — the "not" side */}
      <div className="flex items-center gap-4 px-6 py-5 bg-[#0F0F0F] group-hover:bg-[#111111] transition-colors duration-300 border-r border-[#C9A227]/10">
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <CrossIcon />
        </div>
        <span className="text-gray-500 text-sm line-through decoration-red-500/50 leading-relaxed">
          {item.not}
        </span>
      </div>

      {/* Right — the "yes" side */}
      <div className="flex items-center gap-4 px-6 py-5 bg-[#111111] group-hover:bg-[#141414] transition-colors duration-300">
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 flex items-center justify-center">
          <CheckIcon />
        </div>
        <span className="text-white text-sm font-medium leading-relaxed">{item.yes}</span>
      </div>
    </div>
  );
}

// ─── WhatsCodeHiveDifferentSection ───────────────────────────
export function WhatsCodeHiveDifferentSection() {
  return (
    <section className="py-24 md:py-32 bg-[#060606] relative overflow-hidden">
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C9A227]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          badge="What Makes Us Different"
          title={
            <>
              We're Not Your <GoldText>Average</GoldText> Community
            </>
          }
          subtitle="This is where you stand out. Here's how CodeHive is different from every other community."
        />

        <div className="max-w-4xl mx-auto space-y-4">
          {COMPARISONS.map((item) => (
            <ComparisonRow key={item.not} item={item} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-gray-400 text-base mb-6">
            Ready to be part of something that actually moves the needle?
          </p>
          <GoldButton href="#groups">
            Join CodeHive Now →
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
