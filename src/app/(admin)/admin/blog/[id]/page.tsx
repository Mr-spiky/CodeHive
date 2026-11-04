
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogPostForm from "../_components/BlogPostForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) notFound();

  let tags: string[] = [];

  try {
    const parsed: unknown = JSON.parse(post.tags);
    if (Array.isArray(parsed)) {
      tags = parsed.filter((tag): tag is string => typeof tag === "string");
    }
  } catch {
    tags = [];
  }

  return (
    <main className="mx-auto max-w-6xl text-white">
      <Link
        href="/admin/blog"
        className="mb-6 inline-block text-sm text-gray-400 hover:text-amber-300"
      >
        ← Back to Blog Studio
      </Link>

      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
          Content management
        </p>
        <h1 className="text-3xl font-bold">Edit article</h1>
        <p className="mt-2 text-sm text-gray-400">
          Update content, review publishing status, and save changes.
        </p>
      </div>

      <BlogPostForm
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          authorName: post.authorName,
          coverUrl: post.coverUrl,
          tags: tags.join(", "),
          readMinutes: post.readMinutes,
          published: post.published,
        }}
      />
    </main>
  );
}
