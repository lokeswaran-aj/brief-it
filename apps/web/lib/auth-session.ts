import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { auth, type Session } from "./auth";

export const getServerSession = cache(async (): Promise<Session | null> => {
  return auth.api.getSession({
    headers: await headers(),
  });
});

export async function requireSession(): Promise<Session> {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return session;
}
