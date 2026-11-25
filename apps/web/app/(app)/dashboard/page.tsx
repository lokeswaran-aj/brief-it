import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { requireSession } from "@/lib/auth-session";
import { getUserInitials } from "@/lib/utils";

export default async function DashboardPage() {
  const { user, session } = await requireSession();
  const initials = getUserInitials(user.name, user.email);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Your briefings and recent episodes will appear here.
        </p>
      </header>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              {user.image ? (
                <AvatarImage
                  src={user.image}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                />
              ) : null}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <CardTitle>Signed-in account</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
          <CardAction>
            <Badge variant="secondary">Active session</Badge>
          </CardAction>
        </CardHeader>

        <Separator />

        <CardContent>
          <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Name</dt>
              <dd className="mt-0.5 font-medium text-foreground">
                {user.name}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Email</dt>
              <dd className="mt-0.5 font-medium text-foreground">
                {user.email}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">User ID (UUID)</dt>
              <dd className="mt-0.5 font-mono text-xs text-muted-foreground">
                {user.id}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Session expires</dt>
              <dd className="mt-0.5 font-mono text-xs text-muted-foreground">
                {new Date(session.expiresAt).toISOString()}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
