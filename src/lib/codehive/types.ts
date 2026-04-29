// ============================================================
// CODEHIVE — TYPESCRIPT TYPES
// All shared interfaces for data structures used across the site.
// This is the single source of truth for all types.
// ============================================================

// ─── Home Page Types ──────────────────────────────────────────

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface BigStatItem {
  value: string;
  label: string;
  sub: string;
}

export interface AchievementItem {
  icon: string;
  title: string;
  desc: string;
}


export interface TeamMember {
  id: string;
  name: string;
  role: string;
  icon: string;
  linkedin: string;
  tags: string[];
}

export interface MissionItem {
  icon: string;
  text: string;
}

export interface ComparisonItem {
  id: string;
  title: string;
  icon: string;
  not: string;
  yes: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface ContactItem {
  icon: string;
  text: string;
}

// ─── Events Types ─────────────────────────────────────────────

export interface EventSpeaker {
  id: string;
  name: string;
  role: string;
  company?: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
}

export interface CodeHiveEvent {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  venue: string;
  isFree: boolean;
  registrationLink: string;
  posterImage: string;
  /** Optional wide banner image (e.g. the purple event banner) */
  bannerImage?: string;
  tags: string[];
  description: string;
  targetAudience: string[];
  whyJoin: string[];
  speakers?: EventSpeaker[];
  status: "upcoming" | "past" | "live";
}
