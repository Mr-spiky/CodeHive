import { prisma } from "@/lib/prisma";
import { COMMUNITY_STATS } from "@/lib/data/stats";
import { HeroSection } from "@/components/home/HeroSection";
import { StatStrip } from "@/components/shared/StatStrip";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { FeaturedEventCard } from "@/components/home/FeaturedEventCard";
import { SkillChallengeWidget } from "@/components/home/SkillChallengeWidget";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { CTABanner } from "@/components/shared/CTABanner";
import { Users } from "lucide-react";

export default async function HomePage() {
  const [featuredEvent, challenge, testimonials, partners] = await Promise.all([
    prisma.event.findFirst({ where: { featured: true, status: { in: ["UPCOMING", "LIVE"] } }, orderBy: { startAt: "asc" } }),
    prisma.challenge.findFirst({ orderBy: { startAt: "desc" } }),
    prisma.testimonial.findMany({ where: { published: true }, take: 3, orderBy: { createdAt: "desc" } }),
    prisma.partner.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  // Real leaderboard: top 3 by current streak for the active challenge.
  type EnrollmentRow = {
    userId: string;
    currentStreak: number;
    user: { name: string };
    challenge: { checkIns: { userId: string }[] };
  };

  const topPerformers = challenge
    ? (
        await prisma.challengeEnrollment.findMany({
          where: { challengeId: challenge.id },
          orderBy: { currentStreak: "desc" },
          take: 3,
          include: { user: true, challenge: { include: { checkIns: { where: {} } } } },
        }) as EnrollmentRow[]
      ).map((e: EnrollmentRow, i: number) => ({
        rank: i + 1,
        name: e.user.name,
        track: "Member", // REPLACE: derive a real "track" field if you add one to User
        posts: e.challenge.checkIns.filter((c: { userId: string }) => c.userId === e.userId).length,
        streak: e.currentStreak,
      }))
    : [];

  const currentDay = challenge
    ? Math.min(
        challenge.durationDays,
        Math.max(1, Math.ceil((Date.now() - challenge.startAt.getTime()) / (1000 * 60 * 60 * 24)))
      )
    : 0;

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <HeroSection />
      <StatStrip stats={COMMUNITY_STATS} />
      <WhatWeDo />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-8 grid lg:grid-cols-2 gap-6">
        {featuredEvent ? (
          <FeaturedEventCard
            title={featuredEvent.title}
            description={featuredEvent.description}
            location={featuredEvent.isOnline ? "Online" : featuredEvent.location ?? "TBA"}
            startAt={featuredEvent.startAt}
            slug={featuredEvent.slug}
          />
        ) : (
          <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6 flex items-center justify-center text-gray-500 text-sm">
            No featured event right now — check back soon.
          </div>
        )}

        {challenge ? (
          <SkillChallengeWidget
            challengeTitle={challenge.title}
            currentDay={currentDay}
            durationDays={challenge.durationDays}
            topPerformers={topPerformers}
          />
        ) : (
          <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6 flex items-center justify-center text-gray-500 text-sm">
            No active challenge right now.
          </div>
        )}
      </section>

      <TestimonialsPreview testimonials={testimonials} />
      <PartnersStrip partners={partners} />

      <CTABanner
        icon={<Users className="w-5 h-5 text-[var(--ch-gold-500)]" />}
        title="Ready to Build Something Amazing?"
        subtitle="Join thousands of developers and innovators already growing with CodeHive."
        buttonLabel="Join Community"
        href="/testimonials"
      />
    </main>
  );
}
