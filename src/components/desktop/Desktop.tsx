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
    // The workspace is the page's main landmark. It sits above the wallpaper
    // shortcuts (z-10) and below the Dock (z-40) and menu bar (z-50), and spans
    // the whole area — so it must not swallow clicks where there is no window,
    // or it would cover the desktop icons.
    <main
      className="pointer-events-none absolute inset-0 z-20"
      style={{ top: MENU_BAR_HEIGHT }}
    >
      {APP_ORDER.map((id) => (
        <PortfolioWindow key={id} id={id}>
          {apps[id]}
        </PortfolioWindow>
      ))}
    </main>
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

function DesktopFrame({ children }: { children: React.ReactNode }) {
  const { device } = useWindowManager();

  return (
    <div
      className="aqua-desktop relative h-dvh w-full overflow-hidden"
      // Present only until the client knows the viewport. Paired with a
      // narrow-viewport media query in globals.css, it means "small screen, and
      // we haven't switched to the mobile shell yet" — the one moment a phone
      // would otherwise paint desktop chrome.
      data-first-paint={device.ready ? undefined : ""}
    >
      {children}
    </div>
  );
}

export function Desktop({ apps }: { apps: AppContent }) {
  return (
    <WindowManager>
      <DesktopFrame>
        <Workspace apps={apps} />
      </DesktopFrame>
    </WindowManager>
  );
}
