import { notFound } from "next/navigation";
import { Navbar } from "@/components/codehive/Navbar";
import { Footer } from "@/components/codehive/Footer";
import { EVENTS } from "@/lib/codehive/eventsData";
import { EventHeroSection } from "@/components/codehive/EventHeroSection";
import { EventCallToActions } from "@/components/codehive/EventCallToActions";
import { EventSpeakersSection } from "@/components/codehive/EventSpeakersSection";

export function generateStaticParams() {
  return EVENTS.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const event = EVENTS.find((e) => e.slug === resolvedParams.slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#070711] flex flex-col">
      <Navbar />
      
      <div className="pt-0 flex-grow">
        <EventHeroSection event={event} />
        <EventSpeakersSection event={event} />
        <EventCallToActions event={event} />
      </div>

      <Footer />
    </main>
  );
}

