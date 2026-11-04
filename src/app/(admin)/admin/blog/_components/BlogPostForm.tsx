
"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Clock3,
  EyeOff,
  FileText,
  Globe2,
  Image as ImageIcon,
  Layers3,
  LoaderCircle,
  PenLine,
  Tag,
  UserRound,
} from "lucide-react";
import { saveBlogPost } from "../actions";

type BlogPostData = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  authorName?: string;
  coverUrl?: string | null;
  tags?: string;
  readMinutes?: number;
  published?: boolean;
};

const inputClass =
  "w-full rounded-xl border border-white/[0.09] bg-[#0d0d15] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 hover:border-white/[0.16] focus:border-white/30 focus:ring-0 focus-visible:outline-none";

const smallInputClass =
  "w-full rounded-xl border border-white/[0.09] bg-[#090910] px-3.5 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 hover:border-white/[0.16] focus:border-white/30 focus:ring-0 focus-visible:outline-none";

const sectionClass =
  "rounded-2xl border border-white/[0.09] bg-[#0a0a11]/90";

export default function BlogPostForm({ post }: { post?: BlogPostData }) {
  const [state, formAction, isPending] = useActionState(saveBlogPost, {});
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(post?.slug));
  const [published, setPublished] = useState(post?.published ?? false);
  const [coverUrl, setCoverUrl] = useState(post?.coverUrl ?? "");

  function makeSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  return (
    <form action={formAction} className="space-y-6 text-white">
      {post?.id && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="published" value={String(published)} />

      {state.error && (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-start gap-3 rounded-xl border border-red-400/25 bg-red-500/[0.08] px-4 py-3.5 text-sm text-red-200"
        >
          <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-400" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">
        {/* Main writing area */}
        <div className="min-w-0 space-y-5">
          <section className={`${sectionClass} overflow-hidden`}>
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]">
                  <PenLine size={16} className="text-white/65" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Story details</h2>
                  <p className="mt-0.5 text-xs text-white/35">
                    Give your article its identity.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/25">
                01 / Compose
              </span>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              <label className="block space-y-2.5">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                  Article title <span className="text-red-300">*</span>
                </span>
                <input
                  name="title"
                  value={title}
                  onChange={(event) => {
                    const value = event.target.value;
                    setTitle(value);
                    if (!slugEdited) setSlug(makeSlug(value));
                  }}
                  required
                  minLength={3}
                  maxLength={160}
                  className="w-full border-0 border-b border-white/[0.12] bg-transparent px-0 py-3 text-2xl font-semibold tracking-[-0.04em] text-white outline-none transition-colors placeholder:text-white/20 focus:border-white/40 focus:ring-0 focus-visible:outline-none sm:text-3xl"
                  placeholder="A title worth remembering..."
                />
                <div className="flex justify-between gap-3 text-[11px] text-white/25">
                  <span>Make it clear, specific, and memorable.</span>
                  <span className="shrink-0 tabular-nums">
                    {title.length}/160
                  </span>
                </div>
              </label>

              <label className="block space-y-2.5">
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                  URL slug
                </span>
                <div className="flex min-w-0 items-center overflow-hidden rounded-xl border border-white/[0.09] bg-[#08080e] focus-within:border-white/30">
                  <span className="shrink-0 border-r border-white/[0.07] px-3 py-3 text-xs text-white/30 sm:px-4">
                    /blog/
                  </span>
                  <input
                    name="slug"
                    value={slug}
                    onChange={(event) => {
                      setSlugEdited(true);
                      setSlug(makeSlug(event.target.value));
                    }}
                    required
                    minLength={3}
                    maxLength={180}
                    pattern="[a-z0-9]+(-[a-z0-9]+)*"
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none focus:ring-0 focus-visible:outline-none"
                    placeholder="your-article-slug"
                  />
                </div>
                <p className="text-xs leading-5 text-white/30">
                  {slug
                    ? `Your article will be available at /blog/${slug}`
                    : "Generated from your title. You can customize it."}
                </p>
              </label>

              <label className="block space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                    Excerpt <span className="text-red-300">*</span>
                  </span>
                  <span className="text-[11px] tabular-nums text-white/25">
                    10–400 characters
                  </span>
                </div>
                <textarea
                  name="excerpt"
                  defaultValue={post?.excerpt ?? ""}
                  required
                  minLength={10}
                  maxLength={400}
                  rows={3}
                  className={`${inputClass} resize-y leading-6`}
                  placeholder="A concise introduction that gives readers a reason to open your story..."
                />
              </label>
            </div>
          </section>

          <section className={`${sectionClass} overflow-hidden`}>
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]">
                  <BookOpen size={16} className="text-white/65" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Article content</h2>
                  <p className="mt-0.5 text-xs text-white/35">
                    The substance behind the headline.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/25">
                02 / Write
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <textarea
                name="content"
                defaultValue={post?.content ?? ""}
                required
                minLength={20}
                rows={18}
                className={`${inputClass} min-h-[380px] resize-y leading-7`}
                placeholder={"Start with an idea...\n\nBuild your argument, share what you learned, and give the community something useful to take away."}
              />
              <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-white/30">
                <FileText size={14} className="mt-0.5 shrink-0" />
                <p>
                  Plain text with line breaks. Your content is saved using the
                  existing article workflow; rich-text editing can be added
                  separately later.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Settings sidebar */}
        <aside className="space-y-5 xl:sticky xl:top-6">
          <section className={`${sectionClass} overflow-hidden`}>
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035]">
                <Layers3 size={16} className="text-white/65" />
              </div>
              <div>
                <h2 className="text-sm font-semibold">Article settings</h2>
                <p className="mt-0.5 text-xs text-white/35">
                  Organize your story.
                </p>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <label className="block space-y-2">
                <span className="flex items-center gap-2 text-xs font-medium text-white/50">
                  <Layers3 size={13} />
                  Category <span className="text-red-300">*</span>
                </span>
                <input
                  name="category"
                  defaultValue={post?.category ?? ""}
                  required
                  minLength={2}
                  maxLength={80}
                  className={smallInputClass}
                  placeholder="Engineering"
                />
              </label>

              <label className="block space-y-2">
                <span className="flex items-center gap-2 text-xs font-medium text-white/50">
                  <UserRound size={13} />
                  Author <span className="text-red-300">*</span>
                </span>
                <input
                  name="authorName"
                  defaultValue={post?.authorName ?? ""}
                  required
                  minLength={2}
                  maxLength={100}
                  className={smallInputClass}
                  placeholder="Author name"
                />
              </label>

              <label className="block space-y-2">
                <span className="flex items-center gap-2 text-xs font-medium text-white/50">
                  <ImageIcon size={13} />
                  Cover image URL
                </span>
                <input
                  name="coverUrl"
                  type="url"
                  value={coverUrl}
                  onChange={(event) => setCoverUrl(event.target.value)}
                  className={smallInputClass}
                  placeholder="https://..."
                />
              </label>

              {coverUrl.trim() && (
                <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-black/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverUrl}
                    alt="Cover image preview"
                    className="aspect-video w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                    onLoad={(event) => {
                      event.currentTarget.style.visibility = "visible";
                    }}
                  />
                  <p className="border-t border-white/[0.07] px-3 py-2 text-[10px] text-white/35">
                    Cover preview
                  </p>
                </div>
              )}

              <label className="block space-y-2">
                <span className="flex items-center gap-2 text-xs font-medium text-white/50">
                  <Tag size={13} />
                  Tags
                </span>
                <input
                  name="tags"
                  defaultValue={post?.tags ?? ""}
                  className={smallInputClass}
                  placeholder="React, AI, Community"
                />
                <span className="block text-[11px] leading-5 text-white/30">
                  Comma-separated, up to 15 tags with 40 characters each.
                </span>
              </label>

              <label className="block space-y-2">
                <span className="flex items-center gap-2 text-xs font-medium text-white/50">
                  <Clock3 size={13} />
                  Reading time
                </span>
                <div className="relative">
                  <input
                    name="readMinutes"
                    type="number"
                    min={1}
                    max={120}
                    required
                    defaultValue={post?.readMinutes ?? 5}
                    className={`${smallInputClass} pr-24`}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30">
                    minutes
                  </span>
                </div>
              </label>
            </div>
          </section>

          {/* Publishing panel */}
          <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0a11]/90">
            <div className="border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                    published
                      ? "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200"
                      : "border-white/[0.09] bg-white/[0.035] text-white/55"
                  }`}
                >
                  <Globe2 size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Publishing</h2>
                  <p className="mt-0.5 text-xs text-white/35">
                    Control article visibility.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    published ? "bg-emerald-300" : "bg-white/25"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-white/85">
                    {published ? "Ready for readers" : "Saved as a draft"}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/40">
                    {published
                      ? "This article will be visible publicly after you save."
                      : "Only authorized editors can access unpublished content."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPublished((current) => !current)}
                aria-pressed={published}
                className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold outline-none transition-colors focus:ring-0 focus-visible:outline-none ${
                  published
                    ? "border-red-400/25 bg-red-500/[0.07] text-red-200 hover:border-red-400/40 hover:bg-red-500/[0.12]"
                    : "border-emerald-400/25 bg-emerald-500/[0.07] text-emerald-200 hover:border-emerald-400/40 hover:bg-emerald-500/[0.12]"
                }`}
              >
                {published ? (
                  <>
                    <EyeOff size={15} />
                    Switch to draft
                  </>
                ) : (
                  <>
                    <Globe2 size={15} />
                    Publish article
                  </>
                )}
              </button>
            </div>
          </section>
        </aside>
      </div>

      {/* Save actions */}
      <footer className="sticky bottom-0 z-10 -mx-1 border-t border-white/[0.08] bg-[#07070c]/95 px-4 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="hidden items-center gap-2 text-xs text-white/30 sm:flex">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isPending ? "animate-pulse bg-amber-300" : "bg-emerald-300/70"
              }`}
            />
            {isPending ? "Saving your changes..." : "Changes save when submitted"}
          </div>

          <div className="ml-auto flex flex-wrap items-center justify-end gap-3">
            <Link
              href="/admin/blog"
              className="inline-flex items-center justify-center rounded-xl border border-white/[0.12] px-5 py-3 text-sm font-medium text-white/65 outline-none transition-colors hover:border-white/25 hover:bg-white/[0.04] hover:text-white focus-visible:outline-none"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl border border-amber-200/20 bg-amber-300 px-5 py-3 text-sm font-bold text-[#100d07] outline-none transition-colors hover:border-amber-100/40 hover:bg-amber-200 focus:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={16} strokeWidth={2.5} />
                  {post ? "Save changes" : "Save article"}
                  <ArrowUpRight size={15} />
                </>
              )}
            </button>
          </div>
        </div>
      </footer>
    </form>
  );
}
