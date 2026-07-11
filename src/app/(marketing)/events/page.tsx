import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { EventsExplorer, EventListItem } from "@/components/events/EventsExplorer";
import { CTABanner } from "@/components/shared/CTABanner";
import { Users, Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

interface EventRow {
  id: string; slug: string; title: string; description: string; category: string;
  location: string | null; isOnline: boolean; startAt: Date; status: string;
}

export default async function EventsPage() {
  const [allEvents, featuredEvent, pastEvents]: [EventRow[], EventRow | null, EventRow[]] = await Promise.all([
    prisma.event.findMany({ orderBy: { startAt: "asc" } }),
    prisma.event.findFirst({ where: { featured: true }, orderBy: { startAt: "asc" } }),
    prisma.event.findMany({ where: { status: "COMPLETED" }, orderBy: { startAt: "desc" }, take: 5 }),
  ]);

  const events: EventListItem[] = allEvents.map((e: EventRow) => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    description: e.description,
    category: e.category,
    location: e.location,
    isOnline: e.isOnline,
    startAt: e.startAt.toISOString(),
    status: e.status,
  }));

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <PageHero
        eyebrow="Events"
        title={<>Explore Events. Learn. Build. <span className="gold-text">Grow.</span></>}
        subtitle="Join hackathons, workshops, meetups and more. Connect, collaborate and create impact."
      >
        <a href="#event-list" className="px-8 py-3.5 rounded-full text-sm font-bold text-black bg-gradient-to-r from-[var(--ch-gold-700)] to-[var(--ch-gold-500)] inline-block">
          Browse Events
        </a>
      </PageHero>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 grid lg:grid-cols-3 gap-10" id="event-list">
        <div className="lg:col-span-2">
          <EventsExplorer events={events} />
        </div>

        <aside className="space-y-6">
          {featuredEvent && (
            <div className="rounded-2xl bg-gradient-to-br from-[#1a1608] to-[#0D0D1F] border border-[var(--ch-gold-700)]/40 p-5">
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-black bg-[var(--ch-gold-500)] px-2.5 py-1 rounded-full mb-3">
                Featured Event
              </span>
              <h3 className="font-sora font-bold text-white mb-2">{featuredEvent.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{featuredEvent.description}</p>
              <div className="flex flex-col gap-1.5 text-xs text-gray-400 mb-4">
                <span className="flex items-center gap-2"><Calendar size={12} className="text-[var(--ch-gold-500)]" />
                  {featuredEvent.startAt.toLocaleDateString()}</span>
                <span className="flex items-center gap-2"><MapPin size={12} className="text-[var(--ch-gold-500)]" />
                  {featuredEvent.isOnline ? "Online" : featuredEvent.location ?? "TBA"}</span>
              </div>
              <Link href={`/events/${featuredEvent.slug}`} className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--ch-gold-500)] text-black font-bold text-sm">
                Register Now <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {pastEvents.length > 0 && (
            <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-5">
              <h4 className="font-sora font-semibold text-white text-sm mb-4">Past Events</h4>
              <div className="space-y-3">
                {pastEvents.map((e: EventRow) => (
                  <div key={e.id} className="text-sm">
                    <div className="text-gray-300">{e.title}</div>
                    <div className="text-gray-600 text-xs">{e.startAt.toLocaleDateString()} · {e.isOnline ? "Online" : e.location}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <CTABanner
        icon={<Users className="w-5 h-5 text-[var(--ch-gold-500)]" />}
        title="Don't miss out on amazing opportunities!"
        subtitle="Join our community and stay updated with the latest events."
        buttonLabel="Join Community"
        href="/testimonials"
      />
    </main>
  );
}
