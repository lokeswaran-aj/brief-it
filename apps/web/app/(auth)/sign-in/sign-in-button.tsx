"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

type GoogleSignInButtonProps = {
  callbackUrl: string;
  initialErrorMessage?: string | null;
};

export function GoogleSignInButton({
  callbackUrl,
  initialErrorMessage = null,
}: GoogleSignInButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    initialErrorMessage,
  );

  async function handleGoogleSignIn() {
    setIsPending(true);
    setErrorMessage(null);

    const errorCallbackURL =
      callbackUrl !== "/dashboard"
        ? `/sign-in?error=oauth_failed&callbackUrl=${encodeURIComponent(callbackUrl)}`
        : "/sign-in?error=oauth_failed";

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
        errorCallbackURL,
      });

      if (error) {
        setErrorMessage(
          error.message ??
            "Google authentication could not be started. Try again in a moment.",
        );
        setIsPending(false);
      }
    } catch {
      setErrorMessage(
        "Unable to reach the authentication server. Check your connection and try again.",
      );
      setIsPending(false);
    }
  }

  return (
    <div className="w-full">
      <h1 className="mt-8 font-serif text-[36px] leading-[1.15] tracking-[-0.015em] text-foreground sm:text-[38px]">
        Sign in
      </h1>

      {!errorMessage ? (
        <p className="mt-2.5 text-pretty text-[15px] leading-[1.55] text-muted-foreground">
          Personalized audio briefings, on your schedule.
        </p>
      ) : (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-[10px] border border-destructive-border bg-destructive-subtle px-4 py-3.5 text-destructive"
        >
          <AlertCircle
            className="mt-0.5 size-[17px] shrink-0"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-[14px] font-semibold leading-[1.35]">
              Sign-in did not finish
            </p>
            <p className="mt-1 text-[13px] leading-[1.5] text-destructive/90">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isPending}
        className="mt-7 inline-flex h-[46px] w-full items-center justify-center gap-2.5 rounded-lg border border-input bg-card px-5 text-[15px] font-medium text-foreground shadow-[0_1px_2px_rgba(20,38,30,0.05)] transition-[background-color,border-color,transform] hover:border-foreground/30 hover:bg-secondary/60 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-65"
      >
        {isPending ? (
          <Loader2
            className="size-[18px] animate-spin text-muted-foreground"
            aria-hidden="true"
          />
        ) : (
          <svg
            className="size-[18px] shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        <span>
          {isPending ? "Redirecting to Google..." : "Continue with Google"}
        </span>
      </button>
    </div>
  );
}
