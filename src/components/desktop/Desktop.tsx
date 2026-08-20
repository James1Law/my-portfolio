"use client";

import { AquaCursor } from "@/components/aqua/cursor";
import { WindowManager, useWindowManager } from "./WindowManager";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { DesktopIcons } from "./DesktopIcon";
import { PortfolioWindow } from "./PortfolioWindow";
import { APP_ORDER, MENU_BAR_HEIGHT, type AppId } from "@/lib/window-config";

/** App content is rendered on the server and handed in, so it stays crawlable. */
export type AppContent = Record<AppId, React.ReactNode>;

function Workspace({ apps }: { apps: AppContent }) {
  const { device, frontmost } = useWindowManager();
  const isMobile = device.mode === "mobile";

  const windows = (
    // Above the wallpaper shortcuts (z-10), below the Dock (z-40) and the menu
    // bar (z-50). The layer is only a positioning context; windows handle input.
    <div className="absolute inset-0 z-20" style={{ top: MENU_BAR_HEIGHT }}>
      {APP_ORDER.map((id) => (
        // Interim mobile behaviour: windows are already full-bleed and
        // undraggable, and only the frontmost one shows. The designed mobile
        // shell — bottom navigation, app-style transitions — is Phase 4.
        isMobile && frontmost !== id ? null : (
          <PortfolioWindow key={id} id={id}>
            {apps[id]}
          </PortfolioWindow>
        )
      ))}
    </div>
  );

  return (
    <>
      {/* The menu bar is a desktop and tablet affordance; mobile navigates from
          the Dock (PRD §9). */}
      {!isMobile ? (
        <>
          <MenuBar />
          <DesktopIcons />
        </>
      ) : null}
      {/* Era cursors are worth having inside application content, but not over
          the chrome, and never on touch (PRD §39). */}
      {device.pointerFine ? <AquaCursor>{windows}</AquaCursor> : windows}
      <Dock />
    </>
  );
}

export function Desktop({ apps }: { apps: AppContent }) {
  return (
    <div className="aqua-desktop relative h-dvh w-full overflow-hidden">
      <WindowManager>
        <Workspace apps={apps} />
      </WindowManager>
    </div>
  );
}
