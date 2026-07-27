import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-16">
      <article className="max-w-2xl mx-auto px-6">
        <span className="text-xs font-bold tracking-widest uppercase text-[var(--ch-gold-500)]">{post.category}</span>
        <h1 className="font-sora text-3xl font-bold text-white mt-2 mb-2">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-8">By {post.authorName} &bull; {post.readMinutes} min read</p>
        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{post.content}</div>
      </article>
    </main>
  );
}
