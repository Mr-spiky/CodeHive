import { Star } from "lucide-react";

interface TestimonialItem {
  id: string;
  authorName: string;
  authorRole: string;
  quote: string;
  rating: number;
  avatarUrl: string | null;
}

// Real Testimonial rows only (see prisma schema) — if the table is empty,
// this section says so rather than fabricating quotes.
export function TestimonialsPreview({ testimonials }: { testimonials: TestimonialItem[] }) {
  if (testimonials.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <h2 className="font-sora text-2xl font-bold text-white mb-4">What Our Community Says</h2>
        <p className="text-gray-500 text-sm">
          No published testimonials yet — add real member testimonials via the Admin Panel.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="flex items-end justify-between mb-8">
        <h2 className="font-sora text-2xl font-bold text-white">What Our Community Says</h2>
        <a href="/testimonials" className="text-sm font-semibold text-[var(--ch-gold-500)]">View all testimonials →</a>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div key={t.id} className="p-6 rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)]">
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={14} className="fill-[var(--ch-gold-500)] text-[var(--ch-gold-500)]" />
              ))}
            </div>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--ch-gold-700)]/20 flex items-center justify-center text-xs font-bold text-[var(--ch-gold-500)]">
                {t.authorName.charAt(0)}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{t.authorName}</div>
                <div className="text-gray-500 text-xs">{t.authorRole}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
