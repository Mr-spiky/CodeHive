// ============================================================
// CODEHIVE — CONSTANTS
// Single source of truth for all links and color tokens.
// Update links here — they propagate everywhere automatically.
// ============================================================

// ─── Links ───────────────────────────────────────────────────
/** Main WhatsApp community invite link. Used on all group cards. */
export const COMMUNITY_LINK = "#";

/** Social platform links used in Navbar and Footer */
export const SOCIAL_LINKS = {
  whatsapp: "#",
  discord: "#",
  linkedin: "#",
} as const;

/** External event registration platform redirect */
export const EVENT_REGISTER_LINK = "#";

// ─── Design Tokens (JS-side reference) ───────────────────────
// These mirror the CSS vars in globals.css.
// Use CSS vars in Tailwind classes; use these in dynamic JS logic only.
export const COLORS = {
  gold: "#C9A227",
  goldLight: "#E5C84A",
  black: "#0A0A0A",
  surface: "#111111",
  surface2: "#1A1A1A",
} as const;
