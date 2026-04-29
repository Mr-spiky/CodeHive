import Image from "next/image";
import type { CodeHiveEvent } from "@/lib/codehive/types";
import { Calendar, MapPin, CheckCircle2, Zap } from "lucide-react";

// Poster-extracted color palette for "The Big Shift 1.0"
// Red: #E63946 | Blue: #1D6FE8 | Teal/Cyan: #00B4D8 | Orange: #F4A227 | Green: #2EC4B6
const AUDIENCE_COLORS = [
  { dot: "bg-[#E63946]", border: "border-[#E63946]/40", glow: "shadow-[#E63946]/20" },
  { dot: "bg-[#1D6FE8]", border: "border-[#1D6FE8]/40", glow: "shadow-[#1D6FE8]/20" },
  { dot: "bg-[#00B4D8]", border: "border-[#00B4D8]/40", glow: "shadow-[#00B4D8]/20" },
  { dot: "bg-[#2EC4B6]", border: "border-[#2EC4B6]/40", glow: "shadow-[#2EC4B6]/20" },
];

export function EventHeroSection({ event }: { event: CodeHiveEvent }) {
  return (
    <section className="relative overflow-hidden bg-[#070711]">

      {/* ── Full-bleed cinematic banner ── */}
      {event.bannerImage && (
        <div className="relative w-full overflow-hidden mt-20">
          <div className="relative w-full" style={{ height: "clamp(200px, 35vw, 500px)" }}>
            <Image
              src={event.bannerImage}
              alt={`${event.title} Banner`}
              fill
              className="object-cover object-center"
              priority
            />
            {/* Gradient overlay: bottom fade blends into the dark page */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#070711]" />
            {/* Subtle side vignettes for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070711]/50 via-transparent to-[#070711]/50" />
          </div>
        </div>
      )}

      {/* Hero content — less top padding since banner handles spacing */}
      <div className={`relative ${event.bannerImage ? "pt-4 pb-24" : "pt-32 pb-24"} overflow-hidden`}>

        {/* ── Poster-themed ambient glows ── */}
        <div className="absolute -top-20 -left-20 w-[420px] h-[420px] bg-[#1D6FE8]/20 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-40 right-0 w-[340px] h-[340px] bg-[#E63946]/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-[#00B4D8]/10 blur-[100px] pointer-events-none rounded-full" />

        {/* ── Geometric accent shapes (mirroring the poster's confetti) ── */}
        <div className="absolute top-24 right-[12%] w-16 h-16 border-4 border-[#E63946]/50 rounded-sm rotate-12 animate-[spin_20s_linear_infinite]" />
        <div className="absolute top-48 right-[6%] w-10 h-10 bg-[#1D6FE8]/30 rounded-full" />
        <div className="absolute bottom-32 left-[8%] w-20 h-20 border-4 border-[#00B4D8]/40 rotate-45" />
        <div className="absolute top-36 left-[5%] w-8 h-8 bg-[#F4A227]/25 rounded-full" />
        <div className="absolute bottom-20 right-[15%] w-12 h-12 bg-[#2EC4B6]/20 rounded-sm rotate-6" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* ── Left Content ── */}
            <div className="flex flex-col items-start text-left">
              {/* Offline Event badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1D6FE8]/15 border border-[#1D6FE8]/40 text-[#60A5FA] text-xs font-bold tracking-widest uppercase mb-6">
                <Zap className="w-3.5 h-3.5 fill-[#60A5FA]" />
                Offline Tech Event
              </div>

              {/* Title */}
              <h1 className="font-sora text-5xl md:text-7xl font-extrabold text-white mb-4 leading-[1.05]">
                {event.title.split(" ").slice(0, 3).join(" ")}
                <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] via-[#F4A227] to-[#E63946] animate-[pulse_3s_ease-in-out_infinite]">
                    {event.title.split(" ").slice(3).join(" ")}
                  </span>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-slate-300 font-semibold mb-5">
                {event.subtitle}
              </p>

              <p className="text-slate-400 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
                {event.description}
              </p>

              {/* Date & Venue pills */}
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 text-white bg-[#1D6FE8]/10 border border-[#1D6FE8]/30 px-5 py-2.5 rounded-full backdrop-blur-sm">
                  <Calendar className="w-4 h-4 text-[#60A5FA]" />
                  <span className="text-sm font-semibold">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-white bg-[#00B4D8]/10 border border-[#00B4D8]/30 px-5 py-2.5 rounded-full backdrop-blur-sm">
                  <MapPin className="w-4 h-4 text-[#00B4D8]" />
                  <span className="text-sm font-semibold">{event.venue}</span>
                </div>
              </div>

              {/* Why Join */}
              <div className="space-y-4 mb-10 w-full max-w-md">
                <h3 className="text-white font-bold text-lg border-b border-white/10 pb-2 tracking-wide">
                  Why You Should Join
                </h3>
                <ul className="space-y-3">
                  {event.whyJoin.map((reason: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <CheckCircle2 className="w-5 h-5 text-[#2EC4B6] flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span className="text-slate-400 text-sm leading-relaxed group-hover/item:text-slate-200 transition-colors">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-base text-white overflow-hidden transition-all duration-300
                  bg-gradient-to-r from-[#E63946] to-[#c42d39]
                  shadow-[0_0_40px_rgba(230,57,70,0.4)]
                  hover:shadow-[0_0_70px_rgba(230,57,70,0.6)] hover:scale-[1.03]"
              >
                <span className="relative z-10">Register on Unstop</span>
                <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#c42d39] to-[#E63946] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              {event.isFree && (
                <p className="text-slate-500 text-sm mt-4 font-semibold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-pulse" />
                  Registration is Completely Free
                </p>
              )}
            </div>

            {/* ── Right Content — Poster ── */}
            <div className="relative group">
              {/* Multi-color halo behind poster */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#E63946]/30 via-[#1D6FE8]/20 to-[#00B4D8]/25 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

              {/* Poster frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/70 transform transition-all duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
                <Image
                  src={event.posterImage}
                  alt={event.title}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Subtle overlay shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating audience badges */}
              <div className="absolute -bottom-4 -left-8 md:-left-12 flex flex-col gap-3">
                {event.targetAudience.slice(0, 4).map((audience: string, idx: number) => {
                  const col = AUDIENCE_COLORS[idx % AUDIENCE_COLORS.length];
                  return (
                    <div
                      key={idx}
                      className={`bg-[#0D0D1A]/90 backdrop-blur-md border ${col.border} px-5 py-2.5 rounded-xl shadow-xl ${col.glow} flex items-center gap-3 transform transition-all hover:scale-105 hover:brightness-110`}
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${col.dot} animate-pulse`} />
                      <span className="text-white text-xs font-bold tracking-widest uppercase">{audience}</span>
                    </div>
                  );
                })}
              </div>

              {/* Powered by Unstop badge */}
              <div className="absolute -top-4 -right-4 bg-[#0D0D1A]/90 backdrop-blur-md border border-[#F4A227]/40 px-4 py-2 rounded-xl text-xs font-semibold text-[#F4A227] shadow-lg">
                Powered by Unstop
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
