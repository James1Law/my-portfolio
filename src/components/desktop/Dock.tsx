"use client";

import { Dock as AquaDock, DockItem } from "@/components/aqua/dock";
import { AppIcon } from "@/components/icons/AppIcons";
import { useWindowManager } from "./WindowManager";
import { APPS, APP_ORDER } from "@/lib/window-config";

/**
 * Primary navigation. One entry point per app: clicking launches a closed app,
 * restores a minimised one and focuses a visible one (PRD §10).
 */
export function Dock() {
  const { state, activateApp, device } = useWindowManager();
  // Six 58px icons overflow a phone. Scaling to 44px keeps every target at the
  // accessible minimum and fits inside 320px (PRD §21).
  const compact = device.mode === "mobile";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-3">
      <nav aria-label="Applications" className="pointer-events-auto">
        <AquaDock className={compact ? "gap-1.5 px-2 pb-2 pt-2.5" : undefined}>
          {APP_ORDER.map((id) => (
            <DockItem
              key={id}
              label={APPS[id].dockLabel}
              active={state.windows[id].isOpen}
              onClick={() => activateApp(id)}
            >
              <AppIcon
                id={id}
                className={compact ? "size-[44px] rounded-[11px]" : undefined}
              />
            </DockItem>
          ))}
        </AquaDock>
      </nav>
    </div>
  );
}
