"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/aqua/dropdown-menu";
import { useWindowManager } from "./WindowManager";
import { Clock } from "./Clock";
import { APPS, APP_ORDER, MENU_BAR_HEIGHT } from "@/lib/window-config";
import { contactInfo } from "@/lib/data";
import { cn } from "@/lib/utils";

const TRIGGER_CLASS = cn(
  "flex h-full items-center rounded-[4px] px-2.5 text-[13px] outline-none",
  "data-[state=open]:bg-[linear-gradient(180deg,var(--aqua-gel-light)_0%,var(--aqua-gel-deep)_100%)] data-[state=open]:text-white",
  "focus-visible:ring-2 focus-visible:ring-[var(--aqua-ring)] focus-visible:ring-offset-0"
);

function Menu({
  label,
  children,
  bold,
}: {
  label: string;
  children: React.ReactNode;
  bold?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(TRIGGER_CLASS, bold && "font-bold")}>
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={0}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * The OS menu bar. Every item does something — no decorative dead controls
 * imitating macOS for its own sake (PRD §9).
 */
export function MenuBar() {
  const {
    state,
    frontmost,
    openAppIds,
    activateApp,
    minimiseAll,
    centreActive,
    resetDesktop,
  } = useWindowManager();

  const openWindows = openAppIds.filter((id) => !state.windows[id].isMinimised);

  return (
    <div
      role="menubar"
      aria-label="JamesOS"
      className="fixed inset-x-0 top-0 z-50 flex items-stretch justify-between border-b border-[#9aa0ab] bg-[linear-gradient(180deg,#fdfdfe_0%,#eceef2_100%)] px-2 text-[#2b2f36] shadow-[0_1px_0_rgba(255,255,255,0.7),0_1px_4px_rgba(20,30,50,0.18)]"
      style={{ height: MENU_BAR_HEIGHT }}
    >
      <div className="flex items-stretch">
        <Menu label="JL" bold>
          <DropdownMenuItem onSelect={() => activateApp("about")}>
            About James
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => activateApp("contact")}>
            Contact James
          </DropdownMenuItem>
        </Menu>

        <Menu label="Portfolio">
          {APP_ORDER.filter((id) => id !== "welcome").map((id) => (
            <DropdownMenuItem key={id} onSelect={() => activateApp(id)}>
              {APPS[id].dockLabel}
            </DropdownMenuItem>
          ))}
        </Menu>

        <Menu label="View">
          <DropdownMenuItem
            onSelect={centreActive}
            disabled={frontmost === null}
          >
            Centre active window
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={minimiseAll}
            disabled={openWindows.length === 0}
          >
            Minimise all
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={resetDesktop}>
            Reset desktop
          </DropdownMenuItem>
        </Menu>

        <Menu label="Window">
          {openAppIds.length === 0 ? (
            <DropdownMenuItem disabled>No open windows</DropdownMenuItem>
          ) : (
            openAppIds.map((id) => (
              <DropdownMenuItem key={id} onSelect={() => activateApp(id)}>
                {APPS[id].title}
                {state.windows[id].isMinimised ? " (minimised)" : ""}
              </DropdownMenuItem>
            ))
          )}
        </Menu>

        <Menu label="Help">
          <DropdownMenuItem onSelect={() => activateApp("welcome")}>
            How this site works
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => activateApp("contact")}>
            Contact James
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              View source on GitHub
            </a>
          </DropdownMenuItem>
        </Menu>
      </div>

      <div className="flex items-center pr-1 text-[13px]">
        <Clock />
      </div>
    </div>
  );
}
