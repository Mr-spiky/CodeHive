# CodeHive — Official Community Website

> India's most execution-driven student-led tech community.  
> **Build. Connect. Grow.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

---

## About CodeHive

CodeHive is a fast-growing, student-led tech community launched in **February 2026**, bridging the gap between academic learning and real-world industry exposure. With **2000+ active members** across India (strong presence in Delhi NCR), CodeHive connects students, early-stage professionals, and founders.

🌐 **Website**: [codehive.community](https://codehive.community)  
📧 **Email**: codehiveindia@gmail.com  
💬 **WhatsApp**: [Join the Community](https://lnkd.in/gQQbZt-5)

---

## Tech Stack

| Layer       | Technology                           |
|-------------|--------------------------------------|
| Framework   | Next.js 15 (App Router)              |
| Language    | TypeScript 5                         |
| Styling     | Tailwind CSS v4                      |
| Fonts       | Sora + Inter (Google Fonts)          |
| Icons       | Lucide React                         |
| Database    | Prisma + SQLite (uigen feature only) |
| AI Feature  | Anthropic Claude (uigen feature only)|

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Homepage (/)
│   ├── layout.tsx              # Root layout with fonts & metadata
│   ├── globals.css             # Global styles & design tokens
│   ├── events/                 # Events listing (/events)
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx     # Individual event detail page
│   ├── about/                  # About page
│   ├── team/                   # Team page
│   └── [projectId]/            # AI code generator (uigen feature)
│
├── components/
│   ├── codehive/               # All CodeHive community page sections
│   │   ├── ui/                 # Shared primitive UI components
│   │   │   ├── index.ts        # Barrel export
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── BorderGlow.tsx
│   │   │   ├── CurvedLoop.tsx
│   │   │   └── ...
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── CommunityGroupsSection.tsx
│   │   ├── TractionSection.tsx
│   │   ├── UpcomingEventSection.tsx
│   │   ├── EventHeroSection.tsx
│   │   ├── EventCallToActions.tsx
│   │   └── ...
│   └── DynamicIcon.tsx         # Lucide icon renderer by name
│
├── lib/
│   └── codehive/               # Single source of truth for all site data
│       ├── types.ts            # All TypeScript interfaces (incl. CodeHiveEvent)
│       ├── constants.ts        # Links, social URLs, design color tokens
│       ├── data.ts             # All page content arrays (stats, team, groups…)
│       └── eventsData.ts       # Events array — add new events here
│
└── hooks/
    └── useAnimatedCounter.ts   # Counter animation hook for stat cards
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Mr-spiky/CodeHive.git
cd CodeHive

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env if you want to use the AI code generator feature

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Content Updates

All site content is managed from a **single location**:

| What to update        | File to edit                          |
|-----------------------|---------------------------------------|
| Nav links             | `src/lib/codehive/data.ts` → `NAV_LINKS` |
| Community groups      | `src/lib/codehive/data.ts` → `COMMUNITY_GROUPS` |
| Stats / traction      | `src/lib/codehive/data.ts` → `BIG_STATS` |
| Team members          | `src/lib/codehive/data.ts` → `TEAM_MEMBERS` |
| **Add a new event**   | `src/lib/codehive/eventsData.ts` → `EVENTS` |
| Social / community links | `src/lib/codehive/constants.ts` |
| Brand colors (JS)     | `src/lib/codehive/constants.ts` → `COLORS` |
| Brand colors (CSS)    | `src/app/globals.css` → `:root` |

> **Components auto-update** — edit the data files only, never hardcode content inside components.

---

## Adding a New Event

Open `src/lib/codehive/eventsData.ts` and add a new object to the `EVENTS` array:

```ts
{
  id: "event-2",
  slug: "your-event-slug",
  title: "Event Title",
  subtitle: "A short tagline",
  date: "DD MMM YYYY",
  venue: "Venue Name, City",
  isFree: true,
  registrationLink: EVENT_REGISTER_LINK,
  posterImage: "/image/Events/your-poster.png",
  bannerImage: "/image/Events/your-banner.png", // optional
  tags: ["Tag1", "Tag2"],
  description: "A short description of the event.",
  targetAudience: ["Students", "Developers"],
  whyJoin: ["Reason 1", "Reason 2"],
  status: "upcoming", // "upcoming" | "past" | "live"
}
```

The event will automatically appear on:
- `/events` listing page (featured card)
- `/events/your-event-slug` detail page
- Homepage upcoming events preview

---

## Scripts

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## License

© 2026 CodeHive. All rights reserved.
