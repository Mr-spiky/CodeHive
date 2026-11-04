
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, LoaderCircle, Trash2 } from "lucide-react";
import { deleteEvent } from "../actions";

export default function EventDeleteButton({
  eventId,
  eventTitle,
}: {
  eventId: string;
  eventTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    setError("");

    startTransition(async () => {
      try {
        const result = await deleteEvent(eventId);

        if (result?.error) {
          setError(result.error);
          return;
        }

        setOpen(false);
        router.push("/admin/events");
        router.refresh();
      } catch (err) {
        console.error("Event deletion failed:", err);
        setError("The event could not be deleted. Please try again.");
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError("");
          setOpen(true);
        }}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-rose-400/20 px-4 py-3 text-sm font-medium text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-400/[0.08] focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <Trash2 size={16} />
        Delete event
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !pending) {
              setOpen(false);
            }
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-event-title"
            aria-describedby="delete-event-description"
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#11111b] p-6 shadow-2xl"
          >
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
              <AlertTriangle size={22} />
            </div>

            <h2
              id="delete-event-title"
              className="text-xl font-semibold text-white"
            >
              Delete this event?
            </h2>

            <p
              id="delete-event-description"
              className="mt-3 break-words text-sm leading-6 text-white/60"
            >
              You are about to delete{" "}
              <span className="font-semibold text-white">
                {eventTitle}
              </span>
              . This action cannot be undone.
            </p>

            <p className="mt-3 text-xs leading-5 text-white/40">
              Events with existing registrations cannot be deleted.
            </p>

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/[0.08] p-3 text-sm text-rose-200"
              >
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={pending}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/75 transition hover:bg-white/[0.05] focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={pending}
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Confirm deletion
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
