interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  website: string | null;
}

export function PartnersStrip({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null; // no fake partner logos ever

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      <p className="text-center text-xs font-bold tracking-widest uppercase text-gray-600 mb-8">
        Trusted by Amazing Partners
      </p>
      <div className="flex flex-wrap items-center justify-center gap-10 opacity-70 grayscale hover:grayscale-0 transition-all">
        {partners.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.id} src={p.logoUrl} alt={p.name} className="h-7 object-contain" />
        ))}
      </div>
    </section>
  );
}
