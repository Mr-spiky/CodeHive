
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import EventEditForm from "./EventEditForm";

const ALLOWED_ROLES = ["ADMIN", "SUPER_ADMIN"];

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();

  if (!user || !ALLOWED_ROLES.includes(user.role)) {
    redirect("/admin/events");
  }

  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#080810] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/admin/events/${event.id}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to event
        </Link>

        <div className="mb-8 flex items-start gap-4">
          <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-3 text-amber-200">
            <CalendarDays size={24} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
              CodeHive Events Studio
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Edit event
            </h1>
            <p className="mt-2 text-sm text-white/55">
              Update the details, schedule, and visibility of your event.
            </p>
          </div>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
          <EventEditForm
            event={{
              id: event.id,
              title: event.title,
              slug: event.slug,
              description: event.description,
              category: event.category,
              location: event.location,
              isOnline: event.isOnline,
              startAt: event.startAt.toISOString(),
              endAt: event.endAt.toISOString(),
              status: event.status,
              capacity: event.capacity,
              bannerUrl: event.bannerUrl,
              featured: event.featured,
            }}
          />
        </section>
      </div>
    </main>
  );
}
