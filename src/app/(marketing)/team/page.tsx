import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { StatStrip } from "@/components/shared/StatStrip";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { OrgDeptCard } from "@/components/team/OrgDeptCard";
import { CTABanner } from "@/components/shared/CTABanner";
import { Users } from "lucide-react";

interface TeamMemberRow {
  id: string; name: string; role: string; category: string;
  photoUrl: string | null; linkedin: string | null; twitter: string | null; github: string | null;
  department: string | null; memberCount: number | null;
}

export default async function TeamPage() {
  const members: TeamMemberRow[] = await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });
  const core = members.filter((m: TeamMemberRow) => m.category === "CORE");
  const advisors = members.filter((m: TeamMemberRow) => m.category === "ADVISOR");
  const orgDepts = members.filter((m: TeamMemberRow) => m.category === "ORGANIZING_DEPT");

  const stats = [
    { value: `${core.length + advisors.length}+`, label: "Team Members" },
    { value: `${core.length}`, label: "Core Members" },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <PageHero
        eyebrow="Our Team"
        title={<>The People Behind <span className="gold-text">CodeHive</span></>}
        subtitle="A passionate team of builders, creators and problem solvers working together to empower the developer community."
      >
        <a href="#join" className="px-8 py-3.5 rounded-full text-sm font-bold text-black bg-gradient-to-r from-[var(--ch-gold-700)] to-[var(--ch-gold-500)] inline-block">
          Join Our Team
        </a>
      </PageHero>

      <StatStrip stats={stats} />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <SectionHeader badge="Leadership" title="Core Team" />
        {core.length === 0 ? (
          <p className="text-gray-500 text-sm">No core team members added yet — add real profiles via the Admin Panel.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {core.map((m: TeamMemberRow) => (
              <TeamMemberCard key={m.id} name={m.name} role={m.role} photoUrl={m.photoUrl}
                linkedin={m.linkedin} github={m.github} twitter={m.twitter} />
            ))}
          </div>
        )}
      </section>

      {advisors.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
          <SectionHeader title="Advisors & Mentors" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {advisors.map((m: TeamMemberRow) => (
              <TeamMemberCard key={m.id} name={m.name} role={m.role} photoUrl={m.photoUrl}
                linkedin={m.linkedin} github={m.github} twitter={m.twitter} />
            ))}
          </div>
        </section>
      )}

      {orgDepts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-8 pb-16">
          <SectionHeader title="Organizing Team" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {orgDepts.map((d: TeamMemberRow) => (
              <OrgDeptCard key={d.id} department={d.department ?? d.name} memberCount={d.memberCount ?? 0} />
            ))}
          </div>
        </section>
      )}

      <CTABanner
        icon={<Users className="w-5 h-5 text-[var(--ch-gold-500)]" />}
        title="Want to join our amazing team?"
        subtitle="We're always looking for passionate individuals to build the future with us."
        buttonLabel="Join Our Team"
        href="/testimonials"
      />
    </main>
  );
}
