import { SectionHeader, GoldButton, GoldText } from "./ui";
import { EVENT_REGISTER_LINK, COMMUNITY_LINK } from "@/lib/codehive/constants";
import { EVENT_TAGS } from "@/lib/codehive/data";

// ─── UpcomingEventSection ─────────────────────────────────────
export function UpcomingEventSection({ isPreview = false }: { isPreview?: boolean }) {
  return (
    <section id="events" className="py-24 md:py-32 bg-[#060606] relative overflow-hidden">
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-[#C9A227]/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          badge="Events"
          title={
            <>
              Upcoming <GoldText>Events</GoldText>
            </>
          }
          subtitle="We run meetups, hackathons, and industry sessions. Stay tuned for what's next."
        />

        <div className="max-w-3xl mx-auto">
          {/* Event card */}
          <div className="relative group rounded-3xl border border-[#C9A227]/20 bg-gradient-to-br from-[#111111] via-[#131313] to-[#0F0F0F] overflow-hidden hover:border-[#C9A227]/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(201,162,39,0.15)]">
            {/* Top gold bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#C9A227] via-[#E5C84A] to-[#C9A227]" />

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

                {/* Left — Event info */}
                <div>
                  {/* Coming soon badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/30 text-[#C9A227] text-xs font-bold tracking-widest uppercase mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
                    Coming Soon
                  </div>

                  <h3 className="font-sora text-3xl font-bold text-white mb-3">
                    CodeHive Meetup
                  </h3>
                  <p className="text-gray-400 text-base max-w-md leading-relaxed">
                    Our next community event is being planned. Expect industry speakers,
                    networking sessions, and execution-driven workshops. Details dropping soon.
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    {EVENT_TAGS.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium text-gray-400 border border-white/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — Platform + CTA */}
                <div className="flex flex-col items-center md:items-end gap-4 flex-shrink-0">
                  <div className="text-center md:text-right">
                    <div className="text-gray-500 text-xs uppercase tracking-widest mb-1">Platform</div>
                    <div className="text-white font-semibold text-sm">Unstop / Hack2Skill</div>
                  </div>

                  <GoldButton
                    id="event-register-cta"
                    href={EVENT_REGISTER_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 text-sm"
                  >
                    Get Notified →
                  </GoldButton>

                  <p className="text-gray-600 text-xs">Registration opens soon</p>
                </div>

              </div>
            </div>
          </div>

          {/* Hint text */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Want to stay updated?{" "}
            <a
              href={COMMUNITY_LINK}
              className="text-[#C9A227] hover:text-[#E5C84A] transition-colors font-medium"
            >
              Join our WhatsApp groups →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
