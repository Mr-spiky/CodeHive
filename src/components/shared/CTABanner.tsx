import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  buttonLabel: string;
  href: string;
}

export function CTABanner({ icon, title, subtitle, buttonLabel, href }: CTABannerProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="rounded-3xl bg-gradient-to-r from-[#1a1608] via-[#14142B] to-[#1a1608] border border-[var(--ch-gold-700)]/30 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          {icon && (
            <div className="w-12 h-12 rounded-full bg-[var(--ch-gold-500)]/15 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-sora text-xl font-bold text-white">{title}</h3>
            {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
        <a
          href={href}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[var(--ch-gold-700)] to-[var(--ch-gold-500)] text-black font-bold text-sm whitespace-nowrap hover:scale-105 transition-transform"
        >
          {buttonLabel}
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
