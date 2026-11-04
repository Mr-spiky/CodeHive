
import Link from "next/link";
import {
  Plus,
  FileText,
  Eye,
  EyeOff,
  Pencil,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import BlogDeleteButton from "./_components/BlogDeleteButton";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  q?: string;
  status?: string;
}>;

const deleteButtonClass =
  "!outline-none !ring-0 !ring-offset-0 !shadow-none focus:!outline-none focus:!ring-0 focus:!ring-offset-0 focus:!shadow-none focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!ring-offset-0 focus-visible:!shadow-none active:!ring-0 active:!shadow-none inline-flex h-9 items-center justify-center rounded-lg border border-red-500/40 bg-red-500/15 px-3 text-xs font-semibold text-red-300 transition-colors hover:border-red-400/70 hover:bg-red-500/25 hover:text-red-200";

const mobileDeleteButtonClass =
  "!outline-none !ring-0 !ring-offset-0 !shadow-none focus:!outline-none focus:!ring-0 focus:!ring-offset-0 focus:!shadow-none focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!ring-offset-0 focus-visible:!shadow-none active:!ring-0 active:!shadow-none inline-flex items-center rounded-lg border border-red-500/40 bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-300 transition-colors hover:border-red-400/70 hover:bg-red-500/25 hover:text-red-200";

const filterButtonClass =
  "!outline-none !ring-0 !ring-offset-0 !shadow-none focus:!outline-none focus:!ring-0 focus:!ring-offset-0 focus:!shadow-none focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!ring-offset-0 focus-visible:!shadow-none active:!ring-0 active:!shadow-none inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-5 text-sm font-medium text-white/75 transition hover:border-white/25 hover:bg-white/[0.07] hover:text-white";

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const status = params.status ?? "all";

  const where = {
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" as const } },
            { category: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(status === "published"
      ? { published: true }
      : status === "draft"
        ? { published: false }
        : {}),
  };

  const [posts, total, publishedCount, draftCount] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        published: true,
        publishedAt: true,
        authorName: true,
      },
    }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.blogPost.count({ where: { published: false } }),
  ]);

  const stats = [
    {
      label: "Total articles",
      value: total,
      icon: FileText,
      note: "Across your workspace",
      accent: "text-amber-300",
      glow: "bg-amber-400/10",
    },
    {
      label: "Published",
      value: publishedCount,
      icon: Eye,
      note: "Visible to everyone",
      accent: "text-emerald-300",
      glow: "bg-emerald-400/10",
    },
    {
      label: "Drafts",
      value: draftCount,
      icon: EyeOff,
      note: "Waiting to go live",
      accent: "text-violet-300",
      glow: "bg-violet-400/10",
    },
  ];

  return (
    <main className="relative mx-auto min-h-screen max-w-7xl overflow-hidden text-white">
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-amber-500/[0.07] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-180px] top-[460px] h-[350px] w-[350px] rounded-full bg-violet-600/[0.06] blur-[120px]"
      />

      <div className="relative space-y-8">
        {/* Header */}
        <header className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200">
                CodeHive / Content operations
              </span>
            </div>

            <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-white/35">
              Your stories, your platform
            </p>

            <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
              Blog Studio<span className="text-amber-300">.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/45">
              Create thoughtful stories, manage your publishing pipeline, and
              keep the CodeHive community in the loop.
            </p>
          </div>

          <Link
            href="/admin/blog/new"
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-amber-300 px-5 py-3 text-sm font-bold text-[#100d07] shadow-[0_0_35px_rgba(252,211,77,0.10)] transition duration-200 hover:bg-amber-200 hover:shadow-[0_0_40px_rgba(252,211,77,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a11]"
          >
            <Plus size={17} strokeWidth={2.5} />
            New article
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </header>

        {/* Overview */}
        <section aria-label="Article overview">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-amber-300/80" />
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                Workspace overview
              </h2>
            </div>
            <span className="text-[11px] text-white/30">
              Live database counts
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map(({ label, value, icon: Icon, note, accent, glow }) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0b12]/90 p-5 transition duration-300 hover:border-white/[0.16] sm:p-6"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/[0.025] blur-2xl transition group-hover:bg-white/[0.05]"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/45">{label}</p>
                    <p className="mt-4 text-4xl font-semibold tabular-nums tracking-[-0.05em] text-white">
                      {value.toString().padStart(2, "0")}
                    </p>
                  </div>
                  <div className={`rounded-xl p-3 ${glow} ${accent}`}>
                    <Icon size={19} strokeWidth={1.8} />
                  </div>
                </div>

                <div className="relative mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${accent.replace("text-", "bg-")}`}
                  />
                  <p className="text-xs text-white/35">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Content management */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0a11]/90">
          <div className="border-b border-white/[0.08] p-5 sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Newspaper size={17} className="text-amber-300" />
                  <h2 className="text-lg font-semibold tracking-tight">
                    Your articles
                  </h2>
                </div>
                <p className="mt-1 text-xs text-white/35">
                  Search, review, and manage your content.
                </p>
              </div>

              <span className="rounded-full border border-white/[0.09] bg-white/[0.025] px-3 py-1.5 text-xs text-white/45">
                {posts.length} {posts.length === 1 ? "result" : "results"}
              </span>
            </div>

            <form
              action="/admin/blog"
              method="GET"
              className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_190px_auto]"
            >
              <label className="relative block">
                <span className="sr-only">Search articles</span>
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="Search by title or category..."
                  className="h-11 w-full rounded-xl border border-white/[0.09] bg-[#101018] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/[0.16] focus:border-white/30 focus:ring-2 focus:ring-white/[0.06]"
                />
              </label>

              <label className="relative block">
                <span className="sr-only">Filter by publication status</span>
                <SlidersHorizontal
                  size={15}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35"
                />
                <select
                  name="status"
                  defaultValue={status}
                  className="h-11 w-full appearance-none rounded-xl border border-white/[0.09] bg-[#101018] pl-10 pr-8 text-sm text-white/75 outline-none transition hover:border-white/[0.16] focus:border-white/30 focus:ring-2 focus:ring-white/[0.06]"
                >
                  <option value="all">All statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-white/35"
                >
                  ▾
                </span>
              </label>

              <button type="submit" className={filterButtonClass}>
                Apply filters
                <ArrowRight size={15} />
              </button>
            </form>

            {(query || status !== "all") && (
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/40">
                <span>Active filters:</span>
                {query && (
                  <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-white/65">
                    Search: {query}
                  </span>
                )}
                {status !== "all" && (
                  <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-white/65">
                    Status: {status === "published" ? "Published" : "Draft"}
                  </span>
                )}
                <Link
                  href="/admin/blog"
                  className="ml-1 text-amber-200/80 underline-offset-4 hover:text-amber-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  Clear all
                </Link>
              </div>
            )}
          </div>

          {posts.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.09] bg-white/[0.025]">
                <FileText size={24} className="text-white/35" />
              </div>
              <h3 className="text-base font-semibold text-white/85">
                No articles found
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/40">
                {query || status !== "all"
                  ? "Try changing your search or filters to find what you're looking for."
                  : "Your content workspace is ready. Create your first story to get started."}
              </p>
              {query || status !== "all" ? (
                <Link
                  href="/admin/blog"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber-200 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  Clear filters <ArrowRight size={14} />
                </Link>
              ) : (
                <Link
                  href="/admin/blog/new"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber-200 hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  Create an article <Plus size={15} />
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Desktop article table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-white/[0.07] bg-white/[0.015] text-[10px] uppercase tracking-[0.17em] text-white/35">
                    <tr>
                      <th className="px-6 py-4 font-medium">Article</th>
                      <th className="px-4 py-4 font-medium">Author</th>
                      <th className="px-4 py-4 font-medium">Status</th>
                      <th className="px-4 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.055]">
                    {posts.map((post, index) => (
                      <tr
                        key={post.id}
                        className="group transition-colors hover:bg-white/[0.025]"
                      >
                        <td className="max-w-[380px] px-6 py-5">
                          <div className="flex items-start gap-3.5">
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-200/[0.12] bg-gradient-to-br from-amber-200/[0.12] to-transparent text-amber-200/80">
                              <span className="text-xs font-semibold tabular-nums">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-white/90 transition group-hover:text-amber-100">
                                {post.title}
                              </p>
                              <p className="mt-1.5 truncate text-xs text-white/35">
                                <span className="text-white/55">
                                  {post.category}
                                </span>
                                <span className="mx-1.5 text-white/20">/</span>
                                /blog/{post.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-5 text-xs text-white/55">
                          {post.authorName}
                        </td>

                        <td className="px-4 py-5">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[11px] font-medium ${
                              post.published
                                ? "border-emerald-300/15 bg-emerald-300/[0.06] text-emerald-200"
                                : "border-amber-300/15 bg-amber-300/[0.06] text-amber-200"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                post.published
                                  ? "bg-emerald-300"
                                  : "bg-amber-300"
                              }`}
                            />
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-4 py-5 text-xs text-white/45">
                          {post.publishedAt.getTime() === 0
                            ? "Not published"
                            : post.publishedAt.toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/blog/${post.id}`}
                              aria-label={`Edit ${post.title}`}
                              title="Edit article"
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.09] text-white/55 transition hover:border-amber-300/30 hover:bg-amber-300/[0.06] hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                            >
                              <Pencil size={15} />
                            </Link>

                            {post.published && (
                              <Link
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`View ${post.title}`}
                                title="Preview published article"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.09] text-white/55 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                              >
                                <Eye size={15} />
                              </Link>
                            )}

                            <BlogDeleteButton
                              postId={post.id}
                              postTitle={post.title}
                              buttonClassName={deleteButtonClass}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile article cards */}
              <div className="divide-y divide-white/[0.07] md:hidden">
                {posts.map((post, index) => (
                  <article key={post.id} className="p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-200/[0.12] bg-amber-200/[0.06] text-xs font-semibold text-amber-200">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="break-words text-sm font-medium text-white/90">
                          {post.title}
                        </h3>
                        <p className="mt-1.5 break-all text-xs text-white/35">
                          {post.category} · /blog/{post.slug}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] ${
                              post.published
                                ? "border-emerald-300/15 text-emerald-200"
                                : "border-amber-300/15 text-amber-200"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                post.published
                                  ? "bg-emerald-300"
                                  : "bg-amber-300"
                              }`}
                            />
                            {post.published ? "Published" : "Draft"}
                          </span>
                          <span className="text-[11px] text-white/35">
                            {post.authorName}
                          </span>
                          <span className="text-[11px] text-white/30">
                            {post.publishedAt.getTime() === 0
                              ? "Not published"
                              : post.publishedAt.toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2 pl-[52px]">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] px-3 py-2 text-xs text-white/70 transition hover:border-amber-300/30 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                      >
                        <Pencil size={13} /> Edit
                      </Link>

                      {post.published && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] px-3 py-2 text-xs text-white/70 transition hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        >
                          <Eye size={13} /> Preview
                        </Link>
                      )}

                      <BlogDeleteButton
                        postId={post.id}
                        postTitle={post.title}
                        buttonClassName={mobileDeleteButtonClass}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {/* Footer */}
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] bg-white/[0.015] px-5 py-4 sm:px-6">
            <p className="text-xs text-white/35">
              Showing {posts.length} of {total} total{" "}
              {total === 1 ? "article" : "articles"}
            </p>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-200/80 transition hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Write something new <ArrowUpRight size={14} />
            </Link>
          </footer>
        </section>

        {/* Bottom note */}
        <div className="flex items-center gap-2 pb-4 text-[11px] text-white/25">
          <span className="h-1 w-1 rounded-full bg-emerald-300/70" />
          <span>Content workspace</span>
          <span className="text-white/15">/</span>
          <span>CodeHive community</span>
        </div>
      </div>
    </main>
  );
}
