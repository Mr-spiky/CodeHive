"use client";
import { useState, useTransition } from "react";
import { registerForEvent } from "@/actions";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface EventRegisterButtonProps {
  eventId: string;
  isLoggedIn: boolean;
  initialRegistered: boolean;
}

export function EventRegisterButton({ eventId, isLoggedIn, initialRegistered }: EventRegisterButtonProps) {
  const [isRegistered, setIsRegistered] = useState(initialRegistered);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!isLoggedIn) {
    return (
      <div className="mt-8 pt-8 border-t border-[var(--ch-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-sora font-bold text-white text-base">Want to attend this event?</h3>
          <p className="text-gray-500 text-xs mt-1">Sign in to register and earn 25 XP toward your journey stage.</p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-black bg-[var(--ch-gold-500)] hover:bg-[var(--ch-gold-400)] transition-colors"
        >
          Sign In to Register <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className="mt-8 pt-8 border-t border-[var(--ch-border)] flex items-center gap-3 bg-[var(--ch-gold-950)]/30 border border-[var(--ch-gold-700)]/40 px-6 py-4 rounded-2xl">
        <CheckCircle2 size={20} className="flex-shrink-0 text-[var(--ch-gold-500)]" />
        <div>
          <span className="font-sora font-bold text-white text-sm block">You are registered!</span>
          <span className="text-xs text-[var(--ch-gold-400)] flex items-center gap-1 mt-0.5">
            <Sparkles size={12} /> +25 XP added to your Hive profile
          </span>
        </div>
      </div>
    );
  }

  const handleRegister = () => {
    setError(null);
    startTransition(async () => {
      const res = await registerForEvent(eventId);
      if (res.error) {
        setError(res.error);
      } else if (res.success) {
        setIsRegistered(true);
      }
    });
  };

  return (
    <div className="mt-8 pt-8 border-t border-[var(--ch-border)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-sora font-bold text-white text-base">Register for Event</h3>
          <p className="text-gray-500 text-xs mt-1">Earn 25 XP and unlock event attendee privileges.</p>
        </div>
        <button
          type="button"
          onClick={handleRegister}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-black bg-gradient-to-r from-[var(--ch-gold-700)] to-[var(--ch-gold-500)] hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 cursor-pointer"
        >
          {isPending ? "Registering..." : "Register Now"} <Sparkles size={14} />
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mt-3">{error}</p>}
    </div>
  );
}
