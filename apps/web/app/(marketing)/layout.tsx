import { AudioLines } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/auth-session";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b bg-background/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
          >
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <AudioLines className="size-4" aria-hidden="true" />
            </span>
            Brief-it
          </Link>

          <nav className="flex items-center gap-3">
            {session ? (
              <Button render={<Link href="/dashboard" />} nativeButton={false}>
                Dashboard
              </Button>
            ) : (
              <Button render={<Link href="/sign-in" />} nativeButton={false}>
                Sign in
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16">
        {children}
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto max-w-5xl px-6 py-4 text-xs text-muted-foreground">
          Brief-it · Personalized audio briefings
        </div>
      </footer>
    </div>
  );
}
