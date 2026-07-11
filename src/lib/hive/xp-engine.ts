import "server-only";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma";
import { stageForXp } from "./journey";

export type XPReason =
  | "EVENT_REGISTERED" | "EVENT_ATTENDED" | "CHALLENGE_CHECKIN"
  | "CHALLENGE_COMPLETED" | "QUIZ_WIN" | "ADMIN_GRANT";

export async function awardXP(userId: string, amount: number, reason: XPReason, sourceId?: string) {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.xPTransaction.create({ data: { userId, amount, reason, sourceId } });
    const user = await tx.user.update({ where: { id: userId }, data: { xp: { increment: amount } } });
    const newStage = stageForXp(user.xp);
    if (newStage !== user.journeyStage) {
      await tx.user.update({ where: { id: userId }, data: { journeyStage: newStage } });
      return { xp: user.xp, stageChanged: true, newStage };
    }
    return { xp: user.xp, stageChanged: false, newStage: user.journeyStage };
  });
}
