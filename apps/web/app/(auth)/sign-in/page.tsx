import { AlertCircle, AudioLines } from "lucide-react";
import { redirect } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "@/lib/auth-session";
import { GoogleSignInButton } from "./sign-in-button";

export default async function SignInPage({
  searchParams,
}: PageProps<"/sign-in">) {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const rawError = Array.isArray(params.error) ? params.error[0] : params.error;

  return (
    <main>
      <Card className="p-2 sm:p-4">
        <CardHeader className="space-y-2">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <AudioLines className="size-4" aria-hidden="true" />
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Sign in to your account
          </CardTitle>
          <CardDescription>
            Use your Google account to manage briefings and listen to episodes.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {rawError ? (
            <Alert variant="destructive">
              <AlertCircle aria-hidden="true" />
              <AlertTitle>Sign-in did not complete</AlertTitle>
              <AlertDescription>
                Authentication returned an error ({rawError}). Please try again.
              </AlertDescription>
            </Alert>
          ) : null}

          <GoogleSignInButton />
        </CardContent>
      </Card>
    </main>
  );
}
