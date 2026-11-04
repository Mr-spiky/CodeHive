
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import EditChallengeForm from "../_components/EditChallengeForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditChallengePage({ params }: PageProps) {
  const user = await getCurrentUser();

  if (!user || !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    redirect("/");
  }

  const { id } = await params;

  const challenge = await prisma.challenge.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      durationDays: true,
      startAt: true,
      endAt: true,
      xpPerCheckIn: true,
    },
  });

  if (!challenge) {
    notFound();
  }

  return (
    <main className="min-h-screen space-y-7 bg-[#08090c] p-4 text-white sm:p-6 lg:p-8">
      <Link
        href={`/admin/challenges/${challenge.id}`}
        className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Challenge
      </Link>

      <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#17140d] via-[#101115] to-[#0b0c10] p-6 sm:p-8">
        <div className="flex items-center gap-3 text-amber-400">
          <Pencil size={20} />
          <span className="text-xs font-semibold uppercase tracking-[0.22em]">
            Challenges Studio
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Edit Challenge
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
          Update the challenge details, schedule, and XP rewards. Your changes
          will be saved to the existing challenge.
        </p>
      </header>

      <section className="rounded-2xl border border-white/10 bg-[#101115] p-5 sm:p-8">
        <div className="mb-6 border-b border-white/10 pb-5">
          <h2 className="font-semibold">Challenge Configuration</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Editing: {challenge.title}
          </p>
        </div>

        <EditChallengeForm challenge={challenge} />
      </section>
    </main>
  );
}
