import Link from "next/link";
import { Flame } from "lucide-react";

interface LeaderboardRow {
  rank: number;
  name: string;
  track: string;
  posts: number;
  streak: number;
}

interface SkillChallengeWidgetProps {
  challengeTitle: string;
  currentDay: number;
  durationDays: number;
  topPerformers: LeaderboardRow[];
}

// Real challenge + leaderboard data, computed server-side from
// ChallengeCheckIn rows - never mocked here.
// `currentDay` = days elapsed since challenge start, out of durationDays.
export function SkillChallengeWidget({ challengeTitle, currentDay, durationDays, topPerformers }: SkillChallengeWidgetProps) {
  const percent = Math.min(100, (currentDay / durationDays) * 100);
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-sora text-lg font-bold text-white">{challengeTitle}</h3>
        <Link href="/hive/challenges" className="text-xs font-semibold text-[var(--ch-gold-500)] hover:underline">
          View leaderboard &rarr;
        </Link>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#14142B" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke="url(#streakGradient)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
            />
            <defs>
              <linearGradient id="streakGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F4A227" />
                <stop offset="100%" stopColor="#C9A227" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-sora text-2xl font-bold text-white">{currentDay}</span>
            <span className="text-[10px] text-gray-500">Day {currentDay}/{durationDays}</span>
          </div>
        </div>
        <p className="text-sm text-gray-400">Show up daily. Share progress. Build consistency. Earn recognition.</p>
      </div>

      <h4 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Top Performers This Week</h4>
      <div className="space-y-2">
        {topPerformers.length === 0 && (
          <p className="text-sm text-gray-600">No check-ins yet - be the first to join the challenge.</p>
        )}
        {topPerformers.map((row) => (
          <div key={row.rank} className="flex items-center justify-between text-sm py-1.5">
            <div className="flex items-center gap-3">
              <span className="w-5 text-gray-500 font-semibold">{row.rank}</span>
              <span className="text-white font-medium">{row.name}</span>
              <span className="text-gray-600 text-xs">{row.track}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-xs">
              <span>{row.posts} Posts</span>
              <span className="flex items-center gap-1 text-[var(--ch-gold-500)] font-semibold">
                {row.streak}
                <Flame size={12} className="text-[var(--ch-gold-500)]" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
