"use client";

import { useEffect, useState } from "react";
import { COMMUNITY_LINK } from "@/lib/codehive/constants";
import Link from "next/link";
import { Users } from "lucide-react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05050F]">
      
      {/* ─── Animated Gradient Mesh Background ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#7C3AED]/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#06B6D4]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-[#10B981]/10 rounded-full blur-[160px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7C3AED]/5 rounded-full blur-[200px]" />
      </div>

      {/* Grid overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ─── Floating Role Badges ─── */}
      {mounted && (
        <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
          <div className="absolute top-[25%] left-[15%] animate-float" style={{ animationDelay: '0s' }}>
            <span className="px-4 py-2 rounded-full bg-[#111122]/80 border border-[#06B6D4]/30 text-[#06B6D4] text-sm font-medium backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              &lt;Developer /&gt;
            </span>
          </div>
          <div className="absolute top-[30%] right-[15%] animate-float" style={{ animationDelay: '2s' }}>
            <span className="px-4 py-2 rounded-full bg-[#111122]/80 border border-[#7C3AED]/30 text-[#A78BFA] text-sm font-medium backdrop-blur-md shadow-[0_0_20px_rgba(124,58,237,0.15)]">
              Founder 🚀
            </span>
          </div>
          <div className="absolute bottom-[25%] left-[20%] animate-float" style={{ animationDelay: '1.5s' }}>
            <span className="px-4 py-2 rounded-full bg-[#111122]/80 border border-[#10B981]/30 text-[#34D399] text-sm font-medium backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              Designer ✨
            </span>
          </div>
          <div className="absolute bottom-[30%] right-[20%] animate-float" style={{ animationDelay: '3.5s' }}>
            <span className="px-4 py-2 rounded-full bg-[#111122]/80 border border-[#EC4899]/30 text-[#F472B6] text-sm font-medium backdrop-blur-md shadow-[0_0_20px_rgba(236,72,153,0.15)]">
              Creator 🎨
            </span>
          </div>
        </div>
      )}

      {/* ─── Content ─── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        
        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-white text-sm font-medium mb-8 animate-fade-in-up backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
          </span>
          2,000+ builders currently active
        </div>

        {/* Headline */}
        <h1 className="font-sora text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-6 animate-fade-in-up tracking-tight [animation-delay:0.1s]">
          Build.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]">
            Connect.
          </span>
          <br />
          Grow{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#10B981]">
            Together.
          </span>
        </h1>
        
        {/* Sub-heading */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up [animation-delay:0.2s] leading-relaxed">
          India's most execution-driven student-led tech community. We don't just learn — <span className="text-white font-medium">we ship.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up [animation-delay:0.3s]">
          <Link
            href={COMMUNITY_LINK}
            id="hero-join-cta"
            className="group relative px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#06B6D4] rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:scale-105 active:scale-95 w-full sm:w-auto overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Join the Community
            </span>
          </Link>
          <a
            href="#events"
            id="hero-explore-cta"
            className="px-8 py-4 text-base font-semibold text-white border border-white/10 rounded-full hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/10 transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto backdrop-blur-sm"
          >
            View Upcoming Events
          </a>
        </div>

        {/* Social Proof Marquee (Optional, fades in later) */}
        <div className="mt-20 pt-8 border-t border-white/5 animate-fade-in-up [animation-delay:0.5s]">
          <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-6">Members from</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text for now, can replace with images later */}
            <span className="text-xl font-sora font-bold">GeeksforGeeks</span>
            <span className="text-xl font-sora font-bold">Hack2Skill</span>
            <span className="text-xl font-sora font-bold">Delhi NCR</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <svg className="w-5 h-5 text-[#7C3AED]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
