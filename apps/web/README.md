# Brief-it web

Standalone Next.js application with TypeScript, App Router, Tailwind CSS, Better Auth (Google OAuth), Drizzle ORM, and ESLint. Application routes live directly in `app/`; there is no `src/` directory or pnpm workspace.

## Development

Use Node.js 24 LTS and pnpm 11.6.0. Follow the root README to start PostgreSQL, then copy `.env.example` to `.env` in this directory and fill in `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET`.

In Google Cloud Console, register the Authorized Redirect URI:

- Local: `http://localhost:3000/api/auth/callback/google`
- Production: `https://<your-domain>/api/auth/callback/google`

From this directory:

```bash
pnpm install --frozen-lockfile
pnpm db:migrate
pnpm dev
```

Open http://localhost:3000.

## Database and Auth Schema

Database schema and SQL migrations are owned by this application using Drizzle ORM (`lib/db/schema.ts`, `drizzle/`). Python workers read and write the existing tables without managing schema changes.

- `pnpm auth:schema` — regenerate `lib/db/auth-schema.ts` from `lib/auth.ts` via the Better Auth CLI
- `pnpm db:generate` — generate a new SQL migration in `drizzle/` via Drizzle Kit
- `pnpm db:migrate` — apply pending migrations (run explicitly, never on app boot)
- `pnpm db:studio` — inspect tables in Drizzle Studio

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

`typecheck` generates Next.js route types before checking TypeScript. To serve the production build, run `pnpm start` after `pnpm build`.
