# Brief-it web

Standalone Next.js application with TypeScript, App Router, Tailwind CSS, and ESLint. Application routes live directly in `app/`; there is no `src/` directory or pnpm workspace.

## Development

Use Node.js 24 LTS and pnpm 11.6.0. From this directory:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. Changes to `app/page.tsx` reload automatically.

Follow the root README to start PostgreSQL and copy `.env.example` to `.env` in this directory. `DATABASE_URL` points to the local database; the application will use it when the ORM is added. Google credentials are not needed yet. Google sign-in and briefing creation are the next implementation tasks.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

`typecheck` generates Next.js route types before checking TypeScript. To serve the production build, run `pnpm start` after `pnpm build`.

Database schema and migrations will be owned by this application. The ORM and migration tool will be selected when database work starts; Python workers will use the existing tables without managing their schema.
