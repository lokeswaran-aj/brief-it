import Link from "next/link";
import { getServerSession } from "@/lib/auth-session";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <section className="max-w-2xl space-y-6">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
          Brief-it
        </h1>
        <p className="text-lg text-zinc-600">
          Personalized audio briefings from topics you follow, delivered on your
          schedule.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {session ? (
          <>
            <Link
              href="/dashboard"
              className="rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Open dashboard
            </Link>
            <span className="text-sm text-zinc-600">
              Signed in as {session.user.email}
            </span>
          </>
        ) : (
          <Link
            href="/sign-in"
            className="rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            Sign in with Google
          </Link>
        )}
      </div>
    </section>
  );
}
