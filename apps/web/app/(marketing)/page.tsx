import Link from "next/link";
import { HeroShowcase } from "@/components/marketing/hero-showcase";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "@/lib/auth-session";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const session = await getServerSession();
  const isSignedIn = Boolean(session);

  return (
    <>
      <HeroShowcase isSignedIn={isSignedIn} />

      <section
        aria-label="How Brief-it works"
        className="border-y border-border py-10 sm:py-12"
      >
        <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-y-0">
          <div className="pb-8 md:pb-0 md:pr-9 lg:pr-12">
            <svg
              className="size-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="8.5" />
              <line x1="12" y1="3.5" x2="12" y2="7" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            <h2 className="mt-5 font-serif text-[24px] leading-[1.2] tracking-[-0.01em] text-foreground">
              Choose topics
            </h2>
            <p className="mt-2.5 max-w-[300px] text-[14.5px] leading-[1.6] text-muted-foreground">
              Follow AI releases, startup funding, or any beat you keep up with
              each week.
            </p>
          </div>

          <div className="py-8 md:border-l md:border-border md:px-9 md:py-0 lg:px-12">
            <svg
              className="size-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="8.5" />
              <polyline points="12 7.5 12 12 15 13.75" />
            </svg>
            <h2 className="mt-5 font-serif text-[24px] leading-[1.2] tracking-[-0.01em] text-foreground">
              Set your schedule
            </h2>
            <p className="mt-2.5 max-w-[300px] text-[14.5px] leading-[1.6] text-muted-foreground">
              Daily, weekdays, or once a week. Research starts at your chosen
              time, matched to your timezone.
            </p>
          </div>

          <div className="pt-8 md:border-l md:border-border md:pl-9 md:pt-0 lg:pl-12">
            <svg
              className="size-5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
              <path d="M4.2 6.8L12 12.6L19.8 6.8" />
            </svg>
            <h2 className="mt-5 font-serif text-[24px] leading-[1.2] tracking-[-0.01em] text-foreground">
              Open the email and listen
            </h2>
            <p className="mt-2.5 max-w-[300px] text-[14.5px] leading-[1.6] text-muted-foreground">
              Each email links straight to your player, plain transcript, and
              sources.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-label="Start your briefing"
        className="flex flex-col items-center py-20 text-center sm:py-24 lg:py-28"
      >
        <h2 className="font-serif text-[34px] leading-[1.15] tracking-[-0.015em] text-foreground sm:text-[42px]">
          {isSignedIn
            ? "Your briefings are waiting."
            : "Start your first briefing today."}
        </h2>
        <p className="mt-3.5 text-[15px] leading-[1.6] text-muted-foreground">
          {isSignedIn
            ? "Jump back in to tune your topics or start a fresh episode."
            : "Pick a topic and set when research begins."}
        </p>

        <div className="mt-7">
          <Link
            href={isSignedIn ? "/dashboard" : "/sign-in"}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-11 rounded-lg bg-primary px-5 text-[14px] font-medium text-primary-foreground hover:bg-primary-hover focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            {isSignedIn
              ? "Listen to your briefings"
              : "Create your first briefing"}
          </Link>
        </div>
      </section>
    </>
  );
}
