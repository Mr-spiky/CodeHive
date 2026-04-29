import { Navbar } from "@/components/codehive/Navbar";
import { Footer } from "@/components/codehive/Footer";
import { EVENTS } from "@/lib/codehive/eventsData";
import { SectionHeader, GoldText } from "@/components/codehive/ui";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export const metadata = {
  title: "Events | CodeHive",
  description: "Join upcoming hackathons, industry networking sessions, and meetups organized by CodeHive.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />
      
      <div className="pt-32 pb-24 flex-grow relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C9A227]/5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <SectionHeader
            badge="All Events"
            title={
              <>
                Our <GoldText>Events</GoldText>
              </>
            }
            subtitle="Discover all past, present, and future events organized by CodeHive."
          />

          <div className="max-w-6xl mx-auto mt-12 w-full">
            {/* Featured Event (First one) */}
            {EVENTS.length > 0 && (
              <div className="mb-16">
                <Link href={`/events/${EVENTS[0].slug}`} className="group block">
                  <div className="relative rounded-3xl border border-white/10 bg-[#111111] overflow-hidden hover:border-[#C9A227]/50 transition-all duration-500 hover:shadow-[0_8px_40px_rgb(201,162,39,0.15)] flex flex-col md:flex-row min-h-[400px]">
                    
                    {/* Image Section */}
                    <div className="relative w-full md:w-[55%] aspect-[4/3] md:aspect-auto overflow-hidden bg-[#0A0A0A]">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#111111] z-10 hidden md:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-10 md:hidden" />
                      <Image 
                        src={EVENTS[0].bannerImage || EVENTS[0].posterImage}
                        alt={EVENTS[0].title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {EVENTS[0].status === "upcoming" && (
                        <div className="absolute top-6 left-6 z-20 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#C9A227] to-[#e6c555] text-black text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(201,162,39,0.5)]">
                          Upcoming Event
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12 flex flex-col justify-center w-full md:w-[45%] relative z-20 bg-[#111111]">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {EVENTS[0].tags?.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#C9A227] transition-colors">
                        {EVENTS[0].title}
                      </h3>
                      
                      <p className="text-gray-400 text-base md:text-lg mb-8 line-clamp-3 leading-relaxed">
                        {EVENTS[0].description}
                      </p>

                      <div className="flex flex-col gap-4 mt-auto pt-6 border-t border-white/5">
                        <div className="flex items-center gap-4 text-gray-300 font-medium">
                          <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                            <Calendar className="w-5 h-5 text-[#C9A227]" />
                          </div>
                          <span className="text-base">{EVENTS[0].date}</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300 font-medium">
                          <div className="w-10 h-10 rounded-full bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5 text-[#C9A227]" />
                          </div>
                          <span className="text-base truncate">{EVENTS[0].venue}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            )}

            {/* Other Events Grid */}
            {EVENTS.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {EVENTS.slice(1).map((event) => (
                  <Link href={`/events/${event.slug}`} key={event.id} className="block group">
                    <div className="h-full relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden hover:border-[#C9A227]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col hover:shadow-[0_8px_30px_rgb(201,162,39,0.1)]">
                      
                      {/* Image Container */}
                      <div className="relative w-full aspect-video overflow-hidden bg-[#0A0A0A]">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-10 opacity-90" />
                        <Image 
                          src={event.bannerImage || event.posterImage}
                          alt={event.title}
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {event.status === "upcoming" && (
                          <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#C9A227]/90 text-black text-[10px] font-bold tracking-wider uppercase">
                            Upcoming
                          </div>
                        )}
                      </div>

                      {/* Content Container */}
                      <div className="p-6 flex flex-col flex-grow bg-[#111111]/90 backdrop-blur-sm relative z-20 -mt-2 rounded-t-3xl border-t border-white/5">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.tags?.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3 className="font-sora text-xl font-bold text-white mb-2 group-hover:text-[#C9A227] transition-colors">
                          {event.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-white/5">
                          <div className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                            <div className="w-7 h-7 rounded-full bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                              <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                            </div>
                            {event.date}
                          </div>
                          <div className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                            <div className="w-7 h-7 rounded-full bg-[#C9A227]/10 flex items-center justify-center shrink-0">
                              <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                            </div>
                            <span className="truncate">{event.venue}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
