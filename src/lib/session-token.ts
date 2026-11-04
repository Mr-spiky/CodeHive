
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "codehive_session";

function secretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be configured with at least 32 characters."
    );
  }

  return new TextEncoder().encode(secret);
}

export type Session = {
  userId: string;
  email: string;
};

export async function verifyRequestSession(
  request: NextRequest
): Promise<Session | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    });

    const userId = payload.userId;
    const email = payload.email;

    if (
      typeof userId !== "string" ||
      !userId.trim() ||
      typeof email !== "string" ||
      !email.trim()
    ) {
      return null;
    }

    return { userId, email };
  } catch {
    return null;
  }
}
