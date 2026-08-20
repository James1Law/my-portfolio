"use client";

import { Dock as AquaDock, DockItem } from "@/components/aqua/dock";
import { AppIcon } from "@/components/icons/AppIcons";
import { useWindowManager } from "./WindowManager";
import { APPS, MOBILE_NAV } from "@/lib/window-config";

/**
 * The Dock, reinterpreted as bottom navigation.
 *
 * Keeps Aqua's Dock surface, but the labels are permanently visible rather than
 * revealed on hover — there is no hover here, and a nav bar of unlabelled icons
 * is a guessing game (PRD §21). Magnification is already gated behind
 * `pointer-fine`, so it doesn't apply.
 *
 * Five items, so the labels stay readable at 320px. About is reached from
 * Welcome instead.
 */
export function MobileNav() {
  const { frontmost, activateApp } = useWindowManager();

  return (
    <nav
      aria-label="Applications"
      className="shrink-0 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1"
    >
      <AquaDock className="w-full justify-between gap-1 rounded-[18px] px-2 pb-1.5 pt-2">
        {MOBILE_NAV.map((id) => (
          <DockItem
            key={id}
            label={APPS[id].dockLabel}
            active={frontmost === id}
            alwaysShowLabel
            onClick={() => activateApp(id)}
            // 44px of icon plus the label keeps the whole control past the
            // minimum target size in both directions.
            className="min-w-[44px] flex-1 gap-0.5 px-0.5 py-0.5"
          >
            <AppIcon id={id} className="size-[40px] rounded-[10px]" />
          </DockItem>
        ))}
      </AquaDock>
    </nav>
  );
}
