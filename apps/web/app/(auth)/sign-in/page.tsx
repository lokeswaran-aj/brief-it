import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ColophonMark } from "@/components/brand/colophon-mark";
import { getServerSession } from "@/lib/auth-session";
import { EpisodeShowcase } from "./episode-showcase";
import { GoogleSignInButton } from "./sign-in-button";

export const metadata: Metadata = {
  title: "Sign in · Brief-it",
  description: "Sign in to Brief-it with Google to listen to your briefings.",
};

function getSafeCallbackUrl(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }
  return value;
}

function getSignInErrorMessage(
  rawError: string | undefined,
  isEpisodeReturn: boolean,
): string | null {
  if (!rawError) {
    return null;
  }

  const normalized = rawError.toLowerCase();
  const target = isEpisodeReturn ? "open your episode" : "continue";

  if (normalized === "access_denied" || normalized.includes("cancel")) {
    return `Google authentication was cancelled. Try again to ${target}.`;
  }

  return `Google authentication could not be completed. Try again to ${target}.`;
}

export default async function SignInPage({
  searchParams,
}: PageProps<"/sign-in">) {
  const params = await searchParams;
  const callbackUrl = getSafeCallbackUrl(params.callbackUrl ?? params.next);

  const session = await getServerSession();
  if (session) {
    redirect(callbackUrl);
  }

  const rawError = Array.isArray(params.error) ? params.error[0] : params.error;
  const isEpisodeReturn = callbackUrl.startsWith("/episodes/");
  const initialErrorMessage = getSignInErrorMessage(rawError, isEpisodeReturn);

  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-[minmax(420px,43.055%)_1fr]">
      <nav
        aria-label="Back navigation"
        className="absolute left-6 top-6 z-10 sm:left-10 sm:top-8 lg:left-12 lg:top-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-md py-1 text-[13.5px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:focus-visible:ring-offset-secondary"
        >
          <ChevronLeft className="size-4" strokeWidth={1.75} aria-hidden="true" />
          <span>Back to Brief-it</span>
        </Link>
      </nav>

      <aside
        aria-label="Brief-it preview"
        className="hidden items-center justify-center border-r border-border bg-secondary px-10 py-24 lg:flex xl:px-14"
      >
        <EpisodeShowcase />
      </aside>

      <main className="flex min-h-screen items-center justify-center bg-background px-6 pb-16 pt-24 sm:px-10 lg:py-16">
        <div className="w-full max-w-[380px]">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-md py-0.5 text-foreground transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <ColophonMark className="size-8" />
            <span className="font-serif text-[24px] leading-none tracking-[-0.01em] text-foreground">
              Brief-it
            </span>
          </Link>

          <GoogleSignInButton
            callbackUrl={callbackUrl}
            initialErrorMessage={initialErrorMessage}
          />
        </div>
      </main>
    </div>
  );
}
