import Link from "next/link";
import { Calendar, Clock, FileText } from "lucide-react";

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: Date;
  readMinutes: number;
}

export function ArticleCard({ slug, title, excerpt, category, publishedAt, readMinutes }: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="flex gap-5 p-5 rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] hover:border-[var(--ch-gold-500)]/40 transition-colors">
      <div className="w-28 h-28 rounded-xl bg-[var(--ch-gold-700)]/10 flex-shrink-0 flex items-center justify-center">
        <FileText className="w-8 h-8 text-[var(--ch-gold-700)]" strokeWidth={1.5} />
      </div>
      <div>
        <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[var(--ch-gold-500)] bg-[var(--ch-gold-700)]/15 px-2.5 py-1 rounded-full mb-2">
          {category}
        </span>
        <h3 className="font-sora font-bold text-white mb-1.5">{title}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-1.5"><Calendar size={12} />{publishedAt.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</span>
          <span className="flex items-center gap-1.5"><Clock size={12} />{readMinutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
