"use client";

import { AppIcon } from "@/components/icons/AppIcons";
import { useWindowManager } from "./WindowManager";
import { APPS, DESKTOP_ICONS, MENU_BAR_HEIGHT } from "@/lib/window-config";

/**
 * A handful of wallpaper shortcuts mirroring the Dock. One click opens them —
 * nobody should need to know that a real desktop wanted two (PRD §4, §11).
 */
export function DesktopIcons() {
  const { activateApp } = useWindowManager();

  return (
    <div
      className="absolute right-3 z-10 flex w-[92px] flex-col items-center gap-1"
      style={{ top: MENU_BAR_HEIGHT + 14 }}
    >
      {DESKTOP_ICONS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => activateApp(id)}
          className="group flex w-full flex-col items-center gap-1 rounded-lg p-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <AppIcon id={id} className="size-[48px] rounded-[12px]" />
          <span className="rounded px-1 text-center text-[11px] font-semibold leading-tight text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_0_6px_rgba(0,0,0,0.5)] group-hover:bg-[var(--aqua-gel-deep)] group-focus-visible:bg-[var(--aqua-gel-deep)]">
            {APPS[id].dockLabel}
          </span>
        </button>
      ))}
    </div>
  );
}
