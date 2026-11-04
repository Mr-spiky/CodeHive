import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Crown,
  UserRound,
  Sparkles,
} from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import MemberRoleEditor from "./_components/MemberRoleEditor";
import MemberAccountStatusControl from "./_components/MemberAccountStatusControl";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

const ROLES = [
  "ALL",
  "MEMBER",
  "CONTENT_MEMBER",
  "CORE_TEAM",
  "ORGANIZER",
  "ADMIN",
  "SUPER_ADMIN",
] as const;

type RoleFilter = (typeof ROLES)[number];

function validRole(role?: string): RoleFilter {
  return ROLES.includes(role as RoleFilter)
    ? (role as RoleFilter)
    : "ALL";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function roleLabel(role: string) {
  return role.replaceAll("_", " ");
}

function isAdminRole(role: string): role is "ADMIN" | "SUPER_ADMIN" {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080810]";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    role?: string;
    page?: string;
  }>;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser || !isAdminRole(currentUser.role)) {
    redirect("/");
  }

  const params = await searchParams;
  const q = (params.q ?? "").trim().slice(0, 100);
  const role = validRole(params.role);

  const parsedPage = Number.parseInt(params.page ?? "1", 10);
  const requestedPage = Number.isFinite(parsedPage)
    ? Math.max(1, parsedPage)
    : 1;

  const where = {
    ...(role !== "ALL" ? { role } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { username: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [
    total,
    memberCount,
    contentMemberCount,
    coreTeamCount,
    organizerCount,
    adminCount,
    superAdminCount,
  ] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.count({ where: { role: "MEMBER" } }),
    prisma.user.count({ where: { role: "CONTENT_MEMBER" } }),
    prisma.user.count({ where: { role: "CORE_TEAM" } }),
    prisma.user.count({ where: { role: "ORGANIZER" } }),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { role: "SUPER_ADMIN" } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);

  const members = await prisma.user.findMany({
    where,
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      role: true,
      status: true,
      xp: true,
      createdAt: true,
      avatarUrl: true,
    },
  });

  function pageUrl(nextPage: number) {
    const next = new URLSearchParams();

    if (q) next.set("q", q);
    if (role !== "ALL") next.set("role", role);

    next.set("page", String(nextPage));

    return `/admin/members?${next.toString()}`;
  }

  const stats = [
    {
      label: "Total users",
      value:
        memberCount +
        contentMemberCount +
        coreTeamCount +
        organizerCount +
        adminCount +
        superAdminCount,
      icon: Users,
      note: "Across your workspace",
      accent: "text-amber-300",
      glow: "bg-amber-400/10",
    },
    {
      label: "Core Team",
      value: coreTeamCount,
      icon: Sparkles,
      note: "Community team",
      accent: "text-amber-300",
      glow: "bg-amber-400/10",
    },
    {
      label: "Organizers",
      value: organizerCount,
      icon: Crown,
      note: "Event organizers",
      accent: "text-violet-300",
      glow: "bg-violet-400/10",
    },
    {
      label: "Admins",
      value: adminCount + superAdminCount,
      icon: ShieldCheck,
      note: "Admin and super admin accounts",
      accent: "text-emerald-300",
      glow: "bg-emerald-400/10",
    },
  ];

  return (
    <main className="relative mx-auto min-h-full max-w-[1400px] overflow-hidden text-white">
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-20 h-[360px] w-[360px] rounded-full bg-amber-500/[0.07] blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-[520px] h-[300px] w-[300px] rounded-full bg-violet-600/[0.05] blur-[110px]"
      />

      <div className="relative space-y-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200">
                CodeHive / Community operations
              </span>
            </div>

            <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-white/60">
              Your people, your platform
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Member Studio<span className="text-amber-300">.</span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">
              Discover your community, manage member roles, and track progress
              across CodeHive.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-xs text-white/65 sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Live database data
          </div>
        </header>

        {/* Overview statistics */}
        <section aria-label="Community overview">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              <Sparkles size={15} className="text-amber-300" />
              Workspace overview
            </h2>

            <span className="text-[11px] text-white/45">
              Live database counts
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(
              ({ label, value, icon: Icon, note, accent, glow }) => (
                <article
                  key={label}
                  className="rounded-2xl border border-amber-100/[0.10] bg-[#0D0D17]/90 p-5 transition duration-200 hover:border-amber-200/25"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-sm text-white/65">{label}</span>

                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${glow} ${accent}`}
                    >
                      <Icon size={19} />
                    </span>
                  </div>

                  <p className="mt-4 text-3xl font-semibold tracking-tight text-white">
                    {value.toLocaleString("en-IN", {
                      minimumIntegerDigits: 2,
                    })}
                  </p>

                  <div className="mt-5 border-t border-white/[0.09] pt-4">
                    <p className="flex items-center gap-2 text-xs text-white/55">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${glow.replace("/10", "")}`}
                      />
                      {note}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        {/* Member directory */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0D0D17]/90">
          <div className="flex flex-col justify-between gap-3 border-b border-white/[0.08] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Users size={18} className="text-amber-300" />
                Your community
              </h2>

              <p className="mt-1 text-sm text-white/55">
                Search, review, and manage member accounts.
              </p>
            </div>

            <span className="inline-flex w-fit items-center rounded-full border border-white/[0.1] bg-white/[0.025] px-3 py-1.5 text-xs text-white/60">
              {total.toLocaleString("en-IN")}{" "}
              {total === 1 ? "result" : "results"}
            </span>
          </div>

          <form
            action="/admin/members"
            method="GET"
            className="flex flex-col gap-3 border-b border-white/[0.08] p-4 sm:flex-row sm:p-5"
          >
            <div className="relative min-w-0 flex-1">
              <Search
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50"
              />

              <input
                name="q"
                defaultValue={q}
                maxLength={100}
                placeholder="Search name, username, or email..."
                aria-label="Search members"
                className={`h-11 w-full rounded-xl border border-white/[0.12] bg-black/20 pl-10 pr-4 text-sm text-white placeholder:text-white/45 transition hover:border-white/20 focus:border-amber-300/50 ${focusRing}`}
              />
            </div>

            <select
              name="role"
              defaultValue={role}
              aria-label="Filter by role"
              className={`h-11 rounded-xl border border-white/[0.12] bg-[#11111F] px-4 text-sm text-white/80 transition hover:border-white/20 focus:border-amber-300/50 ${focusRing}`}
            >
              {ROLES.map((item) => (
                <option key={item} value={item}>
                  {item === "ALL" ? "All roles" : roleLabel(item)}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className={`inline-flex h-11 items-center justify-center rounded-xl bg-amber-300 px-5 text-sm font-semibold text-black transition hover:bg-amber-200 active:scale-[0.98] ${focusRing}`}
            >
              Apply filters
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[940px] text-left">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.015] text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                  <th scope="col" className="px-5 py-4 sm:px-6">
                    Member
                  </th>

                  <th scope="col" className="px-5 py-4">
                    Role
                  </th>

                  <th scope="col" className="px-5 py-4">
                    Account status
                  </th>

                  <th scope="col" className="px-5 py-4">
                    Experience
                  </th>

                  <th scope="col" className="px-5 py-4">
                    Joined
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="transition-colors hover:bg-white/[0.025]"
                  >
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        {member.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={member.avatarUrl}
                            alt=""
                            className="h-10 w-10 rounded-xl border border-white/[0.12] object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-white/65">
                            <UserRound size={18} />
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {member.name ||
                              member.username ||
                              "Unnamed member"}
                          </p>

                          <p className="mt-1 truncate text-xs text-white/65">
                            {member.email}
                          </p>

                          {member.username && (
                            <p className="mt-0.5 truncate text-xs text-white/50">
                              @{member.username}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <MemberRoleEditor
                        userId={member.id}
                        currentRole={member.role}
                        canEdit={isAdminRole(currentUser.role)}
                        isSelf={member.id === currentUser.id}
                      />
                    </td>

                    <td className="px-5 py-4">
                      <MemberAccountStatusControl
                        userId={member.id}
                        status={member.status}
                        canEdit={isAdminRole(currentUser.role)}
                        isSelf={member.id === currentUser.id}
                      />
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-white">
                        {member.xp.toLocaleString("en-IN")}
                      </span>
                      <span className="ml-1.5 text-xs text-white/55">XP</span>
                    </td>

                    <td className="px-5 py-4 text-sm text-white/65">
                      {formatDate(member.createdAt)}
                    </td>
                  </tr>
                ))}

                {members.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <Users
                        className="mx-auto mb-3 text-white/45"
                        size={26}
                      />

                      <p className="text-sm font-medium text-white/85">
                        No members found
                      </p>

                      <p className="mt-1 text-xs text-white/60">
                        Try a different search or role filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-white/[0.08] bg-white/[0.015] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-xs text-white/60">
              Showing{" "}
              <span className="text-white/90">
                {total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, total)}
              </span>{" "}
              of <span className="text-white/90">{total}</span> results
            </p>

            <nav
              aria-label="Member pagination"
              className="flex items-center gap-2"
            >
              <Link
                aria-label="Previous page"
                aria-disabled={page <= 1}
                tabIndex={page <= 1 ? -1 : undefined}
                href={pageUrl(Math.max(1, page - 1))}
                className={`inline-flex h-9 items-center gap-1 rounded-lg border border-white/[0.12] px-3 text-xs transition ${focusRing} ${
                  page <= 1
                    ? "pointer-events-none opacity-35"
                    : "text-white/80 hover:border-amber-300/30 hover:bg-white/[0.04]"
                }`}
              >
                <ChevronLeft size={15} />
                Previous
              </Link>

              <span className="px-2 text-xs text-white/60">
                Page {page} of {totalPages}
              </span>

              <Link
                aria-label="Next page"
                aria-disabled={page >= totalPages}
                tabIndex={page >= totalPages ? -1 : undefined}
                href={pageUrl(Math.min(totalPages, page + 1))}
                className={`inline-flex h-9 items-center gap-1 rounded-lg border border-white/[0.12] px-3 text-xs transition ${focusRing} ${
                  page >= totalPages
                    ? "pointer-events-none opacity-35"
                    : "text-white/80 hover:border-amber-300/30 hover:bg-white/[0.04]"
                }`}
              >
                Next
                <ChevronRight size={15} />
              </Link>
            </nav>
          </div>
        </section>

        <footer className="flex flex-wrap items-center gap-2 pb-3 text-[11px] text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
          <span>Community workspace</span>
          <span className="text-white/25">/</span>
          <span>
            Role and account status changes are restricted to administrators.
          </span>
        </footer>
      </div>
    </main>
  );
}