"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
          ? "bg-[#05050F]/90 backdrop-blur-xl border-b border-[#7C3AED]/20 shadow-lg shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/image/logo.png" 
            alt="CodeHive Logo" 
            width={40} 
            height={40} 
            className="group-hover:drop-shadow-[0_0_8px_#C9A227] transition-all duration-300"
          />
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
              className="text-gray-400 hover:text-[#7C3AED] text-sm font-medium tracking-wide transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#7C3AED] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href={COMMUNITY_LINK}
            className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Join Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-[#7C3AED] transition-colors"
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
        <div className="md:hidden bg-[#05050F]/95 backdrop-blur-xl border-b border-[#7C3AED]/20 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-[#7C3AED] text-sm font-medium transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={COMMUNITY_LINK}
            className="mt-2 text-center px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] w-full justify-center transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Join Now
          </Link>
        </div>
      )}
    </nav>
  );
}
