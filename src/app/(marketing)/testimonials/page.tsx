import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { StatStrip } from "@/components/shared/StatStrip";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { SuccessStoryCard } from "@/components/testimonials/SuccessStoryCard";
import { CTABanner } from "@/components/shared/CTABanner";
import { COMMUNITY_STATS } from "@/lib/data/stats";
import { Users } from "lucide-react";

interface SuccessStoryRow { id: string; title: string; summary: string; iconKey: string; linkUrl: string | null; }

export default async function TestimonialsPage() {
  const [testimonials, stories]: [
    { id: string; authorName: string; authorRole: string; quote: string; rating: number; avatarUrl: string | null }[],
    SuccessStoryRow[]
  ] = await Promise.all([
    prisma.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }),
    prisma.successStory.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <PageHero
        eyebrow="Testimonials"
        title={<>Loved by Developers. Trusted by <span className="gold-text">Thousands.</span></>}
        subtitle="Here's what our community has to say about their journey with CodeHive."
      />

      <StatStrip stats={COMMUNITY_STATS} />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <SectionHeader badge="Community Voices" title="What Our Members Say" />
        <TestimonialsPreview testimonials={testimonials} />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-8 pb-16">
        <SectionHeader title="Success Stories" />
        {stories.length === 0 ? (
          <p className="text-gray-500 text-sm">No success stories published yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stories.map((s: SuccessStoryRow) => (
              <SuccessStoryCard key={s.id} title={s.title} summary={s.summary} iconKey={s.iconKey} linkUrl={s.linkUrl} />
            ))}
          </div>
        )}
      </section>

      <CTABanner
        icon={<Users className="w-5 h-5 text-[var(--ch-gold-500)]" />}
        title="Ready to start your journey with CodeHive?"
        subtitle="Connect. Collaborate. Create Impact."
        buttonLabel="Join Community Now"
        href="/join"
      />
    </main>
  );
}
