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
  const radius = 170; // Slightly larger for realistic spacing
  const center = 230; // 460x460 container
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto select-none">
      {/* SVG Connecting Laser Lines & Data Packets */}
      <svg viewBox="0 0 460 460" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        <defs>
          <linearGradient id="laserGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="460" y2="460">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F4A227" stopOpacity="0.15" />
          </linearGradient>
          <filter id="glow" filterUnits="userSpaceOnUse" x="-50" y="-50" width="560" height="560">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {ORBIT_NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = center + radius * Math.cos(rad);
          const y = center + radius * Math.sin(rad);
          const isHovered = hoveredNode === i;

          return (
            <g key={i}>
              {/* Base Line */}
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={isHovered ? "#FFD700" : "#C9A227"}
                strokeWidth={isHovered ? "2.5" : "1.8"}
                strokeDasharray={isHovered ? "none" : "6 4"}
                strokeOpacity={isHovered ? "1" : "0.55"}
                filter="url(#glow)"
                className="transition-all duration-300"
              />

              {/* Animated Data Packet Pulse traveling from Center to Node */}
              <circle r="3" fill="#FFD700" filter="url(#glow)">
                <animateMotion
                  path={`M ${center} ${center} L ${x} ${y}`}
                  dur={`${2 + (i % 3) * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.3}s`}
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* 3D CORE HIVE REACTOR (NO TEXT) */}
      <div
        className="absolute flex items-center justify-center pointer-events-none"
        style={{ left: center - 70, top: center - 70, width: 140, height: 140 }}
      >
        {/* Deep Plasma Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--ch-gold-500)]/30 to-[var(--ch-gold-700)]/10 rounded-full blur-[40px] animate-pulse" />

        {/* Outer Hexagonal Wireframe Ring 1 */}
        <div
          className="absolute w-28 h-28 border border-[var(--ch-gold-400)]/50 shadow-[0_0_20px_rgba(255,215,0,0.25)] animate-[spin_16s_linear_infinite]"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />

        {/* Outer Hexagonal Wireframe Ring 2 */}
        <div
          className="absolute w-20 h-20 border border-dashed border-[var(--ch-gold-300)]/70 animate-[spin_10s_linear_infinite_reverse]"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />

        {/* The Solid Realistic 3D Core Gemstone (NO TEXT) */}
        <div
          className="relative w-16 h-16 shadow-[0_0_50px_rgba(255,215,0,0.9),inset_0_0_15px_rgba(255,255,255,0.8)] animate-float"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "linear-gradient(135deg, #FFF8DC 0%, #FFD700 35%, #B8860B 75%, #3A2500 100%)",
          }}
        >
          {/* Inner Facet Reflection */}
          <div
            className="absolute inset-1 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          />
        </div>
      </div>

      {/* Orbiting Realistic Nodes */}
      {ORBIT_NODES.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = center + radius * Math.cos(rad);
        const y = center + radius * Math.sin(rad);
        const Icon = node.icon;
        const isHovered = hoveredNode === i;

        return (
          <div
            key={node.label}
            onMouseEnter={() => setHoveredNode(i)}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute flex flex-col items-center gap-2 cursor-pointer group transition-all duration-300"
            style={{
              left: x - 45,
              top: y - 35,
              width: 90,
              zIndex: isHovered ? 30 : 10,
              transform: isHovered ? "scale(1.15) translateY(-4px)" : "scale(1)",
            }}
          >
            {/* Glassmorphic Cyber Tile */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-xl transition-all duration-300 relative overflow-hidden ${
                isHovered
                  ? "bg-[#16162C]/95 border-2 border-[var(--ch-gold-400)] shadow-[0_0_25px_rgba(255,215,0,0.6)]"
                  : "bg-[#090916]/85 border border-[var(--ch-gold-500)]/30 shadow-[0_4px_15px_rgba(0,0,0,0.8)] hover:border-[var(--ch-gold-500)]/60"
              }`}
            >
              {/* Subtle top light reflection */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--ch-gold-400)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <Icon
                className={`w-6 h-6 transition-transform duration-300 ${
                  isHovered ? "text-[var(--ch-gold-300)] scale-110" : "text-[var(--ch-gold-500)]"
                }`}
                strokeWidth={1.8}
              />
            </div>

            {/* Label with glow on hover */}
            <span
              className={`text-[11px] font-sora font-semibold tracking-wide text-center whitespace-nowrap transition-colors duration-300 ${
                isHovered ? "text-white drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" : "text-gray-400"
              }`}
            >
              {node.label}
            </span>
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
