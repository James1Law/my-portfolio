"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Window,
  WindowContent,
  WindowControls,
  WindowTitle,
  WindowTitlebar,
} from "@/components/aqua/window";
import { MobileNav } from "./MobileNav";
import { useWindowManager } from "./WindowManager";
import { APPS, APP_ORDER, HOME_APP, type AppId } from "@/lib/window-config";
import { useFocusRequest } from "@/lib/use-focus-request";
import { cn } from "@/lib/utils";
import type { AppContent } from "./Desktop";

/**
 * The mobile application model — a designed experience, not the desktop tree
 * under media queries (PRD §20).
 *
 * One view at a time, filling the screen. Nothing overlaps, nothing is
 * draggable, and nothing depends on hover. Opening an application replaces the
 * current view; the red control takes you back to Welcome, which is the home
 * view and so has no control of its own. Minimise and maximise are absent
 * rather than decorative — a control that does nothing is worse than no control
 * (PRD §22).
 *
 * Every view stays mounted and inert when inactive, so all portfolio copy is in
 * the served HTML here too.
 */
function MobileView({
  id,
  isActive,
  children,
}: {
  id: AppId;
  isActive: boolean;
  children: React.ReactNode;
}) {
  const { closeWindow, focusRequest } = useWindowManager();
  const titleId = useId();
  const focusRef = useFocusRequest(focusRequest, "window", id);
  const reduceMotion = useReducedMotion();
  const isHome = id === HOME_APP;

  return (
    <motion.section
      ref={focusRef}
      aria-labelledby={titleId}
      tabIndex={-1}
      data-app={id}
      data-active={isActive || undefined}
      inert={!isActive}
      // Views are stacked, so an inactive one must not hold layout space.
      className={cn(
        isActive ? "flex min-h-0 flex-1" : "hidden",
        isHome && "aqua-enter-window"
      )}
      initial={false}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }
      }
    >
      <Window className="flex min-h-0 flex-1 flex-col rounded-[10px]">
        <WindowTitlebar className="shrink-0 select-none">
          <WindowControls
            title={APPS[id].title}
            // Welcome is home: there is nowhere to go back to from here.
            onClose={isHome ? undefined : () => closeWindow(id)}
            closeLabel={isHome ? undefined : `Back to ${APPS[HOME_APP].title}`}
            // A full 44px target, since it has no neighbour to collide with.
            // Both variants, or the base component's pointer-coarse size wins.
            controlClassName="size-[44px] pointer-coarse:size-[44px]"
          />
          <WindowTitle id={titleId}>{APPS[id].title}</WindowTitle>
        </WindowTitlebar>

        <WindowContent className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </WindowContent>
      </Window>
    </motion.section>
  );
}

export function MobileShell({ apps }: { apps: AppContent }) {
  const { frontmost } = useWindowManager();
  // Closing the last app leaves nothing frontmost; home is always the fallback.
  const active = frontmost ?? HOME_APP;

  return (
    <div className="flex h-full min-h-0 flex-col p-2">
      <main className="flex min-h-0 flex-1 flex-col">
        {APP_ORDER.map((id) => (
          <MobileView key={id} id={id} isActive={active === id}>
            {apps[id]}
          </MobileView>
        ))}
      </main>
      <MobileNav />
    </div>
  );
}
