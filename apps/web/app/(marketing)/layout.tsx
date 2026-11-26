import { Figtree, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { ColophonMark } from "@/components/brand/colophon-mark";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "@/lib/auth-session";
import { cn } from "@/lib/utils";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <div
      className={cn(
        instrumentSerif.variable,
        figtree.variable,
        "flex min-h-screen flex-col bg-background font-editorial-sans text-foreground",
      )}
    >
      <header className="w-full border-b border-border bg-background">
        <div className="mx-auto w-full max-w-[1344px] px-6 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between py-5 sm:py-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-md py-1 text-foreground transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ColophonMark />
              <span className="font-serif text-[22px] leading-none tracking-[-0.01em] text-foreground">
                Brief-it
              </span>
            </Link>

            <nav aria-label="Account navigation">
              <Link
                href={session ? "/dashboard" : "/sign-in"}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-9 rounded-lg border-input bg-card px-4 text-[13.5px] font-medium text-foreground shadow-none hover:bg-secondary hover:text-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                {session ? "Your briefings" : "Sign in"}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1344px] flex-1 flex-col px-6 sm:px-10 lg:px-12">
        {children}
      </main>

      <footer className="w-full border-t border-border bg-background">
        <div className="mx-auto w-full max-w-[1344px] px-6 sm:px-10 lg:px-12">
          <div className="flex flex-col gap-2 py-7 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-serif text-[18px] leading-none text-foreground">
              Brief-it
            </span>
            <p className="text-[13px] text-muted-foreground">
              Personalized audio briefings, on your schedule.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
