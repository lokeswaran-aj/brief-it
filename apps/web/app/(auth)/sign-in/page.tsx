import { redirect } from "next/navigation";
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
    <main className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-xs">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
          Sign in to your account
        </h1>
        <p className="text-sm text-zinc-600">
          Use your Google account to manage briefings and listen to episodes.
        </p>
      </div>

      {rawError ? (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
        >
          Sign-in did not complete ({rawError}). Please try again.
        </div>
      ) : null}

      <GoogleSignInButton />
    </main>
  );
}
