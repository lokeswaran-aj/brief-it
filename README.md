# Brief-it

Personalized audio briefings from topics you follow, delivered on your schedule.

## Run locally

Use Node.js 24 LTS and pnpm 11.6.0:

```bash
cd apps/web
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. The Next.js app lives in `apps/web`, with routes in `app/`.

Checks: `pnpm lint`, `pnpm typecheck`, and `pnpm build` from `apps/web`.

See [the web setup](apps/web/README.md) and [project decisions](AGENTS.md).
