import { SectionHeader, GoldCard, HexIcon, GoldText } from "./ui";
import { TEAM_MEMBERS } from "@/lib/codehive/data";
import type { TeamMember } from "@/lib/codehive/types";

// ─── LinkedInIcon ─────────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── TeamCard ─────────────────────────────────────────────────
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <GoldCard id={member.id} className="p-6">
      {/* Hexagonal avatar */}
      <HexIcon emoji={member.emoji} size={64} className="mb-5" />

      <h3 className="font-sora text-lg font-bold text-white mb-1">{member.name}</h3>
      <p className="text-[#C9A227]/80 text-sm font-medium mb-3">{member.role}</p>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {member.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 text-xs font-medium text-gray-400 border border-white/8 rounded-full bg-white/3"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* LinkedIn link */}
      <a
        href={member.linkedin}
        id={`${member.id}-linkedin`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${member.name} LinkedIn profile`}
        className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#C9A227] transition-colors duration-300"
      >
        <LinkedInIcon />
        LinkedIn Profile
      </a>

      {/* Corner decoration */}
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#C9A227]/20 group-hover:border-[#C9A227]/50 transition-colors duration-300" />
    </GoldCard>
  );
}

// ─── CoreTeamSection ──────────────────────────────────────────
export function CoreTeamSection() {
  return (
    <section id="team" className="py-24 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-[#C9A227]/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          badge="Core Team"
          title={
            <>
              The People <GoldText>Behind</GoldText> CodeHive
            </>
          }
          subtitle="A passionate, execution-driven team building something that matters."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm mt-10">
          * Team details will be updated. Real names, photos, and LinkedIn links coming soon.
        </p>
      </div>
    </section>
  );
}
