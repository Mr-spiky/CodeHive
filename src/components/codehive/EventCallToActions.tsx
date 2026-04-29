"use client";

import type { CodeHiveEvent } from "@/lib/codehive/types";
import { Mic2, Handshake, Users } from "lucide-react";
import { BorderGlow } from "./ui";

// Per-card theming — pulled from the poster's color palette + BorderGlow config
const CTA_THEMES = [
  {
    // Call for Speakers — Electric Red
    iconBg: "bg-[#E63946]/15",
    iconColor: "text-[#FF6B78]",
    linkColor: "text-[#FF6B78] hover:text-[#FF9CA3]",
    accentColor: "#E63946",
    // BorderGlow props
    colors: ["#E63946", "#ff6b9d", "#FF8C94"] as string[],
    glowColor: "356 85 58",
    backgroundColor: "#0e0608",
  },
  {
    // Call for Sponsors — Cobalt Blue
    iconBg: "bg-[#1D6FE8]/15",
    iconColor: "text-[#60A5FA]",
    linkColor: "text-[#60A5FA] hover:text-[#93C5FD]",
    accentColor: "#1D6FE8",
    // BorderGlow props
    colors: ["#1D6FE8", "#60A5FA", "#818CF8"] as string[],
    glowColor: "220 80 58",
    backgroundColor: "#060a10",
  },
  {
    // Community Partners — Teal/Cyan
    iconBg: "bg-[#00B4D8]/15",
    iconColor: "text-[#22D3EE]",
    linkColor: "text-[#22D3EE] hover:text-[#67E8F9]",
    accentColor: "#00B4D8",
    // BorderGlow props
    colors: ["#00B4D8", "#22D3EE", "#2EC4B6"] as string[],
    glowColor: "192 100 42",
    backgroundColor: "#020e10",
  },
];

export function EventCallToActions({ event }: { event?: CodeHiveEvent }) {
  const ctas = [
    {
      title: "Call for Speakers",
      description: "Are you an industry expert, founder, or tech leader? Share your insights, journey, and expertise with our growing community of builders and innovators.",
      icon: Mic2,
      link: "#speaker-form",
      actionText: "Apply as Speaker",
    },
    {
      title: "Call for Sponsors",
      description: "Partner with us to empower the next generation of tech talent. Get direct access to top developers, brand visibility, and community goodwill.",
      icon: Handshake,
      link: "#sponsor-form",
      actionText: "Become a Sponsor",
    },
    {
      title: "Community Partners",
      description: "Run a tech club, community, or developer group? Partner with CodeHive to co-host, cross-promote, and bring massive value to your members.",
      icon: Users,
      link: "#partner-form",
      actionText: "Join as Partner",
    },
  ];

  return (
    <section className="py-24 bg-[#050510] border-t border-white/5 relative overflow-hidden">
      {/* Ambient multi-color glows mirroring the poster */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-[#E63946]/8 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#1D6FE8]/8 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#00B4D8]/6 blur-[100px] pointer-events-none" />

      {/* Decorative geometric shapes echoing the poster */}
      <div className="absolute top-12 right-[5%] w-24 h-24 border-4 border-[#E63946]/20 rotate-12 rounded-sm" />
      <div className="absolute bottom-12 left-[5%] w-16 h-16 border-4 border-[#00B4D8]/20 rotate-45" />
      <div className="absolute top-1/3 left-[3%] w-8 h-8 bg-[#F4A227]/15 rounded-full" />
      <div className="absolute bottom-1/4 right-[8%] w-10 h-10 bg-[#2EC4B6]/15 rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F4A227] animate-pulse" />
            Get Involved
          </div>
          <h2 className="font-sora text-3xl md:text-5xl font-extrabold text-white mb-6">
            Be Part of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] via-[#F4A227] to-[#1D6FE8]">
              The Big Shift
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We are looking for passionate individuals and organizations to collaborate with us and make{" "}
            <span className="text-white font-semibold">
              {event ? event.title : "our community and upcoming initiatives"}
            </span>{" "}
            a massive success.
          </p>
        </div>

        {/* CTA Cards — BorderGlow on each */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ctas.map((cta, idx) => {
            const theme = CTA_THEMES[idx];
            return (
              <BorderGlow
                key={idx}
                colors={theme.colors}
                glowColor={theme.glowColor}
                backgroundColor={theme.backgroundColor}
                borderRadius={16}
                glowRadius={36}
                glowIntensity={1.2}
                edgeSensitivity={25}
                coneSpread={28}
                className="group h-full cursor-default"
              >
                <div className="p-8 md:p-10 flex flex-col h-full relative overflow-hidden">
                  {/* Corner accent bar */}
                  <div
                    className="absolute top-0 left-0 w-20 h-[3px] rounded-br-full"
                    style={{ background: `linear-gradient(to right, ${theme.accentColor}, transparent)` }}
                  />

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <cta.icon className={`w-7 h-7 ${theme.iconColor}`} />
                  </div>

                  <h3 className="text-white font-sora text-2xl font-bold mb-4">
                    {cta.title}
                  </h3>
                  <p className="text-slate-400 flex-grow leading-relaxed mb-8 text-sm md:text-base">
                    {cta.description}
                  </p>

                  <a
                    href={cta.link}
                    className={`inline-flex items-center ${theme.linkColor} font-semibold text-sm transition-colors group/link`}
                  >
                    {cta.actionText}{" "}
                    <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </BorderGlow>
            );
          })}
        </div>

      </div>
    </section>
  );
}
