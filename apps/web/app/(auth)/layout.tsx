import { Figtree, Instrument_Serif } from "next/font/google";
import { cn } from "@/lib/utils";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        instrumentSerif.variable,
        figtree.variable,
        "min-h-screen bg-background font-editorial-sans text-foreground",
      )}
    >
      {children}
    </div>
  );
}
