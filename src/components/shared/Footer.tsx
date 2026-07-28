import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/data/constants";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
];

const COMMUNITY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/code-of-conduct", label: "Code of Conduct" },
  { href: "/join", label: "Join Community" },
  { href: "/partners", label: "Partners" },
];

const SUPPORT_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

// Real handles - only verified platforms included
const SOCIALS = [
  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
  { icon: Mail, href: SOCIAL_LINKS.email, label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-[#05050F] border-t border-[var(--ch-border)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          <div className="lg:col-span-3 sm:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-sora font-bold text-lg mb-4 hover:opacity-80 transition-opacity w-fit">
              <Image src="/image/logo.png" alt="CodeHive Logo" width={32} height={32} className="object-contain" />
              CodeHive
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              A student-driven developer community to learn, build and grow together.
            </p>
          </div>

          <div className="lg:col-span-2 sm:col-span-1">
            <FooterColumn title="Quick Links" links={QUICK_LINKS} />
          </div>
          <div className="lg:col-span-2 sm:col-span-1">
            <FooterColumn title="Community" links={COMMUNITY_LINKS} />
          </div>
          <div className="lg:col-span-2 sm:col-span-1">
            <FooterColumn title="Support" links={SUPPORT_LINKS} />
          </div>

          <div className="lg:col-span-3 sm:col-span-2">
            <h4 className="font-sora font-semibold text-sm text-white mb-4">Subscribe to our newsletter</h4>
            <p className="text-sm text-gray-500 mb-3">Get the latest updates on events and announcements.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-[#0D0D1F] border border-[var(--ch-border)] text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--ch-gold-500)]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[var(--ch-gold-500)] text-black text-sm font-bold whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--ch-border)]">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} CodeHive. All rights reserved.</p>
          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[var(--ch-gold-500)] hover:border-[var(--ch-gold-500)]/50 transition-all"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-sora font-semibold text-sm text-white mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-gray-500 hover:text-[var(--ch-gold-500)] transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
