# CODEHIVE — PRODUCT & ENGINEERING IMPLEMENTATION SPECIFICATION

**Document type:** Product requirements, technical architecture and phased delivery specification  
**Product:** CodeHive  
**Primary brand line:** Learn. Build. Grow.  
**Repository:** https://github.com/Mr-spiky/CodeHive  
**Canonical public domain:** https://www.codehivee.tech/  
**Document status:** Implementation baseline for engineering planning  
**Version:** 1.0  
**Last reviewed:** 1 November 2026

---

## 0. How this specification must be used

This document defines the product that the engineering team is expected to build. It is not a loose idea list. Requirements in the **Core**, **Should**, **Later** and **Do not build** groups have different delivery expectations.

- **Core:** Required for the first reliable public release of the relevant module.
- **Should:** Build when the module's core workflow is stable and tested. Do not compromise security or release quality to include it early.
- **Later:** Deliberately deferred until usage demonstrates a real need.
- **Do not build:** Explicitly rejected or prohibited unless the product owner approves a documented change.

Every phase must end with a working, testable product increment. A page that only looks complete, a button that has no working action, seeded data presented as real activity, or an unfinished workflow hidden behind a polished UI does not count as completion.

### 0.1 Product decisions are mandatory

1. Use this document as the product and architecture baseline. If implementation differs, record the reason in an Architecture Decision Record (ADR) and update this specification after approval.
2. Do not silently remove requirements. Mark any changed, deferred or rejected requirement in the change log.
3. Do not create dummy buttons, fake counters, invented testimonials, fake partner logos, fabricated member activity or placeholder success states in production.
4. Do not build all modules simultaneously. Complete phase gates in order, with security, accessibility, performance and tests included continuously.
5. Do not introduce microservices, a custom real-time chat stack, a native app, blockchain or a complex AI layer without an approved use case and an architecture decision.
6. The repository must remain maintainable by a small engineering team. Prefer a modular monolith with clear boundaries over premature distributed architecture.

### 0.2 Repository baseline and verification requirement

The public repository README describes a Next.js 15 / React 19 / Prisma / PostgreSQL application with marketing pages, login/signup, a member Hive dashboard, an admin overview, event/challenge models, XP logic and content models. It also declares unfinished admin CRUD, incomplete event/challenge-to-XP linkage, no automated tests and no live PostgreSQL verification. These are baseline declarations, not proof that every current file still behaves that way.

**At the start of Phase 0, the team must verify the current branch and inspect the actual source before changing architecture.** Reconcile the README, package manifest, deployed domain, environment variables, Prisma schema, migrations, route handlers, server actions and all public/member/admin routes. Record what is reusable, what is defective, what is unused and what must be replaced.

No engineer should assume that a README claim, a screenshot, a TypeScript pass or a successful local page render proves that a complete workflow works against the production database.

---

# 1. Product definition

## 1.1 Product purpose

CodeHive is a community and builder-development platform for students, aspiring developers and early-career technology builders. It helps people discover relevant opportunities, find collaborators, participate in meaningful activities, build practical projects, learn with others and present credible evidence of what they have done.

CodeHive is not intended to be a general-purpose social network, a clone of LinkedIn, a replacement for Discord, a generic learning-management system or a broad job portal.

## 1.2 Core product promise

**CodeHive helps a member move from interest to action, from action to completed work, and from completed work to credible proof.**

The primary member journey is:

1. Discover a relevant person, project, event, opportunity or learning resource.
2. Decide what to do and understand the requirements.
3. Join, apply, register, collaborate or start learning.
4. Complete the activity or contribute to an outcome.
5. Record verifiable evidence of participation or work.
6. Present that evidence through a useful member profile or project page.
7. Use the resulting experience to access stronger collaborations and opportunities.
8. Invite other builders and contribute to the community.

Each major feature must strengthen at least one step in this journey.

## 1.3 Product pillars

| Pillar | Product responsibility | Example outcomes |
|---|---|---|
| Discover | Make relevant activity findable | A member finds a hackathon, project, teammate or opportunity |
| Learn | Help members build practical capability | A member follows a structured path and completes practical tasks |
| Build | Make collaboration and delivery possible | A team forms, creates a project and records contributions |
| Showcase | Turn completed work into credible evidence | A project page and profile show what was built and by whom |
| Connect | Build useful relationships | Members find peers, mentors, organisers and chapters |

## 1.4 Primary product differentiator

The differentiator should be the connection between **community participation, real work and evidence**. CodeHive should not merely publish activity. It should help members take part in it and preserve the outcomes.

A project should connect to its team, contributors, milestones, demo, repository and event submission where applicable. An event should connect to registration, attendance, feedback, results and certificates where applicable. A member profile should draw from these real records rather than relying on self-awarded badges or arbitrary points.

## 1.5 Product success measures

Do not optimise the platform around raw signups or page views alone. Track the following:

| Measure | Definition | Why it matters |
|---|---|---|
| Activation rate | New members who complete onboarding and take one meaningful action within the chosen activation window | Measures whether signup becomes participation |
| First-value time | Time from account creation to first meaningful action | Exposes onboarding and discovery friction |
| Meaningful participation rate | Members completing an event, project, learning task or approved contribution in a period | Measures real activity rather than logins |
| Project completion rate | Projects reaching a declared completion/submission state divided by projects started | Measures delivery, not just idea creation |
| Event attendance rate | Verified attendees divided by confirmed registrations | Measures event execution |
| Opportunity action rate | Members who bookmark, apply or register after viewing an opportunity | Measures usefulness of discovery |
| Member retention | Members returning to perform meaningful actions in later periods | Measures sustained value |
| Profile completeness | Percentage of active members with useful, privacy-approved profile information | Measures the quality of the member network |
| Trust/quality rate | Share of published content and records that pass verification/moderation standards | Protects platform credibility |
| Operational resolution time | Time to resolve reports, event issues and account requests | Measures reliability of operations |

Analytics must not encourage fake engagement, spam, compulsive streaks or low-quality submissions.

---

# 2. Product concept review: retain, improve, defer or reject

Every concept from the brainstorming catalogue must pass four questions:

1. **User value:** Does it solve a recurring and meaningful problem?
2. **Operational ownership:** Who will keep it accurate, moderated and useful?
3. **Abuse and trust:** Can it be gamed, spammed, manipulated or used to mislead members?
4. **Build and maintenance cost:** Is the ongoing cost justified by actual usage?

The following decisions apply to the initial product direction.

| Concept | Decision | Improved product definition | Reason / constraint |
|---|---|---|---|
| Public website | Core | Fast, accessible discovery and credibility website backed by a CMS | Needed to explain CodeHive and attract members; it must show genuine information |
| Member dashboard | Core | Personal action centre with relevant next steps, not a vanity analytics page | A dashboard is useful only when it helps a member act |
| Member profiles | Core | Evidence-based builder profiles with granular privacy controls | Valuable when connected to real projects, events and contributions; avoid a LinkedIn clone |
| Member directory | Core, privacy-limited | Searchable directory with opt-in profile visibility and safe contact paths | Useful for collaboration; never expose private email, phone or personal data by default |
| Discussion feed | Should | Structured updates and announcements with moderation | Start with posts, comments and topic tags if there is a clear moderation owner |
| Real-time chat | Later / integrate first | Link to existing Discord/WhatsApp spaces or use approved external communication tools | Building chat, presence, delivery, abuse controls and notifications is expensive and not a first-order differentiator |
| Interest groups | Should | Topic groups with owner, purpose, membership rules, posts and activity | Better structure than one giant chat; launch only when there are real group owners |
| Project showcase | Core | Structured project records with team, problem, contribution, repository, demo and status | Directly supports the build-and-prove promise |
| Project collaboration | Core in project phase | Join requests, invitations, team roles, milestones and contribution records | Converts browsing into building; scope permissions carefully |
| Hackathon discovery | Core | Curated, verified events with dates, eligibility, deadlines and external/internal registration | Useful but must be maintained; expired events must not remain actionable |
| Full hackathon operating system | Should / advanced | Registrations, teams, submissions, rubric, judges, scoring, results and audit trail | High value for CodeHive-hosted competitions; do not build every feature for external events |
| Event management | Core | Complete event lifecycle and attendance workflow | Needed for reliable community operations |
| Ticketing and payments | Later | Only for events that require paid registration; use a compliant payment provider | Adds refund, reconciliation, tax and support complexity; do not collect card data directly |
| Learning paths | Should | Curated, versioned roadmaps with resources and practical checkpoints | More useful than trying to host an entire video course library immediately |
| Full LMS/video hosting | Do not build initially | Link to strong external learning material and track CodeHive-created tasks | Content production and hosting require significant ongoing effort |
| Quizzes and assessments | Later | Short assessments tied to learning outcomes, not meaningless quiz points | Must be authored, reviewed and maintained |
| Opportunities portal | Core, curated | Verified internships, programs, hackathons, scholarships, grants and fellowships | High member value if listings are fresh, sourced and moderated |
| General job marketplace | Do not build initially | Add role listings only when employers and candidate activity justify it | Too broad, competitive and operationally demanding for the current stage |
| Mentorship directory | Should | Approved mentor profiles with areas, availability and expectations | Requires verification and conduct standards |
| Mentor booking/payment | Later | Scheduling and paid sessions only after proven mentor demand | Adds calendar, cancellation, payment and dispute operations |
| XP and levels | Should, after verified activities | Transparent contribution ledger with defined values and server-side rules | Recognition can help, but arbitrary points damage trust |
| Login streaks | Do not reward | Optional personal consistency indicators only when tied to useful learning actions | Rewarding logins encourages empty activity and can create unhealthy pressure |
| Badges and certificates | Should | Verifiable, criteria-based records with issuer, date and unique verification ID | Must never issue unearned or unverifiable credentials |
| Leaderboards | Later, opt-in | Time-bounded rankings based on meaningful verified contributions | Global rankings can reward quantity over quality and discourage beginners |
| AI opportunity matching | Later | Explainable recommendations based on declared interests and eligibility | Requires enough accurate data and controls for sensitive profiling |
| AI mentor/chatbot | Later | Retrieval-based assistant grounded in approved CodeHive documentation and resources | Must show sources and limitations; do not invent opportunities or policy answers |
| AI resume/profile review | Later | Optional feedback tool that does not guarantee jobs or judge a person's worth | Needs privacy controls, deletion and clear limitations |
| AI team matching | Later | Suggest collaborators based on skills, availability and declared goals; user chooses | Automated matching without reliable data creates poor recommendations |
| Public activity feed | Should | Opt-in feed of meaningful launches, milestones and approved achievements | Avoid turning CodeHive into a low-signal social feed |
| Referral system | Later | Track legitimate invitations with anti-spam limits | Build only after member activation and retention work |
| Campus chapters | Should, if operating capacity exists | Scoped groups, leads, events and membership under clear governance | Supports local activity but needs accountable chapter owners |
| Partner portal | Later | Verified partner records, campaign/event details and outcomes | Build when recurring partners need self-service access |
| Sponsor dashboards | Later | Aggregated event metrics and approved deliverables, never unrestricted member data | Valuable for partnerships but must preserve participant privacy |
| Community marketplace | Do not build initially | No open marketplace until trust, dispute, payments and moderation operations exist | Marketplace risk and complexity are disproportionate early on |
| Merchandise store | Later / external first | Link to an external commerce provider if demand exists | Not core to learning, building or proof |
| Digital collectibles / NFTs / tokens | Do not build | Use ordinary verifiable records where credentials are needed | Blockchain adds complexity without solving the current trust problem |
| Virtual hackathon arena | Experimental | Structured remote event workspace only if existing tools are insufficient | High build cost; validate through a small event first |
| Live coding rooms | Experimental | Integrate established collaborative coding tools first | Infrastructure and abuse control are not justified initially |
| Skill exchange | Later | Structured peer-help requests and offers with reputation and safety controls | Could work after directory and group engagement are active |
| Native mobile applications | Later | First deliver a responsive PWA and mobile browser experience | Native apps create a second product and release burden |
| AI-generated content | Restricted | Drafts must be reviewed and approved by a human editor | Prevent fabricated facts, spam and low-quality SEO pages |

## 2.1 Explicitly rejected product patterns

Do not build the following into the platform:

- Fake countdowns, fake live activity, fake member counts or fabricated social proof.
- Public contact details by default.
- Unverified certificates or badges that look official.
- XP for simply opening the website, logging in, refreshing, inviting spam accounts or posting low-effort content.
- Public ranking of beginners or shaming inactive members.
- Unmoderated direct messaging between all users.
- Unlimited user-generated file uploads without malware, size, type and abuse controls.
- Admin actions that permanently change data without an audit record.
- A hidden super-admin mode that impersonates users or edits records without disclosure.
- AI-generated opportunity, event, partnership or achievement claims presented as verified facts.
- A public page that implies a feature is operational when it is only a mockup or roadmap item.

---

# 3. User types, roles and access model

## 3.1 User types

| User type | Primary need |
|---|---|
| Visitor | Understand CodeHive and discover public content |
| Registered member | Build a profile, discover activity and participate |
| Project contributor | Join and deliver work with a team |
| Project lead | Manage a project's members, milestones and submissions |
| Event participant | Register, receive updates and attend |
| Event organiser | Create and operate events, registrations and attendance |
| Mentor | Offer approved guidance within defined boundaries |
| Chapter lead | Operate an approved local chapter within its scope |
| Moderator | Review reports and enforce community rules |
| Content editor | Publish accurate website content |
| Community operations | Manage members, groups and routine activity |
| Partnership manager | Manage partner records, collaborations and deliverables |
| Platform administrator | Configure approved platform operations |
| Super administrator | Govern platform-wide access and perform controlled overrides |
| Platform owner | Hold ultimate ownership and recovery authority |

A person may hold more than one role. Role assignment must be explicit, scoped and auditable.

## 3.2 Role model

Roles are bundles of permissions; they are not hard-coded assumptions scattered throughout the UI. Use role-based access control combined with scope and contextual policy checks.

| Role | Scope | Default capabilities |
|---|---|---|
| Guest | Public | Read published public content; submit approved public forms |
| Member | Own account and public areas | Manage own profile and participation; create permitted content; request membership/participation |
| Mentor | Assigned mentorship scope | Manage mentor profile and accepted sessions; access only relevant mentee data |
| Project Lead | Assigned project | Manage the project and its team; no global member administration |
| Event Organizer | Assigned event(s) | Manage assigned events, registrations, attendance and submissions |
| Chapter Lead | Assigned chapter | Manage chapter members, activities and scoped content |
| Moderator | Assigned moderation queue / scope | Review reports and perform permitted moderation actions |
| Content Editor | Content scope | Draft and publish approved content; no access to private member records |
| Community Manager | Community scope | Manage groups, member requests and community announcements |
| Operations Admin | Assigned operational areas | Perform approved operations such as event, member or opportunity administration |
| Platform Admin | Platform-wide, permission-limited | Manage specified platform settings and modules |
| Super Admin | Global | Access all product modules, manage permissions and perform audited overrides |
| Platform Owner | Global root | Manage ownership, recovery and super-admin governance |

The exact roles may be renamed in implementation, but permission boundaries must remain explicit.

## 3.3 Permission model

Implement permissions at action level, not just page level. Example permission identifiers:

- `member.profile.read_public`
- `member.profile.read_private`
- `member.profile.update_own`
- `member.account.suspend`
- `member.account.restore`
- `member.role.assign`
- `member.role.revoke`
- `event.create`
- `event.update_own`
- `event.publish`
- `event.cancel`
- `event.registration.manage`
- `event.attendance.verify`
- `event.override_state`
- `project.create`
- `project.manage_own`
- `project.moderate`
- `opportunity.publish`
- `opportunity.verify`
- `content.publish`
- `moderation.resolve`
- `analytics.view_aggregated`
- `analytics.export_personal_data`
- `settings.manage`
- `permissions.manage`
- `audit.read`
- `audit.export`
- `system.override`
- `system.impersonate`

Permission names must be stored in a central registry or code-level canonical registry with a database-backed assignment model. Do not allow the frontend to decide whether a user has permission.

## 3.4 Scope hierarchy

Permissions may apply at one of the following scopes:

1. Global platform.
2. Community.
3. Chapter or campus.
4. Event.
5. Project.
6. Group.
7. Individual record.

A chapter lead must not gain permission over another chapter simply because both users share the same broad role. A project lead must not edit another project. An event organiser must not gain access to unrelated events.

## 3.5 Permission evaluation rules

Implement a single server-side authorization service with deterministic rules:

1. Authenticate the actor.
2. Load active role assignments and scopes.
3. Check account state and any restrictions.
4. Evaluate the requested action and target resource.
5. Apply explicit deny rules before ordinary grants.
6. Check contextual conditions, such as ownership, event assignment, chapter membership or record status.
7. If a controlled override is requested, validate the override permission, reason, expiry, re-authentication and any required second approval.
8. Record the decision and the resulting action in the audit trail.

Use deny-by-default. A missing permission must result in denial. Hiding a button is a usability measure, never the security boundary.

## 3.6 Super-admin and owner governance

The platform must have a dedicated **Super Admin Control Centre** at `/super-admin` or an equivalently protected route.

### Super Admin capabilities

- View global platform health and operational status.
- Search and inspect members, roles, events, projects, groups, opportunities, content, reports and partners according to privacy policy.
- Grant, revoke, expire and scope role assignments.
- Manage permission bundles and feature flags.
- Override eligible business states across all modules.
- Restore content or accounts where recovery is permitted.
- Correct event dates, registration states, ownership and moderation decisions.
- Correct XP and achievement records through compensating transactions.
- Resolve stuck workflows and retry failed background jobs.
- Inspect audit history and security events.
- Manage global policy settings and platform configuration.
- View integration health and configure provider connections without exposing provider secrets in the UI.
- Initiate controlled user impersonation for support investigation.
- Export approved operational reports.
- Initiate account/data requests and deletion workflows subject to policy and retention constraints.

### Override requirements

Every major module must expose a controlled override path to Super Admin. The override must use the module's service layer and the same validation rules as normal operations, with only the explicitly approved business rule being overridden.

For every override operation:

- Require a reason selected from a structured category plus a written explanation.
- Show the original value/state and proposed value/state before confirmation.
- Require fresh authentication for high-impact actions.
- Require MFA for Super Admin accounts.
- Record actor, acting role, target record, timestamp, IP/device metadata where lawful and appropriate, reason, before/after values, approval reference and correlation ID.
- Notify affected parties when the action materially affects their account, registration, project, reward or published content, except where notification would create a safety or investigation risk.
- Support rollback or compensating actions where technically possible.
- Never permit the acting administrator to erase or edit the audit record of the override.

### High-risk actions requiring two-person approval

Configure two-person approval for:

- Promoting another user to Super Admin or Platform Owner.
- Transferring platform ownership.
- Disabling MFA or changing root recovery settings.
- Bulk export of personal data.
- Large-scale account suspension or deletion.
- Financial refunds, payouts or financial configuration changes, if payments are introduced.
- Changing retention policy or disabling key security monitoring.

### Actions that must never be overridable

Super Admin is powerful, but not omnipotent. No user-facing or dashboard control may:

- Read plaintext passwords or retrieve password hashes for display.
- Reveal secret API keys, private signing keys, provider tokens or environment secrets.
- Delete or rewrite immutable audit history.
- Modify historical XP or payment ledgers in place; corrections must create compensating records.
- Bypass database integrity constraints, encryption or core authentication controls.
- Disable all security logging without an independently recorded, time-limited emergency process.
- Impersonate a user invisibly.

Direct database edits are not a substitute for an override workflow. Any emergency manual repair must be recorded in an incident report and reconciled in the application audit trail.

## 3.7 Impersonation / support mode

Support impersonation is an exceptional troubleshooting function, not an everyday admin shortcut.

- Require `system.impersonate` and a reason.
- Require re-authentication and MFA.
- Make the session time-limited.
- Display a permanent, unmistakable “Viewing as [member] — support mode” banner.
- Default to read-only. Write actions require a separate, explicitly granted support permission.
- Log every read/write action performed during the session.
- Never allow impersonation of a Super Admin or Platform Owner through ordinary support mode.
- Allow the impersonated member to see that support access occurred where appropriate under the privacy policy.

## 3.8 Initial access matrix

The table below is a starting policy. The final permission registry must be more granular.

| Capability | Member | Project Lead | Event Organiser | Chapter Lead | Moderator | Platform Admin | Super Admin |
|---|---:|---:|---:|---:|---:|---:|---:|
| Edit own profile | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Edit another profile | No | No | No | Scoped only | Restricted moderation context | Permission-based | Yes, audited |
| Create a project | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Manage assigned project | No | Yes | No | Scoped only | No | Permission-based | Yes, audited |
| Create an event | Request / eligible | No | Yes | Scoped | No | Permission-based | Yes |
| Manage assigned event | No | No | Yes | Scoped only | No | Permission-based | Yes, audited |
| Verify attendance | No | No | Assigned event | Assigned chapter event | No | Permission-based | Yes, audited |
| Moderate content | Own content only | Own project context | Event context | Chapter scope | Assigned queue | Permission-based | Yes, audited |
| Manage roles | No | No | No | No | No | Permission-based | Yes |
| Global settings | No | No | No | No | No | Permission-based | Yes |
| Override workflow | No | No | No | No | No | Explicit grant only | Yes, audited |
| Read audit log | No | No | No | No | Limited own case | Permission-based | Yes |

---

# 4. Product navigation and page architecture

The product must have three distinct interfaces sharing one identity, design system and data model:

1. Public website — discovery, credibility and acquisition.
2. Member application — participation, building and personal progress.
3. Operations and control centre — internal execution and governance.

Do not merge these into one crowded navigation system.

## 4.1 Public website routes

| Route | Purpose | Main content and actions |
|---|---|---|
| `/` | Explain CodeHive quickly | Value proposition, real activity, featured events/projects/opportunities, how it works, proof and join CTA |
| `/about` | Explain mission and operating model | Purpose, pillars, community principles, team, chapters and verified milestones |
| `/events` | Discover events | Search, filters, status, category, mode, dates, eligibility and organiser |
| `/events/[slug]` | Event detail | Description, agenda, eligibility, deadlines, organiser, venue/mode, registration state and FAQ |
| `/projects` | Discover member work | Search, category, technology, status, featured work and team |
| `/projects/[slug]` | Project case study | Problem, solution, contributors, stack, demo, repository, outcomes and collaboration status |
| `/opportunities` | Discover opportunities | Category, deadline, eligibility, location/remote, source and verification date |
| `/opportunities/[slug]` | Opportunity detail | Requirements, deadline/timezone, source, eligibility, application method and verification status |
| `/learn` | Discover learning paths | Topic, difficulty, estimated effort, prerequisites and learning outcomes |
| `/learn/[slug]` | Learning path detail | Modules, resources, tasks, progress expectations and source attribution |
| `/community` | Explain the community | Community model, groups/chapters, public activities, conduct code and joining steps |
| `/people/[username]` | Public member profile | Only user-approved fields and approved work/achievements |
| `/team` | Show accountable team | Real people, role, scope and approved links |
| `/partners` | Show genuine partnerships | Approved partner information and clearly described relationship type |
| `/blog` | Publish editorial content | Searchable articles with authorship and dates |
| `/blog/[slug]` | Read an article | Article, author, published/updated dates, sources and related material |
| `/conduct` | Publish community expectations | Code of conduct and reporting route |
| `/faq` | Answer common questions | Joining, events, projects, privacy, opportunities and support |
| `/contact` | Contact CodeHive | Verified contact channels and partnership/support forms |
| `/privacy` | Privacy notice | Current approved privacy and data-handling information |
| `/terms` | Terms | Current approved terms |
| `/accessibility` | Accessibility statement | Accessibility target and support contact |
| `/sitemap.xml` | Search discovery | Generated canonical public routes |
| `/robots.txt` | Crawler policy | Explicit indexing rules |

### Public navigation requirements

- Keep the primary navigation short. Do not expose every module in the header.
- Use a consistent primary CTA such as “Join CodeHive”.
- Show the member application entry after sign-in.
- Mark published, upcoming, registration-closed, completed and cancelled events accurately.
- Show a “last verified” date for time-sensitive opportunities.
- Do not show a public number or testimonial unless the source and permission to publish are known.
- Every public listing must have a useful detail page and a clear next action.
- Every route must have loading, empty, error and not-found states.

## 4.2 Member application routes

All routes below require authentication, with server-side authorization.

| Route | Purpose | Main functions |
|---|---|---|
| `/app` | Member home | Personalised action centre, relevant discoveries, pending actions and upcoming activity |
| `/app/onboarding` | Complete setup | Interests, skills, goals, experience, college/organisation (optional), availability and privacy |
| `/app/discover` | Explore platform | Unified discovery of events, projects, people, groups, learning and opportunities |
| `/app/people` | Find people | Opt-in directory, filters, skills, interests and collaboration availability |
| `/app/people/[username]` | Member detail | Public-approved profile, work and safe connection/request actions |
| `/app/profile` | Manage own profile | Bio, skills, interests, portfolio, links, visibility and evidence |
| `/app/projects` | My projects | Created, joined, invited, requested and completed projects |
| `/app/projects/[id]` | Project workspace | Members, tasks/milestones, updates, submissions and project settings according to role |
| `/app/events` | My events | Registered, waitlisted, attended, completed and cancelled registrations |
| `/app/opportunities` | Saved and recommended | Bookmarks, eligibility and application tracking where supported |
| `/app/learn` | Learning activity | Enrolled paths, progress, saved resources and assigned tasks |
| `/app/groups` | My groups | Group memberships, announcements and discussion areas |
| `/app/notifications` | Notification inbox | Read/unread, preferences and notification history |
| `/app/achievements` | Evidence and recognition | Verified badges, certificates and contribution history |
| `/app/settings/profile` | Personal settings | Profile details and privacy |
| `/app/settings/security` | Account security | Password, sessions, MFA and connected accounts |
| `/app/settings/notifications` | Communication controls | Channel and category preferences |
| `/app/settings/privacy` | Data controls | Visibility, export, deletion and consent controls |

## 4.3 Organiser / chapter / project workspaces

These are scoped workspaces inside the authenticated application. They must not require a global admin account to operate.

- Event workspace: event configuration, registrations, communication, waitlist, attendance, submissions, judges and reports.
- Chapter workspace: chapter profile, membership requests, events, groups, announcements and chapter analytics.
- Project workspace: members, roles, milestones, tasks, updates, links, files, submission and contribution evidence.
- Mentor workspace: mentor profile, availability, accepted requests, session notes with access restrictions and feedback.

## 4.4 Administration routes

`/admin` is for internal operational roles. The UI must show only modules for which the actor has permission.

- `/admin/overview`
- `/admin/members`
- `/admin/events`
- `/admin/projects`
- `/admin/opportunities`
- `/admin/learning`
- `/admin/groups`
- `/admin/chapters`
- `/admin/content`
- `/admin/testimonials`
- `/admin/partners`
- `/admin/moderation`
- `/admin/certificates`
- `/admin/notifications`
- `/admin/analytics`
- `/admin/reports`
- `/admin/audit` (only permitted audit scope)
- `/admin/settings` (only permitted settings scope)

## 4.5 Super Admin Control Centre routes

`/super-admin` is a separate, globally protected control plane. It must require MFA and must not rely on client-side route hiding.

- `/super-admin/overview` — global status, critical queues and system health.
- `/super-admin/members` — global member lookup and account controls.
- `/super-admin/roles` — role assignments, scope and expiry.
- `/super-admin/permissions` — permission registry and role bundles.
- `/super-admin/overrides` — override history, eligible override actions and pending approvals.
- `/super-admin/events` — global event inspection and controlled overrides.
- `/super-admin/projects` — global project inspection and controlled overrides.
- `/super-admin/content` — global content status and publication controls.
- `/super-admin/moderation` — global moderation cases and escalations.
- `/super-admin/chapters` — chapter governance and transfers.
- `/super-admin/partners` — partnership records and status.
- `/super-admin/analytics` — aggregated platform metrics.
- `/super-admin/audit` — immutable audit search and export under policy.
- `/super-admin/integrations` — provider status and connection configuration.
- `/super-admin/feature-flags` — controlled feature rollout.
- `/super-admin/system` — health, background jobs, storage, email and integration diagnostics.
- `/super-admin/security` — MFA compliance, suspicious activity, sessions and security alerts.
- `/super-admin/policies` — platform-wide policies and configurable limits.
- `/super-admin/approvals` — two-person approval queue.
- `/super-admin/impersonation` — controlled support access.

---

# 5. Functional requirements by module

## 5.1 Identity, registration and account lifecycle

**Objective:** Provide secure, recoverable accounts and a consistent identity across public, member and internal areas.

### Core requirements

- Email/password registration with server-side validation.
- Email verification before full participation privileges.
- Sign-in, sign-out and session revocation.
- Password reset using single-use, expiring tokens.
- Password change requiring current authentication.
- Rate limiting for registration, login, verification and reset attempts.
- Protection against account enumeration in authentication responses.
- Secure, HTTP-only, Secure and appropriate SameSite session cookies.
- Session rotation after authentication and privilege changes.
- MFA mandatory for Super Admin and recommended/available for administrators.
- Optional OAuth providers only after callback, account-linking and recovery flows are tested.
- Account suspension, restriction, restoration and closure workflows.
- User export/deletion request intake and processing status.
- Terms and privacy acknowledgement with version and timestamp.
- Explicit optional consent for marketing communications.

### Onboarding fields

Required only when needed: display name, username and email. Request further data progressively.

Optional or selectively required:

- Profile photo/avatar.
- Short bio.
- Skills and confidence level.
- Interest areas.
- Learning goals.
- Collaboration goals.
- Availability/time zone.
- College/organisation and location at an appropriately broad level.
- GitHub, LinkedIn, portfolio and other public links.
- Preferred notification channels.
- Profile visibility settings.

Do not make phone number, exact location, date of birth, gender or other sensitive/personal fields mandatory unless a specific lawful operational need is documented.

### Acceptance criteria

- Unverified users cannot perform actions that require a verified account.
- Password reset tokens are single-use and expire.
- Rate limits work across distributed requests, not just in-process memory.
- Session revocation takes effect server-side.
- All account state changes are audited.
- Authenticated users cannot access another user's private settings or data by changing an ID in a URL or request.

## 5.2 Member profiles and builder identity

**Objective:** Present useful and credible evidence of capability without copying a generic social network.

### Core profile sections

- Identity: display name, username, profile photo and optional short introduction.
- About: concise biography and areas of interest.
- Skills: self-declared skills with experience/confidence label; clearly distinguish self-declared from assessed or verified.
- Links: GitHub, LinkedIn, portfolio and approved external links.
- Projects: projects the member owns or contributes to, with contribution role.
- Events: public participation records only where the member has consented or the event's published terms allow it.
- Contributions: approved contributions to CodeHive projects, events or learning activities.
- Achievements: earned badges/certificates with issuer and verification status.
- Availability: optional signal for collaboration or mentorship.

### Privacy controls

- Public profile on/off.
- Field-level visibility for bio, skills, links, project participation and achievements.
- Hide profile from directory while retaining event/project membership.
- Block/report controls where appropriate.
- Do not expose email, phone, internal notes, moderation history or private membership status publicly.

### Acceptance criteria

- Profile information is validated and sanitized.
- Public rendering obeys field-level visibility.
- Search results never reveal hidden fields.
- Verified claims display their issuer/source; unverified self-declared skills are labelled accurately.

## 5.3 Discovery and search

**Objective:** Help members find useful activity without making the platform a noisy feed.

### Searchable entities

- Events.
- Projects.
- People who opted into discovery.
- Opportunities.
- Learning paths/resources.
- Groups/chapters.
- Articles and announcements.

### Search behavior

- Search across title, summary, description and controlled tags.
- Filters appropriate to each entity: category, date, format, level, skill, location/remote, status and eligibility.
- Sorting by relevance, newest, deadline or popularity only where popularity is defined honestly.
- Pagination or cursor pagination; no unbounded result loading.
- Search query state represented in URL where useful.
- Clear filters, useful no-result suggestions and typo tolerance where practical.
- Prevent private or unpublished records from appearing in search indexes.

### Recommendation rules

Initially use explainable rules based on declared interests, skills, eligibility and activity. Show why an item is recommended. Never infer sensitive traits or use opaque AI scoring as a gatekeeper.

## 5.4 Events and workshops

**Objective:** Make an event discoverable, registrable, operable and measurable from draft through completion.

### Event fields

- Title, unique slug and concise summary.
- Description and learning/outcome expectations.
- Event category and format.
- Start/end datetime with explicit timezone.
- Registration open/close datetime.
- Venue or online joining instructions, with private details gated until appropriate.
- Organiser and responsible contact.
- Eligibility and capacity.
- Registration fields and consent text.
- Agenda/schedule.
- Speakers/judges and approved bios.
- Sponsor/partner links and relationship labels.
- FAQ and cancellation policy.
- Banner, accessible image alt text and social sharing metadata.
- Published state and event lifecycle state.

### Lifecycle

Use a state machine with explicit valid transitions. At minimum:

`DRAFT → REVIEW (optional) → PUBLISHED → COMPLETED → ARCHIVED`

Cancellation is a separate terminal/controlled state. Registration availability is computed from published state, registration window, capacity and eligibility; do not trust a manually selected label alone.

Possible calculated registration states:

- Not open yet.
- Open.
- Waitlist only.
- Full.
- Closed.
- Cancelled.

Do not allow registration to a past event unless an administrator explicitly creates a documented exception for a future/ongoing activity.

### Registration workflow

- Authenticated registration where identity matters.
- Configurable form fields with validation.
- Unique constraint to prevent duplicate registration for the same event/member.
- Eligibility and capacity checks on the server.
- Confirmation page and notification.
- Waitlist with timestamp/position and explicit promotion rules.
- Cancellation by participant where allowed.
- Organiser cancellation and bulk communication.
- Registration export limited to authorised organisers.

### Attendance

- Manual check-in by authorised organiser.
- Unique QR/check-in token with expiry and event binding if QR is used.
- Server-side validation of token, event, date/window and registration status.
- Duplicate check-in protection.
- Manual correction requires reason and audit record.
- Attendance records distinguish registered, checked-in, attended, excused and no-show where appropriate.
- Offline attendance import must validate and record the operator/source.

### Post-event workflow

- Mark completed.
- Record outcomes, photos and event report.
- Collect feedback using optional forms.
- Issue certificates only to eligible attendees/submissions.
- Publish results only with appropriate permission.
- Archive operational data according to retention policy.

### Acceptance criteria

- An event cannot appear as actionable upcoming activity after its end time.
- Registration capacity cannot be exceeded by concurrent requests.
- A member cannot register twice.
- QR tokens cannot be reused across events or indefinitely.
- Organisers can only access assigned event data.
- All corrections to registration and attendance are audited.

## 5.5 Hackathons and competitions

**Objective:** Support CodeHive-operated competitions with auditable rules, teams, submissions and judging.

### Core hackathon workflow

1. Create draft competition.
2. Configure rules, eligibility, dates, themes, tracks, team size and submission requirements.
3. Review and publish.
4. Accept individual or team registrations.
5. Support team creation/invitations where enabled.
6. Close registration and freeze or snapshot eligibility data.
7. Accept submission metadata and links before deadline.
8. Validate submission time and required fields on the server.
9. Assign judges and conflict-of-interest declarations.
10. Score using a defined rubric.
11. Lock scores and record any authorised adjustments.
12. Announce results.
13. Issue eligible certificates and publish approved project showcases.
14. Archive the event with a record of its rules and outcome.

### Submission fields

- Team and member list at submission time.
- Project title and summary.
- Problem and solution.
- Repository/demo links.
- Technologies.
- Track/category.
- Required documents/media.
- Submission timestamp and version history.
- Declaration of originality and applicable terms.

### Judging

- Rubric criteria and weights must sum to the declared total.
- Judges see only permitted submission data.
- Blind judging option where needed.
- Conflict declarations and judge assignment audit.
- Scores remain private until authorised release.
- Corrections require reason and audit.
- Final rankings must be calculated consistently and explain tie-break rules.

### Deferred features

Live coding environments, automated code execution, AI judging, sponsor-specific scoring automation and virtual competition arenas are not part of the first hackathon release.

## 5.6 Projects and collaboration

**Objective:** Turn member interest into documented work and collaboration.

### Project fields

- Title, slug, summary and problem statement.
- Proposed solution and expected impact.
- Project status: idea, seeking collaborators, active, paused, submitted/completed, archived.
- Owner/lead and team.
- Skills/roles sought.
- Technology tags.
- Public/private visibility.
- Repository and demo links.
- Milestones and progress updates.
- Contribution records and acknowledgements.
- Event/hackathon relationship where applicable.
- Licence/IP information where applicable.
- Moderation and featured status.

### Core actions

- Create project.
- Edit own project.
- Invite members.
- Request to join.
- Accept/reject requests.
- Assign project roles.
- Publish milestones and updates.
- Link repository/demo.
- Submit project to a CodeHive event where allowed.
- Mark complete or archive.
- Report abuse or ownership disputes.

### Contribution evidence

A project lead may propose a contribution record, but the contributor should be able to review or dispute it. GitHub integration may later corroborate public repository activity, but raw commit count must not be treated as quality or sole proof of contribution.

### Acceptance criteria

- Only authorised project roles can change membership and project settings.
- Join requests cannot bypass capacity or project policy.
- Leaving/removal records are retained in project history.
- Public/private visibility is enforced server-side.
- Project ownership transfer is audited and requires confirmation.

## 5.7 Opportunities

**Objective:** Provide a reliable, curated discovery service for opportunities relevant to members.

### Opportunity categories

- Internships.
- Hackathons and competitions.
- Scholarships and fellowships.
- Open-source programs.
- Ambassador and campus programs.
- Grants and accelerators.
- Workshops, bootcamps and learning programs.
- Jobs, only when a credible employer/source and operating process exist.

### Required fields

- Title, provider and official source URL.
- Summary and full description.
- Opportunity type.
- Eligibility and prerequisites.
- Location/remote mode.
- Application method.
- Deadline with timezone.
- Published date and last verified date.
- Source/verification status.
- Listing owner/editor.
- Status: draft, review, published, expired, withdrawn, rejected.
- Disclaimer where details are externally controlled.

### Trust requirements

- No opportunity may be published without a source.
- High-risk or suspicious listings require manual review.
- Expired listings must be automatically marked expired and removed from active recommendations.
- Editors must periodically re-verify time-sensitive listings.
- Sponsored placements must be labelled.
- CodeHive must not imply endorsement of an external provider merely by listing it.
- Provide a report listing action.

### Member actions

- Bookmark.
- Mark as considering/applied where the member chooses.
- Add personal notes privately.
- Receive deadline reminders.
- Report inaccurate or suspicious information.

Do not claim that CodeHive tracks external applications unless the external provider actually integrates with it.

## 5.8 Learning paths and resources

**Objective:** Curate learning journeys that lead to practical outcomes.

### Learning path structure

- Title, summary, topic and level.
- Prerequisites.
- Expected outcome.
- Estimated effort range.
- Ordered modules.
- External resources with attribution and licence awareness.
- Practical tasks or checkpoints.
- Project/application outcome.
- Author/reviewer and last-reviewed date.
- Version and change history.

### Member progress

- Enrol/save path.
- Mark resource complete.
- Submit task or proof where required.
- Track progress and notes privately.
- Join an optional study group.
- Report broken or outdated resources.

### Quality controls

- A learning path requires an owner/editor.
- External links must be checked periodically.
- Do not copy copyrighted material without permission.
- A completion badge must state exactly what completion means.
- Do not imply professional certification for completing a curated list.

A full LMS, video hosting and complex assessment engine are deferred.

## 5.9 Community groups and chapters

**Objective:** Organise real member communities around shared interests or locations without creating an unmoderated chat clone.

### Group fields

- Name, purpose and description.
- Topic or chapter classification.
- Owner/moderators.
- Join policy: open, request or invitation.
- Visibility: public or private.
- Rules and pinned resources.
- Membership state and activity status.

### Features

- Group announcements.
- Structured posts/updates if enabled.
- Event linking.
- Learning/project linking.
- Member list subject to privacy settings.
- Report and moderation actions.
- Group owner transfer and inactive-group process.

### Chapter governance

- A chapter has an approved lead and optional team.
- Chapter permissions are scoped to that chapter.
- Chapter activity uses the same event/project standards as the platform.
- Chapter leads cannot appoint global administrators.
- Chapter branding and public claims require approval.
- Inactive or non-compliant chapters can be placed under review or closed with an audited process.

## 5.10 Mentorship

**Objective:** Make mentorship structured, safe and useful rather than an open directory with no expectations.

### First release

- Mentor application and approval.
- Mentor profile with experience areas and boundaries.
- Member request form with goals and context.
- Mentor accept/decline and capacity state.
- Basic request status and communication hand-off.
- Feedback/report process.

### Later

- Calendar integration.
- Session booking and rescheduling.
- Session notes with strict visibility.
- Paid mentorship only after policy, payment, refunds and dispute handling are designed.

Do not allow minors or vulnerable users to be exposed to unrestricted private contact without age-appropriate safety and safeguarding review. Do not promise that mentors guarantee jobs, placements or outcomes.

## 5.11 Content management system

**Objective:** Allow authorised editors to manage public content without code deployments.

### Managed content types

- Pages and page sections.
- Blog articles.
- Announcements.
- Events and event FAQs.
- Team profiles.
- Testimonials (with explicit permission and source).
- Partner profiles (with approved relationship wording/logo permission).
- Learning resources.
- Public FAQs.
- Banners and featured content.

### CMS workflow

- Draft.
- Review requested.
- Approved.
- Scheduled.
- Published.
- Unpublished/archived.

### Required controls

- Draft preview.
- Author/editor attribution.
- Slug and SEO fields.
- Version history.
- Scheduled publication.
- Rollback to a previous published version.
- Media alt text and caption.
- Approval permissions by content type.
- Audit trail for publish/unpublish.

Do not create a custom visual page builder in the first version. Use reusable section blocks and controlled templates.

## 5.12 Notifications and communications

**Objective:** Send relevant, reliable messages with member control and operational traceability.

### Notification categories

- Account/security.
- Event registration and changes.
- Project invitations and requests.
- Opportunity deadlines.
- Learning reminders.
- Group and chapter announcements.
- Moderation/account actions.
- Product/system announcements.
- Optional marketing.

### Channels

- In-app inbox: Core.
- Email: Core for security and essential workflow events.
- Web push: Later, opt-in.
- WhatsApp/SMS: Later and only through approved providers with consent and cost controls.

### Requirements

- User preferences by category/channel.
- Essential security notifications cannot be silently disabled where they are necessary.
- De-duplicate repeated notifications.
- Retry transient provider failures safely.
- Store delivery state and provider message reference.
- Templates must be versioned and previewable.
- No secrets or sensitive data in notification payloads.
- Avoid spamming users with every small action.
- Provide unsubscribe/preferences controls for marketing messages.

## 5.13 Moderation and trust & safety

**Objective:** Protect members and platform credibility.

### Core features

- Report member, project, event, opportunity, group, comment or content.
- Report reason and optional explanation/evidence.
- Case queue with status, priority and assignment.
- Moderator notes private to authorised staff.
- Warn, hide, remove, restrict, suspend or escalate according to policy.
- Appeal or review request.
- Evidence preservation and action history.
- Spam and rate-limit controls.
- Block/mute mechanisms where relevant.
- Community conduct policy and event-specific rules.

### Moderation rules

- Separate allegation from verified finding.
- Limit access to sensitive reports.
- Use consistent reason codes.
- Record every action and reversal.
- Provide an appeal path for material account restrictions.
- Apply emergency safety measures proportionately.
- Do not expose reporter identity to the reported person by default.
- Do not use AI as the final authority for bans or serious decisions.

## 5.14 Reputation, XP and achievements

**Objective:** Recognise meaningful contributions without turning the platform into a point-farming game.

### Source of truth

Use an append-only transaction ledger for XP/reputation. A balance is a calculated or safely cached view of ledger entries, not a field that arbitrary client requests can overwrite.

### Eligible actions may include

- Verified event attendance.
- Accepted project contribution.
- Approved learning task completion.
- Approved open-source contribution.
- Judged hackathon submission.
- Mentoring session completed and confirmed.
- Approved community operations contribution.
- Quality-approved content/resource contribution.

### Ineligible actions

- Login, page view or refresh.
- Repeated duplicate submissions.
- Self-awarded achievements.
- Unverified attendance.
- Spam invitations.
- Raw follower/connection counts.
- Multiple low-quality actions created only to farm points.

### Ledger requirements

- Record source entity and action type.
- Unique idempotency key to prevent duplicate awards.
- Server-side eligibility calculation.
- Rule version used at award time.
- Actor/source and timestamp.
- Reversal as a compensating transaction, never silent mutation.
- Admin adjustment requires reason, permission and audit event.
- Member-facing explanation of why points were awarded or reversed.

### Badges and certificates

- Define criteria before issuing.
- Record issuer, recipient, issue date, criteria version, source activity and revocation status.
- Use unique verification identifiers and a public verification page only when the recipient/issuer agrees.
- Avoid presenting attendance participation as a skill certification.

### Leaderboards

Defer until the contribution model has proved resistant to gaming. If introduced, provide clear criteria, a time period, privacy options and no public ranking of hidden/private activity.

## 5.15 Partnerships and sponsorships

**Objective:** Track genuine relationships and deliverables.

### Initial capability

- Internal partner record.
- Organisation/contact details with restricted access.
- Relationship type: community partner, event partner, venue partner, learning partner, sponsor, media partner or other.
- Status and responsible CodeHive owner.
- Agreements/notes stored with access controls.
- Events and campaigns linked to partner record.
- Approved logo/name usage and expiry.
- Deliverables and completion status.
- Outcomes/reporting.

### Later partner portal

- Partner login with scoped access.
- Submit collaboration proposal.
- Review event brief and deliverables.
- View approved aggregate campaign reports.
- Download approved invoices/receipts or documents if finance features are introduced.

Never expose member-level personal data to partners unless a specific, transparent and authorised purpose exists.

## 5.16 Analytics and reporting

**Objective:** Support decisions and operations, not vanity dashboards.

### Public analytics

Use privacy-conscious analytics to understand acquisition and page performance. Avoid unnecessary personal tracking.

### Product analytics

Track events such as onboarding complete, event view, registration complete, check-in, project join, project milestone, opportunity bookmark, learning task complete and profile visibility change.

### Admin reports

- Member growth and activation.
- Participation by event and chapter.
- Attendance and no-show rates.
- Project starts/completions.
- Opportunity listing freshness.
- Moderation queue and resolution times.
- Notification delivery/failure.
- Contribution and badge issuance.
- Campaign and referral attribution where consented.

Use aggregate data by default. Restrict row-level exports and log them. Analytics definitions must be documented; do not count the same activity multiple times through duplicated events.

---

# 6. Super Admin Control Centre — detailed requirements

The Control Centre is a foundational module, not an optional dashboard.

## 6.1 Global overview

Display:

- Current service status.
- Database and job queue health.
- Failed email/notification counts.
- Recent security alerts.
- Pending approval requests.
- Moderation escalations.
- Upcoming operational deadlines.
- Recent high-impact changes.
- Module status and feature rollout state.

Do not display sensitive data on the overview by default. Use links to permission-controlled detail views.

## 6.2 Global search

Search by exact ID, username, email (permission-limited), slug or approved reference. Results must show entity type, status, scope and action permissions. Search must not expose private content just because an administrator can guess an identifier.

## 6.3 Global member controls

- View account status, verification status and role assignments.
- Restrict, suspend, restore or close accounts through approved workflows.
- Revoke sessions.
- Require password reset where justified.
- Review consent and data requests.
- Assign/revoke roles with scope and expiry.
- View audit history.
- Never view password values or provider secrets.

## 6.4 Module-wide override support

Each module must implement a typed override operation, not an unstructured database-edit screen.

| Module | Allowed override examples | Mandatory record |
|---|---|---|
| Identity | Restore account, revoke session, correct verified email through re-verification | Reason, actor, target, previous/new state |
| Roles | Correct assignment, revoke role, change scope/expiry | Permission, approver if needed, before/after |
| Events | Reopen registration, close registration, correct event state/date, manual attendance correction | Reason, affected registrations, notifications |
| Hackathons | Reopen submission window, correct judging assignment, invalidate compromised score | Rule, evidence, before/after and approval |
| Projects | Transfer ownership, restore hidden project, correct disputed membership | Parties affected and reason |
| Opportunities | Unpublish suspicious listing, correct deadline/source, restore after verification | Source and verification note |
| Learning | Correct task status or completion record where evidence exists | Evidence and rule version |
| Reputation | Add compensating XP transaction or revoke incorrectly awarded achievement | Original transaction and reason |
| Content | Roll back version, unpublish, restore approved content | Version and approver |
| Moderation | Reopen case, reverse action, escalate | Original case and reason |
| Notifications | Retry failed delivery, suppress duplicate campaign | Provider state and retry idempotency key |
| Integrations | Pause provider, rotate credential via secret manager, retry webhook | Change record; never store secret value in audit |
| Settings | Change configurable policy within safe bounds | Previous/new setting, actor and approval |

## 6.5 Override design pattern

Every override screen must present:

- Target resource and current state.
- Valid states and permitted transition.
- Whether the action affects members or public pages.
- Whether notification is required.
- Required approval level.
- Reason category and written reason.
- A final confirmation step.
- Result reference and audit link after completion.

The override operation must call the same domain service used by normal workflows, with an explicit `OverrideContext` containing actor, reason, approval and permitted bypass. Do not add direct Prisma mutations in page components.

## 6.6 Feature flags and system controls

- Enable/disable a module or feature by environment, role, chapter or percentage rollout where appropriate.
- Every flag has owner, purpose, default, rollout scope and expiry/review date.
- Do not use feature flags to bypass security checks.
- Log changes and support rollback.
- Expire temporary flags; review stale flags regularly.

## 6.7 Audit log

Audit events must be append-only from the application perspective. Include:

- Unique event ID.
- Actor and effective role.
- Action and resource type/ID.
- Scope.
- Timestamp.
- Outcome.
- Reason where required.
- Before/after diff, with sensitive fields redacted.
- Request/correlation ID.
- Source channel (web, API, job, integration, support mode).
- Approval references.

Audit logs must be searchable by authorised staff and retained according to a documented policy. High-risk audit exports require explicit permission and logging.

---

# 7. Technical architecture

## 7.1 Architecture decision

Keep the current Next.js / React / TypeScript / Prisma / PostgreSQL stack if the Phase 0 audit confirms it is healthy and supported. Build a **modular monolith** with strict module boundaries.

Do not split services merely because the codebase has many features. Extract a service only when there is a demonstrated independent scaling, reliability, security or team-ownership reason.

## 7.2 Architectural layers

1. **Presentation layer:** Next.js routes, server components, client components and forms.
2. **Application layer:** Use cases/actions for registration, publish, check-in, join-project, issue-certificate and similar workflows.
3. **Domain layer:** Business rules and state transitions.
4. **Authorization layer:** Permission/scope/override decisions.
5. **Persistence layer:** Prisma repositories and transactions.
6. **Integration layer:** Email, OAuth, storage, analytics and external APIs.
7. **Background processing:** Scheduled expiry, reminders, retries and other asynchronous work.

Rules:

- UI components do not contain business-critical authorization logic.
- Route handlers/server actions validate input and authenticate the actor.
- Domain services own business rules.
- Database access is centralised through module repositories or service boundaries.
- Integrations are hidden behind provider interfaces.
- Background jobs call the same services as interactive requests.
- Never trust client-supplied role, price, XP, status, owner ID or attendance day as authoritative.

## 7.3 Target repository structure

Adapt to the current repository after Phase 0. Do not mass-move files without a migration plan. The following is the target organisation; it is not permission to duplicate existing files.

```text
CodeHive/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── preview-deploy.yml
│   │   └── production-deploy.yml
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── docs/
│   ├── product/
│   │   ├── product-specification.md
│   │   ├── user-journeys.md
│   │   ├── information-architecture.md
│   │   └── glossary.md
│   ├── architecture/
│   │   ├── system-overview.md
│   │   ├── data-model.md
│   │   ├── authorization-model.md
│   │   ├── integrations.md
│   │   └── adr/
│   ├── security/
│   │   ├── threat-model.md
│   │   ├── security-checklist.md
│   │   └── incident-response.md
│   ├── operations/
│   │   ├── deployment.md
│   │   ├── backup-restore.md
│   │   ├── monitoring.md
│   │   └── admin-runbook.md
│   └── testing/
│       ├── test-strategy.md
│       └── release-checklist.md
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   ├── brand/
│   ├── icons/
│   ├── images/
│   └── manifest.webmanifest
├── scripts/
│   ├── check-env.ts
│   ├── seed-development.ts
│   ├── seed-demo.ts
│   ├── create-super-admin.ts
│   ├── verify-migrations.ts
│   └── maintenance/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── (auth)/
│   │   ├── (member)/app/
│   │   ├── (workspace)/studio/
│   │   ├── (admin)/admin/
│   │   ├── (super-admin)/super-admin/
│   │   ├── api/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── forms/
│   │   ├── data-display/
│   │   ├── feedback/
│   │   └── providers/
│   ├── modules/
│   │   ├── identity/
│   │   ├── profiles/
│   │   ├── discovery/
│   │   ├── events/
│   │   ├── hackathons/
│   │   ├── projects/
│   │   ├── opportunities/
│   │   ├── learning/
│   │   ├── groups/
│   │   ├── chapters/
│   │   ├── mentorship/
│   │   ├── reputation/
│   │   ├── content/
│   │   ├── moderation/
│   │   ├── notifications/
│   │   ├── partnerships/
│   │   ├── analytics/
│   │   └── administration/
│   ├── server/
│   │   ├── auth/
│   │   ├── authorization/
│   │   ├── audit/
│   │   ├── db/
│   │   ├── jobs/
│   │   ├── storage/
│   │   ├── email/
│   │   ├── integrations/
│   │   └── observability/
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── styles/
│   ├── types/
│   └── middleware.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── security/
│   └── fixtures/
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── next.config.ts
├── tsconfig.json
└── ...lockfile
```

### 7.3.1 File ownership and content requirements

| File/folder | What it must contain |
|---|---|
| `src/app/(public)/*` | Public route pages, metadata and layouts only; no direct privileged database mutations |
| `src/app/(auth)/*` | Login, signup, verification, recovery and MFA screens |
| `src/app/(member)/app/*` | Authenticated member pages and route-level loading/error boundaries |
| `src/app/(workspace)/studio/*` | Scoped organiser, chapter, mentor and project workspaces |
| `src/app/(admin)/*` | Permission-filtered operations screens |
| `src/app/(super-admin)/*` | Global control-plane screens; all server actions independently authorised |
| `src/app/api/*` | Versioned/validated API endpoints, OAuth callbacks, webhook endpoints and health checks |
| `src/components/ui/*` | Reusable accessible primitives: buttons, inputs, dialog, dropdown, tabs, table, toast, skeleton, pagination |
| `src/components/layout/*` | Public, member, workspace, admin and super-admin navigation shells |
| `src/modules/<module>/components/*` | Components specific to that domain module |
| `src/modules/<module>/schemas/*` | Input/output validation schemas and typed contracts |
| `src/modules/<module>/services/*` | Use cases, transactional domain operations and state transitions |
| `src/modules/<module>/repositories/*` | Database queries and persistence boundaries |
| `src/modules/<module>/policies/*` | Module-specific authorization rules that call the central authorization service |
| `src/modules/<module>/types/*` | Domain types and DTOs; avoid leaking Prisma-generated models to the client |
| `src/server/auth/*` | Session configuration, password verification, token creation and MFA integration |
| `src/server/authorization/*` | Central permission registry, evaluator, scopes, override context and policy helpers |
| `src/server/audit/*` | Append-only audit writer, event types, redaction and query service |
| `src/server/db/*` | Prisma client, transaction helpers and database health check |
| `src/server/jobs/*` | Scheduled/background job definitions, retries and idempotency |
| `src/server/integrations/*` | Provider adapters and typed external service contracts |
| `src/server/observability/*` | Structured logger, error reporting, trace/correlation IDs and metrics |
| `src/config/*` | Typed app, environment, feature and provider configuration; never secrets |
| `prisma/schema.prisma` | Relational models, enums, indexes, uniqueness and referential actions |
| `prisma/migrations/*` | Reviewed, versioned, forward-only schema migrations; never edit applied migrations |
| `prisma/seed.ts` | Safe development/demo records only, clearly labelled as sample data |
| `scripts/create-super-admin.ts` | Secure one-time bootstrap for first owner/super-admin; no hardcoded credentials |
| `.env.example` | Variable names and safe placeholders; no real secrets or production values |
| `.github/workflows/ci.yml` | Install, format/lint, typecheck, tests, migration validation and production build |
| `docs/architecture/authorization-model.md` | Role model, scopes, deny rules, override policy and examples |
| `docs/security/threat-model.md` | Assets, actors, attack surfaces, abuse cases and mitigations |
| `docs/operations/backup-restore.md` | Backup schedule, retention, restore procedure and tested recovery evidence |
| `tests/*` | Unit, integration, E2E and security regression tests; avoid testing implementation details only |

### 7.3.2 Required module folder pattern

Each module should follow the same predictable pattern where relevant:

```text
src/modules/events/
├── components/
├── schemas/
├── services/
│   ├── create-event.ts
│   ├── update-event.ts
│   ├── publish-event.ts
│   ├── register-for-event.ts
│   ├── cancel-registration.ts
│   ├── verify-attendance.ts
│   └── override-event-state.ts
├── repositories/
├── policies/
├── queries/
├── types/
└── index.ts
```

Do not create empty files purely to match this tree. Add files when the module requires them.

## 7.4 Data model requirements

The final Prisma schema must be normalised enough to prevent inconsistent state, but not over-engineered. Define entities, unique constraints, foreign keys, indexes and deletion rules before creating migrations.

### Core identity and access entities

- `User` — account identity, email, username, password hash/provider identity references, account state and timestamps.
- `Profile` — public/member profile fields and privacy preferences.
- `Role` — named role bundle.
- `Permission` — canonical permission definition.
- `RolePermission` — role-to-permission mapping.
- `RoleAssignment` — user, role, scope type/ID, assigned by, start/end, status.
- `Session` — session/revocation data if database-backed sessions are used.
- `VerificationToken` — one-time verification/recovery token hash and expiry.
- `MfaMethod` / `MfaRecoveryCode` — secure MFA metadata; secrets encrypted and never displayed.
- `ConsentRecord` — versioned consent and acknowledgement history.
- `DataRequest` — export/deletion/correction request status and handling record.

### Community and participation entities

- `Skill`, `UserSkill`, `Interest`, `UserInterest`.
- `Group`, `GroupMembership`, `GroupPost`, `GroupAnnouncement` (only if group discussions are enabled).
- `Chapter`, `ChapterMembership`, `ChapterRole` or scoped role assignments.
- `Project`, `ProjectMember`, `ProjectInvite`, `ProjectJoinRequest`, `ProjectMilestone`, `ProjectUpdate`, `ContributionEvidence`.
- `Event`, `EventRegistration`, `EventWaitlistEntry`, `AttendanceRecord`, `EventSpeaker`, `EventJudge`, `EventSubmission`, `JudgingRubric`, `JudgingCriterion`, `JudgeAssignment`, `JudgeScore` where hackathons are supported.
- `Opportunity`, `OpportunityBookmark`, `OpportunityReport`, `OpportunityVerification`.
- `LearningPath`, `LearningModule`, `LearningResource`, `LearningEnrollment`, `LearningProgress`, `LearningTask`, `LearningSubmission`.
- `MentorProfile`, `MentorshipRequest`, `MentorshipSession`, with restricted notes only if explicitly required.

### Content and operations entities

- `ContentPage`, `ContentRevision`, `BlogPost`, `Announcement`, `MediaAsset`.
- `Partner`, `Partnership`, `PartnerDeliverable`.
- `TestimonialConsent` or equivalent source/permission record.
- `ModerationReport`, `ModerationCase`, `ModerationAction`, `Appeal`.
- `Notification`, `NotificationPreference`, `NotificationDelivery`, `NotificationTemplate`.
- `AuditLog` (append-only from application perspective).
- `ApprovalRequest`, `ApprovalDecision`.
- `FeatureFlag`, `SystemSetting` with typed values and change history.
- `IntegrationConnection` containing provider metadata only; secrets held in a secret manager.
- `WebhookEvent` with signature status, idempotency key and processing state.
- `BackgroundJob` or provider-managed queue records as appropriate.

### Reputation entities

- `XPTransaction` — append-only ledger entry with user, delta, action type, source entity, rule version, idempotency key, actor/source and timestamp.
- `BadgeDefinition` — badge criteria, metadata and version.
- `BadgeAward` — recipient, issuer, source record, issued/revoked state and unique verification ID.
- `Certificate` — only if a real certificate workflow is operational; include issuer, criteria, recipient and verification state.

### Data modelling rules

- Use UTC timestamps in storage; preserve the intended timezone for event display and deadlines.
- Use unique constraints for email, username, event registration per user/event, attendance per registration/check-in and idempotency keys.
- Use indexes for common filters, foreign keys, status/date queries and search lookups.
- Avoid unbounded JSON blobs for core business records. Use JSON only for genuinely variable configuration with schema validation.
- Define deletion/retention behavior for every personal-data-bearing model.
- Use soft deletion only where there is a clear recovery/audit requirement; do not leave unlimited personal data indefinitely.
- Use transactions for multi-record state changes such as registration+capacity, attendance+XP, submission+timestamp and role assignment+audit.
- Do not mutate append-only ledgers in place.

## 7.5 Background jobs and scheduled operations

Required jobs include:

- Expire opportunities and close event registration windows.
- Send event reminders and deadline reminders.
- Promote waitlisted participants where rules permit.
- Dispatch queued notifications and retry transient failures.
- Process approved content publication schedules.
- Reconcile pending external integration/webhook events.
- Detect stale drafts, inactive listings and failed workflows for admin review.
- Generate aggregate reports where needed.

Every job must be idempotent, observable, retry-safe and bounded. A failed job must not silently lose a registration, attendance record, certificate or notification.

## 7.6 API conventions

- Use consistent REST-style resource naming or a consistent typed RPC convention; do not mix patterns randomly.
- Validate all input at the server boundary.
- Return predictable success/error shapes and appropriate HTTP status codes.
- Never return database stack traces or secrets to clients.
- Paginate collection endpoints.
- Apply authentication and authorization to every private route.
- Use idempotency for duplicate-sensitive actions.
- Add request/correlation IDs.
- Rate-limit sensitive and expensive operations.
- Version external API contracts where needed.

Example endpoint families:

```text
/api/auth/*
/api/members/*
/api/profiles/*
/api/events/*
/api/projects/*
/api/opportunities/*
/api/learning/*
/api/groups/*
/api/notifications/*
/api/admin/*
/api/super-admin/*
/api/webhooks/*
/api/health/*
```

Avoid exposing a broad generic endpoint such as `PATCH /api/admin/update-anything`. Each use case must have a typed action and policy check.

---

# 8. Security, privacy, accessibility and reliability standards

These are cross-phase requirements. They are not a final-phase checklist.

## 8.1 Security baseline

- Remove all production fallback secrets. Application startup must fail if mandatory secrets are missing or weak.
- Keep secrets only in environment/secret management systems, never source control or client bundles.
- Hash passwords with a modern password-hashing algorithm and appropriate work factor; never encrypt passwords for later recovery.
- Use secure session handling and server-side authorization.
- Enforce MFA for Super Admin and sensitive administrator roles.
- Use CSRF protection where cookie-authenticated state-changing requests require it.
- Apply rate limiting and abuse detection.
- Validate and sanitise user input; use context-safe output rendering.
- Prevent SQL injection through parameterised ORM queries and careful raw SQL review.
- Protect against XSS, CSRF, SSRF, IDOR/BOLA, open redirects, insecure deserialisation and upload abuse.
- Set security headers and a reviewed Content Security Policy.
- Restrict CORS to explicit trusted origins.
- Verify webhook signatures and idempotency.
- Scan dependencies and keep supported versions patched.
- Log security events without recording passwords, tokens or unnecessary personal data.
- Use least privilege for database, storage and provider credentials.

## 8.2 File upload security

If avatars, project screenshots, certificates or documents are uploaded:

- Allow only necessary file types.
- Check actual file signatures, not only extensions.
- Enforce size and dimension limits.
- Randomise storage keys; do not trust user filenames.
- Store uploads outside executable application paths.
- Scan files where practical and quarantine suspicious files.
- Generate safe image variants.
- Prevent public access to private documents.
- Authorise every download.
- Remove orphaned files according to a controlled cleanup job.

## 8.3 Privacy baseline

- Collect only information required for a defined product purpose.
- Explain why optional fields are requested.
- Keep marketing consent separate from essential service communications.
- Provide privacy controls and account/data request workflows.
- Do not expose private member data to partners, mentors or other users by default.
- Document retention periods for profiles, event records, moderation records, audit records and backups.
- Review privacy notices, terms, consent flows and applicable India/data-protection obligations with qualified counsel before production launch.
- Keep a record of data processors and third-party providers.

## 8.4 Accessibility and usability

Target WCAG 2.2 AA as the design and testing baseline.

- Full keyboard navigation.
- Visible focus states.
- Semantic HTML and landmarks.
- Correct labels and error associations.
- Adequate colour contrast.
- Screen-reader-friendly dialogs and status updates.
- Reduced-motion support.
- No information conveyed by colour alone.
- Accessible charts and tables.
- Captions/transcripts for CodeHive-produced media where applicable.
- Useful touch targets on mobile.

## 8.5 Performance and reliability targets

Initial engineering targets; measure on real production pages and revise only with evidence:

- Public pages should render meaningful content without depending on client-side animation.
- Mobile Core Web Vitals target: LCP ≤ 2.5 seconds, INP ≤ 200 ms and CLS ≤ 0.1 at the 75th percentile where field data is available.
- Avoid oversized client bundles; use server components and code splitting appropriately.
- Optimise and serve responsive images.
- Paginate data-heavy lists.
- Avoid N+1 database queries.
- Cache only content that is safe and correct to cache; invalidate after relevant mutations.
- Provide error boundaries and useful retry paths.
- Establish a tested database backup and restore process before public launch.
- Monitor server errors, latency, database health and background job failures.

## 8.6 Testing standards

Required test layers:

- Unit tests for domain rules, state transitions, permission evaluation and validation.
- Integration tests against a real test database for Prisma/service workflows.
- E2E tests for signup, verification, registration, check-in, project join, submission and admin workflows.
- Security tests for IDOR/BOLA, privilege escalation, CSRF, rate limits, insecure direct object access and override misuse.
- Migration tests from a clean database and from the previous release schema.
- Manual accessibility checks and automated scanning.
- Load/concurrency tests for registration capacity, check-in and other contention-sensitive operations.

A successful production build is necessary but not sufficient for release.

---

# 9. Design and experience requirements

The product must be usable from the first phase, even before a final visual identity system is polished. “Functionality first” does not mean poor interaction design, broken responsive layouts or inaccessible controls.

## 9.1 Design approach

- Establish a small design system early: typography, spacing, colour tokens, surfaces, borders, radii, elevation, states and responsive breakpoints.
- Maintain separate navigation shells for public, member, admin and super-admin experiences.
- Use a consistent component library and avoid page-specific one-off controls.
- Prefer clarity and information hierarchy over decorative animation.
- Treat the honeycomb concept as a brand motif, not a constraint that forces every page into a hexagonal dashboard.
- Use motion only when it explains state or improves feedback. Respect reduced-motion settings.
- Do not let the visual design hide dates, eligibility, errors, privacy or next actions.

## 9.2 Mandatory UI states for every data-driven page

- Loading/skeleton.
- Empty state with a relevant next action.
- Error state with retry or support route.
- Permission-denied state.
- Not-found state.
- Disabled state with explanation.
- Success confirmation.
- Pending/review state.
- Archived/expired/cancelled state where relevant.

## 9.3 Forms

- Inline and server-side validation.
- Clear required/optional labels.
- Preserve safe values after validation errors.
- Disable duplicate submit while a request is pending.
- Display actionable error messages.
- Confirm destructive actions.
- Use undo where safe and practical.
- Confirm successful server persistence, not merely a local optimistic update.

## 9.4 Mobile experience

- Responsive browser experience is Core.
- Navigation, forms, tables, event cards and dashboards must work on small screens.
- Avoid desktop-only admin controls for essential operations.
- PWA installability and push notifications are Later, after browser workflows are stable.

---

# 10. Phase-by-phase delivery plan

The project is divided into **10 delivery phases (Phase 0 to Phase 9)**. Phase completion is defined by deliverables and acceptance gates, not by a calendar estimate. The technical lead must split each phase into small, reviewable tickets and pull requests.

## Phase 0 — Repository audit, product contracts and engineering baseline

**Purpose:** Establish what exists, what works, what is unsafe and what must be changed before expanding the platform.

### Work included

1. Clone the repository and confirm the active branch, commit history and deployment mapping.
2. Inspect every route, component, server action, API route, schema, migration and dependency.
3. Run install, lint, typecheck, test (if any), Prisma generation, migration validation and production build.
4. Connect to a dedicated development PostgreSQL database and verify actual runtime behavior.
5. Confirm which deployment is canonical: `codehivee.tech` versus the Vercel URL referenced by the repository.
6. Audit environment variables and remove development secrets/fallbacks from production paths.
7. Inventory every visible page and action; classify as working, partial, mock, broken or unused.
8. Verify that event dates, registration states, counters and seeded content are correct.
9. Review challenge check-in and XP code for client-trust and duplicate-award weaknesses.
10. Document current data entities and relationships.
11. Produce the threat model, initial architecture diagram, permission matrix and user journey diagrams.
12. Establish development, preview and production environment boundaries.
13. Configure branch protection, pull request template and CI baseline.
14. Create an issue backlog linked to the phases in this specification.

### Files/documents to create or update

- `README.md` — verified setup, scripts, stack and environment instructions.
- `.env.example` — variable names only; no secrets.
- `docs/architecture/current-state-audit.md` — inventory and findings.
- `docs/architecture/system-overview.md` — target modular-monolith design.
- `docs/architecture/data-model.md` — current and target entity map.
- `docs/architecture/authorization-model.md` — role/scope/override decisions.
- `docs/security/threat-model.md` — assets, threats and mitigations.
- `docs/testing/test-strategy.md` — required layers and initial test inventory.
- `docs/operations/deployment.md` — environments and deployment procedure.
- `docs/architecture/adr/0001-modular-monolith.md` — architecture decision.
- `.github/workflows/ci.yml` — baseline automated checks.

### Expected outcome

A verified understanding of the repository and a repeatable local/preview build. The team must know exactly what can be reused and must not add new product modules before the audit is signed off.

### Exit gate

- Clean clone can be installed and built from documented instructions.
- Development database migrations run from a clean state.
- Canonical production domain/deployment is confirmed.
- No production fallback secret remains.
- All existing routes/actions are inventoried.
- Baseline security issues are triaged with owners.
- CI blocks a failing typecheck, lint or build.
- Product owner approves the Phase 0 findings and target architecture.

## Phase 1 — Identity, authorization, audit and Super Admin Control Centre

**Purpose:** Build the platform's security and governance foundation before the other modules depend on it.

### Work included

1. Implement secure account registration, login, logout and email verification.
2. Implement password reset/change, session revocation and account lifecycle.
3. Add MFA for Super Admin and high-privilege administrators.
4. Implement central role and permission registry.
5. Implement scoped role assignments with start/end dates.
6. Implement server-side authorization evaluator and deny-by-default behavior.
7. Implement audit event writer and protected audit search.
8. Implement approval workflow for high-risk administrative actions.
9. Build base admin shell and Super Admin Control Centre shell.
10. Implement global member search with permission-based result fields.
11. Implement role assignment and revocation UI.
12. Implement controlled impersonation in read-only, time-limited support mode.
13. Implement override context, reason capture and audit preview/confirmation.
14. Create initial platform settings and feature flags.
15. Bootstrap the first Platform Owner/Super Admin through a secure one-time script.

### Files/modules expected

- `src/server/auth/*`
- `src/server/authorization/*`
- `src/server/audit/*`
- `src/modules/identity/*`
- `src/modules/administration/*`
- `src/app/(auth)/*`
- `src/app/(admin)/admin/*`
- `src/app/(super-admin)/super-admin/*`
- Prisma models for identity, roles, permissions, assignments, sessions, approvals and audit.
- `scripts/create-super-admin.ts`
- `docs/architecture/authorization-model.md`
- `tests/security/authorization/*`

### Expected outcome

A working, secure identity and governance layer. A Super Admin can inspect the system, manage roles and scopes, search permitted records, review audit history and perform a controlled test override. Ordinary administrators see only their assigned modules.

### Exit gate

- All private routes enforce server-side authorization.
- A user cannot access another user's private record by changing an identifier.
- Scope isolation tests pass.
- Super Admin login requires MFA.
- Role changes and overrides are audited.
- High-risk actions require approval where configured.
- Impersonation is visibly labelled, time-limited and logged.
- The audit log cannot be modified through application routes.
- Automated privilege-escalation tests pass.

## Phase 2 — Public website, CMS and discoverability

**Purpose:** Build a trustworthy public front door backed by real content and working calls to action.

### Work included

1. Implement public route architecture and shared public layout.
2. Create a CMS for pages, articles, announcements, team, partners, FAQs and featured content.
3. Add draft/review/publish/schedule/unpublish workflow.
4. Add version history and rollback for content.
5. Build homepage around the five pillars and genuine current activity.
6. Build Events, Projects, Opportunities, Learn, Community, About, Team, Partners, Blog, FAQ and Contact pages.
7. Ensure each listing has search/filter/sort/pagination appropriate to its content type.
8. Build accurate event/opportunity status labels and expiry handling.
9. Add SEO metadata, canonical URLs, social previews, sitemap and robots rules.
10. Add accessibility, mobile layout, loading/empty/error states and image optimisation.
11. Replace all placeholder claims and fake/empty statistics with verified values or remove them.
12. Confirm contact domains, social links and brand details are consistent.

### Files/modules expected

- `src/app/(public)/*`
- `src/modules/content/*`
- `src/modules/discovery/*`
- `src/components/layout/*`
- `src/components/ui/*`
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `prisma` content/CMS models and migrations.
- `docs/operations/content-publishing.md`

### Expected outcome

A credible, mobile-ready public website that can be operated by authorised editors without developer intervention for routine content changes. Public data must come from real records, and every CTA must work.

### Exit gate

- All public routes render correctly and have metadata.
- CMS CRUD, review, schedule, publish and rollback workflows work.
- Expired events/opportunities cannot appear as open/upcoming.
- No fabricated testimonials, partner claims, member numbers or event claims.
- Important page content is present in initial HTML and is not dependent on animation to become visible.
- Sitemap and canonical URLs are correct.
- Mobile and accessibility checks pass for key pages.
- All public forms have validation, server handling and spam protection.

## Phase 3 — Member onboarding, profiles and discovery

**Purpose:** Turn visitors into active members with meaningful profiles and a clear next action.

### Work included

1. Build onboarding flow with progressive data collection.
2. Add interests, skills, goals and availability.
3. Implement profile editing and field-level privacy controls.
4. Build opt-in member directory.
5. Implement discovery search for people, events, projects, opportunities and learning.
6. Build member home/action centre.
7. Add bookmarks/saved items.
8. Add account privacy and security settings.
9. Add basic member notifications for account and platform activity.
10. Build profile activity from verified underlying records.
11. Add reporting/blocking entry points where relevant.

### Expected outcome

A new member can register, verify their account, complete onboarding, discover relevant activity, save items, manage privacy and present a useful public profile. The dashboard gives relevant next actions rather than empty analytics cards.

### Exit gate

- Signup-to-first-action journey passes E2E tests.
- Public directory visibility is opt-in and privacy settings are enforced.
- Search excludes hidden/private records.
- Profile links and media are validated.
- Dashboard data is real and permission-filtered.
- Members can export/request deletion through the defined process.

## Phase 4 — Events, workshops and hackathon operations

**Purpose:** Operate an event end-to-end with reliable registration, attendance and outcomes.

### Work included

1. Event CRUD and lifecycle state machine.
2. Event organiser workspace with scoped permissions.
3. Registration forms, eligibility, capacity and duplicate prevention.
4. Waitlist and cancellation workflow.
5. Event communication and reminders.
6. Manual check-in and secure QR check-in if needed.
7. Attendance corrections with reason and audit.
8. Post-event feedback and event report.
9. Hackathon teams, submissions, judging rubrics and results for CodeHive-operated competitions.
10. Certificate eligibility and issuance only after criteria are met.
11. Super Admin overrides for event states, registrations, attendance and judging corrections.
12. Automated event expiry and operational reminders.

### Expected outcome

CodeHive can publish and run its own workshops and hackathons without depending on manual spreadsheet operations for the complete lifecycle. External event listings can still link to external registration when CodeHive is not the organiser.

### Exit gate

- Concurrent registration cannot exceed event capacity.
- Duplicate registrations are blocked.
- Closed/past/cancelled events cannot accept ordinary registrations.
- Check-ins are event-bound, time-bound and non-reusable.
- Organisers only access their assigned events.
- Judging and result changes are audited.
- Certificates map to verified eligibility.
- Retry/failure behavior for notifications is tested.

## Phase 5 — Project ecosystem and team formation

**Purpose:** Give members a real place to find collaborators and document work.

### Work included

1. Project creation and publication workflow.
2. Project profile and public showcase pages.
3. Skills/roles sought and collaboration status.
4. Join requests and invitations.
5. Project member roles and permissions.
6. Milestones, updates and project status.
7. Repository/demo links and contribution evidence.
8. Event/hackathon project linking.
9. Project report/moderation and ownership transfer.
10. Super Admin recovery/override of project state and ownership with audit.

### Expected outcome

A member can find or start a project, recruit collaborators, manage a small team, track milestones, connect repository/demo evidence and publish a credible case study. Project pages become reusable proof for member profiles and public showcases.

### Exit gate

- Project permissions and ownership tests pass.
- Invitations and join requests cannot be replayed or accepted by the wrong account.
- Private project data is not exposed publicly.
- Contribution evidence has provenance and dispute handling.
- Completed projects can be shown publicly with member consent.

## Phase 6 — Opportunities, learning paths, groups and mentorship

**Purpose:** Build repeatable member value beyond events and projects.

### Work included

1. Curated opportunities management and verification workflow.
2. Deadline/timezone handling and expiry automation.
3. Opportunity bookmarks and private application tracking.
4. Learning path/resource CMS and versioning.
5. Member learning progress and practical checkpoints.
6. Group and chapter membership/announcement workflows.
7. Chapter lead workspaces with scoped controls.
8. Mentor applications, review and approved profiles.
9. Mentorship requests and basic status workflow.
10. Super Admin override support for listings, learning records, chapter governance and mentor status.

### Expected outcome

Members can return to CodeHive to discover current opportunities, follow useful learning journeys, participate in topic/campus groups and request structured mentorship. Internal owners can keep listings accurate.

### Exit gate

- Published opportunities have sources and verification timestamps.
- Expired listings are automatically withdrawn from active discovery.
- Learning resources have owners and last-reviewed dates.
- Chapter permissions are scoped and tested.
- Mentor approval and reporting workflows are operational.
- External application status is not falsely represented as integrated.

## Phase 7 — Contribution reputation, badges and certificates

**Purpose:** Recognise genuine contribution with a trustworthy and explainable system.

### Work included

1. Implement append-only XP transaction ledger.
2. Define versioned reward rules for eligible activities.
3. Add idempotency to all award triggers.
4. Connect event attendance, project contribution and learning completion to approved reward rules.
5. Add badge definitions and eligibility engine.
6. Add certificate records and verification pages where appropriate.
7. Add member-facing explanation and history.
8. Add correction/reversal workflows using compensating entries.
9. Add Super Admin reward adjustments with reason, approval and audit.
10. Add anti-abuse checks and reporting.

### Expected outcome

A transparent recognition system where every reward is explainable and linked to a real source activity. Admins can correct mistakes without rewriting history.

### Exit gate

- Client cannot choose XP amount, action type or challenge day.
- Duplicate requests cannot create duplicate awards.
- Every award links to eligible source evidence and rule version.
- Corrections create compensating transactions.
- Badge/certificate verification can distinguish valid, revoked and unknown records.
- No login/page-view reward loop exists.

## Phase 8 — Communication, integrations, analytics and operational maturity

**Purpose:** Improve retention and reduce manual administration through reliable integrations and reporting.

### Work included

1. Complete in-app notification inbox and preferences.
2. Email provider integration and delivery monitoring.
3. Template management and retry/de-duplication.
4. Google Calendar or equivalent event export/integration.
5. GitHub linking/OAuth with minimum scopes; public contribution metadata only where appropriate.
6. Analytics event dictionary and privacy-conscious instrumentation.
7. Admin aggregate dashboards and exports.
8. Partner/partnership internal CRM workflow.
9. Webhook processing with signature validation and idempotency.
10. PWA/installability assessment after responsive usage is stable.
11. Background job dashboard and integration health in Super Admin.
12. Backup/restore test, incident runbook and release checklist.

### Expected outcome

Routine communication and reporting are dependable. Admins can identify operational issues without manually inspecting database records. External integrations fail safely and can be retried.

### Exit gate

- Notification delivery state is observable.
- Provider failures are retried safely without duplicate user actions.
- OAuth scopes are minimal and revocation works.
- Webhooks are signature-checked and idempotent.
- Analytics definitions are documented and privacy-reviewed.
- Restore test is completed and recorded.
- Incident and rollback procedures are usable by the team.

## Phase 9 — Advanced intelligence and experimental ecosystem

**Purpose:** Add distinctive capabilities only after the underlying data and workflows are trustworthy.

### Candidate features (approval required per feature)

- Explainable opportunity recommendations.
- Skill-gap and learning-path suggestions.
- AI-assisted team matching.
- AI project feedback or portfolio review.
- Retrieval-based CodeHive help assistant grounded in approved content.
- Community build challenges and structured quests.
- Optional contribution leaderboards.
- Peer skill exchange.
- Advanced chapter insights.
- Partner-facing reports/portal.
- Live project rooms or collaborative build events using existing providers first.
- PWA push notifications/offline features.
- Native mobile application only if usage and retention justify a separate app.

### AI governance requirements

- Never invent job listings, deadlines, event details, partner claims, policy answers or member achievements.
- Show sources for factual answers.
- Label generated suggestions as suggestions.
- Do not use AI output as the sole basis for bans, role assignment, event eligibility, judging or certificate issuance.
- Provide feedback/report controls.
- Avoid sending private member data to an AI provider without a documented purpose, provider review and appropriate user notice/consent.
- Add cost limits, abuse limits, monitoring and fallback behavior.

### Expected outcome

One or more advanced features demonstrably improve discovery, participation or outcomes without weakening trust, privacy, reliability or maintainability.

### Exit gate

Each advanced feature must have a defined user problem, success metric, privacy/security review, cost estimate, human fallback and rollback plan. Features that do not meet the evidence threshold remain unbuilt.

---

# 11. Release gates and definition of done

A feature is complete only when all applicable items below are satisfied.

## 11.1 Functional completion

- User story and acceptance criteria are documented.
- Happy path works end-to-end.
- Invalid, expired, duplicate, unauthorised and failure paths are handled.
- Empty/loading/error/success states exist.
- Relevant notifications and audit events are generated.
- Data appears correctly on all dependent pages.

## 11.2 Engineering completion

- TypeScript types are correct; avoid `any` unless justified.
- Input is validated on the server.
- Business rules live in services, not only UI.
- Authorization is enforced server-side.
- Database constraints protect critical invariants.
- Transactions are used for multi-write workflows.
- Unit/integration/E2E tests cover key behavior.
- No debug code, hardcoded secrets or unused experimental dependencies.
- Logs are structured and do not leak sensitive values.
- Documentation is updated.

## 11.3 Product completion

- The feature has a clear owner.
- Content and labels are understandable.
- No fake data is shown as real.
- The next action is clear.
- Mobile and keyboard usage are supported.
- Accessibility is considered and tested.
- Privacy defaults are appropriate.

## 11.4 Release completion

- CI passes.
- Migration reviewed and tested.
- Preview deployment tested by another team member.
- Critical E2E paths pass.
- Monitoring and rollback are ready.
- Backup is current before risky migration.
- Product owner signs off the phase acceptance checklist.

---

# 12. Engineering workflow and team operating rules

## 12.1 Branching and pull requests

- Protect `main`; no direct pushes for feature work.
- Use short-lived feature branches.
- Every PR links to a requirement or issue ID.
- PRs must include purpose, scope, test evidence, screenshots for UI changes and migration notes.
- Require at least one review by a team member other than the author.
- Require CI before merge.
- Do not combine unrelated modules in one large PR.
- Do not merge incomplete code behind a visible production route.

## 12.2 Issue template

Every implementation issue must contain:

- Requirement ID.
- User problem.
- Expected behavior.
- Roles and scopes affected.
- Data changes.
- API/service changes.
- Security/privacy considerations.
- Acceptance criteria.
- Test plan.
- Dependencies.
- Phase and owner.

## 12.3 Technical documentation

Maintain:

- Product specification and user journeys.
- System architecture and ADRs.
- Database entity relationship diagram.
- Permission/role matrix.
- API contracts.
- Environment/setup guide.
- Deployment, rollback and backup instructions.
- Test strategy and release checklist.
- Incident response procedure.

## 12.4 Environment strategy

- Local development: isolated database and sample data.
- Preview/staging: production-like configuration with synthetic data only.
- Production: restricted access, managed secrets, backups and monitoring.
- Never copy production personal data into local development without an approved anonymisation process.
- Never use production credentials in preview environments.

---

# 13. Content, brand and credibility standards

- Use the primary line **Learn. Build. Grow.** consistently unless a brand change is approved.
- Keep the product voice clear, direct and welcoming; avoid unsupported claims such as “largest”, “thousands” or “industry-leading”.
- Use real event photos, approved team profiles, genuine partner relationships and consented testimonials.
- Clearly label partner, sponsor, venue, organiser and community collaboration relationships; do not treat these as interchangeable.
- Every public event must have accurate dates, timezone, organiser and current registration status.
- Every opportunity must have a source and verification date.
- Every project must identify its contributors accurately and link to real evidence where available.
- Do not publish personal details or photos without permission.
- Keep copy and metadata editable through CMS where practical.

---

# 14. Initial launch scope

The first public release should not attempt to ship every concept in this document. The minimum coherent CodeHive product is complete only when the following journey works:

1. A visitor understands what CodeHive does and can see genuine activity.
2. A visitor can create and verify an account.
3. A member can complete a useful profile and control its visibility.
4. A member can discover a real event or project.
5. A member can register for an event or join a project.
6. An organiser/project lead can manage that activity within their scope.
7. The system records actual attendance or contribution evidence.
8. A member can see the result on their profile or project record.
9. Internal administrators can manage content and operations.
10. Super Admin can inspect the platform, manage access and resolve eligible problems through audited overrides.
11. The team can deploy, monitor, back up and restore the system.

If any of these steps is only a mockup, the initial product is not complete.

---

# 15. First engineering backlog

Create issues in this order after Phase 0 sign-off.

| Order | Work item | Phase | Required evidence |
|---:|---|---:|---|
| 1 | Repository/deployment/environment audit | 0 | Signed-off current-state report |
| 2 | Reproducible setup, CI and build | 0 | Clean clone/build evidence |
| 3 | Database migration baseline | 0 | Clean DB migration test |
| 4 | Remove insecure production secret fallback | 0–1 | Startup/config tests |
| 5 | Auth lifecycle and email verification | 1 | Auth E2E tests |
| 6 | Role/permission/scope model | 1 | Permission unit and security tests |
| 7 | Audit log and approval workflow | 1 | Immutable/audited action tests |
| 8 | Super Admin Control Centre shell and bootstrap | 1 | MFA + access tests |
| 9 | Controlled override framework | 1 | Before/after/reason/approval test |
| 10 | CMS content CRUD and publication workflow | 2 | Editor-to-publication E2E test |
| 11 | Public pages and search | 2 | Route/SEO/accessibility test |
| 12 | Member onboarding and privacy-aware profiles | 3 | Signup-to-profile E2E test |
| 13 | Member discovery and dashboard | 3 | Search/filter/privacy tests |
| 14 | Event lifecycle and registration | 4 | Capacity/concurrency E2E test |
| 15 | Attendance/check-in and event reporting | 4 | Token/replay/permission tests |
| 16 | Hackathon submissions and judging | 4 | Deadline/rubric/audit tests |
| 17 | Project creation and team collaboration | 5 | Join/invite/ownership tests |
| 18 | Opportunities verification and expiry | 6 | Source/expiry workflow tests |
| 19 | Learning paths and chapter/groups | 6 | Progress/scope tests |
| 20 | Verified reputation ledger | 7 | Idempotency/ledger integrity tests |
| 21 | Notification delivery and integrations | 8 | Retry/de-duplication tests |
| 22 | Analytics, backup/restore and operations | 8 | Restore and reporting evidence |
| 23 | One approved AI/advanced experiment | 9 | Metric/privacy/cost/rollback review |

---

# 16. Decisions requiring product-owner approval before implementation

The team must not guess these matters. Record decisions in `docs/architecture/adr/` or the product decision log.

1. Which domain is canonical for production and which Vercel deployment is authoritative?
2. Which email provider and sending domain will be used?
3. Which database and hosting plan will be used for production, staging and backups?
4. Which OAuth providers, if any, are required at launch?
5. Who are the initial Platform Owner and Super Admins, and what is the emergency recovery process?
6. Which internal roles will exist at launch and which people own each operational area?
7. Will CodeHive-hosted hackathons require team registration, individual registration or both?
8. Which event check-in method is operationally feasible: organiser search/manual check-in, QR, or both?
9. Which content requires one-person approval versus two-person approval?
10. Which profile fields are public by default, and which are opt-in?
11. Which external services will be used for community chat, file storage, email, analytics and calendar integration?
12. Which data retention and deletion rules apply to account, event, moderation, certificate and audit records?
13. Who is responsible for verifying opportunity listings and reviewing learning paths?
14. What are the minimum criteria for a verified badge or certificate?
15. What is the CodeHive community conduct, reporting and appeal policy?

---

# 17. Final acceptance standard

CodeHive is ready to be treated as a serious platform only when its important workflows are real, secure, governed and maintainable.

The product must demonstrate:

- A clear journey from discovery to participation to evidence.
- Real, current and verifiable public content.
- Secure identity and privacy-aware member profiles.
- Reliable event and project workflows.
- A curated, trustworthy opportunities and learning experience.
- Recognition linked to verifiable activity.
- Scoped administration for day-to-day operations.
- A Super Admin Control Centre with global visibility and controlled, audited overrides.
- No invisible privilege escalation, unlogged edits or insecure secret handling.
- Automated tests for critical workflows and permissions.
- Deployment, monitoring, backup and recovery procedures that have been tested.

**The platform should be ambitious in capability, disciplined in architecture and conservative with trust. Build the complete foundations first; add complexity only when real member behaviour proves that it is needed.**

---

# 18. Detailed module file inventory and responsibility boundaries

This section translates the architecture into concrete implementation units. The team should create these files as the corresponding phase starts. Do not create a large number of empty files in advance. Keep the naming consistent and keep each business operation in one clear service/use-case file.

## 18.1 Identity module

```text
src/modules/identity/
├── schemas/
│   ├── register.schema.ts
│   ├── login.schema.ts
│   ├── verify-email.schema.ts
│   ├── password-reset.schema.ts
│   ├── change-password.schema.ts
│   └── account-status.schema.ts
├── services/
│   ├── register-user.ts
│   ├── authenticate-user.ts
│   ├── verify-email.ts
│   ├── request-password-reset.ts
│   ├── reset-password.ts
│   ├── change-password.ts
│   ├── revoke-session.ts
│   ├── suspend-account.ts
│   └── restore-account.ts
├── repositories/
│   ├── user.repository.ts
│   ├── session.repository.ts
│   └── verification-token.repository.ts
├── queries/
│   ├── get-current-user.ts
│   └── get-account-security-summary.ts
└── types/
    └── identity.types.ts
```

Responsibilities:

- Schemas validate untrusted request input.
- Services implement the workflow and transaction.
- Repositories own data access.
- Queries return minimal DTOs safe for the requested context.
- No component should verify passwords, create raw tokens or mutate account state directly.

## 18.2 Authorization and administration modules

```text
src/server/authorization/
├── permission-registry.ts
├── authorization-context.ts
├── authorization.types.ts
├── evaluate-permission.ts
├── require-permission.ts
├── require-scope.ts
├── resolve-role-assignments.ts
├── override-context.ts
├── validate-override.ts
└── policies/
    ├── member.policy.ts
    ├── event.policy.ts
    ├── project.policy.ts
    ├── content.policy.ts
    └── administration.policy.ts

src/modules/administration/
├── schemas/
│   ├── role-assignment.schema.ts
│   ├── approval.schema.ts
│   ├── override.schema.ts
│   └── feature-flag.schema.ts
├── services/
│   ├── assign-role.ts
│   ├── revoke-role.ts
│   ├── request-approval.ts
│   ├── approve-action.ts
│   ├── reject-action.ts
│   ├── execute-override.ts
│   ├── update-feature-flag.ts
│   └── create-impersonation-session.ts
├── repositories/
├── queries/
└── types/
```

Responsibilities:

- `permission-registry.ts` defines canonical permission names and descriptions.
- `evaluate-permission.ts` is the central decision function; it accepts actor, action, resource and context and returns an explicit allow/deny decision with a reason code.
- `require-permission.ts` and `require-scope.ts` provide safe server-side guards.
- `override-context.ts` carries the authorised override actor, reason, approval reference and scope.
- `validate-override.ts` ensures an override cannot bypass an immutable security invariant.
- `execute-override.ts` coordinates approval, domain service execution, audit and notification.
- Module policies express domain-specific rules but must not create a competing permission engine.

## 18.3 Audit module

```text
src/server/audit/
├── audit-event.types.ts
├── audit-event.schema.ts
├── write-audit-event.ts
├── redact-audit-payload.ts
├── audit-query.service.ts
└── audit-retention.policy.ts
```

Responsibilities:

- Define allowed event names and payload shapes.
- Redact tokens, secrets and sensitive fields before persistence.
- Write events through a single service.
- Deny update/delete operations through application-level repositories.
- Expose search/export only after permission checks.
- Record failed high-risk attempts as well as successful changes where appropriate.

## 18.4 Profiles and discovery modules

```text
src/modules/profiles/
├── schemas/profile.schema.ts
├── services/update-profile.ts
├── services/update-profile-visibility.ts
├── services/add-skill.ts
├── services/remove-skill.ts
├── repositories/profile.repository.ts
├── queries/get-public-profile.ts
├── queries/get-member-profile.ts
└── policies/profile.policy.ts

src/modules/discovery/
├── schemas/search.schema.ts
├── services/search-discovery.ts
├── services/save-bookmark.ts
├── services/remove-bookmark.ts
├── queries/get-featured-content.ts
├── queries/get-recommendations.ts
└── policies/discovery.policy.ts
```

Responsibilities:

- `get-public-profile.ts` must return only the fields allowed by public visibility settings.
- `get-member-profile.ts` may return additional fields only to the profile owner or explicitly authorised staff.
- Search queries must apply visibility and publication filters before returning records.
- Recommendation functions must return a reason code, such as shared interest or matching eligibility, not an unexplained score alone.

## 18.5 Events module

```text
src/modules/events/
├── schemas/
│   ├── create-event.schema.ts
│   ├── update-event.schema.ts
│   ├── event-filter.schema.ts
│   ├── register.schema.ts
│   ├── attendance.schema.ts
│   └── event-override.schema.ts
├── services/
│   ├── create-event.ts
│   ├── update-event.ts
│   ├── submit-event-for-review.ts
│   ├── publish-event.ts
│   ├── cancel-event.ts
│   ├── calculate-registration-state.ts
│   ├── register-for-event.ts
│   ├── cancel-registration.ts
│   ├── join-waitlist.ts
│   ├── promote-waitlist.ts
│   ├── verify-attendance.ts
│   ├── correct-attendance.ts
│   └── override-event-state.ts
├── repositories/
│   ├── event.repository.ts
│   ├── registration.repository.ts
│   └── attendance.repository.ts
├── queries/
│   ├── list-public-events.ts
│   ├── get-event-detail.ts
│   ├── list-organiser-events.ts
│   └── get-event-operations-summary.ts
└── policies/event.policy.ts
```

Responsibilities:

- `calculate-registration-state.ts` is the single source of truth for open/closed/full/waitlist state.
- `register-for-event.ts` performs eligibility, time window, capacity and duplicate checks in a transaction.
- `verify-attendance.ts` validates registration and check-in evidence; it must not accept an arbitrary day or user ID as proof.
- `correct-attendance.ts` is a privileged correction operation that requires a reason and creates an audit event.
- `override-event-state.ts` may override eligible business state only after the central override service authorises it.

## 18.6 Hackathons module

```text
src/modules/hackathons/
├── schemas/
│   ├── competition.schema.ts
│   ├── team.schema.ts
│   ├── submission.schema.ts
│   └── judging.schema.ts
├── services/
│   ├── create-competition.ts
│   ├── register-team.ts
│   ├── invite-team-member.ts
│   ├── submit-project.ts
│   ├── revise-submission.ts
│   ├── assign-judge.ts
│   ├── submit-score.ts
│   ├── lock-scores.ts
│   ├── calculate-results.ts
│   └── override-judging-decision.ts
├── repositories/
├── queries/
└── policies/hackathon.policy.ts
```

Responsibilities:

- Submission service validates competition state, deadline, required fields and team membership.
- Judging service checks judge assignment and conflict declaration.
- Result calculation uses a versioned rubric and deterministic tie-break rules.
- Score changes after lock require a separate audited correction workflow.

## 18.7 Projects module

```text
src/modules/projects/
├── schemas/
│   ├── project.schema.ts
│   ├── project-member.schema.ts
│   ├── join-request.schema.ts
│   └── milestone.schema.ts
├── services/
│   ├── create-project.ts
│   ├── update-project.ts
│   ├── publish-project.ts
│   ├── invite-project-member.ts
│   ├── request-project-join.ts
│   ├── decide-project-join.ts
│   ├── change-project-role.ts
│   ├── transfer-project-ownership.ts
│   ├── create-milestone.ts
│   ├── update-milestone.ts
│   ├── record-contribution.ts
│   └── archive-project.ts
├── repositories/
├── queries/
└── policies/project.policy.ts
```

Responsibilities:

- Separate project owner, project lead, contributor and viewer capabilities.
- A contributor cannot assign themselves a lead role.
- Ownership transfer requires acceptance by the new owner and an audit record.
- Contribution evidence must identify source and reviewer/confirmation status.

## 18.8 Opportunities and learning modules

```text
src/modules/opportunities/
├── schemas/opportunity.schema.ts
├── services/create-opportunity.ts
├── services/submit-opportunity-for-review.ts
├── services/verify-opportunity.ts
├── services/publish-opportunity.ts
├── services/expire-opportunity.ts
├── services/report-opportunity.ts
├── services/bookmark-opportunity.ts
├── repositories/
├── queries/
└── policies/opportunity.policy.ts

src/modules/learning/
├── schemas/learning-path.schema.ts
├── services/create-learning-path.ts
├── services/publish-learning-path.ts
├── services/enrol-learning-path.ts
├── services/complete-resource.ts
├── services/submit-learning-task.ts
├── services/review-learning-task.ts
├── repositories/
├── queries/
└── policies/learning.policy.ts
```

Responsibilities:

- Opportunity publication requires source and verification metadata.
- Expiry job must be safe to run multiple times.
- Learning completion must follow defined criteria; a user cannot submit arbitrary completion state for a restricted task.
- Resource attribution and review date are mandatory for published learning paths.

## 18.9 Notifications and integrations

```text
src/modules/notifications/
├── schemas/notification-preference.schema.ts
├── services/create-notification.ts
├── services/dispatch-notification.ts
├── services/mark-notification-read.ts
├── services/update-preferences.ts
├── repositories/
├── templates/
└── providers/

src/server/integrations/
├── email/
├── github/
├── calendar/
├── analytics/
├── storage/
└── webhooks/
```

Responsibilities:

- Domain services create notification intent; provider adapters handle delivery.
- Notifications use idempotency keys and retry policies.
- Provider webhooks verify signatures before processing.
- Provider credentials are not stored in database plaintext or emitted to logs.
- Integration permissions and OAuth scopes are documented per provider.

## 18.10 Route file requirements

For a Next.js App Router page that needs its own route-level state handling, use the applicable files:

```text
page.tsx          Page composition and data loading.
layout.tsx        Shared shell for the route segment.
loading.tsx       Route-level loading UI.
error.tsx         Recoverable route error boundary.
not-found.tsx     Route-specific not-found UI where useful.
```

For API endpoints:

```text
route.ts          HTTP method handlers, boundary validation, auth and service invocation.
```

A `route.ts` handler must remain thin. It must not become the only place where business rules exist. It should parse the request, authenticate/authorise, call a domain service and map the result to an HTTP response.

## 18.11 Page implementation checklist

Every page implementation ticket must identify:

- Route and route group.
- Required roles and scope.
- Data needed and where it comes from.
- User actions and service calls.
- Loading, empty, error, permission-denied and success states.
- Mobile layout behavior.
- Accessibility behavior.
- Metadata/indexing rules if public.
- Analytics events, if any.
- Tests required.

---

# 19. Critical business rules and invariant checklist

These rules protect the integrity of the platform. They must be implemented server-side and where possible reinforced by database constraints.

| Domain | Invariant |
|---|---|
| Account | A user cannot verify an email using an expired or reused token |
| Account | A suspended account cannot perform restricted member actions |
| Session | Revoked sessions cannot be reused |
| Roles | A user cannot grant permissions they do not possess |
| Roles | Scoped assignments cannot silently become global assignments |
| Super Admin | High-risk role escalation requires configured second approval |
| Super Admin | Every override has an actor, reason and audit reference |
| Audit | Application routes cannot update/delete audit history |
| Profile | Hidden fields never appear in public APIs, page HTML or search results |
| Event | Registration is allowed only when the event is published, in its valid time window and eligible |
| Event | Event capacity cannot be exceeded under concurrent requests |
| Event | A member can have at most one active registration per event |
| Attendance | Check-in belongs to the correct event and registration |
| Attendance | Repeated QR/check-in submissions cannot create repeated attendance or XP |
| Hackathon | Submission timestamp is generated server-side |
| Hackathon | Only assigned judges can score assigned submissions |
| Hackathon | Locked scores cannot be silently changed |
| Project | Only authorised project roles can invite, remove or change member roles |
| Project | Ownership transfer is accepted and audited |
| Opportunity | A public listing has an approved source and verification record |
| Opportunity | Expired listings are not recommended as open opportunities |
| Learning | Completion state follows the learning task's defined criteria |
| Reputation | Client input cannot set XP amount or reason code |
| Reputation | A source activity cannot earn the same reward twice for the same rule version unless explicitly allowed |
| Reputation | Corrections are compensating transactions, not silent edits |
| Certificate | Issuance is tied to a defined eligibility record |
| Notification | Retries do not produce duplicate business actions or uncontrolled duplicate messages |
| Webhook | An external event is verified and processed idempotently |
| Upload | A user cannot retrieve private files by guessing a storage URL or ID |

---

# 20. Required test scenarios by critical workflow

The following scenarios are minimum coverage, not the complete test suite.

## 20.1 Authentication

- Register with valid data.
- Reject malformed email and weak/invalid password according to policy.
- Prevent duplicate account creation.
- Verify with valid token.
- Reject expired, reused and altered verification token.
- Reset password successfully.
- Reject reused/expired reset token.
- Revoke all sessions after a security-sensitive event where policy requires it.
- Rate-limit repeated login and reset attempts.

## 20.2 Authorization and super-admin

- Guest cannot access member pages.
- Member cannot access another member's private settings.
- Event organiser cannot modify an event outside their assignment.
- Chapter lead cannot access another chapter's member data.
- Project lead cannot change another project's roles.
- Admin cannot use an unassigned module.
- Super Admin can perform an approved override.
- Override without a reason is rejected.
- Override without required approval is rejected.
- High-risk override is logged with before/after values.
- Impersonation shows a banner and expires.
- Audit search/export is denied without permission.
- Application routes cannot edit/delete audit entries.

## 20.3 Events and attendance

- Register while open and eligible.
- Reject registration before opening and after closing.
- Reject registration for completed/cancelled event.
- Reject duplicate registration.
- Run concurrent registrations at capacity and prove capacity is not exceeded.
- Join waitlist when full if enabled.
- Promote the next eligible waitlisted participant correctly.
- Check in a valid registered participant.
- Reject check-in for another event.
- Reject expired/replayed QR token.
- Reject check-in outside allowed time window unless authorised override is used.
- Correct attendance with reason and audit entry.

## 20.4 Projects

- Create and publish a project.
- Request to join and accept request.
- Reject invitation addressed to another user.
- Prevent contributor from assigning themselves as owner.
- Transfer ownership with acceptance.
- Hide private project from public search.
- Record contribution and handle dispute/correction.

## 20.5 Opportunities and learning

- Publish only after review/verification.
- Reject listing without source URL.
- Expire listing after deadline/timezone boundary.
- Report suspicious listing.
- Bookmark and remove bookmark.
- Enrol in a learning path.
- Complete an open resource.
- Require evidence/review for restricted learning task.
- Reject invalid completion attempts.

## 20.6 Reputation and certificates

- Eligible event attendance creates one award.
- Repeated attendance event does not duplicate award.
- Member cannot request a larger XP amount.
- Reversing an award creates a compensating transaction.
- Badge cannot be self-awarded.
- Revoked certificate verification shows revoked state.

---

# 21. Phase handover package

At the end of every phase, the technical lead must provide the product owner with a concise handover package containing:

1. **What shipped:** Routes, features and workflows completed.
2. **What changed:** Database migrations, environment variables, integrations and configuration.
3. **How to test:** Exact local/preview steps and test accounts/roles using synthetic data.
4. **Evidence:** CI results, E2E results, screenshots or short screen recordings for key flows.
5. **Known limitations:** Explicitly list incomplete items and risks; do not hide them.
6. **Operations:** Deployment, rollback, monitoring and support steps changed in this phase.
7. **Security:** Permission changes, threat review and any open findings.
8. **Data:** Migration and backup status.
9. **Next phase readiness:** Dependencies satisfied and open blockers.

A phase is not accepted solely because code has been merged. The handover and acceptance gate must be completed.

---

# 22. Change control

Any major scope or architecture change must include:

- Requirement/section being changed.
- Problem with the current requirement.
- Evidence supporting the change.
- User impact.
- Security/privacy impact.
- Maintenance and cost impact.
- Migration/compatibility impact.
- Proposed replacement.
- Product-owner approval and ADR reference.

Do not add a new feature because it looks impressive in a demo. Add it because it solves a demonstrated problem and can be operated responsibly.
