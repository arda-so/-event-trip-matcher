# Event Trip Matcher

Clean foundation for an event-led trip discovery product.

## Stack

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- zod
- Tailwind CSS

## Current State

- Fresh project skeleton
- Normalized Prisma schema for users, profiles, cities, venues, events, searches, and trip options
- Seed dataset for the first concert-trips wedge
- One search API route using a shared trip-matching service
- Ticketmaster import boundary with fetch, normalize, and upsert stages

## Next Build Steps

1. Install dependencies
2. Create `.env` with `DATABASE_URL`
3. Run `npm run prisma:generate`
4. Run `npm run prisma:push`
5. Run `npm run prisma:seed`
6. Run `npm run dev`

## Deployment

Deployment notes are in [`DEPLOYMENT.md`](./DEPLOYMENT.md).

For production:

- update [`src/lib/site-config.ts`](./src/lib/site-config.ts)
- set real environment variables
- deploy to Vercel or another Next.js host
- verify `/api/health`

## Ticketmaster Import

Set `TICKETMASTER_API_KEY` in `.env`, then run:

```bash
npm run import:ticketmaster -- --country IE --classification music --size 20
```

Useful flags:

- `--city Dublin`
- `--country IE`
- `--keyword coldplay`
- `--classification music`
- `--start 2026-06-01T00:00:00Z`
- `--end 2026-08-31T23:59:59Z`

## Notes

- The first search flow reads from seeded data.
- Real provider ingestion should be added behind repository/provider boundaries, not directly in UI code.
