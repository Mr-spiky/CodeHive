
import Link from "next/link";
import {
  Users,
  CalendarDays,
  ClipboardList,
  FileText,
  ArrowUpRight,
  Plus,
  Target,
  Clock3,
  CheckCircle2,
  Eye,
  EyeOff,
  Activity,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const now = new Date();

  const [
    memberCount,
    liveEvents,
    totalEvents,
    totalRegistrations,
    attendedRegistrations,
    totalArticles,
    publishedArticles,
    draftArticles,
    recentMembers,
    recentRegistrations,
    recentArticles,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.event.count({ where: { status: "LIVE" } }),
    prisma.event.count(),
    prisma.eventRegistration.count(),
    prisma.eventRegistration.count({ where: { attended: true } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.blogPost.count({ where: { published: false } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        createdAt: true,
      },
    }),
    prisma.eventRegistration.findMany({
      orderBy: { registeredAt: "desc" },
      take: 4,
      select: {
        id: true,
        registeredAt: true,
        user: { select: { name: true, username: true } },
        event: { select: { title: true } },
      },
    }),
    prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
      take: 4,
      select: {
        id: true,
        title: true,
        published: true,
        publishedAt: true,
        category: true,
      },
    }),
  ]);

  const metrics = [
    {
      label: "Community members",
      value: memberCount,
      note: "Registered accounts",
      icon: Users,
      href: "/admin/members",
      accent: "text-amber-300",
      glow: "bg-amber-400/10",
    },
    {
      label: "Live events",
      value: liveEvents,
      note: `${totalEvents} total events`,
      icon: CalendarDays,
      href: "/admin/events",
      accent: "text-emerald-300",
      glow: "bg-emerald-400/10",
    },
    {
      label: "Registrations",
      value: totalRegistrations,
      note: `${attendedRegistrations} marked attended`,
      icon: ClipboardList,
      href: "/admin/events",
      accent: "text-sky-300",
      glow: "bg-sky-400/10",
    },
    {
      label: "Published articles",
      value: publishedArticles,
      note: `${draftArticles} drafts waiting`,
      icon: FileText,
      href: "/admin/blog",
      accent: "text-violet-300",
      glow: "bg-violet-400/10",
    },
  ];

  const activity = [
    ...recentMembers.map((member) => ({
      id: `member-${member.id}`,
      title: member.name,
      detail: `@${member.username} joined the community`,
      date: member.createdAt,
      kind: "Member",
      icon: Users,
      color: "text-amber-300",
    })),
    ...recentRegistrations.map((registration) => ({
      id: `registration-${registration.id}`,
      title: registration.user.name,
      detail: `Registered for ${registration.event.title}`,
      date: registration.registeredAt,
      kind: "Registration",
      icon: CalendarDays,
      color: "text-sky-300",
    })),
    ...recentArticles.map((article) => ({
      id: `article-${article.id}`,
      title: article.title,
      detail: `${article.category} · ${
        article.published ? "Published" : "Draft"
      }`,
      date: article.publishedAt,
      kind: "Article",
      icon: FileText,
      color: "text-violet-300",
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 8);

  function timeAgo(date: Date) {
    const seconds = Math.max(
      0,
      Math.floor((now.getTime() - date.getTime()) / 1000)
    );

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  }

  const quickActions = [
    {
      label: "Create event",
      description: "Launch a community experience",
      href: "/admin/events/new",
      icon: CalendarDays,
    },
    {
      label: "New article",
      description: "Publish a story or update",
      href: "/admin/blog/new",
      icon: FileText,
    },
    {
      label: "Manage challenges",
      description: "Review community challenges",
      href: "/admin/challenges",
      icon: Target,
    },
    {
      label: "Manage members",
      description: "Review accounts and roles",
      href: "/admin/members",
      icon: Users,
    },
  ];

  const publicationRate =
    totalArticles > 0
      ? Math.round((publishedArticles / totalArticles) * 100)
      : 0;

  return (
    <div className="relative mx-auto max-w-7xl space-y-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-500/[0.07] blur-[110px]"
      />

      <header className="relative flex flex-col justify-between gap-5 border-b border-white/[0.08] pb-7 sm:flex-row sm:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200">
              CodeHive / Command Center
            </span>
          </div>

          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/35">
            Your community at a glance
          </p>

          <h1 className="text-3xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
            Admin Overview<span className="text-amber-300">.</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/45">
            Monitor your community, keep events moving, and manage content from
            one workspace.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3 text-sm font-bold text-[#100d07] transition hover:bg-amber-200"
        >
          <Plus size={17} />
          Create event
          <ArrowUpRight size={15} />
        </Link>
      </header>

      <section aria-label="Platform metrics" className="relative">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            Platform metrics
          </h2>
          <span className="text-[11px] text-white/30">
            Live database counts
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(
            ({ label, value, note, icon: Icon, href, accent, glow }) => (
              <Link
                key={label}
                href={href}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0b12]/90 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300/25 sm:p-6"
              >
                <div
                  aria-hidden="true"
                  className={`absolute -right-8 -top-8 h-28 w-28 rounded-full ${glow} blur-2xl`}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-white/50">{label}</p>
                    <p className="mt-4 text-4xl font-semibold tracking-tight text-white">
                      {value.toLocaleString("en-IN")}
                    </p>
                    <p className="mt-2 text-xs text-white/35">{note}</p>
                  </div>

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] ${accent}`}
                  >
                    <Icon size={19} />
                  </div>
                </div>

                <div className="relative mt-5 flex items-center gap-1.5 text-xs text-white/35 transition group-hover:text-amber-200">
                  View section
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            )
          )}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0b12]/90">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-5 sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-amber-300" />
                <h2 className="font-semibold text-white">Recent activity</h2>
              </div>
              <p className="mt-1 text-xs text-white/35">
                Latest members, registrations, and articles
              </p>
            </div>

            <Clock3 size={17} className="text-white/30" />
          </div>

          {activity.length > 0 ? (
            <div className="divide-y divide-white/[0.06]">
              {activity.map(
                ({ id, title, detail, date, kind, icon: Icon, color }) => (
                  <div
                    key={id}
                    className="flex items-center gap-3 px-5 py-4 transition hover:bg-white/[0.02] sm:gap-4 sm:px-6"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03]">
                      <Icon size={17} className={color} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white/85">
                        {title}
                      </p>
                      <p className="mt-1 truncate text-xs text-white/40">
                        {detail}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="hidden text-[10px] text-white/30 sm:block">
                        {kind}
                      </span>
                      <p className="mt-1 text-[11px] text-white/45">
                        {timeAgo(date)}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <Activity
                size={25}
                className="mx-auto mb-3 text-white/25"
              />
              <p className="text-sm text-white/65">No activity yet</p>
              <p className="mt-1 text-xs text-white/35">
                New members, registrations, and articles will appear here.
              </p>
            </div>
          )}

          <div className="border-t border-white/[0.07] px-5 py-3 sm:px-6">
            <p className="text-[11px] text-white/30">
              Activity is assembled from existing database records.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/[0.09] bg-[#0b0b12]/90 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-semibold text-white">Content pipeline</h2>
              <FileText size={17} className="text-violet-300" />
            </div>

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold text-white">
                  {publishedArticles}
                  <span className="text-lg text-white/30">
                    {" "}/ {totalArticles}
                  </span>
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Articles published
                </p>
              </div>

              <span className="text-sm font-semibold text-amber-200">
                {publicationRate}%
              </span>
            </div>

            <div
              className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.07]"
              role="progressbar"
              aria-label="Article publication rate"
              aria-valuenow={publicationRate}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-amber-300 transition-all"
                style={{ width: `${publicationRate}%` }}
              />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Eye size={15} />
                  <span className="text-xs">Published</span>
                </div>
                <p className="mt-2 text-xl font-semibold text-white">
                  {publishedArticles}
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                <div className="flex items-center gap-2 text-violet-300">
                  <EyeOff size={15} />
                  <span className="text-xs">Drafts</span>
                </div>
                <p className="mt-2 text-xl font-semibold text-white">
                  {draftArticles}
                </p>
              </div>
            </div>

            <Link
              href="/admin/blog"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber-200 transition hover:text-amber-100"
            >
              Open Blog Studio
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className="rounded-2xl border border-white/[0.09] bg-[#0b0b12]/90 p-5 sm:p-6">
            <h2 className="font-semibold text-white">Quick actions</h2>
            <p className="mt-1 text-xs text-white/35">
              Jump straight into your workspace
            </p>

            <div className="mt-4 space-y-2">
              {quickActions.map(({ label, description, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition hover:border-amber-300/20 hover:bg-amber-300/[0.04]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/65 transition group-hover:text-amber-200">
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white/85">
                      {label}
                    </p>
                    <p className="mt-0.5 text-xs text-white/35">
                      {description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-white/25 transition group-hover:text-amber-200"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-2 border-t border-white/[0.07] pt-5 text-xs text-white/30 sm:flex-row">
        <span>CodeHive Command Center</span>
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-emerald-400" />
          Metrics connected to the database
        </span>
      </footer>
    </div>
  );
}
