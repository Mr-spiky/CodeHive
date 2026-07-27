import { PageHero } from "@/components/shared/PageHero";
import { ShieldAlert } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <PageHero
        eyebrow="Legal & Privacy"
        title={<>Privacy <span className="gold-text">Policy</span></>}
        subtitle="Information regarding data privacy and member account security at CodeHive."
      />

      <section className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--ch-gold-700)]/15 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6 text-[var(--ch-gold-500)]" />
          </div>
          <h2 className="font-sora text-lg font-bold text-white">Policy Under Formal Legal Review</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            This legal document is currently under review by our organizing committee and legal counsel to ensure compliance with applicable data protection regulations. It will be published here prior to our full public community launch.
          </p>
          <p className="text-gray-600 text-xs pt-2">
            For immediate privacy inquiries regarding your member account or XP data, please contact team@codehive.org.
          </p>
        </div>
      </section>
    </main>
  );
}
