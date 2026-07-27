import { PageHero } from "@/components/shared/PageHero";
import { CTABanner } from "@/components/shared/CTABanner";
import { Users } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Who can join CodeHive?",
    answer: "CodeHive is open to college students, self-taught developers, and early-career tech enthusiasts who want to build projects and learn collaboratively. Beginners are completely welcome."
  },
  {
    question: "Is there any membership fee?",
    answer: "No. Joining the community, attending standard meetups, and participating in online challenges is completely free."
  },
  {
    question: "How does the XP and gamification system work?",
    answer: "You earn XP by registering for and attending events, checking in daily on coding challenges, and participating in community activities. As your XP grows, you unlock new zones and features on your member dashboard."
  },
  {
    question: "Can I organize a CodeHive event at my college?",
    answer: "Yes! We actively support student leads. Once you reach the Organizer / Lead journey stage or connect with our core team, you can propose and host offline workshops and hackathons."
  },
  {
    question: "How do I get technical mentorship?",
    answer: "Engage in our discussion channels, participate in ongoing project showcases, and attend our weekend technical breakdowns. Active peers and core mentors regularly review code and guide builders."
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <PageHero
        eyebrow="Got Questions?"
        title={<>Frequently Asked <span className="gold-text">Questions</span></>}
        subtitle="Everything you need to know about joining, learning, and progressing inside CodeHive."
      />

      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <div className="space-y-6">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="rounded-2xl bg-[#0D0D1F]/60 border border-[var(--ch-border)] p-6 md:p-8">
              <h3 className="font-sora text-lg font-bold text-white mb-3">{item.question}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABanner
        icon={<Users className="w-5 h-5 text-[var(--ch-gold-500)]" />}
        title="Still have questions?"
        subtitle="Reach out to our organizing team or drop a message in our community channels."
        buttonLabel="Contact Us"
        href="/contact"
      />
    </main>
  );
}
