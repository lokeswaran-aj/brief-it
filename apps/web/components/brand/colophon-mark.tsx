import { cn } from "@/lib/utils";

type ColophonMarkProps = {
  className?: string;
};

export function ColophonMark({ className }: ColophonMarkProps) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
      className={cn("size-[26px] shrink-0", className)}
    >
      <circle cx="13" cy="13" r="13" className="fill-primary" />
      <circle
        cx="13"
        cy="13"
        r="9.25"
        className="stroke-sleeve-foreground/45"
        strokeWidth="0.9"
      />
      <circle
        cx="13"
        cy="13"
        r="5.75"
        className="stroke-sleeve-foreground/85"
        strokeWidth="0.95"
      />
      <circle cx="13" cy="13" r="2.2" className="fill-sleeve-foreground" />
    </svg>
  );
}
