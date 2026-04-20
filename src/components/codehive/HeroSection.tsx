"use client";

import { useEffect, useRef } from "react";
import { GoldButton, GoldText } from "./ui";
import { COMMUNITY_LINK } from "@/lib/codehive/constants";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; gold: boolean;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        gold: Math.random() > 0.65,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(201,162,39,${p.alpha})`
          : `rgba(255,255,255,${p.alpha * 0.4})`;
        ctx.fill();

        // draw connecting lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,162,39,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/Vedio/animate.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#0A0A0A]/80 z-0" />

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A227]/8 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C9A227]/6 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A227]/3 rounded-full blur-[160px]" />
      </div>

      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(201,162,39,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 text-[#C9A227] text-xs font-semibold tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-ping" />
          2000+ Active Members · India's Elite Tech Community
        </div>

        {/* Headline */}
        <h1 className="font-sora text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 animate-fade-in-up tracking-tight">
          Build.{" "}
          <span className="relative inline-block">
            <GoldText className="animate-gradient-x">Connect.</GoldText>
          </span>
          {" "}Grow
          <br />
          <GoldText className="animate-gradient-x">with CodeHive.</GoldText>
        </h1>
        
        {/* Dynamic sub-heading */}
        <h2 className="text-[#C9A227] text-xl md:text-2xl font-medium mb-8 animate-fade-in-up [animation-delay:0.2s]">
          Where builders don't just learn — they ship.
        </h2>

        {/* Micro-Stats Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10 pb-6 border-b border-[#C9A227]/15 w-fit mx-auto animate-fade-in-up [animation-delay:0.4s]">
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-sora font-semibold text-white">900+</span>
            <span className="text-gray-400 text-xs font-medium tracking-wider uppercase mt-1">Members</span>
          </div>
          <div className="w-px h-10 bg-[#C9A227]/20" />
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-sora font-semibold text-white">500+</span>
            <span className="text-gray-400 text-xs font-medium tracking-wider uppercase mt-1">Registrations</span>
          </div>
          <div className="w-px h-10 bg-[#C9A227]/20 hidden sm:block" />
          <div className="flex flex-col items-center w-full sm:w-auto mt-4 sm:mt-0">
            <span className="text-2xl md:text-3xl font-sora font-semibold text-white">5+</span>
            <span className="text-gray-400 text-xs font-medium tracking-wider uppercase mt-1">Collaborations</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up [animation-delay:0.6s]">
          <a
            href={COMMUNITY_LINK}
            id="hero-join-cta"
            className="group relative px-10 py-4 text-lg font-bold text-[#0A0A0A] bg-gradient-to-r from-[#C9A227] to-[#E5C84A] rounded-full transition-all duration-300 hover:shadow-[0_0_50px_rgba(201,162,39,0.7)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Join Community →</span>
          </a>
          <a
            href="#about"
            id="hero-explore-cta"
            className="px-10 py-4 text-lg font-semibold text-white border border-[#C9A227]/40 rounded-full hover:border-[#C9A227] hover:bg-[#C9A227]/10 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Explore More
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-[#C9A227]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
