"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MorningEpisodeCard } from "@/components/marketing/morning-episode-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SAMPLE_INITIAL_SECONDS = 108; // 1:48
const SAMPLE_DURATION_SECONDS = 282; // 4:42

type HeroShowcaseProps = {
  isSignedIn: boolean;
};

export function HeroShowcase({ isSignedIn }: HeroShowcaseProps) {
  const [playback, setPlayback] = useState({
    isPlaying: false,
    currentSeconds: SAMPLE_INITIAL_SECONDS,
  });

  useEffect(() => {
    if (!playback.isPlaying) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const tickMs = prefersReducedMotion ? 1000 : 250;
    const stepSeconds = tickMs / 1000;

    const timer = window.setInterval(() => {
      setPlayback((prev) => {
        if (!prev.isPlaying) {
          return prev;
        }
        const next = prev.currentSeconds + stepSeconds;
        if (next >= SAMPLE_DURATION_SECONDS) {
          return {
            isPlaying: false,
            currentSeconds: SAMPLE_DURATION_SECONDS,
          };
        }
        return {
          ...prev,
          currentSeconds: next,
        };
      });
    }, tickMs);

    return () => window.clearInterval(timer);
  }, [playback.isPlaying]);

  function handleTogglePlay() {
    setPlayback((prev) => {
      if (prev.isPlaying) {
        return { ...prev, isPlaying: false };
      }
      const nextSeconds =
        prev.currentSeconds >= SAMPLE_DURATION_SECONDS
          ? 0
          : prev.currentSeconds;
      return {
        isPlaying: true,
        currentSeconds: nextSeconds,
      };
    });
  }

  function handleSeek(nextSeconds: number) {
    const clamped = Math.min(SAMPLE_DURATION_SECONDS, Math.max(0, nextSeconds));
    setPlayback((prev) => ({
      isPlaying: clamped >= SAMPLE_DURATION_SECONDS ? false : prev.isPlaying,
      currentSeconds: clamped,
    }));
  }

  return (
    <section
      aria-label="Brief-it overview"
      className="py-12 sm:py-16 lg:py-20"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16 xl:gap-20">
        <div>
          <h1 className="text-balance font-serif text-[38px] leading-[1.08] tracking-[-0.02em] text-foreground sm:text-[56px] sm:leading-[1.06] lg:text-[64px]">
            Your own audio briefing,
            <br />
            on any topic.
          </h1>

          <p className="mt-6 max-w-[496px] text-pretty text-[17px] leading-[1.6] text-muted-foreground">
            Tell Brief-it what you want to follow and when to run. We research
            what&apos;s new and turn it into a concise audio briefing on your
            schedule.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={isSignedIn ? "/dashboard" : "/sign-in"}
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-11 rounded-lg bg-primary px-5 text-[14px] font-medium text-primary-foreground hover:bg-primary-hover focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              {isSignedIn
                ? "Listen to your briefings"
                : "Start your first briefing"}
            </Link>
          </div>
        </div>

        <MorningEpisodeCard
          isPlaying={playback.isPlaying}
          currentSeconds={playback.currentSeconds}
          totalSeconds={SAMPLE_DURATION_SECONDS}
          onTogglePlay={handleTogglePlay}
          onSeek={handleSeek}
        />
      </div>
    </section>
  );
}
