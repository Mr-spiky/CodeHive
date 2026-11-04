"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { AccountStatus, Prisma, Role } from "@/generated/prisma";

type UpdateRoleResult = {
  success: boolean;
  message: string;
};

const ASSIGNABLE_ROLES: Role[] = [
  "MEMBER",
  "CONTENT_MEMBER",
  "ADMIN",
  "SUPER_ADMIN",
];

const ORDINARY_ROLES: Role[] = ["MEMBER", "CONTENT_MEMBER"];

function isPrivilegedRole(role: Role): boolean {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

/**
 * Ensures that at least one active ADMIN or SUPER_ADMIN remains.
 *
 * Call this inside the transaction before demoting or deactivating
 * an active privileged account.
 */
async function hasAnotherActiveAdministrator(
  tx: Prisma.TransactionClient,
  excludedUserId: string,
): Promise<boolean> {
  const count = await tx.user.count({
    where: {
      id: { not: excludedUserId },
      status: "ACTIVE",
      role: { in: ["ADMIN", "SUPER_ADMIN"] },
    },
  });

  return count > 0;
}

export async function updateMemberRole(
  userId: string,
  requestedRole: string,
): Promise<UpdateRoleResult> {
  const actor = await getCurrentUser();

  if (!actor || !["ADMIN", "SUPER_ADMIN"].includes(actor.role)) {
    return {
      success: false,
      message: "You are not authorized to change member roles.",
    };
  }

  if (
    typeof userId !== "string" ||
    !userId.trim() ||
    !ASSIGNABLE_ROLES.includes(requestedRole as Role)
  ) {
    return {
      success: false,
      message: "Invalid member or role.",
    };
  }

  const nextRole = requestedRole as Role;

  if (userId === actor.id) {
    return {
      success: false,
      message: "You cannot change your own role.",
    };
  }

  if (actor.role === "ADMIN" && !ORDINARY_ROLES.includes(nextRole)) {
    return {
      success: false,
      message: "Only a Super Admin can assign privileged roles.",
    };
  }

  try {
    await prisma.$transaction(
      async (tx) => {
        const target = await tx.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            role: true,
            status: true,
          },
        });

        if (!target) {
          throw new Error("MEMBER_NOT_FOUND");
        }

        // An ordinary ADMIN cannot modify privileged accounts.
        if (actor.role === "ADMIN" && isPrivilegedRole(target.role)) {
          throw new Error("PRIVILEGED_TARGET");
        }

        if (target.role === nextRole) {
          return;
        }

        // Preserve at least one active administrator across both roles.
        if (
          target.status === "ACTIVE" &&
          isPrivilegedRole(target.role) &&
          !isPrivilegedRole(nextRole)
        ) {
          const anotherActiveAdministrator =
            await hasAnotherActiveAdministrator(tx, target.id);

          if (!anotherActiveAdministrator) {
            throw new Error("LAST_ACTIVE_ADMINISTRATOR");
          }
        }

        await tx.user.update({
          where: { id: userId },
          data: { role: nextRole },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );

    revalidatePath("/admin/members");

    return {
      success: true,
      message: "Member role updated successfully.",
    };
  } catch (error) {
    if (error instanceof Error) {
      const messages: Record<string, string> = {
        MEMBER_NOT_FOUND: "Member not found.",
        PRIVILEGED_TARGET:
          "Administrators cannot modify privileged accounts.",
        LAST_ACTIVE_ADMINISTRATOR:
          "The last active administrator cannot be demoted.",
      };

      if (messages[error.message]) {
        return {
          success: false,
          message: messages[error.message],
        };
      }
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2034"
    ) {
      return {
        success: false,
        message: "A concurrent update occurred. Please try again.",
      };
    }

    console.error("Failed to update member role:", error);

    return {
      success: false,
      message: "Could not update the role. Please try again.",
    };
  }
}

export async function setMemberAccountStatus(
  userId: string,
  requestedStatus: string,
): Promise<UpdateRoleResult> {
  const actor = await getCurrentUser();

  if (!actor || !["ADMIN", "SUPER_ADMIN"].includes(actor.role)) {
    return {
      success: false,
      message: "You are not authorized to change account status.",
    };
  }

  if (
    typeof userId !== "string" ||
    !userId.trim() ||
    !["ACTIVE", "DEACTIVATED"].includes(requestedStatus)
  ) {
    return {
      success: false,
      message: "Invalid member or account status.",
    };
  }

  const nextStatus = requestedStatus as AccountStatus;

  if (userId === actor.id && nextStatus === "DEACTIVATED") {
    return {
      success: false,
      message: "You cannot deactivate your own account.",
    };
  }

  try {
    await prisma.$transaction(
      async (tx) => {
        const target = await tx.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            role: true,
            status: true,
          },
        });

        if (!target) {
          throw new Error("MEMBER_NOT_FOUND");
        }

        // An ordinary ADMIN cannot modify privileged accounts.
        if (actor.role === "ADMIN" && isPrivilegedRole(target.role)) {
          throw new Error("PRIVILEGED_TARGET");
        }

        if (target.status === nextStatus) {
          return;
        }

        // Preserve at least one active administrator across both roles.
        if (
          nextStatus === "DEACTIVATED" &&
          target.status === "ACTIVE" &&
          isPrivilegedRole(target.role)
        ) {
          const anotherActiveAdministrator =
            await hasAnotherActiveAdministrator(tx, target.id);

          if (!anotherActiveAdministrator) {
            throw new Error("LAST_ACTIVE_ADMINISTRATOR");
          }
        }

        await tx.user.update({
          where: { id: userId },
          data: { status: nextStatus },
        });
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    );

    revalidatePath("/admin/members");

    return {
      success: true,
      message:
        nextStatus === "DEACTIVATED"
          ? "Member account deactivated successfully."
          : "Member account reactivated successfully.",
    };
  } catch (error) {
    if (error instanceof Error) {
      const messages: Record<string, string> = {
        MEMBER_NOT_FOUND: "Member not found.",
        PRIVILEGED_TARGET:
          "Administrators cannot modify privileged accounts.",
        LAST_ACTIVE_ADMINISTRATOR:
          "The last active administrator cannot be deactivated.",
      };

      if (messages[error.message]) {
        return {
          success: false,
          message: messages[error.message],
        };
      }
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2034"
    ) {
      return {
        success: false,
        message: "A concurrent update occurred. Please try again.",
      };
    }

    console.error("Failed to update member account status:", error);

    return {
      success: false,
      message: "Unable to update account status. Please try again.",
    };
  }
}