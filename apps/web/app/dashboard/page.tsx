import Link from "next/link";
import { requireSession } from "@/lib/auth-session";
import { SignOutButton } from "./sign-out-button";

export default async function DashboardPage() {
  const { user, session } = await requireSession();

  return (
    <main className="mx-auto max-w-2xl space-y-8 px-6 py-14">
      <header className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-6">
        <div>
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
          >
            Brief-it
          </Link>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
            Dashboard
          </h1>
        </div>
        <SignOutButton />
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
        <h2 className="text-base font-semibold text-zinc-950">
          Signed-in account
        </h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-zinc-500">Name</dt>
            <dd className="mt-0.5 font-medium text-zinc-900">{user.name}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Email</dt>
            <dd className="mt-0.5 font-medium text-zinc-900">{user.email}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">User ID (UUID)</dt>
            <dd className="mt-0.5 font-mono text-xs text-zinc-700">
              {user.id}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">Session expires</dt>
            <dd className="mt-0.5 font-mono text-xs text-zinc-700">
              {new Date(session.expiresAt).toISOString()}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
