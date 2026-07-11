# CodeHive

Rebuilt from zero on 2026-07-09 to match the 5 reference marketing designs
(Home, Events, Team, Blog, Testimonials) supplied directly, replacing every
prior file. Nothing from the earlier "uigen"-derived repo remains.

## What's real vs. what needs your input

Every number, name, and quote on the site is read from the database via
Prisma — no component hardcodes a person's name or a fake testimonial.
Concretely:

- **Real and seeded:** "The Big Shift 1.0" event, the Skill Consistency
  Challenge, one badge, the community stats on the homepage (2000+ Active
  Members, 500+ Event Registrations, 25+ Yrs Combined CTO Experience, 3+
  Partner Collaborations — from `src/lib/data/stats.ts`).
- **Intentionally empty, not faked:** `TeamMember`, `Testimonial`,
  `SuccessStory`, `BlogPost`, `Partner` tables. The reference screenshots
  show specific people/quotes/logos; I don't have your real team roster,
  member testimonials, or partner list, so I built the schema and every
  page to handle real data correctly (including a "no content yet" empty
  state) rather than inventing names. Add real rows via the Admin Panel
  once basic CRUD is built, or directly via `prisma studio` / a seed
  script edit in the meantime.

## Known limitations (stated plainly, not buried)

- **Illustrations are not pixel-recreations** of the reference screenshots'
  custom flat art (puzzle-piece team graphic, blog desk scene, etc.). The
  homepage hex-constellation is a real working SVG I designed to match the
  *concept*; the other pages currently have no custom illustration in the
  hero image slot. Commissioning/sourcing matching art is separate work.
- **Admin Panel is a real but minimal overview page only** — member/event/
  challenge counts are live Prisma queries, but there's no CRUD UI yet for
  managing Team/Blog/Testimonial/Partner content. That's the next build
  phase, not done.
- **Event/challenge auto-linkage to gamification is partial.** XP awarding
  (`lib/hive/xp-engine.ts`) exists and works, but nothing currently *calls*
  it automatically on event attendance or challenge check-in — those
  triggers still need to be wired into real check-in/attendance API routes.
- **No automated tests.**
- **Not run against a live database in this environment** — my sandbox
  blocks Prisma's binary CDN (confirmed via direct curl, `host_not_allowed`),
  so `prisma generate`/`migrate dev` have not been executed here. The
  TypeScript compiles cleanly (`tsc --noEmit`, see below), but "type-checks"
  and "verified running against Postgres" are different claims — the
  second one is yours to confirm once you run the setup steps.

## Structure

```
prisma/schema.prisma      All models: gamification (User, XPTransaction,
                           Event, Challenge, ChallengeCheckIn, Badge, Quiz*)
                           + content (TeamMember, Testimonial, SuccessStory,
                           BlogPost, Partner)
prisma/seed.ts             Real seed data only (see above)

src/app/
  (marketing)/             Home, /events, /events/[slug], /team, /blog,
                           /blog/[slug], /testimonials — public pages,
                           wrapped in shared Navbar/Footer via layout.tsx
  (auth)/login, /signup    Real server-action-backed auth
  (hive)/hive/             Member-only honeycomb dashboard (Day 2 concept
                           from earlier planning — separate from the
                           marketing site's visual language by design)
  (admin)/admin/           Role-gated, real counts, minimal for now

src/components/
  shared/                  Navbar, Footer, PageHero, StatStrip, CTABanner,
                           SectionHeader — used identically across all 5
                           marketing pages, matching the reference's
                           actual reusable component pattern
  home/, events/, team/, blog/, testimonials/   Page-specific components
  hive-map/, gamification/  Honeycomb dashboard + XP bar

src/lib/
  hive/journey.ts           XP-to-stage thresholds, single source of truth
  hive/xp-engine.ts          awardXP() — the only function that writes XP
  data/stats.ts               Real community stats
  auth.ts, prisma.ts          Session + DB client
```

## Setup

```bash
cp .env.example .env      # set DATABASE_URL (Postgres) and JWT_SECRET
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```
