import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AdminShell from "./admin/AdminShell";

const ALLOWED_ROLES = [
  "CONTENT_MEMBER",
  "ADMIN",
  "SUPER_ADMIN",
] as const;

type AdminRole = (typeof ALLOWED_ROLES)[number];

function isAdminRole(role: string): role is AdminRole {
  return ALLOWED_ROLES.some((allowedRole) => allowedRole === role);
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user || !isAdminRole(user.role)) {
    redirect("/");
  }

  return <AdminShell role={user.role}>{children}</AdminShell>;
}