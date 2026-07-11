import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

const ALLOWED_ROLES = ["ADMIN", "ORGANIZER", "CORE_TEAM"];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user || !ALLOWED_ROLES.includes(user.role)) redirect("/");
  return <div className="min-h-screen bg-[#05050F] p-8">{children}</div>;
}
