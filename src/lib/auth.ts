
import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "codehive_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30;

const secretKey = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be configured with at least 32 characters."
    );
  }

  return new TextEncoder().encode(secret);
};

type Session = {
  userId: string;
  email: string;
};

async function verifyToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });

    const userId = payload.userId;
    const email = payload.email;

    if (
      typeof userId !== "string" ||
      userId.trim().length === 0 ||
      typeof email !== "string" ||
      email.trim().length === 0
    ) {
      return null;
    }

    return { userId, email };
  } catch {
    return null;
  }
}

/**
 * Create a session only for an existing, active account whose email matches.
 */
export async function createSession(
  userId: string,
  email: string
): Promise<void> {
  if (
    typeof userId !== "string" ||
    !userId.trim() ||
    typeof email !== "string" ||
    !email.trim()
  ) {
    throw new Error("A valid user ID and email are required.");
  }

  const { prisma } = await import("@/lib/prisma");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      status: true,
    },
  });

  if (
    !user ||
    user.status !== "ACTIVE" ||
    user.email !== email
  ) {
    throw new Error("Cannot create a session for this account.");
  }

  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secretKey());

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
  });
}

/**
 * Read the session cookie.
 * This verifies the token; getCurrentUser checks the live account status.
 */
export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

/**
 * Verify both the JWT and the live account record for API requests
 * that pass a NextRequest.
 */
export async function verifySession(
  request: NextRequest
): Promise<Session | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const session = await verifyToken(token);

  if (!session) {
    return null;
  }

  const { prisma } = await import("@/lib/prisma");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      email: true,
      status: true,
    },
  });

  if (
    !user ||
    user.status !== "ACTIVE" ||
    user.email !== session.email
  ) {
    return null;
  }

  return session;
}

/**
 * Delete the current session cookie.
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Fetch the live user record.
 * Inactive, deleted, or email-mismatched accounts cannot access
 * protected areas that rely on this function.
 */
export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const { prisma } = await import("@/lib/prisma");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (
    !user ||
    user.status !== "ACTIVE" ||
    user.email !== session.email
  ) {
    return null;
  }

  return user;
}
