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
import { useWindowManager } from "./WindowManager";
import { APPS, type AppId } from "@/lib/window-config";
import { fitSize } from "@/lib/window-state";
import { useDrag } from "@/lib/use-drag";
import { cn } from "@/lib/utils";

/**
 * One portfolio application, in Aqua window chrome.
 *
 * The element is never unmounted. A window that isn't on screen is marked
 * `inert`, which takes it out of the tab order and out of the accessibility tree
 * while leaving its content in the served HTML — so portfolio copy stays
 * crawlable without a closed window being reachable (PRD §33).
 */
export function PortfolioWindow({
  id,
  children,
}: {
  id: AppId;
  children: React.ReactNode;
}) {
  const {
    state,
    workspace,
    device,
    frontmost,
    closeWindow,
    minimiseWindow,
    toggleMaximise,
    focusWindow,
    moveWindow,
  } = useWindowManager();

  const window = state.windows[id];
  const config = APPS[id];
  const titleId = useId();
  const reduceMotion = useReducedMotion();

  const isMobile = device.mode === "mobile";
  const isVisible = window.isOpen && !window.isMinimised;
  const isFrontmost = frontmost === id;

  // Dragging needs a pointer worth dragging with; touch gets full-bleed views.
  const canDrag =
    !isMobile && !window.isMaximised && device.pointerFine;

  const drag = useDrag({
    origin: window.position,
    disabled: !canDrag,
    onMove: (position) => moveWindow(id, position),
    onStart: () => focusWindow(id),
  });

  const fitted = fitSize(config.size, workspace);
  const fullBleed = window.isMaximised || isMobile;
  const rect = fullBleed
    ? {
        left: workspace.left,
        top: workspace.top,
        width: workspace.width,
        height: workspace.height,
      }
    : {
        left: window.position.x,
        top: window.position.y,
        width: fitted.width,
        height: fitted.height,
      };

  // Minimising travels towards the Dock; closing just recedes (PRD §28).
  const target = isVisible
    ? { opacity: 1, scale: 1, y: 0 }
    : window.isMinimised
      ? { opacity: 0, scale: 0.3, y: workspace.height * 0.55 }
      : { opacity: 0, scale: 0.97, y: 0 };

  return (
    <motion.section
      aria-labelledby={titleId}
      data-app={id}
      data-frontmost={isFrontmost || undefined}
      className="absolute"
      style={{ ...rect, zIndex: window.zIndex }}
      initial={false}
      animate={target}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.19, ease: [0.2, 0.8, 0.2, 1] }
      }
      onPointerDownCapture={() => focusWindow(id)}
      inert={!isVisible}
    >
      <Window
        className={cn(
          "flex h-full flex-col",
          // The frontmost window earns the heavier shadow; the rest sit back.
          !isFrontmost &&
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_0_0_1px_rgba(40,45,55,0.3),0_8px_20px_rgba(30,40,60,0.22)]"
        )}
      >
        <WindowTitlebar
          className={cn(
            "shrink-0 select-none",
            canDrag && "cursor-default touch-none"
          )}
          {...(canDrag ? drag : {})}
        >
          <WindowControls
            title={config.title}
            onClose={() => closeWindow(id)}
            // Minimise and maximise have no meaning in the single-view mobile
            // model, so they are absent rather than decorative (PRD §22).
            onMinimise={isMobile ? undefined : () => minimiseWindow(id)}
            onMaximise={isMobile ? undefined : () => toggleMaximise(id)}
          />
          <WindowTitle id={titleId}>{config.title}</WindowTitle>
        </WindowTitlebar>

        <WindowContent className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </WindowContent>
      </Window>
    </motion.section>
  );
}
