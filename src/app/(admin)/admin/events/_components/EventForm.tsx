
"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Globe,
  Image as ImageIcon,
  MapPin,
  Sparkles,
} from "lucide-react";
import { createEvent, type EventFormState } from "../actions";

const initialState: EventFormState = {};

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-[#080810] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080810]";

const labelClass = "text-sm font-medium text-white/80";

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

export default function EventForm() {
  const [state, formAction, pending] = useActionState(
    createEvent,
    initialState,
  );

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [scheduleError, setScheduleError] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugEdited) {
      setSlug(generateSlug(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlug(value);
    setSlugEdited(value.length > 0 && value !== generateSlug(title));
  }

  function handleStartChange(value: string) {
    setStartAt(value);
    setScheduleError("");

    if (value && endAt && endAt <= value) {
      setEndAt("");
    }
  }

  function handleEndChange(value: string) {
    setEndAt(value);

    if (startAt && value && value <= startAt) {
      setScheduleError("The end date and time must be after the start.");
    } else {
      setScheduleError("");
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!startAt || !endAt) {
      setScheduleError("Please select both the start and end date and time.");
      event.preventDefault();
      return;
    }

    if (new Date(endAt).getTime() <= new Date(startAt).getTime()) {
      setScheduleError("The end date and time must be after the start.");
      event.preventDefault();
      return;
    }

    if (!generateSlug(slug)) {
      setScheduleError("Please enter a valid event title or URL slug.");
      event.preventDefault();
      return;
    }

    setScheduleError("");
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {state.error && (
        <div
          role="alert"
          className="rounded-xl border border-rose-400/25 bg-rose-400/[0.08] px-4 py-3 text-sm text-rose-200"
        >
          {state.error}
        </div>
      )}

      {scheduleError && (
        <div
          role="alert"
          className="rounded-xl border border-rose-400/25 bg-rose-400/[0.08] px-4 py-3 text-sm text-rose-200"
        >
          {scheduleError}
        </div>
      )}

      <section className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.08] p-2.5 text-amber-200">
            <CalendarDays size={19} />
          </div>
          <div>
            <h2 className="font-semibold text-white">Event essentials</h2>
            <p className="mt-1 text-sm text-white/50">
              The core information your community will see.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Event title <span className="text-amber-300">*</span>
            <input
              name="title"
              value={title}
              onChange={(event) => handleTitleChange(event.target.value)}
              required
              maxLength={160}
              placeholder="e.g. CodeHive Buildathon 2026"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            URL slug
            <input
              name="slug"
              value={slug}
              onChange={(event) => handleSlugChange(event.target.value)}
              placeholder="codehive-buildathon-2026"
              pattern="[A-Za-z0-9 -]+"
              className={inputClass}
            />
            <span className="mt-1 block text-xs font-normal text-white/45">
              Auto-generated from the title. You can customize it.
            </span>
          </label>

          <label className={labelClass}>
            Category <span className="text-amber-300">*</span>
            <select
              name="category"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="HACKATHON">Hackathon</option>
              <option value="WORKSHOP">Workshop</option>
              <option value="MEETUP">Meetup</option>
              <option value="WEBINAR">Webinar</option>
              <option value="BOOTCAMP">Bootcamp</option>
            </select>
          </label>

          <label className={labelClass}>
            Status
            <select
              name="status"
              defaultValue="UPCOMING"
              className={inputClass}
            >
              <option value="UPCOMING">Upcoming</option>
              <option value="LIVE">Live</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </label>

          <label className={`${labelClass} sm:col-span-2`}>
            Description <span className="text-amber-300">*</span>
            <textarea
              name="description"
              required
              rows={5}
              placeholder="What is this event about? What will participants learn or experience?"
              className={`${inputClass} resize-y`}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.08] p-2.5 text-amber-200">
            <CalendarDays size={19} />
          </div>
          <div>
            <h2 className="font-semibold text-white">Date and venue</h2>
            <p className="mt-1 text-sm text-white/50">
              Select dates from the calendar and set the event times.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Starts at <span className="text-amber-300">*</span>
            <input
              name="startAt"
              type="datetime-local"
              required
              value={startAt}
              onChange={(event) => handleStartChange(event.target.value)}
              className={`${inputClass} [color-scheme:dark]`}
            />
          </label>

          <label className={labelClass}>
            Ends at <span className="text-amber-300">*</span>
            <input
              name="endAt"
              type="datetime-local"
              required
              min={startAt || undefined}
              value={endAt}
              onChange={(event) => handleEndChange(event.target.value)}
              className={`${inputClass} [color-scheme:dark]`}
            />
          </label>

          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <MapPin size={15} />
              Location
            </span>
            <input
              name="location"
              placeholder="Venue, city or address"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            <span className="flex items-center gap-2">
              <Globe size={15} />
              Capacity
            </span>
            <input
              name="capacity"
              type="number"
              min="1"
              step="1"
              placeholder="Leave blank for unlimited"
              className={inputClass}
            />
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 sm:col-span-2">
            <input
              type="checkbox"
              name="isOnline"
              className="mt-1 h-4 w-4 accent-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            />
            <span>
              <span className="flex items-center gap-2 text-sm font-medium text-white/85">
                <Globe size={15} />
                This is an online event
              </span>
              <span className="mt-1 block text-xs leading-5 text-white/50">
                Online events don't require a physical location.
              </span>
            </span>
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.08] p-2.5 text-amber-200">
            <ImageIcon size={19} />
          </div>
          <div>
            <h2 className="font-semibold text-white">Visuals and visibility</h2>
            <p className="mt-1 text-sm text-white/50">
              Add artwork and highlight important events.
            </p>
          </div>
        </div>

        <label className={labelClass}>
          Banner image URL
          <input
            name="bannerUrl"
            type="url"
            placeholder="https://example.com/event-banner.jpg"
            className={inputClass}
          />
          <span className="mt-1 block text-xs font-normal text-white/45">
            Paste an existing publicly accessible image URL.
          </span>
        </label>

        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[0.04] p-4">
          <input
            type="checkbox"
            name="featured"
            className="mt-1 h-4 w-4 accent-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          />
          <span>
            <span className="flex items-center gap-2 text-sm font-medium text-white/85">
              <Sparkles size={15} className="text-amber-200" />
              Feature this event
            </span>
            <span className="mt-1 block text-xs leading-5 text-white/50">
              Marks this event as featured in the database. Public display
              depends on the website's event rendering logic.
            </span>
          </span>
        </label>
      </section>

      <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row sm:items-center">
        <Link
          href="/admin/events"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80"
        >
          <ArrowLeft size={16} />
          Back to events
        </Link>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-300 px-6 py-3 text-sm font-semibold text-[#15110A] transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050F] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Creating event..." : "Create event"}
        </button>
      </div>
    </form>
  );
}
