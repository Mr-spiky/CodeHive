"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { COMMUNITY_LINK } from "@/lib/data/constants";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#05050F]/90 backdrop-blur-md border-b border-[var(--ch-border)]">
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-sora font-bold text-lg hover:opacity-80 transition-opacity">
          <Image src="/image/logo.png" alt="CodeHive Logo" width={32} height={32} className="object-contain" />
          CodeHive
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-[var(--ch-gold-500)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={COMMUNITY_LINK}
            className="px-5 py-2.5 rounded-full text-sm font-bold text-black bg-gradient-to-r from-[var(--ch-gold-700)] to-[var(--ch-gold-500)] hover:scale-105 transition-transform"
          >
            Join Community &rarr;
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 border-t border-[var(--ch-border)]">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-300" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <a href={COMMUNITY_LINK} className="px-5 py-2.5 rounded-full text-sm font-bold text-black bg-[var(--ch-gold-500)] text-center">
            Join Community
          </a>
        </div>
      )}
    </header>
  );
}
