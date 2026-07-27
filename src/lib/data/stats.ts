export interface StatItem {
  value: string;
  label: string;
}

// Real CodeHive numbers. Update these here - every stat strip on the site
// reads from this single source, so a number is never hardcoded twice.
export const COMMUNITY_STATS: StatItem[] = [
  { value: "2000+", label: "Active Members" },
  { value: "500+",  label: "Event Registrations" },
  { value: "25+",   label: "Yrs Combined CTO Experience" },
  { value: "3+",    label: "Partner Collaborations" },
];
