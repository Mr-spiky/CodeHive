
"use client";

import { useActionState, useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { deleteChallenge } from "../../actions";

type Props = {
  challengeId: string;
  challengeTitle: string;
};

const initialState: { error?: string } = {};

export default function DeleteChallengeButton({
  challengeId,
  challengeTitle,
}: Props) {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const [state, formAction, isPending] = useActionState(
    deleteChallenge,
    initialState,
  );

  function closeDialog() {
    if (isPending) return;
    setOpen(false);
    setConfirmation("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-5 py-3 text-sm font-semibold text-red-300 transition hover:border-red-400/40 hover:bg-red-400/[0.12]"
      >
        <Trash2 size={16} />
        Delete challenge
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-challenge-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-red-400/20 bg-[#101115] p-6 shadow-2xl shadow-black/40 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-red-300">
                  <AlertTriangle size={22} />
                </div>

                <div>
                  <h2
                    id="delete-challenge-title"
                    className="text-lg font-semibold text-white"
                  >
                    Delete challenge?
                  </h2>

                  <p className="mt-2 break-words text-sm leading-6 text-white/60">
                    You are about to delete{" "}
                    <span className="font-semibold text-white">
                      {challengeTitle}
                    </span>
                    .
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeDialog}
                disabled={isPending}
                aria-label="Close confirmation dialog"
                className="rounded-lg p-2 text-white/45 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-amber-300/15 bg-amber-300/[0.05] p-4">
              <p className="text-sm leading-6 text-amber-100/80">
                Challenges with participants or check-in records cannot be
                deleted. Those records are protected to preserve community
                history.
              </p>
            </div>

            <form action={formAction} className="mt-6 space-y-4">
              <input type="hidden" name="id" value={challengeId} />

              <label
                htmlFor="delete-challenge-confirmation"
                className="block text-sm font-medium text-white/80"
              >
                Type <span className="font-bold text-red-300">delete</span>{" "}
                to confirm
              </label>

              <input
                id="delete-challenge-confirmation"
                name="confirmation"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                autoComplete="off"
                spellCheck={false}
                placeholder="Type delete"
                required
                disabled={isPending}
                className="w-full rounded-xl border border-white/10 bg-[#08090c] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-red-400/50 focus:ring-2 focus:ring-red-400/10"
              />

              {state.error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-400/20 bg-red-400/[0.06] p-3 text-sm text-red-300"
                >
                  {state.error}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeDialog}
                  disabled={isPending}
                  className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.05] disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    isPending ||
                    confirmation.trim().toLowerCase() !== "delete"
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 size={15} />
                  {isPending ? "Deleting..." : "Confirm deletion"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
