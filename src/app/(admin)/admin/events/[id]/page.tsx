
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import {
  ArrowLeft,
  CalendarDays,
  CalendarClock,
  Clock3,
  MapPin,
  Globe,
  Users,
  UserRound,
  Image as ImageIcon,
  Sparkles,
  PencilLine,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import EventDeleteButton from "../_components/EventDeleteButton";
import RegistrationManager from "../_components/RegistrationManager";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function statusStyles(status: string) {
  switch (status) {
    case "LIVE":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
    case "UPCOMING":
      return "border-sky-400/20 bg-sky-400/10 text-sky-300";
    case "COMPLETED":
      return "border-white/10 bg-white/[0.05] text-white/65";
    case "CANCELLED":
      return "border-rose-400/20 bg-rose-400/10 text-rose-300";
    default:
      return "border-white/10 bg-white/[0.05] text-white/65";
  }
}

function InfoCard({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5">
      <div className="flex items-center gap-2 text-sm text-white/50">
        <Icon size={16} className="text-amber-200" />
        {label}
      </div>

      <div className="mt-3 text-sm font-medium leading-6 text-white">
        {children}
      </div>
    </article>
  );
}

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Only ADMIN and SUPER_ADMIN can access event details.
  const user = await getCurrentUser();

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    redirect("/admin/events");
  }

  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      registrations: {
        orderBy: {
          registeredAt: "desc",
        },
        select: {
          id: true,
          attended: true,
          registeredAt: true,
          user: {
            select: {
              name: true,
              username: true,
              email: true,
            },
          },
        },
      },
      _count: {
        select: {
          registrations: true,
        },
      },
    },
  });

  if (!event) {
    notFound();
  }

  const registrationCount = event._count.registrations;
  const capacity = event.capacity;

  const remainingSeats =
    capacity == null
      ? null
      : Math.max(0, capacity - registrationCount);

  return (
    <main className="relative mx-auto max-w-[1440px] space-y-8 text-white">
      <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full bg-amber-400/[0.07] blur-[110px]" />

      <Link
        href="/admin/events"
        className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      >
        <ArrowLeft size={16} />
        Back to Events Studio
      </Link>

      <header className="border-b border-white/[0.08] pb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5 text-xs font-medium text-amber-200">
          <CalendarDays size={14} />
          CodeHive / Event management
        </div>

        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
              Event overview
            </p>

            <h1 className="break-words text-4xl font-semibold tracking-tight sm:text-5xl">
              {event.title}
              <span className="text-amber-300">.</span>
            </h1>

            <p className="mt-3 text-sm text-white/55">
              /{event.slug}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                {event.category}
              </span>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles(event.status)}`}
              >
                {event.status.charAt(0) +
                  event.status.slice(1).toLowerCase()}
              </span>

              {event.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/20 bg-amber-300/[0.08] px-3 py-1 text-xs text-amber-200">
                  <Sparkles size={12} />
                  Featured
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/events/${event.id}/edit`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              <PencilLine size={16} />
              Edit event
            </Link>

            <EventDeleteButton
              eventId={event.id}
              eventTitle={event.title}
            />

            <Link
              href="/admin/events"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-300 px-4 py-3 text-sm font-semibold text-[#15110A] transition hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <ArrowLeft size={16} />
              Events directory
            </Link>
          </div>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard icon={Users} label="Registrations">
          <span className="text-3xl tabular-nums">
            {String(registrationCount).padStart(2, "0")}
          </span>

          <span className="mt-1 block text-xs font-normal text-white/45">
            Registered participants
          </span>
        </InfoCard>

        <InfoCard icon={CalendarClock} label="Event starts">
          {formatDateTime(event.startAt)}

          <span className="mt-1 block text-xs font-normal text-white/45">
            {formatDate(event.startAt)}
          </span>
        </InfoCard>

        <InfoCard icon={Clock3} label="Event ends">
          {formatDateTime(event.endAt)}

          <span className="mt-1 block text-xs font-normal text-white/45">
            {formatDate(event.endAt)}
          </span>
        </InfoCard>

        <InfoCard icon={UserRound} label="Capacity">
          {capacity == null
            ? "Unlimited"
            : capacity.toLocaleString("en-IN")}

          <span className="mt-1 block text-xs font-normal text-white/45">
            {remainingSeats == null
              ? "No registration limit set"
              : `${remainingSeats.toLocaleString("en-IN")} places remaining`}
          </span>
        </InfoCard>
      </section>

      {/* Participant management */}
      <RegistrationManager
        eventId={event.id}
        registrations={event.registrations}
      />

      <section className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.8fr)]">
        <div className="space-y-6">
          <article className="overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025]">
            <div className="flex items-center gap-3 border-b border-white/[0.07] p-5">
              <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.08] p-2.5 text-amber-200">
                <ImageIcon size={18} />
              </div>

              <div>
                <h2 className="font-semibold">Event banner</h2>
                <p className="mt-1 text-xs text-white/45">
                  Visual identity for this experience
                </p>
              </div>
            </div>

            {event.bannerUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={event.bannerUrl}
                alt={`Banner for ${event.title}`}
                className="aspect-[16/7] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[16/7] flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.09),transparent_65%)] text-white/35">
                <CalendarDays size={36} />
                <p className="text-sm">No banner image added</p>
              </div>
            )}
          </article>

          <article className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 sm:p-7">
            <h2 className="text-lg font-semibold">
              About this event
            </h2>

            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-white/70">
              {event.description}
            </p>
          </article>
        </div>

        <aside className="space-y-4">
          <article className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 sm:p-6">
            <h2 className="text-lg font-semibold">
              Event logistics
            </h2>

            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-amber-200">
                  {event.isOnline ? (
                    <Globe size={17} />
                  ) : (
                    <MapPin size={17} />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-white/45">
                    Format and venue
                  </p>

                  <p className="mt-1 break-words text-sm font-medium">
                    {event.isOnline
                      ? "Online event"
                      : event.location || "Location not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-amber-200">
                  <CalendarDays size={17} />
                </div>

                <div>
                  <p className="text-xs text-white/45">
                    Schedule
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {formatDate(event.startAt)}
                  </p>

                  <p className="mt-1 text-xs text-white/50">
                    Until {formatDate(event.endAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-2 text-amber-200">
                  <Sparkles size={17} />
                </div>

                <div>
                  <p className="text-xs text-white/45">
                    Visibility
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {event.featured
                      ? "Featured event"
                      : "Standard event"}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5">
            <h2 className="font-semibold">Record information</h2>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-white/45">Event ID</dt>
                <dd className="max-w-[65%] break-all text-right text-xs text-white/70">
                  {event.id}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-white/45">Created</dt>
                <dd className="text-right text-white/70">
                  {formatDate(event.createdAt)}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-white/45">Slug</dt>
                <dd className="max-w-[65%] break-all text-right text-white/70">
                  {event.slug}
                </dd>
              </div>
            </dl>
          </article>

          <Link
            href="/admin/events"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:bg-white/[0.04] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            <ArrowLeft size={15} />
            Return to Events Studio
          </Link>
        </aside>
      </section>

      <footer className="border-t border-white/[0.07] pt-5 text-xs text-white/40">
        CodeHive · Events Studio · Event details
      </footer>
    </main>
  );
}
