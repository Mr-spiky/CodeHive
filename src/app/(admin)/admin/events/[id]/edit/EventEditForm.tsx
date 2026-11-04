
"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { updateEvent, type EventFormState } from "../../actions";

type EditableEvent = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: "HACKATHON" | "WORKSHOP" | "MEETUP" | "WEBINAR" | "BOOTCAMP";
  location: string | null;
  isOnline: boolean;
  startAt: string;
  endAt: string;
  status: "UPCOMING" | "LIVE" | "COMPLETED" | "CANCELLED";
  capacity: number | null;
  bannerUrl: string | null;
  featured: boolean;
};

const initialState: EventFormState = {};

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-[#080810] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus-visible:ring-2 focus-visible:ring-amber-300/80";

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

function toLocalDateTime(value: string) {
  const date = new Date(value);
  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60_000,
  );

  return localDate.toISOString().slice(0, 16);
}

export default function EventEditForm({ event }: { event: EditableEvent }) {
  const updateAction = updateEvent.bind(null, event.id);
  const [state, formAction, pending] = useActionState(
    updateAction,
    initialState,
  );

  const [title, setTitle] = useState(event.title);
  const [slug, setSlug] = useState(event.slug);
  const [slugEdited, setSlugEdited] = useState(
    event.slug !== generateSlug(event.title),
  );
  const [startAt, setStartAt] = useState(() =>
    toLocalDateTime(event.startAt),
  );
  const [endAt, setEndAt] = useState(() => toLocalDateTime(event.endAt));
  const [scheduleError, setScheduleError] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugEdited) {
      setSlug(generateSlug(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlug(value);
    setSlugEdited(value !== generateSlug(title));
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
      setScheduleError("The end must be after the start.");
    } else {
      setScheduleError("");
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!startAt || !endAt) {
      e.preventDefault();
      setScheduleError("Please select both the start and end date and time.");
      return;
    }

    if (new Date(endAt).getTime() <= new Date(startAt).getTime()) {
      e.preventDefault();
      setScheduleError("The end must be after the start.");
      return;
    }

    if (!generateSlug(slug)) {
      e.preventDefault();
      setScheduleError("Please enter a valid event title or slug.");
      return;
    }

    setScheduleError("");
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {(state.error || scheduleError) && (
        <div
          role="alert"
          className="rounded-xl border border-rose-400/25 bg-rose-400/[0.08] px-4 py-3 text-sm text-rose-200"
        >
          {state.error || scheduleError}
        </div>
      )}

      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold">Basic information</h2>
          <p className="mt-1 text-sm text-white/45">
            The essential details attendees will see.
          </p>
        </div>

        <div>
          <label className={labelClass} htmlFor="title">
            Event title *
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={160}
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="slug">
            URL slug *
          </label>
          <input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            className={inputClass}
            placeholder="my-awesome-event"
          />
          <p className="mt-2 text-xs text-white/40">
            Event URL: /events/{slug || "your-event"}
          </p>
        </div>

        <div>
          <label className={labelClass} htmlFor="description">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            defaultValue={event.description}
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="category">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue={event.category}
              className={inputClass}
            >
              <option value="HACKATHON">Hackathon</option>
              <option value="WORKSHOP">Workshop</option>
              <option value="MEETUP">Meetup</option>
              <option value="WEBINAR">Webinar</option>
              <option value="BOOTCAMP">Bootcamp</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="status">
              Status *
            </label>
            <select
              id="status"
              name="status"
              required
              defaultValue={event.status}
              className={inputClass}
            >
              <option value="UPCOMING">Upcoming</option>
              <option value="LIVE">Live</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </section>

      <div className="h-px bg-white/10" />

      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold">Schedule and venue</h2>
          <p className="mt-1 text-sm text-white/45">
            Set when and where the event takes place.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="startAt">
              Start date and time *
            </label>
            <input
              id="startAt"
              name="startAt"
              type="datetime-local"
              required
              value={startAt}
              onChange={(e) => handleStartChange(e.target.value)}
              className={`${inputClass} [color-scheme:dark]`}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="endAt">
              End date and time *
            </label>
            <input
              id="endAt"
              name="endAt"
              type="datetime-local"
              required
              min={startAt || undefined}
              value={endAt}
              onChange={(e) => handleEndChange(e.target.value)}
              className={`${inputClass} [color-scheme:dark]`}
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="location">
            Location
          </label>
          <input
            id="location"
            name="location"
            defaultValue={event.location ?? ""}
            className={inputClass}
            placeholder="Delhi, India"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 p-4">
          <input
            type="checkbox"
            name="isOnline"
            defaultChecked={event.isOnline}
            className="size-4 accent-amber-300"
          />
          <span>
            <span className="block text-sm font-medium">Online event</span>
            <span className="mt-1 block text-xs text-white/45">
              No physical venue is required.
            </span>
          </span>
        </label>
      </section>

      <div className="h-px bg-white/10" />

      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold">Capacity and appearance</h2>
          <p className="mt-1 text-sm text-white/45">
            Optional settings for registration and presentation.
          </p>
        </div>

        <div>
          <label className={labelClass} htmlFor="capacity">
            Registration capacity
          </label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            min={1}
            step={1}
            defaultValue={event.capacity ?? ""}
            className={inputClass}
            placeholder="Leave blank for unlimited"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="bannerUrl">
            Banner image URL
          </label>
          <input
            id="bannerUrl"
            name="bannerUrl"
            type="url"
            defaultValue={event.bannerUrl ?? ""}
            className={inputClass}
            placeholder="https://example.com/banner.jpg"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 p-4">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={event.featured}
            className="size-4 accent-amber-300"
          />
          <span>
            <span className="block text-sm font-medium">Featured event</span>
            <span className="mt-1 block text-xs text-white/45">
              Mark this event as featured.
            </span>
          </span>
        </label>
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
        <Link
          href={`/admin/events/${event.id}`}
          className="rounded-xl border border-white/10 px-5 py-3 text-center text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving changes..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
