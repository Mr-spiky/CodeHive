import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";
import { COMMUNITY_LINK } from "@/lib/data/constants";
import { Mail, MessageSquare, MapPin, Users } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <PageHero
        eyebrow="Get in Touch"
        title={<>Contact the <span className="gold-text">CodeHive Team</span></>}
        subtitle="Have questions about hackathons, sponsorships, college collaborations, or general community initiatives? Reach out to us."
      />

      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6">
            <div className="w-12 h-12 rounded-xl bg-[var(--ch-gold-700)]/15 flex items-center justify-center mb-5">
              <Mail className="w-6 h-6 text-[var(--ch-gold-500)]" />
            </div>
            <h3 className="font-sora font-bold text-white text-base mb-1">Email Us</h3>
            <p className="text-gray-500 text-xs mb-4">For sponsorships and formal inquiries</p>
            <a href="mailto:team@codehive.org" className="text-sm font-semibold text-[var(--ch-gold-500)] hover:underline">
              team@codehive.org
            </a>
          </div>

          <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6">
            <div className="w-12 h-12 rounded-xl bg-[var(--ch-gold-700)]/15 flex items-center justify-center mb-5">
              <MessageSquare className="w-6 h-6 text-[var(--ch-gold-500)]" />
            </div>
            <h3 className="font-sora font-bold text-white text-base mb-1">Community Chat</h3>
            <p className="text-gray-500 text-xs mb-4">For immediate help and peer support</p>
            <a href={COMMUNITY_LINK} className="text-sm font-semibold text-[var(--ch-gold-500)] hover:underline">
              Join WhatsApp Chat &rarr;
            </a>
          </div>

          <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6">
            <div className="w-12 h-12 rounded-xl bg-[var(--ch-gold-700)]/15 flex items-center justify-center mb-5">
              <MapPin className="w-6 h-6 text-[var(--ch-gold-500)]" />
            </div>
            <h3 className="font-sora font-bold text-white text-base mb-1">Location</h3>
            <p className="text-gray-500 text-xs mb-4">Our primary organizing base</p>
            <span className="text-sm font-medium text-gray-300">
              India (National Tech Community)
            </span>
          </div>
        </div>
      </section>

      <CTABanner
        icon={<Users className="w-5 h-5 text-[var(--ch-gold-500)]" />}
        title="Looking to partner with us?"
        subtitle="Explore our partnership programs to sponsor hackathons and student meetups."
        buttonLabel="Explore Partnerships"
        href="/partners"
      />
    </main>
  );
}
