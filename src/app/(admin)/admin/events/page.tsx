
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma";
import {
  CalendarDays,
  Plus,
  Search,
  MapPin,
  Globe,
  Clock3,
  ArrowUpRight,
  Radio,
  CheckCircle2,
  XCircle,
  CalendarClock,
} from "lucide-react";

const PAGE_SIZE = 10;

const STATUSES = [
  "ALL",
  "UPCOMING",
  "LIVE",
  "COMPLETED",
  "CANCELLED",
] as const;

type EventStatus = (typeof STATUSES)[number];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function statusStyles(status: string) {
  switch (status) {
    case "LIVE":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
    case "UPCOMING":
      return "border-sky-400/20 bg-sky-400/10 text-sky-300";
    case "COMPLETED":
      return "border-white/10 bg-white/[0.05] text-white/60";
    case "CANCELLED":
      return "border-rose-400/20 bg-rose-400/10 text-rose-300";
    default:
      return "border-white/10 bg-white/[0.05] text-white/60";
  }
}

function statusIcon(status: string) {
  switch (status) {
    case "LIVE":
      return <Radio size={12} />;
    case "UPCOMING":
      return <CalendarClock size={12} />;
    case "COMPLETED":
      return <CheckCircle2 size={12} />;
    case "CANCELLED":
      return <XCircle size={12} />;
    default:
      return <CalendarDays size={12} />;
  }
}

export default async function AdminEventsPage({
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

  const status: EventStatus = STATUSES.includes(
    rawStatus as EventStatus,
  )
    ? (rawStatus as EventStatus)
    : "ALL";

  const parsedPage = Number(params.page ?? "1");
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  // EventCategory is an enum, so text search must not use
  // `contains` on category.
  const where: Prisma.EventWhereInput = {
    ...(query
      ? {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              slug: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              location: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        }
      : {}),
    ...(status !== "ALL" ? { status } : {}),
  };

  const [
    totalEvents,
    liveEvents,
    upcomingEvents,
    completedEvents,
    filteredCount,
  ] = await Promise.all([
    prisma.event.count(),
    prisma.event.count({ where: { status: "LIVE" } }),
    prisma.event.count({ where: { status: "UPCOMING" } }),
    prisma.event.count({ where: { status: "COMPLETED" } }),
    prisma.event.count({ where }),
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCount / PAGE_SIZE),
  );

  const page = Math.min(currentPage, totalPages);

  const events = await prisma.event.findMany({
    where,
    orderBy: [{ startAt: "desc" }],
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  });

  function pageUrl(nextPage: number) {
    const search = new URLSearchParams();

    if (query) search.set("q", query);
    if (status !== "ALL") search.set("status", status);
    search.set("page", String(nextPage));

    return `/admin/events?${search.toString()}`;
  }

  return (
    <main className="relative mx-auto max-w-[1440px] space-y-8 text-white">
      <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full bg-amber-400/[0.07] blur-[110px]" />

      {/* Header */}
      <header className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5 text-xs font-medium text-amber-200">
            <CalendarDays size={14} />
            CodeHive / Community operations
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
            Event management
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Events <span className="text-amber-300">Studio.</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
            Create experiences, manage registrations, and keep the
            CodeHive community moving.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-[#15110A] transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050F]"
        >
          <Plus size={17} />
          Create event
        </Link>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total events",
            value: totalEvents,
            detail: "Across all statuses",
            icon: CalendarDays,
          },
          {
            label: "Live now",
            value: liveEvents,
            detail: "Currently in progress",
            icon: Radio,
          },
          {
            label: "Upcoming",
            value: upcomingEvents,
            detail: "Scheduled experiences",
            icon: CalendarClock,
          },
          {
            label: "Completed",
            value: completedEvents,
            detail: "Finished events",
            icon: CheckCircle2,
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 transition hover:border-amber-300/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm text-white/65">
                  {stat.label}
                </span>
                <span className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-2 text-amber-200">
                  <Icon size={17} />
                </span>
              </div>

              <p className="mt-5 text-3xl font-semibold tracking-tight tabular-nums">
                {String(stat.value).padStart(2, "0")}
              </p>

              <p className="mt-1 text-xs text-white/50">
                {stat.detail}
              </p>
            </article>
          );
        })}
      </section>

      {/* Directory */}
      <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.02]">
        <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Event directory</h2>
            <p className="mt-1 text-sm text-white/55">
              {filteredCount} {filteredCount === 1 ? "event" : "events"} found
            </p>
          </div>

          <form
            action="/admin/events"
            method="GET"
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search events..."
                aria-label="Search events"
                className="min-h-10 w-full rounded-xl border border-white/10 bg-[#080810] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080810] sm:w-64"
              />
            </div>

            <select
              name="status"
              defaultValue={status}
              aria-label="Filter by status"
              className="min-h-10 rounded-xl border border-white/10 bg-[#080810] px-3 py-2 text-sm text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080810]"
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
              className="min-h-10 rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080810]"
            >
              Apply
            </button>
          </form>
        </div>

        {events.length === 0 ? (
          <div className="px-6 py-20 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/50">
              <CalendarDays size={24} />
            </div>

            <h3 className="text-lg font-medium">No events found</h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/55">
              {query || status !== "ALL"
                ? "Try changing your search or status filter."
                : "Your next community experience starts here. Create your first event."}
            </p>

            {!query && status === "ALL" && (
              <Link
                href="/admin/events/new"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-2.5 text-sm font-semibold text-[#15110A] hover:bg-amber-200"
              >
                <Plus size={16} />
                Create your first event
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-white/[0.02] text-[11px] uppercase tracking-[0.16em] text-white/50">
                    <th className="px-5 py-4 font-medium">Event</th>
                    <th className="px-5 py-4 font-medium">Schedule</th>
                    <th className="px-5 py-4 font-medium">Location</th>
                    <th className="px-5 py-4 font-medium">Registrations</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 text-right font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/[0.06]">
                  {events.map((event) => (
                    <tr
                      key={event.id}
                      className="group transition hover:bg-white/[0.025]"
                    >
                      <td className="px-5 py-5">
                        <div className="flex items-start gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-amber-300/15 bg-amber-300/[0.06] text-amber-200">
                            {event.bannerUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={event.bannerUrl}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <CalendarDays size={19} />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-xs truncate text-sm font-semibold text-white">
                              {event.title}
                            </p>
                            <p className="mt-1 text-xs text-white/50">
                              {event.category}
                            </p>
                            <p className="mt-1 max-w-xs truncate text-xs text-white/40">
                              /{event.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-start gap-2 text-sm text-white/80">
                          <Clock3
                            size={15}
                            className="mt-0.5 shrink-0 text-white/45"
                          />
                          <div>
                            <p>{formatDate(event.startAt)}</p>
                            <p className="mt-1 text-xs text-white/50">
                              {formatDateTime(event.startAt).split(", ").pop()}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex items-start gap-2 text-sm text-white/75">
                          {event.isOnline ? (
                            <Globe
                              size={15}
                              className="mt-0.5 shrink-0 text-white/45"
                            />
                          ) : (
                            <MapPin
                              size={15}
                              className="mt-0.5 shrink-0 text-white/45"
                            />
                          )}

                          <div>
                            <p>
                              {event.isOnline
                                ? "Online"
                                : event.location || "Not specified"}
                            </p>
                            {event.capacity != null && (
                              <p className="mt-1 text-xs text-white/50">
                                Capacity: {event.capacity}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-5">
                        <p className="text-sm font-medium tabular-nums">
                          {event._count.registrations}
                        </p>
                        <p className="mt-1 text-xs text-white/50">
                          registered
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles(event.status)}`}
                        >
                          {statusIcon(event.status)}
                          {event.status.charAt(0) +
                            event.status.slice(1).toLowerCase()}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-right">
                        <Link
                          href={`/admin/events/${event.id}`}
                          aria-label={`Manage ${event.title}`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:border-amber-300/30 hover:bg-amber-300/[0.08] hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080810]"
                        >
                          <ArrowUpRight size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 border-t border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/55">
                Showing{" "}
                <span className="font-medium text-white/80">
                  {(page - 1) * PAGE_SIZE + 1}
                </span>
                {" "}–{" "}
                <span className="font-medium text-white/80">
                  {Math.min(page * PAGE_SIZE, filteredCount)}
                </span>
                {" "}of{" "}
                <span className="font-medium text-white/80">
                  {filteredCount}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <Link
                  href={pageUrl(Math.max(1, page - 1))}
                  aria-disabled={page <= 1}
                  className={`inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080810] ${
                    page <= 1
                      ? "pointer-events-none opacity-35"
                      : "text-white/75 hover:bg-white/[0.06]"
                  }`}
                >
                  <span aria-hidden="true">←</span>
                  Previous
                </Link>

                <span className="px-2 text-sm tabular-nums text-white/60">
                  {page} / {totalPages}
                </span>

                <Link
                  href={pageUrl(Math.min(totalPages, page + 1))}
                  aria-disabled={page >= totalPages}
                  className={`inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080810] ${
                    page >= totalPages
                      ? "pointer-events-none opacity-35"
                      : "text-white/75 hover:bg-white/[0.06]"
                  }`}
                >
                  Next
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </section>

      <footer className="flex flex-col gap-2 border-t border-white/[0.07] pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>CodeHive · Events Studio</p>
        <p>Event data synced from your database</p>
      </footer>
    </main>
  );
}
