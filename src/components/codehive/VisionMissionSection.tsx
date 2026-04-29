import { SectionHeader, GoldText } from "./ui";
import { MISSION_ITEMS } from "@/lib/codehive/data";
import { DynamicIcon } from "../DynamicIcon";

// ─── Shared card style for Vision and Mission ─────────────────
const CARD_CLASS =
  "relative group p-8 md:p-10 rounded-3xl border border-[#C9A227]/20 bg-gradient-to-br from-[#111111] to-[#141414] hover:border-[#C9A227]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(201,162,39,0.12)]";

// ─── Shared icon box ──────────────────────────────────────────
function IconBox({ icon }: { icon: string }) {
  return (
    <div className="w-12 h-12 rounded-2xl bg-[#C9A227]/15 border border-[#C9A227]/30 flex items-center justify-center text-[#C9A227]">
      <DynamicIcon name={icon} size={24} strokeWidth={1.5} />
    </div>
  );
}

// ─── VisionMissionSection ─────────────────────────────────────
export function VisionMissionSection() {
  return (
    <section className="py-24 md:py-32 bg-[#060606] relative overflow-hidden">
      {/* Vertical gold divider at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#C9A227]/30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          badge="Our Purpose"
          title={
            <>
              Vision & <GoldText>Mission</GoldText>
            </>
          }
        />

        <div className="grid md:grid-cols-2 gap-8">

          {/* Vision card */}
          <div className={CARD_CLASS}>
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#C9A227]/60 to-transparent" />

            <div className="flex items-center gap-3 mb-6">
              <IconBox icon="Target" />
              <h3 className="font-sora text-2xl font-bold text-white">Vision</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To build{" "}
              <span className="text-[#C9A227] font-semibold">
                India's most impactful student-led tech ecosystem
              </span>
              , where talent meets opportunity, and learning translates into real-world outcomes.
            </p>

            {/* Decorative hexagon watermark */}
            <div className="absolute bottom-6 right-6 opacity-5" aria-hidden="true">
              <svg viewBox="0 0 60 60" className="w-20 h-20" fill="none">
                <polygon points="30,2 56,16 56,44 30,58 4,44 4,16" stroke="#C9A227" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Mission card */}
          <div className={CARD_CLASS}>
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#C9A227]/60 to-transparent" />

            <div className="flex items-center gap-3 mb-6">
              <IconBox icon="Zap" />
              <h3 className="font-sora text-2xl font-bold text-white">Mission</h3>
            </div>
            <ul className="space-y-4">
              {MISSION_ITEMS.map((item) => (
                <li key={item.text} className="flex items-start gap-4">
                  <span className="text-[#C9A227] mt-1 flex-shrink-0" aria-hidden="true">
                    <DynamicIcon name={item.icon} size={18} strokeWidth={2} />
                  </span>
                  <span className="text-gray-300 text-sm leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
