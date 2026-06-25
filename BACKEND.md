# SaaSPilot Backend

SaaSPilot is a **curated directory of external SaaS links**, organized by the 6-phase
lifecycle. The backend stores links in Postgres, serves them over an API on the same
Express server that does SSR, tracks outbound clicks, and exposes an admin UI to add links.

## Stack

- **Postgres** + **Prisma** ORM (`prisma/schema.prisma`)
- **Express** API mounted on the existing SSR server (`src/server/entry.ts`)
- **zod** for request validation

## Data model

| Table             | Purpose                                                        |
| ----------------- | ------------------------------------------------------------- |
| `phases`          | The 6 lifecycle phases (taxonomy)                             |
| `sub_phases`      | Sub-steps within each phase                                   |
| `resources`       | The curated links — incl. external `url`, type, difficulty    |
| `_ResourceSubPhases` | Which sub-phases each link is classified under (m-n)       |
| `resource_clicks` | One row per outbound click (for analytics)                   |

## Setup

```bash
# 1. Point .env at your Postgres
#    DATABASE_URL="postgresql://USER@localhost:5432/saaspilot?schema=public"
#    ADMIN_TOKEN="<long-random-string>"

npm run db:migrate    # create tables
npm run db:seed       # import existing lifecycle + content as starter links
npm run dev           # http://localhost:5173
```

Other scripts: `db:studio` (visual DB browser), `db:push` (sync schema without a
migration), `db:reset` (drop + re-seed).

## API

| Method | Route                        | Auth  | Purpose                              |
| ------ | ---------------------------- | ----- | ------------------------------------ |
| GET    | `/api/phases`                | —     | Phases + sub-phases                  |
| GET    | `/api/resources`             | —     | Published links (powers the site)    |
| GET    | `/api/resources/:slug`       | —     | One link                             |
| GET    | `/api/meta`                  | —     | Types, difficulties, phases (admin form) |
| GET    | `/r/:slug`                   | —     | Record click → 302 to external URL   |
| GET    | `/api/admin/resources`       | token | All links incl. drafts + click counts|
| POST   | `/api/admin/resources`       | token | Add a link                           |
| PATCH  | `/api/admin/resources/:id`   | token | Edit a link                          |
| DELETE | `/api/admin/resources/:id`   | token | Remove a link                        |

Admin auth is a bearer token: `Authorization: Bearer <ADMIN_TOKEN>`.

## Admin UI

Visit **`/admin`**, paste the `ADMIN_TOKEN`, and add links via the form. New links appear
on `/resources`, the phase pages, and the homepage immediately (the frontend re-fetches
`/api/resources`). Cards link out through `/r/:slug` so every click is counted.

## How the frontend stays in sync

`src/lib/content-store.tsx` seeds React from the static `src/data/content.ts` (so
SSR/prerender still render content), then refreshes from `/api/resources` on the client.
All resource lists read from this store, so the static files are now just an offline
fallback — the database is the source of truth.

## Deploying

The DB is plain Postgres — point `DATABASE_URL` at Neon / Supabase / RDS. Run the Express
server (`npm run start`) on Railway / Render / Fly. Run `prisma migrate deploy` on release.
