import { JourneyStage } from "@/generated/prisma";

export const JOURNEY_STAGES: {
  stage: JourneyStage;
  label: string;
  minXp: number;
  unlocksZone: string;
}[] = [
  { stage: "VISITOR",               label: "Visitor",               minXp: 0,    unlocksZone: "discover" },
  { stage: "MEMBER",                label: "Member",                minXp: 50,   unlocksZone: "events" },
  { stage: "ACTIVE_PARTICIPANT",    label: "Active Participant",    minXp: 150,  unlocksZone: "challenges" },
  { stage: "CHALLENGE_COMPLETER",   label: "Challenge Completer",   minXp: 350,  unlocksZone: "arena" },
  { stage: "PROJECT_BUILDER",       label: "Project Builder",       minXp: 600,  unlocksZone: "showcase" },
  { stage: "HACKATHON_PARTICIPANT", label: "Hackathon Participant", minXp: 900,  unlocksZone: "teams" },
  { stage: "COMMUNITY_CONTRIBUTOR", label: "Community Contributor", minXp: 1300, unlocksZone: "stories" },
  { stage: "CORE_TEAM_MEMBER",      label: "Core Team Member",      minXp: 1800, unlocksZone: "admin-lite" },
  { stage: "ORGANIZER_LEAD",        label: "Organizer / Lead",      minXp: 2500, unlocksZone: "admin" },
];

export function stageForXp(xp: number): JourneyStage {
  let current = JOURNEY_STAGES[0];
  for (const s of JOURNEY_STAGES) if (xp >= s.minXp) current = s;
  return current.stage;
}

export function progressToNextStage(xp: number) {
  const currentIdx = JOURNEY_STAGES.findIndex((s) => s.stage === stageForXp(xp));
  const current = JOURNEY_STAGES[currentIdx];
  const next = JOURNEY_STAGES[currentIdx + 1];
  if (!next) return { percent: 100, current, next: null };
  const percent = ((xp - current.minXp) / (next.minXp - current.minXp)) * 100;
  return { percent: Math.min(100, Math.max(0, percent)), current, next };
}
