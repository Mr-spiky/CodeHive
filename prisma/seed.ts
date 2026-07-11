// Real seed data only. Team members, testimonials, blog posts, and
// partner logos are intentionally left empty here — add them via the
// Admin Panel with real content. This script never invents fake names.
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // REPLACE/CONFIRM: verify these details are current before going live
  await prisma.event.upsert({
    where: { slug: "the-big-shift-1-0" },
    update: {},
    create: {
      slug: "the-big-shift-1-0",
      title: "The Big Shift 1.0",
      description:
        "A high-impact offline tech event for students, developers, professionals, and founders — AI, Web3, Data Science, and networking with industry experts.",
      category: "MEETUP",
      location: "GeeksforGeeks, Noida",
      isOnline: false,
      startAt: new Date("2026-08-08T10:00:00+05:30"),
      endAt: new Date("2026-08-08T18:00:00+05:30"),
      status: "UPCOMING",
      featured: true,
      createdById: "system",
    },
  });

  const challenge = await prisma.challenge.upsert({
    where: { slug: "45-day-coding-challenge" },
    update: {},
    create: {
      slug: "45-day-coding-challenge",
      title: "Skill Consistency Challenge",
      description: "Check in daily with real proof of work for 45 days straight.",
      durationDays: 45,
      startAt: new Date(),
      endAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      xpPerCheckIn: 10,
    },
  });

  await prisma.badge.upsert({
    where: { slug: "challenge-finisher" },
    update: {},
    create: {
      slug: "challenge-finisher",
      name: "Challenge Finisher",
      description: "Completed a full challenge without breaking the streak.",
      iconKey: "hex-flame",
      criteria: "Complete all check-ins for a challenge",
    },
  });

  console.log("Seeded real content:", challenge.title);
  console.log("NOTE: TeamMember, Testimonial, BlogPost, Partner tables are");
  console.log("intentionally empty. Add real content via the Admin Panel.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());
