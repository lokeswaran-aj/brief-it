export function EpisodeShowcase() {
  return (
    <figure
      aria-label="Sample episode artwork"
      className="mx-auto w-full max-w-[360px]"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-sleeve shadow-[0_22px_48px_-14px_rgba(20,38,30,0.22),0_2px_6px_rgba(20,38,30,0.06)]">
        <svg
          className="h-full w-full"
          viewBox="0 0 360 360"
          fill="none"
          aria-hidden="true"
        >
          <rect width="360" height="360" className="fill-sleeve" />

          {/* Subtle horizontal side registration ticks */}
          <line
            x1="24"
            y1="180"
            x2="42"
            y2="180"
            className="stroke-sleeve-foreground/22"
            strokeWidth="1"
          />
          <line
            x1="318"
            y1="180"
            x2="336"
            y2="180"
            className="stroke-sleeve-foreground/22"
            strokeWidth="1"
          />

          {/* Faint outer acoustic rings */}
          <circle
            cx="180"
            cy="180"
            r="148"
            className="stroke-sleeve-foreground/15"
            strokeWidth="1"
          />
          <circle
            cx="180"
            cy="180"
            r="128"
            className="stroke-sleeve-foreground/18"
            strokeWidth="1"
          />

          {/* Recessed inner disc shadow */}
          <circle
            cx="182"
            cy="185"
            r="107"
            className="fill-sleeve-deep/45"
          />

          {/* Matte raised archival disc */}
          <circle
            cx="180"
            cy="180"
            r="106"
            className="fill-sleeve-surface stroke-sleeve-foreground/26"
            strokeWidth="1"
          />

          {/* Concentric inner grooves */}
          <circle
            cx="180"
            cy="180"
            r="78"
            className="stroke-sleeve-foreground/22"
            strokeWidth="1"
          />
          <circle
            cx="180"
            cy="180"
            r="49"
            className="stroke-sleeve-foreground/42"
            strokeWidth="1"
          />
          <circle
            cx="180"
            cy="180"
            r="23"
            className="stroke-sleeve-foreground/68"
            strokeWidth="1"
          />

          {/* Center spindle */}
          <circle
            cx="180"
            cy="180"
            r="5.5"
            className="fill-sleeve-foreground"
          />
        </svg>
      </div>

      <figcaption className="mt-6">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-serif text-[26px] leading-[1.2] tracking-[-0.01em] text-foreground">
            AI &amp; Models
          </p>
          <span className="font-mono text-[13px] tabular-nums text-muted-foreground">
            4:42
          </span>
        </div>

        <div
          aria-hidden="true"
          className="relative mt-3.5 flex h-2.5 w-full items-center"
        >
          <div className="relative h-[2.5px] w-full rounded-full bg-border">
            <div className="absolute inset-y-0 left-0 w-[36%] rounded-full bg-playhead" />
          </div>
          <div className="absolute left-[36%] top-1/2 size-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-playhead" />
        </div>

        <p className="mt-2.5 text-[12.5px] leading-snug text-muted-foreground">
          Daily briefing · 5 sources
        </p>
      </figcaption>
    </figure>
  );
}
