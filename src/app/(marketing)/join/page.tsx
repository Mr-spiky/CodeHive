import { redirect } from "next/navigation";
import { COMMUNITY_LINK } from "@/lib/data/constants";

export default function JoinPage() {
  redirect(COMMUNITY_LINK);
}
