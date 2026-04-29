// ============================================================
// CODEHIVE — SITE DATA
// All content arrays in one place.
// To update content, edit this file only — components auto-update.
// ============================================================

import type {
  StatItem,
  BigStatItem,
  AchievementItem,
  TeamMember,
  MissionItem,
  ComparisonItem,
  NavLink,
  ContactItem,
} from "./types";

// ─── Navigation ──────────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: "About",  href: "/about"  },
  { label: "Events", href: "/events" },
  { label: "Team",   href: "/team"   },
];

// ─── Hero Stats (About section counters) ─────────────────────
export const ABOUT_STATS: StatItem[] = [
  { value: 2000, suffix: "+", label: "Active Members",          icon: "Users" },
  { value: 500,  suffix: "+", label: "Event Registrations",     icon: "Target" },
  { value: 3,    suffix: "+", label: "Industry Collaborations", icon: "Handshake" },
  { value: 1,    suffix: "",  label: "CTO-Led Session",         icon: "Mic2" },
];

// ─── Mission items ────────────────────────────────────────────
export const MISSION_ITEMS: MissionItem[] = [
  { icon: "Mic2",   text: "Enable direct industry access through expert-led sessions and mentorship" },
  { icon: "Link",   text: "Create high-value networking opportunities with professionals & founders" },
  { icon: "Zap",    text: "Organize real-world, execution-driven events — not just theory-based" },
  { icon: "Rocket", text: "Support members with career pathways, guidance, and growth systems" },
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
  { icon: "Briefcase",  title: "Career Acceleration", desc: "Members actively securing internships and roles in top tech companies."       },
  { icon: "Zap",        title: "Hackathon Triumphs",  desc: "High-performing teams continuously formed and competing in national hackathons." },
  { icon: "Settings",   title: "Project Incubation",  desc: "Countless side-projects and portfolios built together through peer collaboration." },
  { icon: "Handshake",  title: "Meaningful Network",  desc: "Direct connections established with founders, seniors, and industry experts." },
  { icon: "TrendingUp", title: "Execution Only",       desc: "Zero fluff. Tangible skills acquired through hands-on guidance and execution." },
];

// ─── What Makes CodeHive Different ───────────────────────────
export const COMPARISONS: ComparisonItem[] = [
  { 
    id: "comp-1",
    title: "Learning Approach",
    icon: "MonitorPlay",
    not: "Passive webinars and theoretical bootcamps with no actual implementation.",     
    yes: "Build-first, execution-driven hackathons and hands-on projects."    
  },
  { 
    id: "comp-2",
    title: "Networking",
    icon: "Users",
    not: "Random LinkedIn connections, empty cold messages, and surface-level chats.", 
    yes: "High-value, outcome-driven relationships with founders, CTOs, and peers."  
  },
  { 
    id: "comp-3",
    title: "End Result",
    icon: "Rocket",
    not: "A basic participation certificate and no real-world proof of work.",       
    yes: "Tangible growth, shipped products, and genuine career acceleration."                 
  },
];

// ─── Core Team ────────────────────────────────────────────────
export const TEAM_MEMBERS: TeamMember[] = [
  { id: "member-1", name: "Shivam",      role: "Founder & Community Lead", icon: "User",      linkedin: "#", tags: ["Leadership", "Strategy"]  },
  { id: "member-2", name: "Core Member", role: "Tech Lead",                icon: "Code",      linkedin: "#", tags: ["Web Dev", "Next.js"]       },
  { id: "member-3", name: "Core Member", role: "Events Head",              icon: "Calendar",  linkedin: "#", tags: ["Events", "Operations"]     },
  { id: "member-4", name: "Core Member", role: "Marketing Lead",           icon: "Megaphone", linkedin: "#", tags: ["Growth", "Brand"]          },
  { id: "member-5", name: "Core Member", role: "Community Manager",        icon: "Users",     linkedin: "#", tags: ["Community", "Engagement"]  },
  { id: "member-6", name: "Core Member", role: "Content Lead",             icon: "PenTool",   linkedin: "#", tags: ["Content", "LinkedIn"]      },
];

// ─── Footer — Contact ─────────────────────────────────────────
export const CONTACT_ITEMS: ContactItem[] = [
  { icon: "MapPin", text: "Delhi NCR, India"       },
  { icon: "Globe",  text: "codehive.community"     },
  { icon: "Mail",   text: "codehiveindia@gmail.com" },
];

// ─── Sponsor Logos ────────────────────────────────────────────
export const SPONSOR_LOGOS = [
  { name: "GeeksforGeeks", src: "/image/Sponserslogo/GFG.png"       },
  { name: "Hack2Skill",    src: "/image/Sponserslogo/H2S.png"       },
  { name: "Google",        src: "/image/Sponserslogo/google.png"    },
  { name: "Microsoft",     src: "/image/Sponserslogo/microsoft.png" },
  { name: "Unstop",        src: "/image/Sponserslogo/unstop.png"    },
];

// ─── Event Tags ───────────────────────────────────────────────
export const EVENT_TAGS = ["Networking", "Industry Speakers", "Delhi NCR"] as const;
