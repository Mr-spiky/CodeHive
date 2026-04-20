import { SectionHeader, GoldCard, GoldText } from "./ui";
import { COMMUNITY_GROUPS } from "@/lib/codehive/data";
import { COMMUNITY_LINK } from "@/lib/codehive/constants";

// ─── ArrowIcon ────────────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

// ─── GroupCard ────────────────────────────────────────────────
function GroupCard({ group }: { group: (typeof COMMUNITY_GROUPS)[number] }) {
  return (
    <GoldCard topAccent className="p-6 group hover:-translate-y-2 hover:border-[#C9A227] hover:shadow-[0_0_30px_rgba(201,162,39,0.3)] transition-all duration-300">
      {/* Icon box + Category Tag */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/25 flex items-center justify-center text-2xl group-hover:bg-[#C9A227]/20 group-hover:border-[#C9A227]/50 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
          {group.icon}
        </div>
        {group.category && (
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C9A227]/70 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-full">
            {group.category}
          </span>
        )}
      </div>

      <h3 className="font-sora text-lg font-bold text-white mb-1 group-hover:text-[#C9A227] transition-colors duration-300">
        {group.title}
      </h3>

      <div className="text-[#C9A227]/70 text-xs font-medium mb-3">
        {group.members} members
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-5">{group.description}</p>

      {/* CTA — all cards share the single community link */}
      <a
        href={COMMUNITY_LINK}
        id={`group-join-${group.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-bold text-[#C9A227] hover:gap-3 transition-all duration-300 group-hover:text-[#E5C84A]"
      >
        Enter Group <ArrowIcon />
      </a>

      {/* Corner bracket decoration */}
      <div className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[#C9A227]/20 group-hover:border-[#C9A227]/50 transition-colors duration-300" />
    </GoldCard>
  );
}

// ─── CommunityGroupsSection ───────────────────────────────────
export function CommunityGroupsSection() {
  return (
    <section id="groups" className="py-24 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-[#C9A227]/6 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          badge="Community Groups"
          title={
            <>
              Find Your <GoldText>Tribe</GoldText>
            </>
          }
          subtitle="Join the groups that match your goals. Every group is active, curated, and value-driven."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMUNITY_GROUPS.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
