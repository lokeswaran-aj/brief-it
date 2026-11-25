import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, type Session } from "./auth";

export async function getServerSession(): Promise<Session | null> {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession(): Promise<Session> {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return session;
}
