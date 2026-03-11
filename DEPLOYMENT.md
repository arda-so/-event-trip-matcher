# Deployment

## Recommended Target

- `Vercel` for the Next.js application
- `Neon` or `Supabase Postgres` for production Postgres

## Required Environment Variables

- `DATABASE_URL`
- `TICKETMASTER_API_KEY` (optional until live import is needed)

## Before Deploying

1. Update [`src/lib/site-config.ts`](/Users/solmaz/event-trip-matcher/src/lib/site-config.ts) with real business details.
2. Replace placeholder emails and domain values.
3. Make sure your production Postgres database exists.
4. Push the schema to production before relying on runtime features:

```bash
npx prisma db push
```

## Vercel Setup

1. Import the repo into Vercel.
2. Set the framework to `Next.js` if Vercel does not detect it automatically.
3. Add the environment variables in the Vercel project settings.
4. Deploy.

Notes:

- `postinstall` runs `prisma generate`, so Prisma Client is generated during build.
- If you create a new production database, run schema sync once before relying on live pages:

```bash
DATABASE_URL="your-production-url" npx prisma db push
```

## Post-Deploy Checks

Check these routes:

- `/`
- `/about`
- `/how-it-works`
- `/contact`
- `/privacy`
- `/terms`
- `/admin/imports`
- `/api/health`

If `/api/health` returns a database error, fix `DATABASE_URL` first.

