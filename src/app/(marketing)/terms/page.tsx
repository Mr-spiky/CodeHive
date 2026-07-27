import { PageHero } from "@/components/shared/PageHero";
import { FileText } from "lucide-react";

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <PageHero
        eyebrow="Legal & Terms"
        title={<>Terms of <span className="gold-text">Use</span></>}
        subtitle="Terms and conditions governing access to the CodeHive platform and gamified member dashboard."
      />

      <section className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--ch-gold-700)]/15 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-[var(--ch-gold-500)]" />
          </div>
          <h2 className="font-sora text-lg font-bold text-white">Document Under Formal Review</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            Our formal Terms of Use are currently undergoing review by legal counsel. They will define member rights, XP integrity rules, and platform usage terms, and will be published prior to our official public release.
          </p>
          <p className="text-gray-600 text-xs pt-2">
            By using the current preview dashboard, you agree to abide by our Community Code of Conduct.
          </p>
        </div>
      </section>
    </main>
  );
}
