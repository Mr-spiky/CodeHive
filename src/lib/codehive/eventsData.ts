// ============================================================
// CODEHIVE — EVENTS DATA
// Add new events here. The CodeHiveEvent type lives in types.ts.
// ============================================================

import { EVENT_REGISTER_LINK } from "./constants";
import type { CodeHiveEvent } from "./types";

export const EVENTS: CodeHiveEvent[] = [
  {
    id: "event-1",
    slug: "the-big-shift-1-0",
    title: "The Big Shift 1.0",
    subtitle: "Where Technology Meets Opportunity",
    date: "08 May 2026",
    venue: "GeeksforGeeks, Noida",
    isFree: true,
    registrationLink: EVENT_REGISTER_LINK,
    posterImage: "/image/Events/bigShift-poster.png",
    bannerImage: "/image/Events/bigShift-banner.png",
    tags: ["AI", "Web3", "Data Science", "Networking", "Founders"],
    description:
      "Get ready for a high-impact tech experience designed for students, developers, professionals, and founders. We're bringing the community together for an exclusive offline tech event.",
    targetAudience: ["Students", "Developers", "Professionals", "Founders"],
    whyJoin: [
      "Insights from industry experts and founders",
      "Exciting swags, goodies, and prizes",
      "Certificates for all participants",
      "Network with like-minded innovators",
      "Explore AI, Web3, Data Science, and emerging technologies",
    ],
    speakers: [
      {
        id: "speaker-1",
        name: "Industry Expert",
        role: "Founder & CEO",
        company: "Tech Startup",
        linkedin: "#",
      },
      {
        id: "speaker-2",
        name: "Senior Engineer",
        role: "Staff Software Engineer",
        company: "Top Tier MNC",
        linkedin: "#",
      },
      {
        id: "speaker-3",
        name: "Product Leader",
        role: "VP of Product",
        company: "Global Tech Giant",
        linkedin: "#",
      },
    ],
    status: "upcoming",
  },
];
