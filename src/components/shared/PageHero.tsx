import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode; // CTAs / badges
  illustration?: ReactNode;
}

// Shared hero shape used identically across Events/Team/Blog/Testimonials:
// eyebrow label -> two-line headline -> subtitle -> optional CTAs -> illustration slot.
export function PageHero({ eyebrow, title, subtitle, children, illustration }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#05050F] pt-36 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[var(--ch-gold-700)]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-[var(--ch-gold-500)] mb-4 block">
            {eyebrow}
          </span>
          <h1 className="font-sora text-4xl md:text-5xl font-extrabold text-white leading-tight mb-5">
            {title}
          </h1>
          <p className="text-gray-400 text-lg max-w-lg mb-8">{subtitle}</p>
          {children}
        </div>
        {illustration && <div className="hidden lg:block">{illustration}</div>}
      </div>
    </section>
  );
}
