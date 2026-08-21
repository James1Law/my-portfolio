"use client";

import { useCallback, useRef } from "react";
import type { Point } from "./window-config";

interface UseDragOptions {
  /** Current position, read at drag start so the hook holds no duplicate state. */
  origin: Point;
  disabled?: boolean;
  onMove: (position: Point) => void;
  onStart?: () => void;
}

/**
 * Titlebar dragging on raw pointer events — no dependency, and it covers mouse,
 * touch and pen with one code path. Clamping is the reducer's job.
 */
export function useDrag({ origin, disabled, onMove, onStart }: UseDragOptions) {
  const start = useRef<{ pointer: Point; origin: Point } | null>(null);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (disabled || event.button !== 0) return;
      // Window controls live in the titlebar; a click on one is not a drag.
      if ((event.target as HTMLElement).closest("button")) return;

      const element = event.currentTarget;
      // `origin` is only ever read at drag start, so closing over it is enough.
      start.current = {
        pointer: { x: event.clientX, y: event.clientY },
        origin,
      };
      element.setPointerCapture(event.pointerId);
      onStart?.();
      event.preventDefault();
    },
    [disabled, onStart, origin]
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const from = start.current;
      if (!from) return;
      onMove({
        x: from.origin.x + (event.clientX - from.pointer.x),
        y: from.origin.y + (event.clientY - from.pointer.y),
      });
    },
    [onMove]
  );

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (!start.current) return;
    start.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  };
}
