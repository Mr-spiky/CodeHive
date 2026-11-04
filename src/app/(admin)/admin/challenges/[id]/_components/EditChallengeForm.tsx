
"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { updateChallenge, type ChallengeFormState } from "../../actions";

type EditChallengeFormProps = {
  challenge: {
    id: string;
    title: string;
    slug: string;
    description: string;
    durationDays: number;
    startAt: Date;
    endAt: Date;
    xpPerCheckIn: number;
  };
};

const initialState: ChallengeFormState = {};

function toLocalDateTimeValue(date: Date) {
  const value = new Date(date);
  const offset = value.getTimezoneOffset() * 60_000;
  return new Date(value.getTime() - offset).toISOString().slice(0, 16);
}

export default function EditChallengeForm({
  challenge,
}: EditChallengeFormProps) {
  const [state, formAction, pending] = useActionState(
    updateChallenge,
    initialState,
  );

  const [title, setTitle] = useState(challenge.title);
  const [slug, setSlug] = useState(challenge.slug);
  const [description, setDescription] = useState(challenge.description);
  const [durationDays, setDurationDays] = useState(
    String(challenge.durationDays),
  );
  const [startAt, setStartAt] = useState(
    toLocalDateTimeValue(challenge.startAt),
  );
  const [endAt, setEndAt] = useState(
    toLocalDateTimeValue(challenge.endAt),
  );
  const [xpPerCheckIn, setXpPerCheckIn] = useState(
    String(challenge.xpPerCheckIn),
  );

  const [slugEdited, setSlugEdited] = useState(true);

  useEffect(() => {
    if (slugEdited) return;

    setSlug(
      title
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/[\s-]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    );
  }, [title, slugEdited]);

  function updateStartDate(value: string) {
    setStartAt(value);

    if (!value || !durationDays) return;

    const start = new Date(value);

    if (Number.isNaN(start.getTime())) return;

    start.setDate(start.getDate() + Number(durationDays));

    const offset = start.getTimezoneOffset() * 60_000;
    setEndAt(new Date(start.getTime() - offset).toISOString().slice(0, 16));
  }

  function updateDuration(value: string) {
    setDurationDays(value);

    const days = Number(value);

    if (!startAt || !Number.isInteger(days) || days < 1 || days > 365) {
      return;
    }

    const start = new Date(startAt);

    if (Number.isNaN(start.getTime())) return;

    start.setDate(start.getDate() + days);

    const offset = start.getTimezoneOffset() * 60_000;
    setEndAt(new Date(start.getTime() - offset).toISOString().slice(0, 16));
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#0b0c10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-amber-400/60";
  const labelClass = "text-sm font-medium text-zinc-300";

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={challenge.id} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="title">
            Challenge title
          </label>
          <input
            id="title"
            name="title"
            required
            maxLength={160}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={fieldClass}
            placeholder="e.g. 30 Days of Building"
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="slug">
            URL slug
          </label>
          <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-[#0b0c10] focus-within:border-amber-400/60">
            <span className="pl-4 text-sm text-zinc-600">
              /challenges/
            </span>
            <input
              id="slug"
              name="slug"
              required
              maxLength={180}
              value={slug}
              onChange={(event) => {
                setSlug(event.target.value);
                setSlugEdited(true);
              }}
              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-white outline-none"
            />
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            Changing this value changes the challenge URL slug.
          </p>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            maxLength={5000}
            rows={5}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className={fieldClass}
            placeholder="Describe the challenge and its goals..."
          />
          <p className="mt-2 text-right text-xs text-zinc-600">
            {description.length}/5000
          </p>
        </div>

        <div>
          <label className={labelClass} htmlFor="durationDays">
            Duration (days)
          </label>
          <input
            id="durationDays"
            name="durationDays"
            type="number"
            required
            min={1}
            max={365}
            value={durationDays}
            onChange={(event) => updateDuration(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="xpPerCheckIn">
            XP per check-in
          </label>
          <input
            id="xpPerCheckIn"
            name="xpPerCheckIn"
            type="number"
            required
            min={0}
            max={100000}
            value={xpPerCheckIn}
            onChange={(event) => setXpPerCheckIn(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="startAt">
            Start date and time
          </label>
          <input
            id="startAt"
            name="startAt"
            type="datetime-local"
            required
            value={startAt}
            onChange={(event) => updateStartDate(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="endAt">
            End date and time
          </label>
          <input
            id="endAt"
            name="endAt"
            type="datetime-local"
            required
            value={endAt}
            onChange={(event) => setEndAt(event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      {state.error && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {state.error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
        <Link
          href={`/admin/challenges/${challenge.id}`}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-zinc-300 transition hover:bg-white/5"
        >
          <ArrowLeft size={16} />
          Cancel
        </Link>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={16} />
          {pending ? "Saving changes..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}
