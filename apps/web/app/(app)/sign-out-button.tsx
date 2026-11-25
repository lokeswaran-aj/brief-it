"use client";

import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSignOut() {
    setIsPending(true);
    setErrorMessage(null);

    try {
      const { error } = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
            router.refresh();
          },
        },
      });

      if (error) {
        setErrorMessage(error.message ?? "Unable to sign out.");
        setIsPending(false);
      }
    } catch {
      setErrorMessage("Unable to reach the authentication server.");
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-1.5">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleSignOut}
        disabled={isPending}
        className="w-full"
      >
        {isPending ? (
          <Loader2
            data-icon="inline-start"
            className="animate-spin"
            aria-hidden="true"
          />
        ) : (
          <LogOut data-icon="inline-start" aria-hidden="true" />
        )}
        {isPending ? "Signing out..." : "Sign out"}
      </Button>

      {errorMessage ? (
        <p role="alert" className="text-xs text-destructive">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
