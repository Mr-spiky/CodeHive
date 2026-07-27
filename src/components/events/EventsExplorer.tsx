"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Calendar, MapPin, Users } from "lucide-react";

export interface EventListItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  location: string | null;
  isOnline: boolean;
  startAt: string; // serialized date
  status: string;
}

const TABS = ["All Events", "Hackathon", "Workshop", "Meetup", "Webinar", "Bootcamp"];

// Real client-side filtering over actually-fetched events - search/category
// filters here genuinely narrow the list, they're not decorative UI.
export function EventsExplorer({ events }: { events: EventListItem[] }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All Events");

  const upcoming = events.filter((e) => e.status === "UPCOMING" || e.status === "LIVE");

  const filtered = useMemo(() => {
    return upcoming.filter((e) => {
      const matchesTab = tab === "All Events" || e.category.toLowerCase() === tab.toLowerCase();
      const matchesQuery = e.title.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [upcoming, tab, query]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-[#0D0D1F] border border-[var(--ch-border)] text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[var(--ch-gold-500)]"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tab === t ? "bg-[var(--ch-gold-500)] text-black" : "bg-[#0D0D1F] text-gray-400 border border-[var(--ch-border)] hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-500 text-sm py-12 text-center">No events match your search.</p>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        {filtered.map((event) => (
          <div key={event.id} className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-5 hover:border-[var(--ch-gold-500)]/40 transition-colors">
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[var(--ch-gold-500)] bg-[var(--ch-gold-700)]/15 px-2.5 py-1 rounded-full mb-3">
              {event.category}
            </span>
            <h3 className="font-sora font-bold text-white text-lg mb-2">{event.title}</h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{event.description}</p>
            <div className="flex flex-col gap-1.5 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-2">
                <Calendar size={12} className="text-[var(--ch-gold-500)]" />
                {new Date(event.startAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={12} className="text-[var(--ch-gold-500)]" />
                {event.isOnline ? "Online" : event.location ?? "TBA"}
              </span>
            </div>
            <Link href={`/events/${event.slug}`} className="text-sm font-semibold text-[var(--ch-gold-500)] hover:underline">
              View Details &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
