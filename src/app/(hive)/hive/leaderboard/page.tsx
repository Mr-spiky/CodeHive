import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Trophy, Flame, Award, ArrowLeft, Shield } from "lucide-react";

export const revalidate = 60; // revalidate leaderboard every 60 seconds

interface LeaderboardUser {
  id: string;
  name: string;
  username: string;
  xp: number;
  journeyStage: string;
}

export default async function LeaderboardPage() {
  const topUsers: LeaderboardUser[] = await prisma.user.findMany({
    select: { id: true, name: true, username: true, xp: true, journeyStage: true },
    orderBy: { xp: "desc" },
    take: 50,
  });

  return (
    <main className="min-h-screen bg-[#05050F] text-white px-6 py-12 max-w-5xl mx-auto">
      <div className="mb-8">
        <Link href="/hive" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[var(--ch-gold-500)] transition-colors mb-4">
          <ArrowLeft size={14} /> Back to Hive Map
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--ch-border)] pb-6">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--ch-gold-500)]">Real-Time Rankings</span>
            <h1 className="font-sora text-3xl font-bold text-white mt-1">
              Community <span className="gold-text">Leaderboard</span>
            </h1>
          </div>
          <p className="text-gray-500 text-xs md:text-right max-w-xs">
            Rankings update every minute based on verified XP earned from events, challenges, and contributions.
          </p>
        </div>
      </div>

      {topUsers.length === 0 ? (
        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-12 text-center text-gray-500 text-sm">
          No active builders on the leaderboard yet. Check in to a challenge or register for an event to claim rank #1!
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0D0D1F]/80 border border-[var(--ch-border)] overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[var(--ch-gold-950)]/30 border-b border-[var(--ch-border)] text-xs font-bold tracking-wider uppercase text-gray-400">
            <div className="col-span-2 sm:col-span-1 text-center">Rank</div>
            <div className="col-span-6 sm:col-span-6">Member</div>
            <div className="col-span-4 sm:col-span-3 text-left hidden sm:block">Journey Stage</div>
            <div className="col-span-4 sm:col-span-2 text-right">Total XP</div>
          </div>

          <div className="divide-y divide-[var(--ch-border)]">
            {topUsers.map((user, idx) => {
              const rank = idx + 1;
              const isTop3 = rank <= 3;
              return (
                <div
                  key={user.id}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors ${
                    isTop3 ? "bg-[var(--ch-gold-500)]/5 hover:bg-[var(--ch-gold-500)]/10" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="col-span-2 sm:col-span-1 flex justify-center">
                    {rank === 1 ? (
                      <span className="w-8 h-8 rounded-full bg-[var(--ch-gold-500)] text-black font-bold flex items-center justify-center text-xs shadow-lg shadow-[var(--ch-gold-500)]/20">
                        <Trophy size={14} />
                      </span>
                    ) : rank === 2 ? (
                      <span className="w-8 h-8 rounded-full bg-gray-300 text-black font-bold flex items-center justify-center text-xs">
                        2
                      </span>
                    ) : rank === 3 ? (
                      <span className="w-8 h-8 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center text-xs">
                        3
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-gray-500">#{rank}</span>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-6 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[var(--ch-gold-700)]/20 border border-[var(--ch-border)] flex items-center justify-center font-bold text-sm text-[var(--ch-gold-500)] flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="font-sora font-semibold text-white text-sm truncate">{user.name}</div>
                      <div className="text-xs text-gray-500 truncate">@{user.username}</div>
                    </div>
                  </div>

                  <div className="col-span-4 sm:col-span-3 hidden sm:flex items-center gap-1.5">
                    <Shield size={12} className="text-[var(--ch-gold-500)]" />
                    <span className="text-xs font-medium text-gray-300 bg-[#14142B] px-2.5 py-1 rounded-full border border-white/5">
                      {user.journeyStage.replace(/_/g, " ")}
                    </span>
                  </div>

                  <div className="col-span-4 sm:col-span-2 text-right">
                    <span className="font-sora font-bold text-[var(--ch-gold-500)] text-sm sm:text-base">
                      {user.xp.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-gray-500 block uppercase tracking-wider font-semibold">XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
