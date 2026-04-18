// ============================================================
// CODEHIVE — TYPESCRIPT TYPES
// All shared interfaces for data structures used across the site
// ============================================================

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

export interface GroupItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  members: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  emoji: string;
  linkedin: string;
  tags: string[];
}

export interface MissionItem {
  icon: string;
  text: string;
}

export interface ComparisonItem {
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
