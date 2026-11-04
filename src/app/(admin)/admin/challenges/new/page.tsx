
import Link from "next/link";
import { ArrowLeft, Target } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChallengeForm from "../_components/ChallengeForm";

export default async function NewChallengePage() {
  const user = await getCurrentUser();

  if (
    !user ||
    (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")
  ) {
    redirect("/");
  }

  return (
    <main className="relative mx-auto max-w-[1100px] space-y-8 text-white">
      <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-72 w-72 rounded-full bg-amber-400/[0.07] blur-[110px]" />

      <header className="border-b border-white/[0.08] pb-8">
        <Link
          href="/admin/challenges"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Challenges Studio
        </Link>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-3 py-1.5 text-xs font-medium text-amber-200">
          <Target size={14} />
          CodeHive / Challenge operations
        </div>

        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
          New challenge
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Create <span className="text-amber-300">Challenge.</span>
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
          Set the schedule, define the challenge, and decide how much XP
          participants earn for each check-in.
        </p>
      </header>

      <ChallengeForm />
    </main>
  );
}
