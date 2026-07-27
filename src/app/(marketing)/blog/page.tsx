import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { ArticleCard } from "@/components/blog/ArticleCard";

interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string;
  publishedAt: Date;
  readMinutes: number;
}

export default async function BlogPage() {
  const posts: BlogPostRow[] = await prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });

  // Real, computed from actual posts - never a hardcoded category list.
  const categoryCounts = posts.reduce<Record<string, number>>((acc, p: BlogPostRow) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  const allTags: string[] = Array.from(new Set(posts.flatMap((p: BlogPostRow) => JSON.parse(p.tags) as string[])));

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <PageHero
        eyebrow="Blog"
        title={<>Ideas. Insights. <span className="gold-text">Impact.</span></>}
        subtitle="Explore tutorials, stories and insights from the CodeHive community."
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="font-sora text-xl font-bold text-white mb-6">Latest Articles</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500 text-sm">No published articles yet - add real posts via the Admin Panel.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post: BlogPostRow) => (
                <ArticleCard key={post.id} slug={post.slug} title={post.title} excerpt={post.excerpt}
                  category={post.category} publishedAt={post.publishedAt} readMinutes={post.readMinutes} />
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-5">
            <h4 className="font-sora font-semibold text-white text-sm mb-4">Categories</h4>
            {Object.keys(categoryCounts).length === 0 ? (
              <p className="text-gray-600 text-xs">No categories yet.</p>
            ) : (
              <div className="space-y-2.5">
                {Object.entries(categoryCounts).map(([cat, count]) => (
                  <div key={cat} className="flex justify-between text-sm">
                    <span className="text-gray-300">{cat}</span>
                    <span className="text-gray-600">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {allTags.length > 0 && (
            <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-5">
              <h4 className="font-sora font-semibold text-white text-sm mb-4">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-[var(--ch-gold-700)]/10 text-gray-400">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
