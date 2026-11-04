
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma";
import {
  Target,
  Plus,
  Search,
  CalendarDays,
  CalendarClock,
  CheckCircle2,
  Users,
  Zap,
  ArrowUpRight,
  Clock3,
  Radio,
  Pencil,
} from "lucide-react";

const PAGE_SIZE = 10;

const STATUSES = ["ALL", "ACTIVE", "UPCOMING", "COMPLETED"] as const;

type ChallengeStatus = (typeof STATUSES)[number];

function getChallengeStatus(
  startAt: Date,
  endAt: Date,
  now: Date,
): Exclude<ChallengeStatus, "ALL"> {
  if (now < startAt) return "UPCOMING";
  if (now > endAt) return "COMPLETED";
  return "ACTIVE";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function statusStyles(status: string) {
  switch (status) {
    case "ACTIVE":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
    case "UPCOMING":
      return "border-sky-400/20 bg-sky-400/10 text-sky-300";
    case "COMPLETED":
      return "border-white/10 bg-white/[0.05] text-white/55";
    default:
      return "border-white/10 bg-white/[0.05] text-white/60";
  }
}

export default async function AdminChallengesPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const rawStatus = params.status ?? "ALL";

  const status: ChallengeStatus = STATUSES.includes(
    rawStatus as ChallengeStatus,
  )
    ? (rawStatus as ChallengeStatus)
    : "ALL";

  const parsedPage = Number(params.page ?? "1");
  const requestedPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const now = new Date();

  const where: Prisma.ChallengeWhereInput = query
    ? {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { slug: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      }
    : {};

  const [
    totalChallenges,
    activeChallenges,
    upcomingChallenges,
    completedChallenges,
    filteredChallenges,
  ] = await Promise.all([
    prisma.challenge.count(),
    prisma.challenge.count({
      where: {
        startAt: { lte: now },
        endAt: { gte: now },
      },
    }),
    prisma.challenge.count({
      where: { startAt: { gt: now } },
    }),
    prisma.challenge.count({
      where: { endAt: { lt: now } },
    }),
    prisma.challenge.findMany({
      where,
      orderBy: [{ startAt: "desc" }],
      include: {
        _count: {
          select: {
            enrollments: true,
            checkIns: true,
          },
        },
      },
    }),
  ]);

  const filtered = filteredChallenges.filter((challenge) => {
    if (status === "ALL") return true;

    return (
      getChallengeStatus(challenge.startAt, challenge.endAt, now) === status
    );
  });

  const filteredCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(filteredCount / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const challenges = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  function pageUrl(nextPage: number) {
    const search = new URLSearchParams();

    if (query) search.set("q", query);
    if (status !== "ALL") search.set("status", status);
    search.set("page", String(nextPage));

    return `/admin/challenges?${search.toString()}`;
  }

  return (
    <main className="relative mx-auto max-w-[1440px] space-y-8 text-white">
      <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full bg-amber-400/[0.07] blur-[110px]" />

      <header className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5 text-xs font-medium text-amber-200">
            <Target size={14} />
            CodeHive / Community operations
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
            Challenge management
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Challenges <span className="text-amber-300">Studio.</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
            Launch learning challenges, reward consistency, and track community
            participation from one workspace.
          </p>
        </div>

        <Link
          href="/admin/challenges/new"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-[#15110A] transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050F]"
        >
          <Plus size={17} />
          Create challenge
        </Link>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total challenges",
            value: totalChallenges,
            detail: "Across all dates",
            icon: Target,
          },
          {
            label: "Active now",
            value: activeChallenges,
            detail: "Currently in progress",
            icon: Radio,
          },
          {
            label: "Upcoming",
            value: upcomingChallenges,
            detail: "Scheduled to begin",
            icon: CalendarClock,
          },
          {
            label: "Completed",
            value: completedChallenges,
            detail: "Past their end date",
            icon: CheckCircle2,
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-amber-300/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-white/55">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">
                    {stat.value}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-300/15 bg-amber-300/[0.07] p-2.5 text-amber-200">
                  <Icon size={19} />
                </div>
              </div>

              <p className="mt-4 text-xs text-white/40">{stat.detail}</p>
            </div>
          );
        })}
      </section>

      <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
        <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 sm:p-6">
          <div>
            <h2 className="text-lg font-semibold">Challenge directory</h2>
            <p className="mt-1 text-sm text-white/45">
              {filteredCount}{" "}
              {filteredCount === 1 ? "challenge" : "challenges"} found
            </p>
          </div>

          <form
            action="/admin/challenges"
            method="GET"
            className="flex flex-col gap-3 sm:flex-row"
          >
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search challenges</span>
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35"
              />
              <input
                name="q"
                defaultValue={query}
                placeholder="Search by title, slug, or description..."
                className="w-full rounded-xl border border-white/10 bg-[#080810] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-amber-300/70"
              />
            </label>

            <select
              name="status"
              defaultValue={status}
              aria-label="Filter challenges by status"
              className="rounded-xl border border-white/10 bg-[#080810] px-4 py-3 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70"
            >
              {STATUSES.map((item) => (
                <option key={item} value={item}>
                  {item === "ALL"
                    ? "All statuses"
                    : item.charAt(0) + item.slice(1).toLowerCase()}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded-xl border border-amber-300/20 bg-amber-300/[0.08] px-5 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/[0.14]"
            >
              Apply filters
            </button>
          </form>
        </div>

        {challenges.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/45">
              <Target size={24} />
            </div>

            <h3 className="mt-5 text-lg font-semibold">No challenges found</h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/45">
              {query || status !== "ALL"
                ? "Try changing your search or filters."
                : "Create your first challenge to start tracking learning streaks and community progress."}
            </p>

            {!query && status === "ALL" && (
              <Link
                href="/admin/challenges/new"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-2.5 text-sm font-semibold text-[#15110A] transition hover:bg-amber-200"
              >
                <Plus size={16} />
                Create your first challenge
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="hidden grid-cols-[minmax(220px,1.6fr)_minmax(150px,1fr)_100px_110px_100px_auto] gap-4 border-b border-white/[0.07] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 lg:grid">
              <span>Challenge</span>
              <span>Schedule</span>
              <span>Status</span>
              <span>Participants</span>
              <span>Rewards</span>
              <span className="text-right">Actions</span>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {challenges.map((challenge) => {
                const challengeStatus = getChallengeStatus(
                  challenge.startAt,
                  challenge.endAt,
                  now,
                );

                return (
                  <div
                    key={challenge.id}
                    className="grid gap-4 px-5 py-5 transition hover:bg-white/[0.025] sm:px-6 lg:grid-cols-[minmax(220px,1.6fr)_minmax(150px,1fr)_100px_110px_100px_auto] lg:items-center"
                  >
                    <Link
                      href={`/admin/challenges/${challenge.id}`}
                      className="group min-w-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-xl border border-amber-300/15 bg-amber-300/[0.07] p-2.5 text-amber-200">
                          <Target size={18} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-white transition group-hover:text-amber-300">
                            {challenge.title}
                          </h3>
                          <p className="mt-1 truncate text-xs text-white/40">
                            /{challenge.slug}
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm leading-5 text-white/55">
                            {challenge.description}
                          </p>
                        </div>
                      </div>

                      <span className="mt-3 inline-flex items-center gap-1 text-xs text-white/35 lg:hidden">
                        <ArrowUpRight size={13} />
                        Open challenge
                      </span>
                    </Link>

                    <div className="space-y-2 text-xs text-white/55">
                      <p className="flex items-center gap-2">
                        <CalendarDays size={14} className="shrink-0 text-white/35" />
                        Starts {formatDate(challenge.startAt)}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock3 size={14} className="shrink-0 text-white/35" />
                        Ends {formatDate(challenge.endAt)}
                      </p>
                      <p className="flex items-center gap-2 text-white/40">
                        <CalendarClock size={14} className="shrink-0" />
                        {challenge.durationDays} days
                      </p>
                    </div>

                    <div>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${statusStyles(challengeStatus)}`}
                      >
                        {challengeStatus}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Users size={15} className="text-white/35" />
                      <span>{challenge._count.enrollments}</span>
                      <span className="text-xs text-white/35">joined</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-amber-200">
                      <Zap size={15} />
                      {challenge.xpPerCheckIn} XP
                    </div>

                    <div className="flex items-center gap-2 lg:justify-end">
                      <Link
                        href={`/admin/challenges/${challenge.id}/edit`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-300/20 bg-amber-300/[0.07] px-3 py-2 text-xs font-semibold text-amber-200 transition hover:border-amber-300/40 hover:bg-amber-300/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70"
                        aria-label={`Edit ${challenge.title}`}
                      >
                        <Pencil size={14} />
                        Edit
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-xs text-white/45">
                Showing {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, filteredCount)} of {filteredCount}
              </p>

              <div className="flex items-center gap-2">
                <Link
                  href={pageUrl(Math.max(1, page - 1))}
                  aria-disabled={page <= 1}
                  className={`rounded-lg border px-3 py-2 text-xs transition ${
                    page <= 1
                      ? "pointer-events-none border-white/[0.05] text-white/20"
                      : "border-white/10 text-white/65 hover:bg-white/[0.05]"
                  }`}
                >
                  Previous
                </Link>

                <span className="px-2 text-xs text-white/45">
                  Page {page} of {totalPages}
                </span>

                <Link
                  href={pageUrl(Math.min(totalPages, page + 1))}
                  aria-disabled={page >= totalPages}
                  className={`rounded-lg border px-3 py-2 text-xs transition ${
                    page >= totalPages
                      ? "pointer-events-none border-white/[0.05] text-white/20"
                      : "border-white/10 text-white/65 hover:bg-white/[0.05]"
                  }`}
                >
                  Next
                </Link>
              </div>
            </div>
          </>
        )}
      </section>

      <footer className="flex flex-col gap-2 border-t border-white/[0.06] pt-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>CodeHive Challenge Operations</p>
        <p>
          Challenge status is calculated from the configured start and end dates.
        </p>
      </footer>
    </main>
  );
}
