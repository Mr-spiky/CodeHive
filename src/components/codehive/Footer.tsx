import { GoldButton, HexIcon } from "./ui";
import { QUICK_LINKS, CONTACT_ITEMS, SOCIAL_LINKS } from "@/lib/codehive/data";
import { COMMUNITY_LINK } from "@/lib/codehive/constants";
import Link from "next/link";

// ─── Social Icons ─────────────────────────────────────────────
function SocialIcon({ type }: { type: string }) {
  switch (type) {
    case "whatsapp":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "discord":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    default:
      return null;
  }
}

// ─── Footer ───────────────────────────────────────────────────
export function Footer() {
  const year = new Date().getFullYear();

  // Convert the SOCIAL_LINKS object into an array for rendering
  const socialEntries = [
    { id: "footer-whatsapp", label: "WhatsApp", targetKey: "whatsapp" },
    { id: "footer-discord", label: "Discord", targetKey: "discord" },
    { id: "footer-linkedin", label: "LinkedIn", targetKey: "linkedin" },
  ];

  return (
    <footer className="bg-[#060606] border-t border-[#C9A227]/15 relative overflow-hidden">
      {/* Glow above footer line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Socials */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <HexIcon text="CH" size={36} fontSize={12} />
              <span className="text-white font-bold text-lg tracking-widest uppercase font-sora">
                CodeHive
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              India's most execution-driven student-led tech community. Build. Connect. Grow.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialEntries.map((s) => (
                <a
                  key={s.id}
                  id={s.id}
                  href={SOCIAL_LINKS[s.targetKey as keyof typeof SOCIAL_LINKS]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl border border-[#C9A227]/20 bg-[#111111] flex items-center justify-center text-gray-400 hover:text-[#C9A227] hover:border-[#C9A227]/50 hover:bg-[#C9A227]/10 transition-all duration-300"
                >
                  <SocialIcon type={s.targetKey} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sora text-white font-semibold text-sm tracking-widest uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-[#C9A227] text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-[#C9A227] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & CTA */}
          <div>
            <h4 className="font-sora text-white font-semibold text-sm tracking-widest uppercase mb-5">
              Contact
            </h4>
            <div className="space-y-3">
              {CONTACT_ITEMS.map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-gray-500 text-sm">
                  <span className="text-[#C9A227]">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <GoldButton id="footer-join-cta" href={COMMUNITY_LINK} className="px-5 py-2.5 text-sm">
                Join Community →
              </GoldButton>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#C9A227]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center md:text-left">
            © {year} CodeHive. All rights reserved. Built with ❤️ by the CodeHive team.
          </p>
          <p className="text-gray-600 text-xs flex items-center justify-center md:justify-end gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] animate-pulse" />
            2000+ members strong & growing
          </p>
        </div>
      </div>
    </footer>
  );
}
