"use client";

type MorningEpisodeCardProps = {
  isPlaying: boolean;
  currentSeconds: number;
  totalSeconds: number;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
};

function formatTimecode(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(whole / 60);
  const remaining = whole % 60;
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

export function MorningEpisodeCard({
  isPlaying,
  currentSeconds,
  totalSeconds,
  onTogglePlay,
  onSeek,
}: MorningEpisodeCardProps) {
  const clampedSeconds = Math.min(totalSeconds, Math.max(0, currentSeconds));
  const progressPercent = (clampedSeconds / totalSeconds) * 100;
  const formattedCurrent = formatTimecode(clampedSeconds);
  const formattedTotal = formatTimecode(totalSeconds);

  return (
    <article
      aria-label="Sample audio briefing episode"
      className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_22px_52px_-14px_rgba(20,38,30,0.10),0_2px_6px_rgba(20,38,30,0.04)] lg:ml-auto"
    >
      {/* Top archival artwork sleeve */}
      <div className="relative flex min-h-[344px] flex-col justify-end overflow-hidden bg-sleeve px-7 pb-7 pt-8 sm:min-h-[408px] sm:px-8 sm:pb-8">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 480 408"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <rect width="480" height="408" className="fill-sleeve" />
          <path d="M0 268L480 180V408H0V268Z" className="fill-sleeve-deep" />

          <line
            x1="32"
            y1="32"
            x2="448"
            y2="32"
            className="stroke-sleeve-foreground/18"
            strokeWidth="1"
          />
          <circle cx="40" cy="52" r="3.4" className="fill-sleeve-foreground/72" />
          <circle cx="54" cy="52" r="3.4" className="fill-sleeve-foreground/34" />

          <circle cx="326" cy="148" r="110" className="fill-sleeve-surface" />
          {isPlaying ? (
            <circle
              cx="326"
              cy="148"
              r="94"
              fill="none"
              className="stroke-sleeve-foreground/20 motion-safe:animate-pulse"
              strokeWidth="1"
            />
          ) : null}
          <circle
            cx="326"
            cy="148"
            r="77"
            fill="none"
            className="stroke-sleeve-foreground/32"
            strokeWidth="1"
          />
          <circle
            cx="326"
            cy="148"
            r="48"
            fill="none"
            className="stroke-sleeve-foreground/58"
            strokeWidth="1"
          />
          <circle cx="326" cy="148" r="20" className="fill-sleeve-foreground" />
        </svg>

        <div className="relative z-10 mt-auto pt-40 sm:pt-52">
          <div
            className="mb-5 h-px w-[132px] bg-sleeve-foreground/22"
            aria-hidden="true"
          />
          <h2 className="font-serif text-[34px] leading-[1.08] tracking-[-0.015em] text-sleeve-foreground sm:text-[40px]">
            AI &amp; Models Briefing
          </h2>
          <p className="mt-2 text-[13px] leading-snug text-sleeve-muted">
            Thursday · Daily at{" "}
            <span className="font-mono tabular-nums tracking-tight">
              7:30 AM
            </span>
          </p>
        </div>
      </div>

      {/* Bottom player deck */}
      <div className="bg-card px-6 py-6 sm:px-7 sm:py-7">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={
              isPlaying ? "Pause sample briefing" : "Play sample briefing"
            }
            className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-[background-color,transform] hover:bg-primary-hover active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            {isPlaying ? (
              <svg
                className="size-4 fill-current"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <rect x="3.5" y="2.5" width="3.2" height="11" rx="0.8" />
                <rect x="9.3" y="2.5" width="3.2" height="11" rx="0.8" />
              </svg>
            ) : (
              <svg
                className="ml-0.5 size-4 fill-current"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M4.2 2.6L13.2 8L4.2 13.4V2.6Z" />
              </svg>
            )}
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold leading-[1.35] text-foreground">
              Open weights and chip supply
            </p>
            <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">
              <span className="font-mono tabular-nums">{formattedTotal}</span> ·
              8 sources · Plain transcript
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="relative flex h-6 w-full items-center">
            <input
              type="range"
              min={0}
              max={totalSeconds}
              step={1}
              value={Math.round(clampedSeconds)}
              onChange={(event) => onSeek(Number(event.target.value))}
              aria-label="Seek sample briefing"
              aria-valuetext={`${formattedCurrent} of ${formattedTotal}`}
              className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            />
            <div className="pointer-events-none relative h-[3px] w-full rounded-full bg-playhead-track">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-playhead"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 size-[13px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-playhead transition-transform peer-hover:scale-110 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-card"
              style={{ left: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-1 flex items-center justify-between font-mono text-[12px] tabular-nums">
            <span className="font-medium text-foreground">
              {formattedCurrent}
            </span>
            <span className="text-muted-foreground">{formattedTotal}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
