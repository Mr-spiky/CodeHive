"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HexIcon, GoldButton } from "./ui";
import { NAV_LINKS } from "@/lib/codehive/data";
import { COMMUNITY_LINK } from "@/lib/codehive/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#C9A227]/20 shadow-lg shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <HexIcon text="CH" size={36} fontSize={12} className="group-hover:drop-shadow-[0_0_8px_#C9A227] transition-all duration-300" />
          <span className="text-white font-bold text-lg tracking-widest uppercase font-sora group-hover:text-[#C9A227] transition-colors duration-300">
            CodeHive
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-[#C9A227] text-sm font-medium tracking-wide transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C9A227] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <GoldButton href={COMMUNITY_LINK} className="px-5 py-2 text-sm hover:scale-105 active:scale-95 shadow-none">
            Join Now
          </GoldButton>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-[#C9A227] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="nav-mobile-toggle"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#C9A227]/20 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-[#C9A227] text-sm font-medium transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <GoldButton
            href={COMMUNITY_LINK}
            className="mt-2 text-center px-5 py-2.5 text-sm w-full justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Join Now
          </GoldButton>
        </div>
      )}
    </nav>
  );
}
