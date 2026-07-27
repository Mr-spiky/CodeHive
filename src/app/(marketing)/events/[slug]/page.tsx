import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Calendar, MapPin } from "lucide-react";
import { EventRegisterButton } from "@/components/events/EventRegisterButton";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [event, user] = await Promise.all([
    prisma.event.findUnique({ where: { slug } }),
    getCurrentUser(),
  ]);
  if (!event) notFound();

  let isRegistered = false;
  if (user) {
    const reg = await prisma.eventRegistration.findUnique({
      where: { userId_eventId: { userId: user.id, eventId: event.id } },
    });
    isRegistered = !!reg;
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <span className="text-xs font-bold tracking-widest uppercase text-[var(--ch-gold-500)]">{event.category}</span>
        <h1 className="font-sora text-3xl md:text-4xl font-bold text-white mt-2 mb-6">{event.title}</h1>
        <div className="flex gap-6 text-sm text-gray-400 mb-8">
          <span className="flex items-center gap-2"><Calendar size={14} className="text-[var(--ch-gold-500)]" />{event.startAt.toLocaleDateString()}</span>
          <span className="flex items-center gap-2"><MapPin size={14} className="text-[var(--ch-gold-500)]" />{event.isOnline ? "Online" : event.location}</span>
        </div>
        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{event.description}</div>
        
        <EventRegisterButton eventId={event.id} isLoggedIn={!!user} initialRegistered={isRegistered} />
      </div>
    </main>
  );
}
