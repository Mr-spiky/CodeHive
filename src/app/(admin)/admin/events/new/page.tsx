
import Link from "next/link";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import EventForm from "../_components/EventForm";

export default function NewEventPage() {
  return (
    <main className="relative mx-auto max-w-5xl space-y-8 text-white">
      <div className="pointer-events-none absolute -right-12 -top-16 -z-10 h-64 w-64 rounded-full bg-amber-400/[0.07] blur-[100px]" />

      <Link
        href="/admin/events"
        className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      >
        <ArrowLeft size={16} />
        Back to Events Studio
      </Link>

      <header className="border-b border-white/[0.08] pb-7">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5 text-xs font-medium text-amber-200">
          <CalendarPlus size={14} />
          CodeHive / Event management
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
          New experience
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Create <span className="text-amber-300">Event.</span>
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
          Bring your next community experience to life. Add the details,
          set the schedule, and save it to CodeHive.
        </p>
      </header>

      <EventForm />
    </main>
  );
}
