import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { requireSession } from "@/lib/auth-session";
import { AppSidebar } from "./app-sidebar";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ user }, cookieStore] = await Promise.all([
    requireSession(),
    cookies(),
  ]);
  const sidebarCookie = cookieStore.get("sidebar_state")?.value;
  const defaultOpen = sidebarCookie !== "false";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar
        user={{
          name: user.name,
          email: user.email,
          image: user.image,
        }}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4"
          />
          <span className="text-sm font-medium text-muted-foreground">
            Workspace
          </span>
        </header>
        <div className="flex-1 px-6 py-8 md:px-10">
          <div className="mx-auto max-w-4xl">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
