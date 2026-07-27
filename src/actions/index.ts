"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/auth";

export async function signUp(email: string, username: string, name: string, password: string) {
  const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
  if (existing) return { error: "Email or username already in use" };
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, username, name, password: hashed } });
  await createSession(user.id, user.email);
  return { success: true };
}

export async function signIn(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) return { error: "Invalid credentials" };
  await createSession(user.id, user.email);
  return { success: true };
}

export async function signOut() {
  await deleteSession();
}

export async function registerForEvent(eventId: string) {
  const user = await import("@/lib/auth").then((m) => m.getCurrentUser());
  if (!user) return { error: "You must be logged in to register for events." };

  const existing = await prisma.eventRegistration.findUnique({
    where: { userId_eventId: { userId: user.id, eventId } },
  });
  if (existing) return { error: "You are already registered for this event." };

  await prisma.eventRegistration.create({
    data: { userId: user.id, eventId },
  });

  const { awardXP } = await import("@/lib/hive/xp-engine");
  const res = await awardXP(user.id, 25, "EVENT_REGISTERED", eventId);

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/events");
  revalidatePath("/hive");

  return { success: true, xpAwarded: 25, newStage: res.newStage, stageChanged: res.stageChanged };
}

export async function enrollInChallenge(challengeId: string) {
  const user = await import("@/lib/auth").then((m) => m.getCurrentUser());
  if (!user) return { error: "You must be logged in to join a challenge." };

  const existing = await prisma.challengeEnrollment.findUnique({
    where: { userId_challengeId: { userId: user.id, challengeId } },
  });
  if (existing) return { error: "You are already participating in this challenge." };

  await prisma.challengeEnrollment.create({
    data: { userId: user.id, challengeId },
  });

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/hive/challenges");

  return { success: true };
}

export async function checkInToChallenge(challengeId: string, day: number, proofUrl?: string) {
  const user = await import("@/lib/auth").then((m) => m.getCurrentUser());
  if (!user) return { error: "You must be logged in to submit a check-in." };

  const challenge = await prisma.challenge.findUnique({ where: { id: challengeId } });
  if (!challenge) return { error: "Challenge not found." };

  const existingCheckIn = await prisma.challengeCheckIn.findUnique({
    where: { userId_challengeId_day: { userId: user.id, challengeId, day } },
  });
  if (existingCheckIn) return { error: `You have already checked in for Day ${day}.` };

  const enrollment = await prisma.challengeEnrollment.upsert({
    where: { userId_challengeId: { userId: user.id, challengeId } },
    create: { userId: user.id, challengeId, currentStreak: 0, longestStreak: 0 },
    update: {},
  });

  const checkIn = await prisma.challengeCheckIn.create({
    data: { userId: user.id, challengeId, day, proofUrl: proofUrl || null },
  });

  const newStreak = enrollment.currentStreak + 1;
  const newLongest = Math.max(enrollment.longestStreak, newStreak);
  const isCompleted = day >= challenge.durationDays;

  await prisma.challengeEnrollment.update({
    where: { id: enrollment.id },
    data: { currentStreak: newStreak, longestStreak: newLongest, completed: isCompleted },
  });

  const { awardXP } = await import("@/lib/hive/xp-engine");
  let totalXpAwarded = challenge.xpPerCheckIn;
  const res = await awardXP(user.id, challenge.xpPerCheckIn, "CHALLENGE_CHECKIN", checkIn.id);
  let finalStage = res.newStage;
  let didStageChange = res.stageChanged;

  if (isCompleted) {
    const bonusRes = await awardXP(user.id, 100, "CHALLENGE_COMPLETED", challengeId);
    totalXpAwarded += 100;
    finalStage = bonusRes.newStage;
    didStageChange = didStageChange || bonusRes.stageChanged;

    const badge = await prisma.badge.findUnique({ where: { slug: "challenge-finisher" } });
    if (badge) {
      await prisma.userBadge.upsert({
        where: { userId_badgeId: { userId: user.id, badgeId: badge.id } },
        create: { userId: user.id, badgeId: badge.id },
        update: {},
      });
    }
  }

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/hive/challenges");
  revalidatePath("/hive");
  revalidatePath("/hive/leaderboard");

  return { success: true, xpAwarded: totalXpAwarded, newStage: finalStage, stageChanged: didStageChange };
}
