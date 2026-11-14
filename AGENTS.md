# Brief-it: Project Context and Agent Guidance

## Product

Brief-it turns recurring research requests into personalized audio briefings delivered through emailed website links. Examples: daily funding announcements, AI updates, and weekly Product Hunt launches. Build-in-public distribution starts on X, targeting tech professionals and founders; demand remains unvalidated.

These are planning decisions, not implemented capabilities. Latest user instructions take precedence.

## Current Setup and Scope

Start with the standalone Next.js app in `apps/web`; use `app/` directly, without `src/`, a root JavaScript package, or pnpm workspaces. Install and run commands from `apps/web`. Use Node.js 24 LTS and the package's pinned pnpm version. Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` for web verification. Auth and briefing creation are the next two tasks. Add workers and infrastructure only when their implementation begins.

## Agreed MVP

- Google sign-in, briefing creation, immediate generation, recurring schedules, and history.
- Setup: topic/instructions, coverage period, language, schedule, and timezone. Coverage period and frequency are separate.
- Daily, selected-weekday, and weekly schedules; edit, pause, resume, and delete controls.
- Scheduled time means research starts then; delivery follows minutes later, without a promised turnaround.
- First generation uses the real pipeline. Show progress, allow users to leave, and email when ready.
- Listening page: audio player, plain transcript, sources, and previous episodes. Transcript synchronization is deferred.
- No duration selector. Target five minutes, allow shorter episodes, and never pad. Maximum length, five or ten minutes, remains undecided.
- Multilingual audio and matching transcripts; research may use other languages. Launch languages remain open.

## Terminology

- **Briefing:** persistent topic/instructions.
- **Schedule:** frequency, timezone, and next occurrence.
- **Episode:** one update with its coverage window, research, script, transcript, and audio; previously called an “edition.”
- **Attempt:** an execution/retry within the same episode.

## Application Architecture

Use one repository with separate web, worker, and scheduler processes:

- **Next.js + TypeScript:** website and complete user-facing backend, including briefing/schedule management, generation requests, history, and playback authorization.
- **Better Auth:** Google sign-in with PostgreSQL-backed records. Next.js owns sessions and access checks.
- **Python + Celery:** research, scripting, TTS, generation orchestration, and task publication. Redis is the broker; Celery workers execute tasks.
- **Celery Beat:** periodically triggers a Python dispatcher. User schedules remain in Postgres. A scheduler determines when work is due; the broker holds messages; workers execute work.
- **No internal FastAPI bridge:** Python agents do not require FastAPI. Next.js does not publish Celery messages or need a TypeScript Celery SDK.

## Database Handoff and Reliability

For “Generate now,” Next.js saves an episode and pending generation request in one Postgres transaction, then returns the episode ID. A periodic Python dispatcher reads pending requests and publishes Celery tasks through Redis. It also creates requests for due schedules. Next.js reads progress from Postgres. A short polling delay is acceptable; five seconds is a candidate interval, not fixed.

Treat this handoff as an outbox: pending work survives queue outages. Use stable request IDs, unique scheduled occurrences, concurrency-safe claiming, bounded retries, and reconciliation of stalled work. Publication can repeat across failures; prevent duplicate episodes and side effects. Redis availability does not guarantee message durability.

Generation proceeds through research, script, audio, publication, then email. Save successful stage outputs and retry the failed stage. Freeze episode settings and coverage windows. Keep generation readiness separate from email status. Detailed states and schema remain deferred.

Postgres stores configurations, schedules, episodes, findings, sources, scripts, transcripts, attempts, model/prompt versions, usage, and delivery metadata. Next.js owns all schema definitions and migrations, including worker-used tables; Python workers only read and modify records. Run migrations as a controlled deployment step, not at each instance startup. Audio bytes live in private Cloud Storage; object references live in Postgres. Email stable website links and authorize playback separately.

## Hosting, Development, and Portability

Prefer managed infrastructure with portable application containers. Provision resources using **Terraform**:

- Next.js on a **Cloud Run service**.
- Celery workers on **Cloud Run worker pools**; Beat on a separate worker pool.
- Managed Redis via **Memorystore for Redis, Standard Tier**, with private networking and appropriate authentication/encryption.
- PostgreSQL via **Cloud SQL**; audio via **Cloud Storage**. Do not self-host object storage.
- Artifact Registry, Secret Manager, Cloud Logging, and Monitoring for deployment and operations.

Locally, use Docker Compose for Next.js, Postgres, Redis, Celery workers, and Beat, with reload support and persistent database volumes. Use Mailpit for email capture and an isolated development bucket for Cloud Storage. Google OAuth and live Gemini/TTS remain external; fixtures support development without AI calls.

Document configuration for future open-source deployment. Isolate provider integrations; cloud migration also changes infrastructure, networking, and credentials. Cloud Tasks, its emulator, Cloud Scheduler, and single-VM production hosting are superseded.

## Deployment Requirements

Target zero user-facing downtime through healthy revisions, controlled traffic migration, and backward-compatible schema/task changes. Overlap replacement workers and make interrupted work recoverable; worker shutdown can interrupt long tasks. Beat needs one active scheduling leader, protected by a lease and duplicate safeguards during deployment overlap.

The user has GCP credits and prioritizes low operational burden and portability over minimum cost. Previous infrastructure estimates do not describe this revised stack.

## Deferred Decisions and Working Guidance

Research tools, budgets, evidence validation, detailed lifecycle, exact Gemini/TTS models, regions, worker scaling, ORM/migration tooling, email provider, and missed-schedule behavior remain open. Drizzle was suggested, not finalized. Preserve citations, distinguish publication/event dates, avoid repeated stories, and retain structured evidence beyond any concise report.

Implement incrementally, preserve unrelated edits, verify changed behavior, and explain GCP plainly. Resolve deferred choices when needed.
