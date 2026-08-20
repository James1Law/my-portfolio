"use client";

import { useEffect, useRef } from "react";
import type { FocusRequest } from "@/components/desktop/WindowManager";
import type { AppId } from "./window-config";

/**
 * Moves keyboard focus when the window manager asks for it — into a window as it
 * opens, back to its Dock item as it closes (PRD §31).
 *
 * Programmatic focus only matches `:focus-visible` when the visitor got here by
 * keyboard, so a mouse click moves focus without drawing a ring.
 */
export function useFocusRequest(
  request: FocusRequest | null,
  target: FocusRequest["target"],
  id: AppId
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!request) return;
    if (request.target !== target || request.id !== id) return;
    ref.current?.focus();
    // The token changes on every request, so re-opening the same app re-focuses.
  }, [request, target, id]);

  return ref;
}
