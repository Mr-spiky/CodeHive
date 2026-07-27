import { PageHero } from "@/components/shared/PageHero";
import { StatStrip } from "@/components/shared/StatStrip";
import { CTABanner } from "@/components/shared/CTABanner";
import { COMMUNITY_STATS } from "@/lib/data/stats";
import { Users, Target, Shield, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <PageHero
        eyebrow="About CodeHive"
        title={<>A Student-Driven Tech Community Building the <span className="gold-text">Future.</span></>}
        subtitle="We are a live developer community in India focused on peer learning, hackathons, open-source collaboration, and real-world project building."
      />

      <StatStrip stats={COMMUNITY_STATS} />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-8">
        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--ch-gold-700)]/15 flex items-center justify-center mb-5">
            <Target className="w-6 h-6 text-[var(--ch-gold-500)]" />
          </div>
          <h3 className="font-sora text-lg font-bold text-white mb-2">Our Mission</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            To bridge the gap between academic curriculum and industry expectations by providing a collaborative sandbox where students learn by shipping real code.
          </p>
        </div>

        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--ch-gold-700)]/15 flex items-center justify-center mb-5">
            <Zap className="w-6 h-6 text-[var(--ch-gold-500)]" />
          </div>
          <h3 className="font-sora text-lg font-bold text-white mb-2">Gamified Growth</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            We reject passive consumption. Members progress through real journey stages, unlock dashboard zones, and earn XP by attending events and completing technical challenges.
          </p>
        </div>

        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--ch-gold-700)]/15 flex items-center justify-center mb-5">
            <Shield className="w-6 h-6 text-[var(--ch-gold-500)]" />
          </div>
          <h3 className="font-sora text-lg font-bold text-white mb-2">Open & Inclusive</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Whether you are writing your first line of code or building distributed systems, CodeHive provides mentorship, peer review, and a supportive network to accelerate your journey.
          </p>
        </div>
      </section>

      <CTABanner
        icon={<Users className="w-5 h-5 text-[var(--ch-gold-500)]" />}
        title="Be Part of the Journey"
        subtitle="Join our community channels to participate in hackathons, workshops, and daily challenges."
        buttonLabel="Join Community"
        href="/join"
      />
    </main>
  );
}
