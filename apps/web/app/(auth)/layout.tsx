import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-6 py-16">
      <div className="w-full max-w-md space-y-4">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 text-muted-foreground"
          render={<Link href="/" />}
          nativeButton={false}
        >
          <ArrowLeft data-icon="inline-start" aria-hidden="true" />
          Back to Brief-it
        </Button>
        {children}
      </div>
    </div>
  );
}
