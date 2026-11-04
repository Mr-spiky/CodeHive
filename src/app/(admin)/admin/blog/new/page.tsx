
import Link from "next/link";
import BlogPostForm from "../_components/BlogPostForm";

export default function NewBlogPostPage() {
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
        <h1 className="text-3xl font-bold">Create article</h1>
        <p className="mt-2 text-sm text-gray-400">
          Draft your next CodeHive story.
        </p>
      </div>

      <BlogPostForm />
    </main>
  );
}
