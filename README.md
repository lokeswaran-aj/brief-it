# Brief-it

Personalized audio briefings from topics you follow, delivered on your schedule.

## Run locally

Use Node.js 24 LTS, pnpm 11.6.0, and Docker with Compose. From the repository root:

```bash
cp .env.example .env
cp apps/web/.env.example apps/web/.env
docker compose up -d --wait
```

Then start the web app:

```bash
cd apps/web
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. The Next.js app lives in `apps/web`, with routes in `app/`.

PostgreSQL runs on `127.0.0.1:5432` with a persistent Docker volume. The root `.env` configures Docker Compose; `apps/web/.env` supplies `DATABASE_URL` to Next.js. Keep their credentials and port in sync. These example credentials are for local development only. The database is ready for ORM setup; no application tables or migrations exist yet.

From the repository root, stop PostgreSQL with `docker compose down`; data is retained. Database initialization settings apply only when the volume is first created.

Checks: `pnpm lint`, `pnpm typecheck`, and `pnpm build` from `apps/web`.

See [the web setup](apps/web/README.md) and [project decisions](AGENTS.md).
