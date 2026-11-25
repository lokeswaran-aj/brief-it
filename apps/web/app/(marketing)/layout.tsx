import Link from "next/link";
import { getServerSession } from "@/lib/auth-session";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-zinc-950"
          >
            Brief-it
          </Link>

          <nav className="flex items-center gap-3">
            {session ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-zinc-950 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="rounded-lg bg-zinc-950 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16">
        {children}
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-4 text-xs text-zinc-500">
          Brief-it · Personalized audio briefings
        </div>
      </footer>
    </div>
  );
}
