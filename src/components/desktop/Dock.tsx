"use client";

import { Dock as AquaDock, DockItem } from "@/components/aqua/dock";
import { AppIcon } from "@/components/icons/AppIcons";
import { useWindowManager } from "./WindowManager";
import { APPS, APP_ORDER, type AppId } from "@/lib/window-config";
import { useFocusRequest } from "@/lib/use-focus-request";

/**
 * Split out so each launcher holds its own focus ref: closing a window hands
 * focus back to the Dock item that opened it (PRD §31).
 */
function DockLauncher({ id }: { id: AppId }) {
  const { state, activateApp, focusRequest } = useWindowManager();
  const focusRef = useFocusRequest(focusRequest, "dock", id);

  return (
    <DockItem
      ref={focusRef as React.Ref<HTMLButtonElement>}
      label={APPS[id].dockLabel}
      active={state.windows[id].isOpen}
      onClick={() => activateApp(id)}
    >
      <AppIcon id={id} />
    </DockItem>
  );
}

/**
 * Primary navigation on desktop and tablet. One entry point per app: clicking
 * launches a closed app, restores a minimised one and focuses a visible one
 * (PRD §10). Mobile has its own navigation, so this never renders there.
 */
export function Dock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-3">
      <nav aria-label="Applications" className="pointer-events-auto">
        <AquaDock>
          {APP_ORDER.map((id) => (
            <DockLauncher key={id} id={id} />
          ))}
        </AquaDock>
      </nav>
    </div>
  );
}
