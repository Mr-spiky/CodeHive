"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, Trophy, Code2, Rocket, Network, GraduationCap, GitBranch } from "lucide-react";
import { COMMUNITY_LINK } from "@/lib/data/constants";

const ORBIT_NODES = [
  { label: "Hackathons", icon: Trophy, angle: -90 },
  { label: "Projects", icon: Rocket, angle: -30 },
  { label: "Networking", icon: Network, angle: 30 },
  { label: "Mentorship", icon: GraduationCap, angle: 90 },
  { label: "Open Source", icon: GitBranch, angle: 150 },
  { label: "Workshops", icon: Code2, angle: 210 },
];

function HiveConstellation() {
  const radius = 150;
  const center = 200;
  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto">
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none">
        {ORBIT_NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = center + radius * Math.cos(rad);
          const y = center + radius * Math.sin(rad);
          return (
            <line key={i} x1={center} y1={center} x2={x} y2={y}
              stroke="url(#hiveLineGradient)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
          );
        })}
        <defs>
          <linearGradient id="hiveLineGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#F4A227" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute flex items-center justify-center" style={{ left: center - 55, top: center - 55, width: 110, height: 110 }}>
        <div
          className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#C9A227] to-[#8B6914] shadow-[0_0_60px_rgba(244,162,39,0.4)]"
          style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
        >
          <span className="font-sora font-bold text-black text-sm text-center leading-tight">CodeHive</span>
        </div>
      </div>

      {ORBIT_NODES.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = center + radius * Math.cos(rad);
        const y = center + radius * Math.sin(rad);
        const Icon = node.icon;
        return (
          <div key={node.label} className="absolute flex flex-col items-center gap-1.5 animate-float"
            style={{ left: x - 42, top: y - 28, width: 84, animationDelay: `${i * 0.4}s` }}>
            <div className="w-12 h-12 rounded-2xl bg-[#111122]/90 border border-[#C9A227]/30 flex items-center justify-center backdrop-blur-md">
              <Icon className="w-5 h-5 text-[#F4A227]" strokeWidth={1.75} />
            </div>
            <span className="text-[10px] font-medium text-gray-300 text-center whitespace-nowrap">{node.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#05050F] pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#C9A227]/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#F4A227]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left">
          <h1 className="font-sora text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6 tracking-tight">
            Build.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] to-[#F4A227]">Connect.</span>
            <br />
            Grow{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4A227] to-[#B8860B]">Together.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            CodeHive is a student-driven developer community where ideas turn into impact.{" "}
            <span className="text-white font-medium">Join events, build projects, and grow with amazing people.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-5">
            <Link href={COMMUNITY_LINK} className="group relative px-8 py-4 text-base font-bold text-black bg-gradient-to-r from-[#C9A227] via-[#D4AF37] to-[#F4A227] rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(244,162,39,0.4)] hover:scale-105 active:scale-95 w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Users className="w-5 h-5" /> Join Community
              </span>
            </Link>
            <Link href="/events" className="px-8 py-4 text-base font-semibold text-white border border-white/10 rounded-full hover:border-[#F4A227]/50 hover:bg-[#F4A227]/10 transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto">
              Explore Events
            </Link>
          </div>
        </div>
        {mounted && <HiveConstellation />}
      </div>
    </section>
  );
}
