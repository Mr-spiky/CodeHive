"use client";
import { useState, useTransition } from "react";
import { enrollInChallenge, checkInToChallenge } from "@/actions";
import { Flame, Trophy, CheckCircle2, Sparkles, ArrowRight, Calendar } from "lucide-react";

interface ChallengeData {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  xpPerCheckIn: number;
}

interface EnrollmentData {
  currentStreak: number;
  longestStreak: number;
  completed: boolean;
}

interface ChallengeInteractionCardProps {
  challenge: ChallengeData;
  enrollment: EnrollmentData | null;
}

export function ChallengeInteractionCard({ challenge, enrollment: initialEnrollment }: ChallengeInteractionCardProps) {
  const [enrollment, setEnrollment] = useState<EnrollmentData | null>(initialEnrollment);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleEnroll = () => {
    setError(null);
    startTransition(async () => {
      const res = await enrollInChallenge(challenge.id);
      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        setEnrollment({ currentStreak: 0, longestStreak: 0, completed: false });
      }
    });
  };

  const handleCheckIn = () => {
    if (!enrollment) return;
    setError(null);
    const nextDay = enrollment.currentStreak + 1;
    startTransition(async () => {
      const res = await checkInToChallenge(challenge.id, nextDay);
      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        const isNowCompleted = nextDay >= challenge.durationDays;
        setEnrollment({
          currentStreak: nextDay,
          longestStreak: Math.max(enrollment.longestStreak, nextDay),
          completed: isNowCompleted,
        });
      }
    });
  };

  return (
    <div className="rounded-2xl bg-[#0D0D1F]/80 border border-[var(--ch-border)] p-6 hover:border-[var(--ch-gold-500)]/40 transition-colors flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-sora text-xl font-bold text-white">{challenge.title}</h3>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--ch-gold-700)]/20 text-[var(--ch-gold-500)] border border-[var(--ch-gold-700)]/30 flex-shrink-0">
            <Calendar size={12} /> {challenge.durationDays} Days
          </span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{challenge.description}</p>
      </div>

      <div className="pt-6 border-t border-[var(--ch-border)]">
        {!enrollment ? (
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-white block">Not Enrolled</span>
              <span className="text-xs text-[var(--ch-gold-400)] flex items-center gap-1 mt-0.5">
                <Sparkles size={12} /> {challenge.xpPerCheckIn} XP per check-in + 100 XP bonus
              </span>
            </div>
            <button
              type="button"
              onClick={handleEnroll}
              disabled={isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-black bg-[var(--ch-gold-500)] hover:bg-[var(--ch-gold-400)] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isPending ? "Joining..." : "Join Challenge"} <ArrowRight size={14} />
            </button>
          </div>
        ) : enrollment.completed ? (
          <div className="flex items-center gap-3 bg-[var(--ch-gold-950)]/40 border border-[var(--ch-gold-700)]/50 px-4 py-3 rounded-xl">
            <Trophy className="w-6 h-6 text-[var(--ch-gold-500)] flex-shrink-0" />
            <div>
              <span className="font-sora font-bold text-white text-xs block">Challenge Completed!</span>
              <span className="text-[11px] text-[var(--ch-gold-400)] block mt-0.5">
                You finished all {challenge.durationDays} days and earned the Finisher badge!
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#14142B] border border-[var(--ch-border)] flex flex-col items-center justify-center flex-shrink-0">
                <span className="font-sora font-bold text-white text-sm">{enrollment.currentStreak}</span>
                <span className="text-[9px] text-gray-500 uppercase font-semibold">Streak</span>
              </div>
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  Progress: Day {enrollment.currentStreak} / {challenge.durationDays}
                  <Flame size={12} className="text-[var(--ch-gold-500)]" />
                </span>
                <span className="text-[11px] text-[var(--ch-gold-400)] flex items-center gap-1 mt-0.5">
                  <Sparkles size={11} /> Next check-in earns +{challenge.xpPerCheckIn} XP
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCheckIn}
              disabled={isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-black bg-gradient-to-r from-[var(--ch-gold-700)] to-[var(--ch-gold-500)] hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 cursor-pointer whitespace-nowrap"
            >
              {isPending ? "Checking in..." : `Check In (Day ${enrollment.currentStreak + 1})`} <CheckCircle2 size={14} />
            </button>
          </div>
        )}
        {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
      </div>
    </div>
  );
}
