
"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession, getCurrentUser } from "@/lib/auth";

const EMAIL_MAX_LENGTH = 254;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const NAME_MAX_LENGTH = 80;
const PASSWORD_MAX_LENGTH = 128;

function isValidEmail(email: string): boolean {
  return (
    email.length <= EMAIL_MAX_LENGTH &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function isValidUsername(username: string): boolean {
  return (
    username.length >= USERNAME_MIN_LENGTH &&
    username.length <= USERNAME_MAX_LENGTH &&
    /^[a-zA-Z0-9_]+$/.test(username)
  );
}

function isValidPassword(password: string): boolean {
  return password.length >= 8 && password.length <= PASSWORD_MAX_LENGTH;
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

// Authentication

export async function signUp(
  email: string,
  username: string,
  name: string,
  password: string
) {
  if (
    typeof email !== "string" ||
    typeof username !== "string" ||
    typeof name !== "string" ||
    typeof password !== "string"
  ) {
    return { error: "Please provide valid registration details." };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = username.trim();
  const normalizedName = name.trim();

  if (!isValidEmail(normalizedEmail)) {
    return { error: "Please enter a valid email address." };
  }

  if (!isValidUsername(normalizedUsername)) {
    return {
      error:
        "Username must be 3–30 characters and contain only letters, numbers, and underscores.",
    };
  }

  if (
    normalizedName.length === 0 ||
    normalizedName.length > NAME_MAX_LENGTH
  ) {
    return { error: "Name must be between 1 and 80 characters." };
  }

  if (!isValidPassword(password)) {
    return { error: "Password must be between 8 and 128 characters." };
  }

  try {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedEmail },
          { username: normalizedUsername },
        ],
      },
      select: { id: true },
    });

    if (existing) {
      return { error: "Email or username already in use." };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        username: normalizedUsername,
        name: normalizedName,
        password: hashedPassword,
      },
      select: { id: true, email: true },
    });

    await createSession(user.id, user.email);

    return { success: true };
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { error: "Email or username already in use." };
    }

    console.error("Signup failed.");

    return {
      error: "Unable to create your account right now. Please try again.",
    };
  }
}

export async function signIn(email: string, password: string) {
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.length > EMAIL_MAX_LENGTH ||
    password.length === 0 ||
    password.length > PASSWORD_MAX_LENGTH
  ) {
    return { error: "Invalid credentials." };
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!isValidEmail(normalizedEmail)) {
    return { error: "Invalid credentials." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Use a generic error so account status is not disclosed.
    if (!user) {
      return { error: "Invalid credentials." };
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches || user.status !== "ACTIVE") {
      return { error: "Invalid credentials." };
    }

    await createSession(user.id, user.email);

    return {
          success: true,
          role: user.role,
    };
  } catch {
    console.error("Signin failed.");

    return {
      error: "Unable to sign in right now. Please try again.",
    };
  }
}

export async function signOut() {
  await deleteSession();
}

// Event registration

export async function registerForEvent(eventId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "You must be logged in to register for events." };
  }

  if (typeof eventId !== "string" || !eventId.trim()) {
    return { error: "Invalid event." };
  }

  try {
    await prisma.eventRegistration.create({
      data: { userId: user.id, eventId },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { error: "You are already registered for this event." };
    }

    console.error("Event registration failed.");

    return { error: "Unable to register right now. Please try again." };
  }

  const { awardXP } = await import("@/lib/hive/xp-engine");
  const res = await awardXP(user.id, 25, "EVENT_REGISTERED", eventId);

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/events");
  revalidatePath("/hive");

  return {
    success: true,
    xpAwarded: 25,
    newStage: res.newStage,
    stageChanged: res.stageChanged,
  };
}

// Challenge enrollment

export async function enrollInChallenge(challengeId: string) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "You must be logged in to join a challenge." };
  }

  if (typeof challengeId !== "string" || !challengeId.trim()) {
    return { error: "Invalid challenge." };
  }

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
    select: { id: true },
  });

  if (!challenge) {
    return { error: "Challenge not found." };
  }

  try {
    await prisma.challengeEnrollment.create({
      data: { userId: user.id, challengeId },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { error: "You are already participating in this challenge." };
    }

    console.error("Challenge enrollment failed.");

    return {
      error: "Unable to join this challenge right now. Please try again.",
    };
  }

  const { revalidatePath } = await import("next/cache");
  revalidatePath("/hive/challenges");

  return { success: true };
}

// Challenge check-in

export async function checkInToChallenge(
  challengeId: string,
  day: number,
  proofUrl?: string
) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "You must be logged in to submit a check-in." };
  }

  if (
    typeof challengeId !== "string" ||
    !challengeId.trim() ||
    !Number.isSafeInteger(day) ||
    day < 1 ||
    (proofUrl !== undefined &&
      (typeof proofUrl !== "string" || proofUrl.length > 2048))
  ) {
    return { error: "Invalid check-in details." };
  }

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  });

  if (!challenge) {
    return { error: "Challenge not found." };
  }

  if (day > challenge.durationDays) {
    return { error: "That day is outside the challenge duration." };
  }

  const existingCheckIn = await prisma.challengeCheckIn.findUnique({
    where: {
      userId_challengeId_day: {
        userId: user.id,
        challengeId,
        day,
      },
    },
  });

  if (existingCheckIn) {
    return { error: `You have already checked in for Day ${day}.` };
  }

  const enrollment = await prisma.challengeEnrollment.findUnique({
    where: {
      userId_challengeId: {
        userId: user.id,
        challengeId,
      },
    },
  });

  if (!enrollment) {
    return {
      error: "Join this challenge before submitting a check-in.",
    };
  }

  let checkIn;

  try {
    checkIn = await prisma.challengeCheckIn.create({
      data: {
        userId: user.id,
        challengeId,
        day,
        proofUrl: proofUrl?.trim() || null,
      },
    });
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { error: `You have already checked in for Day ${day}.` };
    }

    console.error("Challenge check-in failed.");

    return { error: "Unable to check in right now. Please try again." };
  }

  const newStreak = enrollment.currentStreak + 1;
  const newLongest = Math.max(enrollment.longestStreak, newStreak);
  const isCompleted = day >= challenge.durationDays;

  await prisma.challengeEnrollment.update({
    where: { id: enrollment.id },
    data: {
      currentStreak: newStreak,
      longestStreak: newLongest,
      completed: isCompleted,
    },
  });

  const { awardXP } = await import("@/lib/hive/xp-engine");

  let totalXpAwarded = challenge.xpPerCheckIn;

  const res = await awardXP(
    user.id,
    challenge.xpPerCheckIn,
    "CHALLENGE_CHECKIN",
    checkIn.id
  );

  let finalStage = res.newStage;
  let didStageChange = res.stageChanged;

  if (isCompleted) {
    const bonusRes = await awardXP(
      user.id,
      100,
      "CHALLENGE_COMPLETED",
      challengeId
    );

    totalXpAwarded += 100;
    finalStage = bonusRes.newStage;
    didStageChange = didStageChange || bonusRes.stageChanged;

    const badge = await prisma.badge.findUnique({
      where: { slug: "challenge-finisher" },
    });

    if (badge) {
      await prisma.userBadge.upsert({
        where: {
          userId_badgeId: {
            userId: user.id,
            badgeId: badge.id,
          },
        },
        create: {
          userId: user.id,
          badgeId: badge.id,
        },
        update: {},
      });
    }
  }

  const { revalidatePath } = await import("next/cache");

  revalidatePath("/hive/challenges");
  revalidatePath("/hive");
  revalidatePath("/hive/leaderboard");

  return {
    success: true,
    xpAwarded: totalXpAwarded,
    newStage: finalStage,
    stageChanged: didStageChange,
  };
}
