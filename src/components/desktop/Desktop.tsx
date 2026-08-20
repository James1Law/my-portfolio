"use client";

import { AquaCursor } from "@/components/aqua/cursor";
import { WindowManager, useWindowManager } from "./WindowManager";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { DesktopIcons } from "./DesktopIcon";
import { PortfolioWindow } from "./PortfolioWindow";
import { MobileShell } from "./MobileShell";
import { APP_ORDER, MENU_BAR_HEIGHT, type AppId } from "@/lib/window-config";

/** App content is rendered on the server and handed in, so it stays crawlable. */
export type AppContent = Record<AppId, React.ReactNode>;

function Workspace({ apps }: { apps: AppContent }) {
  const { device } = useWindowManager();

  // Mobile is its own component tree, not this one with things switched off
  // (PRD §20). Windows, dragging and the menu bar have no place there.
  if (device.mode === "mobile") return <MobileShell apps={apps} />;

  const windows = (
    // Above the wallpaper shortcuts (z-10), below the Dock (z-40) and the menu
    // bar (z-50). The layer spans the whole workspace, so it must not swallow
    // clicks where there is no window — otherwise it covers the desktop icons.
    <div
      className="pointer-events-none absolute inset-0 z-20"
      style={{ top: MENU_BAR_HEIGHT }}
    >
      {APP_ORDER.map((id) => (
        <PortfolioWindow key={id} id={id}>
          {apps[id]}
        </PortfolioWindow>
      ))}
    </div>
  );

  return (
    <>
      <MenuBar />
      <DesktopIcons />
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
