# Event Trip Matcher Architecture Draft

## High-Level Goal

Deliver one coherent product with two surfaces:

- public discovery website
- interactive trip-matching web app

Both should run from the same codebase and backend.

## Why Next.js

This product needs:

- SEO-capable public pages
- server-side data fetching
- route-based content pages
- a web app shell
- simple backend endpoints close to the product

That makes `Next.js` a better default than a separated Vite frontend plus standalone backend.

## Proposed Folder Shape

```text
src/
  app/
    (marketing)/
    (app)/
    api/
  components/
    marketing/
    app/
    shared/
  domain/
    events/
    trips/
    cities/
  data/
    prisma/
    repositories/
    providers/
  lib/
    env/
    validation/
```

Rules:

- `domain/` contains business logic.
- `data/providers/` contains external adapters.
- `data/repositories/` contains persistence access.
- `app/api/` should orchestrate, not own domain rules.

## Core Request Flow

1. User submits search criteria.
2. Route handler validates input.
3. Trip matching service loads eligible events and city cost signals.
4. Cost estimator computes trip totals.
5. Ranker scores options.
6. Response returns normalized trip cards.

## Avoiding Spaghetti

- No Prisma queries spread through pages and components.
- No provider-specific response objects outside adapter modules.
- No duplicated scoring formulas across API and UI.
- No “temporary” helper folders with mixed concerns.

## What To Reuse From Existing Work

Potentially reusable ideas from the existing Next.js repo:

- Prisma singleton pattern
- response helpers
- validation conventions

Not reusable as-is:

- social schema
- route structure
- domain models

## First Implementation Boundary

Before writing feature pages, complete:

- project scaffold
- environment contract
- schema draft
- seed strategy
- trip matching service contract

That gives us a stable foundation and keeps later UI work thin.
