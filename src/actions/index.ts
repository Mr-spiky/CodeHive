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
