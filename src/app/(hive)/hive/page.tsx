import { getCurrentUser } from "@/lib/auth";
import { progressToNextStage, JOURNEY_STAGES } from "@/lib/hive/journey";
import { HiveMapCanvas } from "@/components/hive-map/HiveMapCanvas";
import { HiveEntryGate } from "@/components/hive-map/HiveEntryGate";

export default async function HivePage() {
  const user = await getCurrentUser();
  const progress = progressToNextStage(user!.xp);
  const unlockedZones = JOURNEY_STAGES.filter((s) => user!.xp >= s.minXp).map((s) => s.unlocksZone);

  return (
    <HiveEntryGate username={user!.name}>
      <HiveMapCanvas username={user!.name} xp={user!.xp} progress={progress} unlockedZones={unlockedZones} />
    </HiveEntryGate>
  );
}
