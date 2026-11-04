
import bcrypt from "bcrypt";
import { PrismaClient } from "../src/generated/prisma";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const prisma = new PrismaClient();
const rl = createInterface({ input, output });

async function ask(label: string): Promise<string> {
  return (await rl.question(label)).trim();
}

async function askHidden(label: string): Promise<string> {
  if (!input.isTTY || typeof input.setRawMode !== "function") {
    throw new Error("Run this script directly in an interactive terminal.");
  }

  output.write(label);

  return new Promise((resolve, reject) => {
    let value = "";
    let settled = false;

    const cleanup = () => {
      input.setRawMode(false);
      input.pause();
      input.removeListener("data", onData);
    };

    const onData = (chunk: Buffer | string) => {
      const char = chunk.toString("utf8");

      if (char === "\u0003") {
        settled = true;
        cleanup();
        output.write("\n");
        reject(new Error("Cancelled."));
        return;
      }

      if (char === "\r" || char === "\n") {
        if (settled) return;
        settled = true;
        cleanup();
        output.write("\n");
        resolve(value);
        return;
      }

      if (char === "\u007f" || char === "\b") {
        value = value.slice(0, -1);
        return;
      }

      if (char >= " " && char !== "\u007f") {
        value += char;
      }
    };

    input.setRawMode(true);
    input.resume();
    input.on("data", onData);
  });
}

async function main() {
  const email = (await ask("Super Admin email: ")).toLowerCase();
  const username = await ask(
    "Username (3–30 letters, numbers, underscores): "
  );
  const name = await ask("Full name: ");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new Error("Invalid email address.");
  }

  if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
    throw new Error("Invalid username.");
  }

  if (!name || name.length > 80) {
    throw new Error("Name must be between 1 and 80 characters.");
  }

  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
    select: { email: true, username: true },
  });

  if (existing) {
    throw new Error(
      "That email or username already exists. No account was changed."
    );
  }

  const password = await askHidden("Super Admin password (hidden): ");

  if (password.length < 12 || password.length > 128) {
    throw new Error("Use a password between 12 and 128 characters.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      name,
      password: hashedPassword,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      status: true,
    },
  });

  console.log("Super Admin account created successfully.");
  console.log(user);
  console.log("Sign in through the normal CodeHive login page.");
}

main()
  .catch((error: unknown) => {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    console.error("Provisioning failed:", message);
    process.exitCode = 1;
  })
  .finally(async () => {
    rl.close();
    await prisma.$disconnect();
  });
