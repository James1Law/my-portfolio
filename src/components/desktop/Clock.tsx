"use client";

import { useSyncExternalStore } from "react";

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
};

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

const MINUTE = 60_000;

/** Current minute, as an epoch bucket — the clock only shows hours and minutes. */
function getSnapshot(): number {
  return Math.floor(Date.now() / MINUTE);
}

/** The server has no idea what time it is where the visitor is, so it says nothing. */
function getServerSnapshot(): null {
  return null;
}

function subscribe(onChange: () => void): () => void {
  let timer: ReturnType<typeof setTimeout>;

  const tick = () => {
    onChange();
    // Re-align to the next minute boundary each time rather than drifting.
    timer = setTimeout(tick, MINUTE - (Date.now() % MINUTE));
  };

  timer = setTimeout(tick, MINUTE - (Date.now() % MINUTE));
  return () => clearTimeout(timer);
}

/**
 * The visitor's local time, in the menu bar. Reads as nothing on the server and
 * fills in on hydration, so there is no mismatch to warn about.
 */
export function Clock() {
  // `subscribe` is module scope, so it is already stable across renders.
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const now = minute === null ? null : new Date(minute * MINUTE);

  return (
    <span
      // Reserves the space either way, so the menu bar doesn't jump on hydration.
      className="inline-flex min-w-[128px] items-center justify-end gap-3 tabular-nums"
    >
      {now ? (
        <>
          <span>{now.toLocaleDateString("en-GB", DATE_FORMAT)}</span>
          <time dateTime={now.toISOString()}>
            {now.toLocaleTimeString("en-GB", TIME_FORMAT)}
          </time>
        </>
      ) : null}
    </span>
  );
}
