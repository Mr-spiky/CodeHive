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
  { label: "About",  href: "/about"  },
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
    category: "Community • General",
    description: "Your main hub for all things CodeHive. Announcements, updates, and general community conversations.",
    members: "1200+",
  },
  {
    id: "networking",
    icon: "🤝",
    title: "Networking",
    category: "Career • Connections",
    description: "Connect with like-minded peers, professionals, and founders. Build your professional circle.",
    members: "800+",
  },
  {
    id: "hackathons",
    icon: "⚡",
    title: "Hackathons",
    category: "Building • Competition",
    description: "Stay ahead of every hackathon — Unstop, Devfolio, HackBaroda, Hack2Skill & more.",
    members: "600+",
  },
  {
    id: "learning",
    icon: "📚",
    title: "Learning",
    category: "Skills • Guidance",
    description: "Resources, tutorials, and study groups for Web Dev, AI, Cybersecurity, and DSA.",
    members: "900+",
  },
  {
    id: "internships",
    icon: "💼",
    title: "Internships",
    category: "Jobs • Opportunities",
    description: "Curated internship & job opportunities posted daily. Get early access to industry openings.",
    members: "1000+",
  },
  {
    id: "help-debug",
    icon: "🛠️",
    title: "Help & Debugging",
    category: "Support • Tech",
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

// ─── Community Impact (formerly Traction badges) ──────────────
export const ACHIEVEMENTS: AchievementItem[] = [
  { icon: "💼", title: "Career Acceleration", desc: "Members actively securing internships and roles in top tech companies."       },
  { icon: "⚡", title: "Hackathon Triumphs",  desc: "High-performing teams continuously formed and competing in national hackathons." },
  { icon: "🛠️", title: "Project Incubation",  desc: "Countless side-projects and portfolios built together through peer collaboration." },
  { icon: "🤝", title: "Meaningful Network",  desc: "Direct connections established with founders, seniors, and industry experts." },
  { icon: "📈", title: "Execution Only",      desc: "Zero fluff. Tangible skills acquired through hands-on guidance and execution." },
];

// ─── What Makes CodeHive Different ───────────────────────────
export const COMPARISONS: ComparisonItem[] = [
  { not: "Just webinars",               yes: "Build + execute approach" },
  { not: "Random networking",           yes: "Outcome-driven connections" },
  { not: "No outcomes",                 yes: "Real growth" },
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
  { label: "About",  href: "/about"  },
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
