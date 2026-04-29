// ============================================================
// CODEHIVE — CONSTANTS
// Single source of truth for all links and color tokens.
// Update links here — they propagate everywhere automatically.
// ============================================================

// ─── Links ───────────────────────────────────────────────────
/** Main WhatsApp community invite link. Used on all group cards. */
export const COMMUNITY_LINK = "https://lnkd.in/gQQbZt-5";

/** Social platform links used in Navbar and Footer */
export const SOCIAL_LINKS = {
  whatsapp: "https://lnkd.in/gQQbZt-5",
  discord: "#",
  linkedin: "https://lnkd.in/gaJdB_Sx",
  instagram: "https://www.instagram.com/codehive.exe",
  email: "mailto:codehiveindia@gmail.com",
} as const;

/** External event registration platform redirect */
export const EVENT_REGISTER_LINK = "https://unstop.com/p/the-big-shift-10-offline-tech-event-code-hive-1678545?lb=lEixbRgS&utm_medium=Share&utm_source=workshops&utm_campaign=Shivakum42873";

// ─── Design Tokens (JS-side reference) ───────────────────────
// These mirror the CSS vars in globals.css.
// Use CSS vars in Tailwind classes; use these in dynamic JS logic only.
export const COLORS = {
  purple: "#7C3AED",
  cyan: "#06B6D4",
  emerald: "#10B981",
  pink: "#EC4899",
  gold: "#C9A227",
  black: "#05050F",
  surface: "#0D0D1F",
  surface2: "#14142B",
} as const;
