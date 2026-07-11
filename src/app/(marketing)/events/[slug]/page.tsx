import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, MapPin } from "lucide-react";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event) notFound();

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <span className="text-xs font-bold tracking-widest uppercase text-[var(--ch-gold-500)]">{event.category}</span>
        <h1 className="font-sora text-3xl md:text-4xl font-bold text-white mt-2 mb-6">{event.title}</h1>
        <div className="flex gap-6 text-sm text-gray-400 mb-8">
          <span className="flex items-center gap-2"><Calendar size={14} className="text-[var(--ch-gold-500)]" />{event.startAt.toLocaleDateString()}</span>
          <span className="flex items-center gap-2"><MapPin size={14} className="text-[var(--ch-gold-500)]" />{event.isOnline ? "Online" : event.location}</span>
        </div>
        <p className="text-gray-300 leading-relaxed">{event.description}</p>
      </div>
    </main>
  );
}
