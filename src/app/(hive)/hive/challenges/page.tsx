import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";
import { ChallengeInteractionCard } from "@/components/challenges/ChallengeInteractionCard";

export const revalidate = 0; // always fetch fresh streak data for challenges

export default async function ChallengesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [challenges, enrollments] = await Promise.all([
    prisma.challenge.findMany({ orderBy: { startAt: "asc" } }),
    prisma.challengeEnrollment.findMany({ where: { userId: user.id } }),
  ]);

  const enrollmentMap = new Map(enrollments.map((e) => [e.challengeId, e]));

  return (
    <main className="min-h-screen bg-[#05050F] text-white px-6 py-12 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link href="/hive" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[var(--ch-gold-500)] transition-colors mb-4">
          <ArrowLeft size={14} /> Back to Hive Map
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--ch-border)] pb-6">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--ch-gold-500)]">Consistency & Mastery</span>
            <h1 className="font-sora text-3xl font-bold text-white mt-1">
              Active <span className="gold-text">Challenges</span>
            </h1>
          </div>
          <p className="text-gray-500 text-xs md:text-right max-w-xs">
            Show up daily, build in public, and submit your check-ins to grow your XP streak and earn exclusive badges.
          </p>
        </div>
      </div>

      {challenges.length === 0 ? (
        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-12 text-center text-gray-500 text-sm">
          No active challenges right now. Check back soon for our upcoming coding sprints!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {challenges.map((c) => {
            const enrollment = enrollmentMap.get(c.id);
            return (
              <ChallengeInteractionCard
                key={c.id}
                challenge={{
                  id: c.id,
                  title: c.title,
                  description: c.description,
                  durationDays: c.durationDays,
                  xpPerCheckIn: c.xpPerCheckIn,
                }}
                enrollment={
                  enrollment
                    ? {
                        currentStreak: enrollment.currentStreak,
                        longestStreak: enrollment.longestStreak,
                        completed: enrollment.completed,
                      }
                    : null
                }
              />
            );
          })}
        </div>
      )}
    </main>
  );
}
