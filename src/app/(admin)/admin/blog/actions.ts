
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export type BlogPostActionState = {
  error?: string;
};

type EditorRole = "CONTENT_MEMBER" | "ADMIN" | "SUPER_ADMIN";

function hasEditorRole(role: string): role is EditorRole {
  return (
    role === "CONTENT_MEMBER" ||
    role === "ADMIN" ||
    role === "SUPER_ADMIN"
  );
}

function canManageAnyPost(role: string): boolean {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

async function requireEditor() {
  const user = await getCurrentUser();

  if (
    !user ||
    user.status !== "ACTIVE" ||
    !hasEditorRole(user.role)
  ) {
    throw new Error("You are not authorized to manage blog posts.");
  }

  return user;
}

const postSchema = z.object({
  title: z.string().trim().min(3).max(160),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().trim().min(10).max(400),
  content: z.string().trim().min(20).max(100_000),
  category: z.string().trim().min(2).max(80),
  authorName: z.string().trim().min(2).max(100),
  coverUrl: z.string().trim().refine((value) => {
    if (!value) return true;

    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, "Cover image must use a valid HTTP or HTTPS URL."),
  tags: z.string().max(500),
  readMinutes: z.coerce.number().int().min(1).max(120),
});

function parseTags(value: string): string[] {
  const tags = [...new Set(
    value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
  )];

  if (
    tags.length > 15 ||
    tags.some((tag) => tag.length > 40)
  ) {
    throw new Error(
      "Use at most 15 unique tags, each up to 40 characters."
    );
  }

  return tags;
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

export async function saveBlogPost(
  _previousState: BlogPostActionState,
  formData: FormData
): Promise<BlogPostActionState> {
  const user = await requireEditor();

  const parsed = postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    authorName: formData.get("authorName"),
    coverUrl: formData.get("coverUrl") ?? "",
    tags: formData.get("tags") ?? "",
    readMinutes: formData.get("readMinutes"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues
        .map((issue) => issue.message)
        .join(" "),
    };
  }

  let tags: string[];

  try {
    tags = parseTags(parsed.data.tags);
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Please check the article tags.",
    };
  }

  const rawId = formData.get("id");

  if (rawId !== null && typeof rawId !== "string") {
    return { error: "Invalid article ID." };
  }

  const id = rawId?.trim() ?? "";
  const publish = formData.get("published") === "true";
  const data = parsed.data;

  const postData = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    category: data.category,
    authorName: data.authorName,
    coverUrl: data.coverUrl || null,
    tags: JSON.stringify(tags),
    readMinutes: data.readMinutes,
    published: publish,
  };

  let previousSlug: string | null = null;

  try {
    if (id) {
      const existing = await prisma.blogPost.findUnique({
        where: { id },
        select: {
          id: true,
          slug: true,
          authorId: true,
          published: true,
          publishedAt: true,
        },
      });

      if (!existing) {
        return {
          error: "This article no longer exists. Refresh and try again.",
        };
      }

      const canManageAny = canManageAnyPost(user.role);

      if (!canManageAny && existing.authorId !== user.id) {
        return {
          error: "You can only edit your own blog posts.",
        };
      }

      previousSlug = existing.slug;

      const result = await prisma.blogPost.updateMany({
        where: canManageAny
          ? { id }
          : { id, authorId: user.id },
        data: {
          ...postData,
          publishedAt:
            publish && !existing.published
              ? new Date()
              : existing.publishedAt,
        },
      });

      if (result.count === 0) {
        return {
          error:
            "This article is no longer available to edit. Refresh and try again.",
        };
      }
    } else {
      await prisma.blogPost.create({
        data: {
          ...postData,
          authorId: user.id,
          publishedAt: publish ? new Date() : new Date(0),
        },
      });
    }
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return {
        error: "That URL slug is already in use. Choose a different slug.",
      };
    }

    console.error("Failed to save blog post:", error);

    return {
      error: "We couldn't save this article. Please try again.",
    };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");

  if (previousSlug) {
    revalidatePath(`/blog/${previousSlug}`);
  }

  revalidatePath(`/blog/${data.slug}`);

  redirect("/admin/blog");
}

export async function deleteBlogPost(formData: FormData) {
  const user = await requireEditor();

  const rawId = formData.get("id");

  if (typeof rawId !== "string" || !rawId.trim()) {
    throw new Error("Invalid blog post ID.");
  }

  const id = rawId.trim();
  const canManageAny = canManageAnyPost(user.role);

  const post = await prisma.blogPost.findUnique({
    where: { id },
    select: {
      id: true,
      slug: true,
      authorId: true,
    },
  });

  if (!post) {
    throw new Error("Blog post not found.");
  }

  if (!canManageAny && post.authorId !== user.id) {
    throw new Error("You can only delete your own blog posts.");
  }

  const result = await prisma.blogPost.deleteMany({
    where: canManageAny
      ? { id }
      : { id, authorId: user.id },
  });

  if (result.count === 0) {
    throw new Error(
      "This article is no longer available to delete."
    );
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);

  redirect("/admin/blog");
}
