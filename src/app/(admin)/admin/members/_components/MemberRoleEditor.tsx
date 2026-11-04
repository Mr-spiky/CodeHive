"use client";

import { useState, useTransition } from "react";
import { updateMemberRole } from "../actions";

const ROLES = [
  { value: "MEMBER", label: "Member" },
  { value: "CONTENT_MEMBER", label: "Content Member" },
  { value: "CORE_TEAM", label: "Core Team" },
  { value: "ORGANIZER", label: "Organizer" },
  { value: "ADMIN", label: "Admin" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
] as const;

type Props = {
  userId: string;
  currentRole: string;
  canEdit: boolean;
  isSelf: boolean;
};

export default function MemberRoleEditor({
  userId,
  currentRole,
  canEdit,
  isSelf,
}: Props) {
  const [role, setRole] = useState(currentRole);
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleChange(nextRole: string) {
    if (nextRole === role) return;

    const previousRole = role;

    setRole(nextRole);
    setMessage("");

    startTransition(async () => {
      try {
        const result = await updateMemberRole(userId, nextRole);

        if (result.success) {
          setMessage(result.message);
          setMessageIsError(false);
          return;
        }

        setRole(previousRole);
        setMessage(result.message);
        setMessageIsError(true);
      } catch {
        setRole(previousRole);
        setMessage("Something went wrong. Please try again.");
        setMessageIsError(true);
      }
    });
  }

  if (!canEdit || isSelf) {
    return (
      <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/65">
        {currentRole.replaceAll("_", " ")}
        {isSelf ? " · You" : ""}
      </span>
    );
  }

  return (
    <div className="min-w-[150px] space-y-1.5">
      <select
        aria-label={`Change role for member ${userId}`}
        value={role}
        disabled={isPending}
        onChange={(event) => handleChange(event.target.value)}
        className="h-9 w-full rounded-lg border border-white/[0.12] bg-[#11111F] px-3 text-xs font-medium text-white outline-none transition hover:border-amber-300/40 focus:border-amber-300/60 focus:ring-2 focus:ring-amber-300/20 disabled:cursor-wait disabled:opacity-50"
      >
        {ROLES.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {isPending && (
        <p className="text-[11px] text-amber-300">
          Updating role…
        </p>
      )}

      {message && (
        <p
          role={messageIsError ? "alert" : "status"}
          className={`max-w-[200px] text-[11px] ${
            messageIsError ? "text-rose-300" : "text-emerald-300"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}