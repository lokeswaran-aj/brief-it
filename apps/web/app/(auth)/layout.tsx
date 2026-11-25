import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md space-y-4">
        <Link
          href="/"
          className="inline-block text-sm font-medium text-zinc-500 transition hover:text-zinc-900"
        >
          ← Back to Brief-it
        </Link>
        {children}
      </div>
    </div>
  );
}
