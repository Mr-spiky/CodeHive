import { prisma } from "@/lib/prisma";

// Real counts only - no placeholder stat cards.
export default async function AdminHome() {
  const [memberCount, liveEvents, activeChallenges] = await Promise.all([
    prisma.user.count(),
    prisma.event.count({ where: { status: "LIVE" } }),
    prisma.challenge.count({ where: { endAt: { gte: new Date() } } }),
  ]);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="font-sora text-2xl font-bold text-white mb-8">Admin Overview</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6">
          <div className="text-3xl font-bold text-white">{memberCount}</div>
          <div className="text-gray-500 text-sm mt-1">Members</div>
        </div>
        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6">
          <div className="text-3xl font-bold text-white">{liveEvents}</div>
          <div className="text-gray-500 text-sm mt-1">Live Events</div>
        </div>
        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6">
          <div className="text-3xl font-bold text-white">{activeChallenges}</div>
          <div className="text-gray-500 text-sm mt-1">Active Challenges</div>
        </div>
      </div>
      <p className="text-gray-600 text-sm mt-8">
        Full CRUD screens for events/challenges/team/blog/testimonials are the next build phase - this is a real, data-backed overview page, not the complete admin panel yet.
      </p>
    </div>
  );
}
