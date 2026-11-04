
"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Target,
  Zap,
} from "lucide-react";
import {
  createChallenge,
  type ChallengeFormState,
} from "../actions";

const initialState: ChallengeFormState = {};

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
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toLocalDateTime(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 16);
}

export default function ChallengeForm() {
  const [state, formAction, pending] = useActionState(
    createChallenge,
    initialState,
  );

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [durationDays, setDurationDays] = useState("7");
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
      setScheduleError("The end date must be after the start date.");
      return;
    }

    if (startAt && value) {
      const difference = Math.ceil(
        (new Date(value).getTime() - new Date(startAt).getTime()) /
          86_400_000,
      );

      setDurationDays(String(difference));
    }

    setScheduleError("");
  }

  function handleDurationChange(value: string) {
    setDurationDays(value);

    const days = Number(value);

    if (
      startAt &&
      Number.isInteger(days) &&
      days > 0 &&
      days <= 365
    ) {
      const end = new Date(startAt);
      end.setDate(end.getDate() + days);
      setEndAt(toLocalDateTime(end));
      setScheduleError("");
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!startAt || !endAt) {
      setScheduleError("Select both the start and end date and time.");
      event.preventDefault();
      return;
    }

    if (new Date(endAt).getTime() <= new Date(startAt).getTime()) {
      setScheduleError("The end date must be after the start date.");
      event.preventDefault();
      return;
    }

    const actualDays = Math.ceil(
      (new Date(endAt).getTime() - new Date(startAt).getTime()) /
        86_400_000,
    );

    if (actualDays !== Number(durationDays)) {
      setScheduleError(
        "Duration must match the date range. Adjust the dates or duration.",
      );
      event.preventDefault();
      return;
    }

    if (!generateSlug(slug)) {
      setScheduleError("Enter a valid title or URL slug.");
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
      {(state.error || scheduleError) && (
        <div
          role="alert"
          className="rounded-xl border border-rose-400/25 bg-rose-400/[0.08] px-4 py-3 text-sm text-rose-200"
        >
          {scheduleError || state.error}
        </div>
      )}

      <section className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.08] p-2.5 text-amber-200">
            <Target size={19} />
          </div>
          <div>
            <h2 className="font-semibold text-white">Challenge essentials</h2>
            <p className="mt-1 text-sm text-white/50">
              Define what participants will work toward.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Challenge title <span className="text-amber-300">*</span>
            <input
              name="title"
              value={title}
              onChange={(event) => handleTitleChange(event.target.value)}
              required
              maxLength={160}
              placeholder="e.g. 30 Days of Building"
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            URL slug <span className="text-amber-300">*</span>
            <input
              name="slug"
              value={slug}
              onChange={(event) => handleSlugChange(event.target.value)}
              required
              maxLength={180}
              pattern="[A-Za-z0-9 -]+"
              placeholder="30-days-of-building"
              className={inputClass}
            />
            <span className="mt-1 block text-xs font-normal text-white/45">
              Generated from the title. Customize it if needed.
            </span>
          </label>

          <label className={`${labelClass} sm:col-span-2`}>
            Description <span className="text-amber-300">*</span>
            <textarea
              name="description"
              required
              minLength={1}
              maxLength={5000}
              rows={5}
              placeholder="Explain the challenge, daily expectations, and what participants should achieve."
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
            <h2 className="font-semibold text-white">Challenge schedule</h2>
            <p className="mt-1 text-sm text-white/50">
              Set when participants can take part.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Start date and time <span className="text-amber-300">*</span>
            <input
              name="startAt"
              type="datetime-local"
              value={startAt}
              onChange={(event) => handleStartChange(event.target.value)}
              required
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            End date and time <span className="text-amber-300">*</span>
            <input
              name="endAt"
              type="datetime-local"
              value={endAt}
              min={startAt || undefined}
              onChange={(event) => handleEndChange(event.target.value)}
              required
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            Duration in days <span className="text-amber-300">*</span>
            <input
              name="durationDays"
              type="number"
              value={durationDays}
              onChange={(event) => handleDurationChange(event.target.value)}
              min={1}
              max={365}
              step={1}
              required
              className={inputClass}
            />
            <span className="mt-1 block text-xs font-normal text-white/45">
              Changing the duration updates the end date when a start date is set.
            </span>
          </label>

          <label className={labelClass}>
            XP per check-in <span className="text-amber-300">*</span>
            <div className="relative">
              <Zap
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-300"
              />
              <input
                name="xpPerCheckIn"
                type="number"
                defaultValue={10}
                min={0}
                max={100000}
                step={1}
                required
                className={`${inputClass} pl-10`}
              />
            </div>
            <span className="mt-1 block text-xs font-normal text-white/45">
              XP awarded for each valid check-in.
            </span>
          </label>
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Link
          href="/admin/challenges"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/65 transition hover:bg-white/[0.04] hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to challenges
        </Link>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-300 px-6 py-3 text-sm font-semibold text-[#15110A] transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Target size={17} />
          {pending ? "Creating challenge..." : "Create challenge"}
        </button>
      </div>
    </form>
  );
}
