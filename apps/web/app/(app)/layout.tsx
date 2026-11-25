import Link from "next/link";
import { requireSession } from "@/lib/auth-session";
import { SignOutButton } from "./sign-out-button";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await requireSession();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex w-full flex-col justify-between border-b border-zinc-200 bg-white px-5 py-4 md:w-64 md:border-r md:border-b-0 md:py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between md:block">
            <Link
              href="/dashboard"
              className="text-base font-semibold tracking-tight text-zinc-950"
            >
              Brief-it
            </Link>
            <Link
              href="/"
              className="text-xs text-zinc-500 transition hover:text-zinc-900 md:mt-1 md:block"
            >
              Public home
            </Link>
          </div>

          <nav aria-label="App navigation" className="flex gap-2 md:flex-col">
            <Link
              href="/dashboard"
              className="rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <div className="mt-6 space-y-3 border-t border-zinc-200 pt-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-zinc-500">{user.email}</p>
          </div>
          <SignOutButton />
        </div>
      </aside>

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
