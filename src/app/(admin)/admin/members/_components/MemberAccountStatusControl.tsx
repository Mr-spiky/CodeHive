
"use client";

import { useState, useTransition } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import { setMemberAccountStatus } from "../actions";

type Props = {
  userId: string;
  status: "ACTIVE" | "DEACTIVATED";
  canEdit: boolean;
  isSelf: boolean;
};

export default function MemberAccountStatusControl({
  userId,
  status: initialStatus,
  canEdit,
  isSelf,
}: Props) {
  const [status, setStatus] = useState(initialStatus);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isActive = status === "ACTIVE";
  const nextStatus = isActive ? "DEACTIVATED" : "ACTIVE";

  function handleToggle() {
    setMessage("");
    setShowModal(true);
  }

  function handleClose() {
    if (!isPending) setShowModal(false);
  }

  function handleConfirm() {
    setMessage("");

    startTransition(async () => {
      try {
        const result = await setMemberAccountStatus(userId, nextStatus);

        if (result.success) {
          setStatus(nextStatus);
          setMessage(result.message);
          setIsError(false);
          setShowModal(false);
        } else {
          setMessage(result.message);
          setIsError(true);
        }
      } catch {
        setMessage("Something went wrong. Please try again.");
        setIsError(true);
      }
    });
  }

  return (
    <>
      <div className="min-w-[145px] space-y-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
            isActive
              ? "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200"
              : "border-rose-300/20 bg-rose-300/[0.07] text-rose-200"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isActive ? "bg-emerald-300" : "bg-rose-300"
            }`}
          />
          {isActive ? "Active" : "Deactivated"}
        </span>

        {canEdit && !isSelf && (
          <button
            type="button"
            disabled={isPending}
            onClick={handleToggle}
            className={`block rounded-lg border px-3 py-1.5 text-xs font-medium transition duration-200 disabled:cursor-wait disabled:opacity-50 ${
              isActive
                ? "border-rose-300/20 text-rose-200 hover:border-rose-300/40 hover:bg-rose-300/10"
                : "border-emerald-300/20 text-emerald-200 hover:border-emerald-300/40 hover:bg-emerald-300/10"
            }`}
          >
            {isPending
              ? "Updating..."
              : isActive
                ? "Deactivate"
                : "Reactivate"}
          </button>
        )}

        {isSelf && (
          <p className="text-[10px] text-white/40">Your account</p>
        )}

        {message && (
          <p
            role={isError ? "alert" : "status"}
            className={`max-w-[220px] text-[11px] leading-4 ${
              isError ? "text-rose-300" : "text-emerald-300"
            }`}
          >
            {isError ? "!" : "✓"} {message}
          </p>
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) handleClose();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-status-title"
            aria-describedby="account-status-description"
            className="relative my-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0D0D17] shadow-[0_25px_100px_rgba(0,0,0,0.65)]"
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full blur-[80px] ${
                isActive ? "bg-rose-500/15" : "bg-emerald-500/15"
              }`}
            />

            <div className="relative flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/[0.08] text-amber-200">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/80">
                    CodeHive / Account control
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    Member access management
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-white/45 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-40"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative px-6 pb-6 pt-7">
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${
                  isActive
                    ? "border-rose-300/20 bg-rose-300/[0.08] text-rose-200"
                    : "border-emerald-300/20 bg-emerald-300/[0.08] text-emerald-200"
                }`}
              >
                {isActive ? (
                  <AlertTriangle size={23} />
                ) : (
                  <CheckCircle2 size={23} />
                )}
              </div>

              <h2
                id="account-status-title"
                className="text-2xl font-semibold tracking-tight text-white"
              >
                {isActive ? "Deactivate account?" : "Restore account access?"}
              </h2>

              <p
                id="account-status-description"
                className="mt-3 text-sm leading-6 text-white/60"
              >
                {isActive
                  ? "This member will lose access to their account. Their profile history and existing records will be preserved."
                  : "This member will be able to access their account again, subject to the platform's normal permissions."}
              </p>

              <div className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                      isActive ? "bg-rose-300" : "bg-emerald-300"
                    }`}
                  />

                  <div>
                    <p className="text-xs font-medium text-white/85">
                      {isActive
                        ? "Access will be disabled"
                        : "Access will be restored"}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/45">
                      {isActive
                        ? "You can reactivate this account later. Deactivation does not delete member data."
                        : "The account's existing history will remain intact."}
                    </p>
                  </div>
                </div>
              </div>

              {isError && message && (
                <p
                  role="alert"
                  className="mt-4 rounded-lg border border-rose-300/20 bg-rose-300/[0.06] px-3 py-2.5 text-xs leading-5 text-rose-200"
                >
                  {message}
                </p>
              )}

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/[0.12] px-5 text-sm font-medium text-white/70 transition hover:bg-white/[0.05] hover:text-white disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={isPending}
                  className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-60 ${
                    isActive
                      ? "bg-rose-400 text-[#19090D] hover:bg-rose-300"
                      : "bg-emerald-300 text-[#06140D] hover:bg-emerald-200"
                  }`}
                >
                  {isPending ? (
                    <>
                      <LoaderCircle size={16} className="animate-spin" />
                      Updating...
                    </>
                  ) : isActive ? (
                    "Confirm deactivation"
                  ) : (
                    "Reactivate account"
                  )}
                </button>
              </div>
            </div>

            <div className="relative border-t border-white/[0.07] px-6 py-3">
              <p className="text-[10px] text-white/35">
                Account changes are recorded by CodeHive's access controls.
              </p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
