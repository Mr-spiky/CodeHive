// ============================================================
// CODEHIVE — SITE DATA
// All content arrays in one place.
// To update content, edit this file only — components auto-update.
// ============================================================

import type {
  StatItem,
  BigStatItem,
  AchievementItem,
  GroupItem,
  TeamMember,
  MissionItem,
  ComparisonItem,
  NavLink,
  SocialLink,
  ContactItem,
} from "./types";

// ─── Navigation ──────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "About",  href: "/#about"  },
  { label: "Groups", href: "/#groups" },
  { label: "Events", href: "/events" },
  { label: "Team",   href: "/team"   },
];

// ─── Hero Stats (About section counters) ─────────────────────
export const ABOUT_STATS: StatItem[] = [
  { value: 2000, suffix: "+", label: "Active Members",         icon: "👥" },
  { value: 500,  suffix: "+", label: "Event Registrations",    icon: "🎯" },
  { value: 3,    suffix: "+", label: "Industry Collaborations",icon: "🤝" },
  { value: 1,    suffix: "",  label: "CTO-Led Session",        icon: "🎤" },
];

// ─── Mission items ────────────────────────────────────────────
export const MISSION_ITEMS: MissionItem[] = [
  { icon: "🎤", text: "Enable direct industry access through expert-led sessions and mentorship" },
  { icon: "🔗", text: "Create high-value networking opportunities with professionals & founders" },
  { icon: "⚡", text: "Organize real-world, execution-driven events — not just theory-based" },
  { icon: "🚀", text: "Support members with career pathways, guidance, and growth systems" },
];

// ─── Community Groups ─────────────────────────────────────────
export const COMMUNITY_GROUPS: GroupItem[] = [
  {
    id: "general",
    icon: "🌐",
    title: "General",
    description: "Your main hub for all things CodeHive. Announcements, updates, and general community conversations.",
    members: "1200+",
  },
  {
    id: "networking",
    icon: "🤝",
    title: "Networking",
    description: "Connect with like-minded peers, professionals, and founders. Build your professional circle.",
    members: "800+",
  },
  {
    id: "hackathons",
    icon: "⚡",
    title: "Hackathons",
    description: "Stay ahead of every hackathon — Unstop, Devfolio, HackBaroda, Hack2Skill & more.",
    members: "600+",
  },
  {
    id: "learning",
    icon: "📚",
    title: "Learning",
    description: "Resources, tutorials, and study groups for Web Dev, AI, Cybersecurity, and DSA.",
    members: "900+",
  },
  {
    id: "internships",
    icon: "💼",
    title: "Internships",
    description: "Curated internship & job opportunities posted daily. Get early access to industry openings.",
    members: "1000+",
  },
  {
    id: "help-debug",
    icon: "🛠️",
    title: "Help & Debugging",
    description: "Stuck on a bug? Get quick help from the community. No question is too small or too complex.",
    members: "700+",
  },
];

// ─── Traction — Big stats row ─────────────────────────────────
export const BIG_STATS: BigStatItem[] = [
  { value: "2000+", label: "Active Members",      sub: "Growing every day"        },
  { value: "500+",  label: "Event Registrations", sub: "Strong engagement"        },
  { value: "25+",   label: "Yrs CTO Experience",  sub: "Industry mentorship"      },
  { value: "3+",    label: "Collaborations",       sub: "Aayo, HackBaroda & more" },
];

// ─── Traction — Achievement badges ───────────────────────────
export const ACHIEVEMENTS: AchievementItem[] = [
  { icon: "🎤", title: "Industry Session",   desc: "Hosted session by a Senior CTO with 25+ years of experience"       },
  { icon: "🤝", title: "Aayo App",           desc: "Official collaboration with Aayo App for community events"          },
  { icon: "🏆", title: "Elite Her Hackathon",desc: "Partner for Elite Her Hackathon — empowering women in tech"         },
  { icon: "💻", title: "HackBaroda 2026",    desc: "Proud collaborator at HackBaroda 2026 — Gujarat's premier hackathon"},
  { icon: "📈", title: "LinkedIn Growth",    desc: "Rapidly growing digital presence with increasing reach & engagement" },
];

// ─── What Makes CodeHive Different ───────────────────────────
export const COMPARISONS: ComparisonItem[] = [
  { not: "Not just webinars",     yes: "Execution-focused learning (build + implement)"        },
  { not: "Not just networking",   yes: "Outcome-driven connections (internships, projects)"    },
  { not: "Not just students",     yes: "Industry + student collaboration ecosystem"            },
  { not: "Not just events",       yes: "Career acceleration platform"                          },
];

// ─── Core Team ────────────────────────────────────────────────
export const TEAM_MEMBERS: TeamMember[] = [
  { id: "member-1", name: "Shivam",      role: "Founder & Community Lead", emoji: "🧠", linkedin: "#", tags: ["Leadership", "Strategy"]  },
  { id: "member-2", name: "Core Member", role: "Tech Lead",                emoji: "⚡", linkedin: "#", tags: ["Web Dev", "Next.js"]       },
  { id: "member-3", name: "Core Member", role: "Events Head",              emoji: "🎯", linkedin: "#", tags: ["Events", "Operations"]     },
  { id: "member-4", name: "Core Member", role: "Marketing Lead",           emoji: "📣", linkedin: "#", tags: ["Growth", "Brand"]          },
  { id: "member-5", name: "Core Member", role: "Community Manager",        emoji: "🤝", linkedin: "#", tags: ["Community", "Engagement"]  },
  { id: "member-6", name: "Core Member", role: "Content Lead",             emoji: "✍️", linkedin: "#", tags: ["Content", "LinkedIn"]      },
];

// ─── Footer — Quick Links & Contact ───────────────────────────
export const QUICK_LINKS: NavLink[] = [
  { label: "About",  href: "/#about"  },
  { label: "Groups", href: "/#groups" },
  { label: "Events", href: "/events" },
  { label: "Team",   href: "/team"   },
];

export const CONTACT_ITEMS: ContactItem[] = [
  { icon: "📍", text: "Delhi NCR, India"     },
  { icon: "🌐", text: "codehive.community"   },
  { icon: "💬", text: "WhatsApp Community"   },
];

export const SOCIAL_LINKS = {
  whatsapp: "#",
  discord: "#",
  linkedin: "#",
};

// ─── Event tags ───────────────────────────────────────────────
export const EVENT_TAGS = ["Networking", "Industry Speakers", "Delhi NCR"] as const;

// ─── Sponsor Logos ────────────────────────────────────────────
export const SPONSOR_LOGOS = [
  { name: "GeeksforGeeks", src: "/image/Sponserslogo/GFG.png" },
  { name: "Hack2Skill",    src: "/image/Sponserslogo/H2S.png" },
  { name: "Google",        src: "/image/Sponserslogo/google.png" },
  { name: "Microsoft",     src: "/image/Sponserslogo/microsoft.png" },
  { name: "Unstop",        src: "/image/Sponserslogo/unstop.png" },
];
