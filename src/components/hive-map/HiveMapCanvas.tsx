"use client";
import { HexTile } from "./HexTile";
import { XPBar } from "@/components/gamification/XPBar";

interface HiveMapCanvasProps {
  username: string;
  xp: number;
  progress: { percent: number; current: { label: string }; next: { label: string } | null };
  unlockedZones: string[];
}

const ROWS: { id: string; label: string; icon: string }[][] = [
  [{ id: "discover", label: "Discover", icon: "🧭" }, { id: "events", label: "Events", icon: "📅" }],
  [{ id: "challenges", label: "Challenges", icon: "🔥" }, { id: "arena", label: "Quiz Arena", icon: "⚔️" }, { id: "showcase", label: "Showcase", icon: "🚀" }],
  [{ id: "teams", label: "Teams", icon: "🤝" }, { id: "stories", label: "Stories", icon: "📖" }],
];

export function HiveMapCanvas({ username, xp, progress, unlockedZones }: HiveMapCanvasProps) {
  return (
    <div className="hive-map">
      <header className="hive-map__header">
        <h1 className="hive-map__title">Welcome back, {username}</h1>
        <XPBar xp={xp} percent={progress.percent} currentLabel={progress.current.label} nextLabel={progress.next?.label} />
      </header>
      <div className="hive-map__grid">
        {ROWS.map((row, i) => (
          <div key={i} className="hex-row">
            {row.map((zone) => (
              <HexTile key={zone.id} zoneId={zone.id} label={zone.label} icon={zone.icon} locked={!unlockedZones.includes(zone.id)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
