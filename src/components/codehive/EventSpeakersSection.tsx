"use client";

import { CodeHiveEvent } from "@/lib/codehive/types";
import { SectionHeader, StarBorder } from "./ui";
import { Linkedin, Twitter, User } from "lucide-react";

export function EventSpeakersSection({ event }: { event: CodeHiveEvent }) {
  if (!event.speakers || event.speakers.length === 0) return null;

  return (
    <section className="py-24 bg-[#050510] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1D6FE8]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <SectionHeader
          badge="Event Lineup"
          title={
             <>Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D6FE8] to-[#2EC4B6]">Speakers</span></>
          }
          subtitle="Learn directly from industry leaders, founders, and experts who have been exactly where you are."
        />

        <div className="relative mt-16 max-w-5xl mx-auto">
          {/* Revealing Soon Overlay */}
          <div className="absolute inset-[-20px] z-50 flex flex-col items-center justify-center backdrop-blur-md bg-[#050510]/50 rounded-[2rem] border border-white/5">
            <h3 className="text-3xl md:text-5xl font-bold font-sora text-white tracking-wide drop-shadow-lg">
              Revealing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D6FE8] to-[#2EC4B6]">Soon</span>
            </h3>
            <p className="text-gray-300 mt-4 font-medium text-lg drop-shadow-md">Stay tuned for an epic lineup.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-none opacity-60">
            {event.speakers.map((speaker) => (
             <StarBorder 
               key={speaker.id} 
               as="div"
               color="#1D6FE8"
               speed="5s"
               thickness={2}
               className="group hover:shadow-[0_0_40px_rgba(29,111,232,0.15)] transition-shadow duration-500 w-full h-full"
             >
               <div className="p-8 text-center flex flex-col items-center h-full relative">
                 {/* Hover Glow */}
                 <div className="absolute inset-0 bg-gradient-to-b from-[#1D6FE8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]" />

                 {/* Avatar */}
                 <div className="relative w-32 h-32 mx-auto mb-6">
                   {/* Decorative rings */}
                   <div className="absolute inset-[-10px] rounded-full border border-dashed border-white/10 group-hover:border-[#1D6FE8]/30 group-hover:rotate-180 transition-all duration-1000" />
                   <div className="absolute inset-[-5px] rounded-full border border-white/5 group-hover:border-[#2EC4B6]/30 transition-colors duration-500" />
                   
                   <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/10 flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-500">
                      {speaker.image ? (
                       // eslint-disable-next-line @next/next/no-img-element
                       <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" />
                    ) : (
                         <User className="w-12 h-12 text-gray-500 group-hover:text-[#1D6FE8] transition-colors" />
                      )}
                   </div>
                 </div>

                 {/* Info */}
                 <h3 className="text-xl font-bold font-sora text-white mb-2 relative z-10">{speaker.name}</h3>
                 <p className="text-[#1D6FE8] font-medium text-sm mb-1 relative z-10">{speaker.role}</p>
                 {speaker.company && (
                   <p className="text-gray-400 text-sm mb-6 relative z-10">{speaker.company}</p>
                 )}

                 {/* Socials */}
                 <div className="flex items-center justify-center gap-3 relative z-10 mt-auto">
                   {speaker.linkedin && (
                     <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0077B5]/20 hover:border-[#0077B5]/50 transition-all">
                       <Linkedin className="w-4 h-4" />
                     </a>
                   )}
                   {speaker.twitter && (
                     <a href={speaker.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/50 transition-all">
                       <Twitter className="w-4 h-4" />
                     </a>
                   )}
                 </div>
               </div>
             </StarBorder>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
