import { SectionHeader } from "./ui";
import { EVENTS } from "@/lib/codehive/eventsData";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export function UpcomingEventSection() {
  // Get the most recent upcoming event
  const featuredEvent = EVENTS.find((e) => e.status === "upcoming") || EVENTS[0];

  if (!featuredEvent) return null;

  return (
    <section id="events" className="py-24 bg-[#08081A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-[#7C3AED]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <SectionHeader
          badge="Events"
          title={
            <>
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]">Events</span>
            </>
          }
          subtitle="We run meetups, hackathons, and industry sessions. Stay tuned for what's next."
        />

        <div className="max-w-5xl mx-auto">
          <Link href={`/events/${featuredEvent.slug}`}>
            <div className="group relative rounded-3xl border border-white/10 bg-[#0D0D1F]/60 backdrop-blur-md overflow-hidden hover:border-[#7C3AED]/50 transition-all duration-500 hover:shadow-[0_0_80px_rgba(124,58,237,0.15)] flex flex-col md:flex-row items-center cursor-pointer">

              {/* Image Section (Left) */}
              <div className="relative w-full md:w-[450px] aspect-square flex-shrink-0 overflow-hidden bg-white/5">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <Image
                  src={featuredEvent.posterImage}
                  alt={featuredEvent.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content Section (Right) */}
              <div className="p-8 md:p-10 flex flex-col justify-center flex-grow relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C3AED]/15 blur-3xl rounded-full" />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#A78BFA] text-xs font-bold tracking-widest uppercase mb-4 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-pulse" />
                  Coming Soon
                </div>

                <h3 className="font-sora text-3xl font-bold text-white mb-2 group-hover:text-[#06B6D4] transition-colors">
                  {featuredEvent.title}
                </h3>

                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {featuredEvent.description}
                </p>

                <div className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-[#06B6D4]" />
                    {featuredEvent.date}
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                    <MapPin className="w-4 h-4 text-[#06B6D4]" />
                    {featuredEvent.venue}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <div className="text-white font-semibold text-sm">
                    Unstop / Hack2Skill
                  </div>
                  <div className="text-[#06B6D4] font-semibold text-sm group-hover:translate-x-2 transition-transform flex items-center gap-2">
                    View Event Details →
                  </div>
                </div>
              </div>

            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
