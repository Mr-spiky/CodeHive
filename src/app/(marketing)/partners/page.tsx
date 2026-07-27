import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";
import { Users, Handshake, Globe } from "lucide-react";

interface PartnerRow {
  id: string;
  name: string;
  logoUrl: string;
  website: string | null;
}

export default async function PartnersPage() {
  const partners: PartnerRow[] = await prisma.partner.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <PageHero
        eyebrow="Partnerships"
        title={<>Collaborate with <span className="gold-text">CodeHive</span></>}
        subtitle="We partner with industry leaders, educational platforms, and tech organizations to empower the next generation of builders."
      />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="flex items-center gap-3 mb-8">
          <Handshake className="w-6 h-6 text-[var(--ch-gold-500)]" />
          <h2 className="font-sora text-2xl font-bold text-white">Our Partners</h2>
        </div>

        {partners.length === 0 ? (
          <div className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-12 text-center">
            <p className="text-gray-400 text-base mb-2">No partner logos listed yet.</p>
            <p className="text-gray-600 text-sm">
              We are actively exploring collaborations for our upcoming offline hackathons and developer meetups.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((p) => (
              <div key={p.id} className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6 flex flex-col items-center justify-center text-center hover:border-[var(--ch-gold-500)]/40 transition-colors">
                <div className="h-16 flex items-center justify-center mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.logoUrl} alt={p.name} className="max-h-12 max-w-full object-contain" />
                </div>
                <h3 className="font-sora font-semibold text-white text-sm mb-1">{p.name}</h3>
                {p.website && (
                  <a href={p.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-[var(--ch-gold-500)] hover:underline mt-2">
                    <Globe size={12} /> Visit Website
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <CTABanner
        icon={<Users className="w-5 h-5 text-[var(--ch-gold-500)]" />}
        title="Want to become a CodeHive Partner?"
        subtitle="Reach out to discuss sponsorship opportunities for our student developer programs."
        buttonLabel="Contact Our Team"
        href="/contact"
      />
    </main>
  );
}
