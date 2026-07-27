import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface FeaturedEventCardProps {
  title: string;
  description: string;
  location: string;
  startAt: Date;
  slug: string;
}

// Real event data only - passed in from a Prisma query in page.tsx,
// this component never invents its own event content.
export function FeaturedEventCard({ title, description, location, startAt, slug }: FeaturedEventCardProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#1a1608] to-[#0D0D1F] border border-[var(--ch-gold-700)]/40 p-6 h-full flex flex-col">
      <span className="inline-block w-fit text-[10px] font-bold tracking-widest uppercase text-black bg-[var(--ch-gold-500)] px-2.5 py-1 rounded-full mb-4">
        Featured Event
      </span>
      <h3 className="font-sora text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-5 flex-1">{description}</p>
      <div className="flex flex-col gap-2 text-sm text-gray-400 mb-6">
        <span className="flex items-center gap-2">
          <Calendar size={14} className="text-[var(--ch-gold-500)]" />
          {startAt.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
        </span>
        <span className="flex items-center gap-2">
          <MapPin size={14} className="text-[var(--ch-gold-500)]" />
          {location}
        </span>
      </div>
      <Link
        href={`/events/${slug}`}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[var(--ch-gold-700)] to-[var(--ch-gold-500)] text-black font-bold text-sm hover:scale-[1.02] transition-transform"
      >
        Register Now <ArrowRight size={16} />
      </Link>
    </div>
  );
}
