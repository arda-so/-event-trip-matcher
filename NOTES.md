# Event Trip Matcher Notes

## Purpose

Build a lean event-led travel product that helps users discover trips worth taking for a specific event category and estimate total trip cost without turning the codebase into a generic travel aggregator.

## What We Are Building First

Version 1 is a responsive web product built as one Next.js application:

- Public website for SEO and discovery
- Web app flows for search, matching, and saving trips

We are not building a native mobile app first.

## Engineering Rules

- Start from a fresh codebase unless an existing module is clearly reusable without forcing unrelated abstractions.
- Prefer one way of doing each thing: one framework, one ORM, one API style, one source of truth per entity.
- No duplicate business logic across pages, route handlers, and client components.
- No premature integrations. If live provider APIs do not materially improve V1, use internal estimation logic first.
- Keep types, validation, and data mapping explicit.
- Add code only when it serves a current requirement.
- Every new dependency must justify its maintenance cost.
- Favor server-side data orchestration over pushing domain logic into the client.

## Existing Code Review

Checked existing repos under `/Users/solmaz`:

- `investor-social-mvp/nextjs-social-v1`
- `Investment_Tools/frontend`

Decision:

- Reuse architectural lessons only.
- Do not clone either codebase as the product base.

Reason:

- The Next.js app has useful stack choices (`Next.js`, `Prisma`, `Postgres`, `zod`) but its schema and routes are built around a social product.
- Reusing that structure directly would introduce wrong domain language, dead code risk, and migration noise.
- The Vite frontend is not a fit because this product needs first-class SEO, route-driven public pages, and server-side orchestration.

## Product Scope

Start with one vertical only:

- Recommended: `concert trip matcher`

Core user flow:

1. User enters home city, budget, date window, and interests.
2. System finds matching events in supported cities.
3. System estimates trip cost.
4. System ranks options and returns a small set of trip recommendations.
5. User saves or shares a trip.

## Non-Goals For V1

- All event categories
- Live booking
- Full flight metasearch
- Full hotel metasearch
- Native mobile apps
- Complex social features
- Admin backoffice beyond minimal tooling

## Proposed Stack

- `Next.js` App Router
- `TypeScript`
- `Postgres`
- `Prisma`
- `zod`
- Minimal UI component layer, custom-first

## System Shape

Single application with clear boundaries:

- `website`: landing pages, SEO pages, event pages, city pages
- `app`: search, results, saved trips
- `domain`: event normalization, cost estimation, trip ranking
- `data`: database access and provider adapters

## Initial Data Strategy

For V1, prioritize proving the matching experience over integrating many providers.

Use:

- One event provider or curated seed dataset
- Internal transport estimation model
- Internal accommodation estimation model or city-level nightly averages

This reduces coupling and lets us validate whether users care about the event-first trip flow.

## Core Entities

- `City`
- `Venue`
- `Event`
- `EventSourceRecord`
- `TripSearch`
- `TripOption`
- `SavedTrip`
- `User` later, not required on day one

## Architecture Decisions To Preserve

- Route handlers call application services, not Prisma directly from multiple places.
- External provider responses get mapped into internal domain models once.
- Ranking logic lives in one domain module.
- Shared validation schemas are used by both server and client form boundaries where appropriate.
- Public pages and app pages live in the same repo, but not in a tangled component tree.

## File and Module Guidelines

- Keep module names domain-based, not technical-junk-drawer names like `utils2` or `helpers-final`.
- Separate provider adapters from core ranking logic.
- Avoid creating shared components until there are at least two real usages.
- Prefer composition over global abstractions.

## Delivery Order

1. Scaffold clean app foundation.
2. Define schema and domain types.
3. Seed a limited event dataset.
4. Build search form.
5. Build trip matching pipeline.
6. Build results page.
7. Add save/share flow.
8. Add real provider integrations only where they improve validated behavior.

## Open Decisions Before Coding

- Event vertical: concerts vs football
- Initial supported cities
- Seeded data vs first live event API
- Anonymous-only MVP vs saved accounts in phase 1

## Default Recommendation

Unless a better constraint appears, proceed with:

- `concert trip matcher`
- `Next.js + Postgres + Prisma + zod`
- seeded or single-source event data first
- anonymous search first, saved trips in phase 2

## Agreed So Far

- Start from scratch rather than forcing an existing repo to fit.
- Build one product that is both a public website and a web app.
- Do not build a native mobile app first.
- Keep the codebase lean: no duplicate logic, no unnecessary abstractions, no premature integrations.
- Prefer the simplest architecture that supports SEO pages and app flows in one place.
- Treat the current product as an `event-led trip matcher`, not a generic travel booking engine.
- Focus the MVP on proving the recommendation and planning experience before adding heavy social features.
- Keep the long-term design flexible enough to expand beyond concerts into other experience categories.

## Current Product Definition

The product helps a user decide:

- where to go
- for what reason
- whether the trip fits their interests, budget, and dates

The first version is not mainly about selling flights or hotels. It is about helping users discover worthwhile trips around a meaningful event or experience and then handing them off to partners when booking is ready.

## Current MVP Position

Primary pillars for V1:

1. `Event or experience data`
2. `Trip matching and cost estimation`
3. `User preferences` only as needed

This means:

- event or experience discovery comes first
- trip recommendation logic comes second
- full people/community features come later

For V1, people data should stay minimal:

- home city
- budget
- interests
- saved trips later

We are not prioritizing:

- squad/group planning
- social feeds
- complex user profiles
- in-app booking

## Bigger Picture

The larger product vision is not just `find a concert`.
It is:

- `travel with purpose`
- `go somewhere because something meaningful is happening there`

That can later expand from events into broader experience-led travel:

- concerts
- sports
- conferences
- workshops
- retreats
- personal development programs
- historic places
- museum and heritage trips

So the long-term product is better thought of as:

- an `interest-based discovery and travel planning platform`

rather than:

- a flight site
- a hotel site
- or an Airbnb-style accommodation marketplace

## Product Positioning

This product is different from Airbnb because Airbnb primarily starts with:

- destination
- dates
- stay options

This product starts with:

- the person
- the event or experience
- the reason to travel

Then it answers:

- where should I go
- what should I go for
- can I afford it
- is it worth it

## Monetization Direction

Likely revenue path:

- affiliate handoff for ticketing, travel, and accommodation where partnerships exist
- premium features later, such as alerts or saved trip intelligence
- possible B2B or sponsorship opportunities later

Important constraint:

- do not assume direct access to all providers
- do not assume easy approval for affiliate or API programs
- design V1 so it still works with seeded data and external handoff links

## Expansion Principle

When expanding categories, keep the engine generic and the datasets specialized.

Meaning:

- shared matching logic
- shared city and venue/location models
- shared user preference handling
- category-specific ingestion adapters and metadata

This keeps the product extensible without turning the codebase into spaghetti.
