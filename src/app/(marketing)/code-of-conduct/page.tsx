import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";
import { Users, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

export default function CodeOfConductPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <PageHero
        eyebrow="Community Guidelines"
        title={<>Our Code of <span className="gold-text">Conduct</span></>}
        subtitle="CodeHive is dedicated to providing a safe, inclusive, and harassment-free community experience for everyone."
      />

      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-16 space-y-8">
        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-[var(--ch-gold-500)]" />
            <h2 className="font-sora text-xl font-bold text-white">Expected Behavior</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-300 list-disc list-inside leading-relaxed">
            <li>Be respectful, empathetic, and professional in all communications.</li>
            <li>Collaborate openly and share knowledge to lift peers up.</li>
            <li>Accept constructive feedback gracefully and focus on what is best for the community.</li>
            <li>Respect differing viewpoints and experiences across technical backgrounds.</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h2 className="font-sora text-xl font-bold text-white">Unacceptable Behavior</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-300 list-disc list-inside leading-relaxed">
            <li>Harassment, discrimination, or intimidation in any public or private channel.</li>
            <li>Trolling, insulting or derogatory comments, and personal or political attacks.</li>
            <li>Publishing others&apos; private information without explicit permission.</li>
            <li>Any conduct which could reasonably be considered inappropriate in a professional tech setting.</li>
          </ul>
        </div>

        <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-[var(--ch-gold-500)]" />
            <h2 className="font-sora text-xl font-bold text-white">Enforcement & Reporting</h2>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community organizers. All reports will be reviewed and investigated promptly and fairly.
          </p>
          <p className="text-sm text-gray-400">
            Organizers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct.
          </p>
        </div>
      </section>

      <CTABanner
        icon={<Users className="w-5 h-5 text-[var(--ch-gold-500)]" />}
        title="Ready to contribute?"
        subtitle="Join a community that values respect, collaboration, and continuous learning."
        buttonLabel="Join Community"
        href="/join"
      />
    </main>
  );
}
