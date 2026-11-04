
"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ChallengeFormState = {
  error?: string;
};

function isChallengeAdminRole(role: string) {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readDate(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !value.trim()) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

export async function createChallenge(
  _previousState: ChallengeFormState,
  formData: FormData,
): Promise<ChallengeFormState> {
  const user = await getCurrentUser();

  if (!user || !isChallengeAdminRole(user.role)) {
    return { error: "You are not authorized to create challenges." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const slug = makeSlug(requestedSlug || title);
  const description = String(formData.get("description") ?? "").trim();
  const durationDays = Number(formData.get("durationDays"));
  const xpPerCheckIn = Number(formData.get("xpPerCheckIn"));
  const startAt = readDate(formData.get("startAt"));
  const endAt = readDate(formData.get("endAt"));

  if (!title || title.length > 160) {
    return { error: "Enter a title between 1 and 160 characters." };
  }

  if (!slug || slug.length > 180) {
    return { error: "Enter a valid URL slug." };
  }

  if (!description || description.length > 5000) {
    return { error: "Enter a description up to 5,000 characters." };
  }

  if (
    !Number.isInteger(durationDays) ||
    durationDays < 1 ||
    durationDays > 365
  ) {
    return { error: "Duration must be between 1 and 365 days." };
  }

  if (
    !Number.isInteger(xpPerCheckIn) ||
    xpPerCheckIn < 0 ||
    xpPerCheckIn > 100000
  ) {
    return { error: "XP per check-in must be between 0 and 100,000." };
  }

  if (!startAt || !endAt || endAt <= startAt) {
    return { error: "The end date must be after the start date." };
  }

  // The configured duration must agree with the date range.
  const dateRangeDays = Math.ceil(
    (endAt.getTime() - startAt.getTime()) / 86_400_000,
  );

  if (dateRangeDays !== durationDays) {
    return {
      error:
        "Duration must match the number of days between the start and end dates.",
    };
  }

  try {
    await prisma.challenge.create({
      data: {
        title,
        slug,
        description,
        durationDays,
        startAt,
        endAt,
        xpPerCheckIn,
      },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        error: "That URL slug is already in use. Choose another slug.",
      };
    }

    throw error;
  }

  revalidatePath("/admin/challenges");
  revalidatePath("/");

  redirect("/admin/challenges");
}

export async function updateChallenge(
  _previousState: ChallengeFormState,
  formData: FormData,
): Promise<ChallengeFormState> {
  const user = await getCurrentUser();

  if (!user || !isChallengeAdminRole(user.role)) {
    return { error: "You are not authorized to update challenges." };
  }

  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const slug = makeSlug(requestedSlug || title);
  const description = String(formData.get("description") ?? "").trim();
  const durationDays = Number(formData.get("durationDays"));
  const xpPerCheckIn = Number(formData.get("xpPerCheckIn"));
  const startAt = readDate(formData.get("startAt"));
  const endAt = readDate(formData.get("endAt"));

  if (!id) {
    return { error: "Challenge ID is missing." };
  }

  if (!title || title.length > 160) {
    return { error: "Enter a title between 1 and 160 characters." };
  }

  if (!slug || slug.length > 180) {
    return { error: "Enter a valid URL slug." };
  }

  if (!description || description.length > 5000) {
    return { error: "Enter a description up to 5,000 characters." };
  }

  if (
    !Number.isInteger(durationDays) ||
    durationDays < 1 ||
    durationDays > 365
  ) {
    return { error: "Duration must be between 1 and 365 days." };
  }

  if (
    !Number.isInteger(xpPerCheckIn) ||
    xpPerCheckIn < 0 ||
    xpPerCheckIn > 100000
  ) {
    return { error: "XP per check-in must be between 0 and 100,000." };
  }

  if (!startAt || !endAt || endAt <= startAt) {
    return { error: "The end date must be after the start date." };
  }

  const dateRangeDays = Math.ceil(
    (endAt.getTime() - startAt.getTime()) / 86_400_000,
  );

  if (dateRangeDays !== durationDays) {
    return {
      error:
        "Duration must match the number of days between the start and end dates.",
    };
  }

  try {
    await prisma.challenge.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        durationDays,
        startAt,
        endAt,
        xpPerCheckIn,
      },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        error: "That URL slug is already in use. Choose another slug.",
      };
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return { error: "This challenge no longer exists." };
    }

    throw error;
  }

  revalidatePath("/admin/challenges");
  revalidatePath(`/admin/challenges/${id}`);
  revalidatePath(`/admin/challenges/${id}/edit`);
  revalidatePath("/");

  redirect(`/admin/challenges/${id}`);
}


export async function deleteChallenge(
  _previousState: ChallengeFormState,
  formData: FormData,
): Promise<ChallengeFormState> {
  const user = await getCurrentUser();

  if (!user || !isChallengeAdminRole(user.role)) {
    return { error: "You are not authorized to delete challenges." };
  }

  const id = String(formData.get("id") ?? "").trim();
  const confirmation = String(formData.get("confirmation") ?? "")
    .trim()
    .toLowerCase();

  if (!id) {
    return { error: "Challenge ID is missing." };
  }

  if (confirmation !== "delete") {
    return {
      error: 'Type "delete" to confirm this action.',
    };
  }

  const challenge = await prisma.challenge.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      _count: {
        select: {
          enrollments: true,
          checkIns: true,
        },
      },
    },
  });

  if (!challenge) {
    return { error: "This challenge no longer exists." };
  }

  if (
    challenge._count.enrollments > 0 ||
    challenge._count.checkIns > 0
  ) {
    return {
      error:
        "This challenge has participant activity and cannot be deleted. Keep it for historical records instead.",
    };
  }

  try {
    await prisma.challenge.delete({
      where: { id },
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return { error: "This challenge has already been deleted." };
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2003"
    ) {
      return {
        error:
          "This challenge has related records and cannot be deleted safely.",
      };
    }

    throw error;
  }

  revalidatePath("/admin/challenges");
  revalidatePath(`/admin/challenges/${id}`);
  revalidatePath("/");
  redirect("/admin/challenges");
}
