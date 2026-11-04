
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Flame,
  Pencil,
  Sparkles,
  Users,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{ id: string }>;
};

function getChallengeStatus(startAt: Date, endAt: Date) {
  const now = new Date();

  if (now < startAt) return "UPCOMING";
  if (now > endAt) return "COMPLETED";
  return "ACTIVE";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function statusStyles(status: string) {
  if (status === "ACTIVE") {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
  }

  if (status === "UPCOMING") {
    return "border-sky-500/20 bg-sky-500/10 text-sky-400";
  }

  return "border-white/10 bg-white/5 text-zinc-400";
}

export default async function ChallengeDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const challenge = await prisma.challenge.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          enrollments: true,
          checkIns: true,
        },
      },
      enrollments: {
        select: {
          completed: true,
          currentStreak: true,
          longestStreak: true,
        },
      },
    },
  });

  if (!challenge) {
    notFound();
  }

  const status = getChallengeStatus(
    challenge.startAt,
    challenge.endAt,
  );

  const completedParticipants = challenge.enrollments.filter(
    (enrollment) => enrollment.completed,
  ).length;

  const completionRate =
    challenge.enrollments.length > 0
      ? Math.round(
          (completedParticipants / challenge.enrollments.length) * 100,
        )
      : 0;

  const averageStreak =
    challenge.enrollments.length > 0
      ? (
          challenge.enrollments.reduce(
            (total, enrollment) => total + enrollment.currentStreak,
            0,
          ) / challenge.enrollments.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen space-y-8 bg-[#08090c] p-4 text-white sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/challenges"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Challenges
        </Link>

        <Link
          href={`/admin/challenges/${challenge.id}/edit`}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-amber-300"
        >
          <Pencil size={15} />
          Edit Challenge
        </Link>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#17140d] via-[#101115] to-[#0b0c10] p-6 sm:p-9">
        <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${statusStyles(status)}`}
            >
              {status}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
              {challenge.durationDays} days
            </span>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
            Challenge Overview
          </p>

          <h1 className="max-w-3xl break-words text-3xl font-semibold tracking-tight sm:text-5xl">
            {challenge.title}
          </h1>

          <p className="mt-4 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-zinc-400 sm:text-base">
            {challenge.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-5 text-sm text-zinc-400">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} className="text-amber-400" />
              {formatDate(challenge.startAt)} –{" "}
              {formatDate(challenge.endAt)}
            </span>

            <span className="inline-flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400" />
              {challenge.xpPerCheckIn} XP per check-in
            </span>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-xs text-zinc-500">URL slug</p>
            <code className="mt-1 block break-all text-sm text-amber-300">
              /challenges/{challenge.slug}
            </code>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Performance Snapshot</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Participation and activity recorded for this challenge.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={<Users size={18} />}
            label="Total Enrollments"
            value={challenge._count.enrollments.toLocaleString("en-IN")}
            detail="Participants enrolled"
          />

          <MetricCard
            icon={<Activity size={18} />}
            label="Total Check-ins"
            value={challenge._count.checkIns.toLocaleString("en-IN")}
            detail="Recorded check-in entries"
          />

          <MetricCard
            icon={<CheckCircle2 size={18} />}
            label="Completion Rate"
            value={`${completionRate}%`}
            detail={`${completedParticipants} completed participants`}
          />

          <MetricCard
            icon={<Flame size={18} />}
            label="Average Current Streak"
            value={`${averageStreak} days`}
            detail="Across enrolled participants"
          />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#101115] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-400/10 p-3 text-amber-400">
              <CalendarDays size={20} />
            </div>
            <div>
              <h2 className="font-semibold">Schedule</h2>
              <p className="text-sm text-zinc-500">
                Challenge timeline
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <TimelineRow
              label="Start date"
              value={formatDateTime(challenge.startAt)}
            />
            <TimelineRow
              label="End date"
              value={formatDateTime(challenge.endAt)}
            />
            <TimelineRow
              label="Created on"
              value={formatDateTime(challenge.createdAt)}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#101115] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-400/10 p-3 text-amber-400">
              <Clock3 size={20} />
            </div>
            <div>
              <h2 className="font-semibold">Engagement</h2>
              <p className="text-sm text-zinc-500">
                Participant progress overview
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-zinc-400">
                Participant completion
              </span>
              <span className="font-semibold text-white">
                {completionRate}%
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-amber-400 transition-all"
                style={{ width: `${completionRate}%` }}
              />
            </div>

            <p className="mt-3 text-xs leading-5 text-zinc-500">
              Completion is based on enrollment records marked as completed.
              Check-in counts include all recorded check-ins for this challenge.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-xs text-zinc-500">Longest streak</p>
              <p className="mt-2 text-xl font-semibold">
                {challenge.enrollments.reduce(
                  (max, enrollment) =>
                    Math.max(max, enrollment.longestStreak),
                  0,
                )}{" "}
                <span className="text-xs font-normal text-zinc-500">
                  days
                </span>
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-xs text-zinc-500">Total XP potential</p>
              <p className="mt-2 text-xl font-semibold">
                {(
                  challenge.durationDays * challenge.xpPerCheckIn
                ).toLocaleString("en-IN")}{" "}
                <span className="text-xs font-normal text-zinc-500">
                  XP / user
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <p className="text-center text-xs text-zinc-600">
        Challenge ID: {challenge.id}
      </p>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101115] p-5 transition hover:border-amber-400/30">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-zinc-400">{label}</p>
        <span className="text-amber-400">{icon}</span>
      </div>

      <p className="mt-5 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-xs text-zinc-500">{detail}</p>
    </div>
  );
}

function TimelineRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
      <span className="text-sm text-zinc-500">{label}</span>
      <span className="text-right text-sm text-zinc-200">{value}</span>
    </div>
  );
}
