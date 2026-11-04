"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { EventCategory, EventStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type EventFormState = {
  error?: string;
};

type EventAdminRole = "ADMIN" | "SUPER_ADMIN";

function isAllowedEventAdminRole(
  role: string,
): role is EventAdminRole {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createEvent(
  _previousState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const user = await getCurrentUser();

  if (!user || !isAllowedEventAdminRole(user.role)) {
    return { error: "You are not authorized to create events." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const locationValue = String(formData.get("location") ?? "").trim();
  const isOnline = formData.get("isOnline") === "on";
  const startValue = String(formData.get("startAt") ?? "");
  const endValue = String(formData.get("endAt") ?? "");
  const status = String(formData.get("status") ?? "UPCOMING");
  const capacityValue = String(formData.get("capacity") ?? "").trim();
  const bannerValue = String(formData.get("bannerUrl") ?? "").trim();
  const featured = formData.get("featured") === "on";

  if (!title || !description) {
    return { error: "Title and description are required." };
  }

  if (title.length > 160) {
    return { error: "Title must be 160 characters or fewer." };
  }

  const slug = makeSlug(requestedSlug || title);

  if (!slug) {
    return { error: "Enter a valid title or slug." };
  }

  if (!Object.values(EventCategory).includes(category as EventCategory)) {
    return { error: "Select a valid event category." };
  }

  if (!Object.values(EventStatus).includes(status as EventStatus)) {
    return { error: "Select a valid event status." };
  }

  if (!startValue || !endValue) {
    return { error: "Start and end dates are required." };
  }

  const startAt = new Date(startValue);
  const endAt = new Date(endValue);

  if (
    Number.isNaN(startAt.getTime()) ||
    Number.isNaN(endAt.getTime())
  ) {
    return { error: "Enter valid start and end dates." };
  }

  if (endAt <= startAt) {
    return { error: "The end date must be after the start date." };
  }

  if (!isOnline && !locationValue) {
    return { error: "Add a location or select online mode." };
  }

  let capacity: number | null = null;

  if (capacityValue) {
    capacity = Number(capacityValue);

    if (!Number.isInteger(capacity) || capacity < 1) {
      return { error: "Capacity must be a positive whole number." };
    }
  }

  if (bannerValue) {
    try {
      const url = new URL(bannerValue);

      if (!["http:", "https:"].includes(url.protocol)) {
        return { error: "Banner URL must use HTTP or HTTPS." };
      }
    } catch {
      return { error: "Enter a valid banner URL." };
    }
  }

  const existingSlug = await prisma.event.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (existingSlug) {
    return {
      error: "That slug is already in use. Choose a different one.",
    };
  }

  try {
    await prisma.event.create({
      data: {
        title,
        slug,
        description,
        category: category as EventCategory,
        location: isOnline ? null : locationValue || null,
        isOnline,
        startAt,
        endAt,
        status: status as EventStatus,
        capacity,
        bannerUrl: bannerValue || null,
        featured,
        createdById: user.id,
      },
    });
  } catch (error) {
    // Handles a duplicate slug submitted concurrently.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        error: "That slug is already in use. Choose a different one.",
      };
    }

    console.error("Failed to create event:", error);

    return {
      error: "The event could not be saved. Please try again.",
    };
  }

  revalidatePath("/admin/events");
  revalidatePath("/");

  redirect("/admin/events");
}

export async function updateEvent(
  id: string,
  _previousState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const user = await getCurrentUser();

  if (!user || !isAllowedEventAdminRole(user.role)) {
    return { error: "You are not authorized to update events." };
  }

  if (!id || !id.trim()) {
    return { error: "Invalid event ID." };
  }

  const existingEvent = await prisma.event.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existingEvent) {
    return { error: "This event could not be found." };
  }

  const title = String(formData.get("title") ?? "").trim();
  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const locationValue = String(formData.get("location") ?? "").trim();
  const isOnline = formData.get("isOnline") === "on";
  const startValue = String(formData.get("startAt") ?? "");
  const endValue = String(formData.get("endAt") ?? "");
  const status = String(formData.get("status") ?? "UPCOMING");
  const capacityValue = String(formData.get("capacity") ?? "").trim();
  const bannerValue = String(formData.get("bannerUrl") ?? "").trim();
  const featured = formData.get("featured") === "on";

  if (!title || !description) {
    return { error: "Title and description are required." };
  }

  if (title.length > 160) {
    return { error: "Title must be 160 characters or fewer." };
  }

  const slug = makeSlug(requestedSlug || title);

  if (!slug) {
    return { error: "Enter a valid title or slug." };
  }

  if (!Object.values(EventCategory).includes(category as EventCategory)) {
    return { error: "Select a valid event category." };
  }

  if (!Object.values(EventStatus).includes(status as EventStatus)) {
    return { error: "Select a valid event status." };
  }

  if (!startValue || !endValue) {
    return { error: "Start and end dates are required." };
  }

  const startAt = new Date(startValue);
  const endAt = new Date(endValue);

  if (
    Number.isNaN(startAt.getTime()) ||
    Number.isNaN(endAt.getTime())
  ) {
    return { error: "Enter valid start and end dates." };
  }

  if (endAt <= startAt) {
    return { error: "The end date must be after the start date." };
  }

  if (!isOnline && !locationValue) {
    return { error: "Add a location or select online mode." };
  }

  let capacity: number | null = null;

  if (capacityValue) {
    capacity = Number(capacityValue);

    if (!Number.isInteger(capacity) || capacity < 1) {
      return { error: "Capacity must be a positive whole number." };
    }
  }

  if (bannerValue) {
    try {
      const url = new URL(bannerValue);

      if (!["http:", "https:"].includes(url.protocol)) {
        return { error: "Banner URL must use HTTP or HTTPS." };
      }
    } catch {
      return { error: "Enter a valid banner URL." };
    }
  }

  const existingSlug = await prisma.event.findFirst({
    where: {
      slug,
      NOT: { id },
    },
    select: { id: true },
  });

  if (existingSlug) {
    return {
      error: "That slug is already in use. Choose a different one.",
    };
  }

  try {
    await prisma.event.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        category: category as EventCategory,
        location: isOnline ? null : locationValue || null,
        isOnline,
        startAt,
        endAt,
        status: status as EventStatus,
        capacity,
        bannerUrl: bannerValue || null,
        featured,
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
        error: "That slug is already in use. Choose a different one.",
      };
    }

    console.error("Failed to update event:", error);

    return {
      error: "The event could not be updated. Please try again.",
    };
  }

  revalidatePath("/admin/events");
  revalidatePath(`/admin/events/${id}`);
  revalidatePath(`/admin/events/${id}/edit`);
  revalidatePath("/");

  redirect(`/admin/events/${id}`);
}

export type DeleteEventState = {
  error?: string;
};

export async function deleteEvent(
  id: string,
): Promise<DeleteEventState> {
  const user = await getCurrentUser();

  if (!user || !isAllowedEventAdminRole(user.role)) {
    return { error: "You are not authorized to delete events." };
  }

  if (!id?.trim()) {
    return { error: "Invalid event ID." };
  }

  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      _count: {
        select: {
          registrations: true,
        },
      },
    },
  });

  if (!event) {
    return { error: "This event no longer exists." };
  }

  if (event._count.registrations > 0) {
    return {
      error: `Cannot delete "${event.title}" because it has ${event._count.registrations} registration(s). Manage its registrations first.`,
    };
  }

  try {
    await prisma.event.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to delete event:", error);

    return {
      error: "The event could not be deleted. Please try again.",
    };
  }

  revalidatePath("/admin/events");
  revalidatePath("/");

  return {};
}

export async function removeEventRegistration(
  eventId: string,
  registrationId: string,
): Promise<EventFormState> {
  const user = await getCurrentUser();

  if (!user || !isAllowedEventAdminRole(user.role)) {
    return { error: "You are not authorized to manage registrations." };
  }

  if (!eventId?.trim() || !registrationId?.trim()) {
    return { error: "Invalid event or registration ID." };
  }

  try {
    const registration = await prisma.eventRegistration.findFirst({
      where: {
        id: registrationId,
        eventId,
      },
      select: {
        id: true,
      },
    });

    if (!registration) {
      return { error: "This registration could not be found." };
    }

    await prisma.eventRegistration.delete({
      where: { id: registration.id },
    });

    revalidatePath(`/admin/events/${eventId}`);
    revalidatePath("/admin/events");
    revalidatePath("/");

    return {};
  } catch (error) {
    console.error("Failed to remove event registration:", error);

    return {
      error: "The registration could not be removed. Please try again.",
    };
  }
}

export async function updateRegistrationAttendance(
  eventId: string,
  registrationId: string,
  attended: boolean,
): Promise<EventFormState> {
  const user = await getCurrentUser();

  if (!user || !isAllowedEventAdminRole(user.role)) {
    return {
      error: "You are not authorized to manage registrations.",
    };
  }

  if (
    !eventId?.trim() ||
    !registrationId?.trim() ||
    typeof attended !== "boolean"
  ) {
    return { error: "Invalid registration details." };
  }

  try {
    const registration = await prisma.eventRegistration.findFirst({
      where: {
        id: registrationId,
        eventId,
      },
      select: { id: true },
    });

    if (!registration) {
      return { error: "This registration could not be found." };
    }

    await prisma.eventRegistration.update({
      where: { id: registration.id },
      data: { attended },
    });

    revalidatePath(`/admin/events/${eventId}`);
    revalidatePath("/admin/events");

    return {};
  } catch (error) {
    console.error("Failed to update attendance:", error);

    return {
      error: "Attendance could not be updated. Please try again.",
    };
  }
}