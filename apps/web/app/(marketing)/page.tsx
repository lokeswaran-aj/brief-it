import { ArrowRight, AudioLines } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/auth-session";

export default async function HomePage() {
  const session = await getServerSession();

  return (
    <section className="max-w-2xl space-y-6">
      <div className="space-y-3">
        <Badge variant="secondary">
          <AudioLines data-icon="inline-start" aria-hidden="true" />
          Personalized audio briefings
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Brief-it
        </h1>
        <p className="text-lg text-muted-foreground">
          Personalized audio briefings from topics you follow, delivered on your
          schedule.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {session ? (
          <>
            <Button
              size="lg"
              render={<Link href="/dashboard" />}
              nativeButton={false}
            >
              Open dashboard
              <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Signed in as {session.user.email}
            </span>
          </>
        ) : (
          <Button
            size="lg"
            render={<Link href="/sign-in" />}
            nativeButton={false}
          >
            Sign in with Google
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        )}
      </div>
    </section>
  );
}
