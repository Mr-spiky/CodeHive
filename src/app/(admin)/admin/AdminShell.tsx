"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Target,
  FileText,
  ArrowUpRight,
  Menu,
  X,
  Hexagon,
} from "lucide-react";
import { useState } from "react";

type AdminRole = "CONTENT_MEMBER" | "ADMIN" | "SUPER_ADMIN";

type NavigationItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles: readonly AdminRole[];
};

const navigation: NavigationItem[] = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    label: "Members",
    href: "/admin/members",
    icon: Users,
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    label: "Events",
    href: "/admin/events",
    icon: CalendarDays,
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    label: "Challenges",
    href: "/admin/challenges",
    icon: Target,
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: FileText,
    roles: ["CONTENT_MEMBER", "ADMIN", "SUPER_ADMIN"],
  },
];

export default function AdminShell({
  children,
  role,
}: {
  children: React.ReactNode;
  role: AdminRole;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleNavigation = navigation.filter((item) =>
    item.roles.includes(role)
  );

  const sidebar = (
    <div className="flex h-full flex-col">
      <Link
        href="/admin"
        onClick={() => setMobileOpen(false)}
        className="flex items-center gap-3 border-b border-white/[0.07] px-6 py-6"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-black">
          <Hexagon size={23} strokeWidth={2.5} />
        </div>

        <div>
          <div className="text-lg font-bold tracking-tight text-white">
            CodeHive
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-400">
            Command Center
          </div>
        </div>
      </Link>

      <div className="px-4 pt-7">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          Workspace
        </p>

        <nav className="space-y-1">
          {visibleNavigation.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/admin"
                ? pathname === href
                : pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  active
                    ? "border border-amber-400/20 bg-amber-400/[0.09] text-amber-300"
                    : "border border-transparent text-gray-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span className="font-medium">{label}</span>

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber-400" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <Link
          href="/"
          className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-sm text-gray-400 transition hover:border-white/15 hover:text-white"
        >
          <span>View public website</span>
          <ArrowUpRight size={16} />
        </Link>

        <p className="px-2 pt-4 text-[10px] text-gray-600">
          CODEHIVE ADMIN · PRIVATE WORKSPACE
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070710] text-white">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] border-r border-white/[0.07] bg-[#0A0A14] lg:block">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="absolute inset-y-0 left-0 w-[280px] border-r border-white/10 bg-[#0A0A14]">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-5 z-10 rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <X size={20} />
            </button>

            {sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-white/[0.07] bg-[#070710]/90 px-5 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg border border-white/10 p-2 text-gray-300 hover:bg-white/5 lg:hidden"
            >
              <Menu size={19} />
            </button>

            <div>
              <p className="text-sm font-semibold text-white">
                Admin Workspace
              </p>
              <p className="text-xs text-gray-500">
                Manage your community
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-gray-400">
              Workspace active
            </span>
          </div>
        </header>

        <main className="min-h-[calc(100vh-68px)] px-5 py-8 sm:px-8 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}