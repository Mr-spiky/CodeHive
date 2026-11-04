
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  Target,
  CalendarDays,
  CalendarClock,
  Clock3,
  Users,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DeleteChallengeButton from "./_components/DeleteChallengeButton";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getStatus(startAt: Date, endAt: Date, now: Date) {
  if (now < startAt) return "UPCOMING";
  if (now > endAt) return "COMPLETED";
  return "ACTIVE";
}

export default async function ChallengeDetailPage({
  params,
}: PageProps) {
  const user = await getCurrentUser();

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    redirect("/");
  }

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
    },
  });

  if (!challenge) {
    notFound();
  }

  const status = getStatus(
    challenge.startAt,
    challenge.endAt,
    new Date(),
  );

  const statusStyle =
    status === "ACTIVE"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : status === "UPCOMING"
        ? "border-sky-400/20 bg-sky-400/10 text-sky-300"
        : "border-white/10 bg-white/[0.05] text-white/60";

  return (
    <main className="mx-auto min-h-screen max-w-[1440px] space-y-7 bg-[#08090c] p-4 text-white sm:p-6 lg:p-8">
      <Link
        href="/admin/challenges"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Challenges
      </Link>

      <header className="rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#17140d] via-[#101115] to-[#0b0c10] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-amber-300">
              <Target size={19} />
              <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                Challenges Studio
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              {challenge.title}
            </h1>

            <p className="mt-3 text-sm text-white/45">
              /{challenge.slug}
            </p>

            <p className="mt-5 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-white/65">
              {challenge.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/admin/challenges/${challenge.id}/edit`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-[#15110A] transition hover:bg-amber-200"
            >
              <Pencil size={16} />
              Edit challenge
            </Link>

            <DeleteChallengeButton
              challengeId={challenge.id}
              challengeTitle={challenge.title}
            />
          </div>
        </div>

        <div className="mt-7">
          <span
            className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${statusStyle}`}
          >
            {status}
          </span>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Participants",
            value: challenge._count.enrollments,
            detail: "Total enrollments",
            icon: Users,
          },
          {
            label: "Check-ins",
            value: challenge._count.checkIns,
            detail: "Recorded check-ins",
            icon: CheckCircle2,
          },
          {
            label: "XP reward",
            value: challenge.xpPerCheckIn,
            detail: "XP per check-in",
            icon: Zap,
          },
          {
            label: "Duration",
            value: `${challenge.durationDays} days`,
            detail: "Configured challenge length",
            icon: CalendarClock,
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-white/55">{stat.label}</p>
                <Icon size={18} className="text-amber-300" />
              </div>

              <p className="mt-4 text-2xl font-semibold">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-white/40">
                {stat.detail}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-7">
        <h2 className="text-lg font-semibold">
          Challenge schedule
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-amber-300">
              <CalendarDays size={19} />
            </div>

            <div>
              <p className="text-sm text-white/45">Start date</p>
              <p className="mt-1 font-medium">
                {formatDate(challenge.startAt)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-amber-300">
              <Clock3 size={19} />
            </div>

            <div>
              <p className="text-sm text-white/45">End date</p>
              <p className="mt-1 font-medium">
                {formatDate(challenge.endAt)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] pt-5 text-xs text-white/35">
        CodeHive Challenge Operations
      </footer>
    </main>
  );
}
