"use client";
import {
  Compass, CalendarDays, Flame, Zap, Rocket, Users, BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HexTile } from "./HexTile";
import { XPBar } from "@/components/gamification/XPBar";

interface HiveMapCanvasProps {
  username: string;
  xp: number;
  progress: { percent: number; current: { label: string }; next: { label: string } | null };
  unlockedZones: string[];
}

// Zone icons use lucide-react so they stay within the gold palette --
// emoji would render via the OS font and break the color scheme.
const ROWS: { id: string; label: string; icon: LucideIcon }[][] = [
  [
    { id: "discover",    label: "Discover",   icon: Compass      },
    { id: "events",      label: "Events",     icon: CalendarDays },
  ],
  [
    { id: "challenges",  label: "Challenges", icon: Flame        },
    { id: "arena",       label: "Quiz Arena", icon: Zap          },
    { id: "showcase",    label: "Showcase",   icon: Rocket       },
  ],
  [
    { id: "teams",       label: "Teams",      icon: Users        },
    { id: "stories",     label: "Stories",    icon: BookOpen     },
  ],
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
              <HexTile
                key={zone.id}
                zoneId={zone.id}
                label={zone.label}
                icon={zone.icon}
                locked={!unlockedZones.includes(zone.id)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
