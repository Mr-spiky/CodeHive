"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  LoaderCircle,
  Search,
  Trash2,
  Users,
  UserCheck,
  X,
  CheckCircle2,
} from "lucide-react";
import {
  removeEventRegistration,
  updateRegistrationAttendance,
} from "../actions";

type Registration = {
  id: string;
  attended: boolean;
  registeredAt: Date | string;
  user: {
    name: string;
    username: string;
    email: string;
  };
};

type Filter = "ALL" | "ATTENDED" | "PENDING";

function escapeCsv(value: string | number) {
  const text = String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export default function RegistrationManager({
  eventId,
  registrations,
}: {
  eventId: string;
  registrations: Registration[];
}) {
  const [selected, setSelected] = useState<Registration | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("ALL");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const attendedCount = registrations.filter(
    (registration) => registration.attended,
  ).length;

  const filteredRegistrations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return registrations.filter((registration) => {
      const matchesQuery = [
        registration.user.name,
        registration.user.username,
        registration.user.email,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));

      const matchesFilter =
        filter === "ALL" ||
        (filter === "ATTENDED" && registration.attended) ||
        (filter === "PENDING" && !registration.attended);

      return matchesQuery && matchesFilter;
    });
  }, [registrations, query, filter]);

  function handleAttendance(registration: Registration) {
    setError("");
    setPendingId(registration.id);

    startTransition(async () => {
      try {
        const result = await updateRegistrationAttendance(
          eventId,
          registration.id,
          !registration.attended,
        );

        if (result?.error) {
          setError(result.error);
          return;
        }

        router.refresh();
      } catch {
        setError("Attendance could not be updated. Please try again.");
      } finally {
        setPendingId(null);
      }
    });
  }

  function handleRemove() {
    if (!selected) return;

    const registrationId = selected.id;
    setError("");

    startTransition(async () => {
      try {
        const result = await removeEventRegistration(
          eventId,
          registrationId,
        );

        if (result?.error) {
          setError(result.error);
          return;
        }

        setSelected(null);
        router.refresh();
      } catch {
        setError("The registration could not be removed. Please try again.");
      }
    });
  }

  function exportCsv() {
    const headers = [
      "Name",
      "Username",
      "Email",
      "Registered At",
      "Attendance",
    ];

    const rows = filteredRegistrations.map((registration) => [
      registration.user.name,
      registration.user.username,
      registration.user.email,
      new Date(registration.registeredAt).toISOString(),
      registration.attended ? "Attended" : "Not checked in",
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\r\n");

    // UTF-8 BOM helps spreadsheet applications display names correctly.
    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `codehive-event-${eventId}-registrations.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  const filters: { value: Filter; label: string }[] = [
    { value: "ALL", label: "Everyone" },
    { value: "ATTENDED", label: "Checked in" },
    { value: "PENDING", label: "Pending" },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-amber-300/20 bg-amber-300/[0.08] p-2.5 text-amber-200">
            <Users size={18} />
          </div>

          <div>
            <h2 className="font-semibold">Registered participants</h2>
            <p className="mt-1 text-xs text-white/45">
              Search, check in, and manage participants
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={exportCsv}
          disabled={filteredRegistrations.length === 0}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-amber-300/20 px-3 py-2 text-sm text-amber-200 transition hover:bg-amber-300/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Download size={15} />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 border-b border-white/[0.07] p-5 sm:grid-cols-3">
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
          <p className="text-xs text-white/45">Total registered</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums">
            {registrations.length}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-4">
          <p className="text-xs text-white/45">Checked in</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-emerald-300">
            {attendedCount}
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
          <p className="text-xs text-white/45">Pending check-in</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums">
            {registrations.length - attendedCount}
          </p>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mx-5 mt-5 rounded-xl border border-rose-400/20 bg-rose-400/[0.08] p-3 text-sm text-rose-200"
        >
          {error}
        </div>
      )}

      {registrations.length > 0 && (
        <div className="space-y-4 border-b border-white/[0.07] p-5">
          <label className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-3 focus-within:border-amber-300/30">
            <Search size={17} className="shrink-0 text-white/40" />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, username, or email..."
              aria-label="Search participants"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                aria-pressed={filter === item.value}
                className={`rounded-full border px-3 py-2 text-xs transition ${
                  filter === item.value
                    ? "border-amber-300/30 bg-amber-300/[0.10] text-amber-200"
                    : "border-white/10 text-white/55 hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
                {item.value === "ALL"
                  ? ` (${registrations.length})`
                  : item.value === "ATTENDED"
                    ? ` (${attendedCount})`
                    : ` (${registrations.length - attendedCount})`}
              </button>
            ))}
          </div>
        </div>
      )}

      {registrations.length === 0 ? (
        <div className="p-8 text-center">
          <Users className="mx-auto text-white/30" size={28} />
          <p className="mt-3 text-sm text-white/65">
            No registrations yet
          </p>
          <p className="mt-1 text-xs text-white/40">
            Participants will appear here when they register.
          </p>
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="p-8 text-center">
          <Search className="mx-auto text-white/30" size={25} />
          <p className="mt-3 text-sm text-white/65">
            No participants match your search
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("ALL");
            }}
            className="mt-3 text-xs text-amber-200 hover:text-amber-100"
          >
            Clear search and filters
          </button>
        </div>
      ) : (
        <div className="divide-y divide-white/[0.07]">
          {filteredRegistrations.map((registration) => {
            const isUpdating =
              pending && pendingId === registration.id;

            return (
              <div
                key={registration.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="break-words text-sm font-medium text-white">
                    {registration.user.name}
                  </p>

                  <p className="mt-1 break-all text-xs text-white/55">
                    @{registration.user.username}
                  </p>

                  <p className="mt-1 break-all text-xs text-white/45">
                    {registration.user.email}
                  </p>

                  <p className="mt-2 text-xs text-white/40">
                    Registered{" "}
                    {new Intl.DateTimeFormat("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(registration.registeredAt))}
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs ${
                      registration.attended
                        ? "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300"
                        : "border-white/10 bg-white/[0.04] text-white/60"
                    }`}
                  >
                    {registration.attended
                      ? "Attended"
                      : "Not checked in"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => handleAttendance(registration)}
                    className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      registration.attended
                        ? "border-emerald-400/20 text-emerald-300 hover:bg-emerald-400/[0.08]"
                        : "border-amber-300/20 text-amber-200 hover:bg-amber-300/[0.08]"
                    }`}
                  >
                    {isUpdating ? (
                      <LoaderCircle size={15} className="animate-spin" />
                    ) : registration.attended ? (
                      <CheckCircle2 size={15} />
                    ) : (
                      <UserCheck size={15} />
                    )}

                    {isUpdating
                      ? "Updating..."
                      : registration.attended
                        ? "Undo check-in"
                        : "Check in"}
                  </button>

                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => {
                      setError("");
                      setSelected(registration);
                    }}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-rose-400/20 px-3 py-2 text-sm text-rose-300 transition hover:bg-rose-400/[0.08] disabled:opacity-50"
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !pending) {
              setSelected(null);
              setError("");
            }
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="remove-registration-title"
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#11111b] p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="remove-registration-title"
                  className="text-lg font-semibold text-white"
                >
                  Remove registration?
                </h3>

                <p className="mt-3 break-words text-sm leading-6 text-white/60">
                  Remove{" "}
                  <span className="font-semibold text-white">
                    {selected.user.name}
                  </span>{" "}
                  from this event? This cannot be undone.
                </p>
              </div>

              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  setSelected(null);
                  setError("");
                }}
                aria-label="Close dialog"
                className="rounded-lg p-2 text-white/50 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

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
                onClick={() => {
                  setSelected(null);
                  setError("");
                }}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/75 transition hover:bg-white/[0.05] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={pending}
                onClick={handleRemove}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Removing...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Confirm removal
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
