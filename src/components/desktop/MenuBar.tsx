"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/aqua/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/aqua/dialog";
import { Button } from "@/components/aqua/button";
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
/**
 * The one easter egg: a system-information panel, in the spirit of the era's
 * About box. It credits the interface it borrows from, and stays out of the way
 * of navigating the site (PRD §37).
 */
function AboutThisSite({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="items-center text-center">
          <div
            aria-hidden="true"
            className="relative mb-1 flex size-[56px] items-center justify-center overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,#8ec2f9_0%,#4a90ec_55%,#2f7de0_100%)] text-[22px] font-bold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_3px_8px_rgba(20,30,50,0.25)] before:absolute before:inset-x-[8%] before:top-[4%] before:h-[45%] before:rounded-[12px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,255,255,0.1))] before:content-[''] [text-shadow:0_-1px_1px_rgba(0,0,0,0.3)]"
          >
            JL
          </div>
          <DialogTitle className="text-[17px]">JamesOS</DialogTitle>
          <p className="text-[12px] text-[#6b7483]">Version 2.0</p>
        </DialogHeader>

        <div className="space-y-2 text-center text-[12px] leading-relaxed text-[#5b6169]">
          <p>
            A portfolio dressed as a desktop. Built with Next.js, React,
            TypeScript, Tailwind CSS and Motion.
          </p>
          <p>
            The interface takes after Aqua, the Mac OS X look of 2000–2007. Its
            components come from{" "}
            <a
              href="https://github.com/igorfelipeduca/aqua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1c5fb8] underline"
            >
              igorfelipeduca/aqua
            </a>{" "}
            (MIT). Not affiliated with Apple.
          </p>
        </div>

        <DialogFooter className="justify-center">
          <DialogClose asChild>
            <Button size="sm" className="px-6 py-1.5 text-[12px]">
              OK
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function MenuBar() {
  const [aboutSiteOpen, setAboutSiteOpen] = useState(false);
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
    // Not role="menubar": that role expects menuitem children, and these are
    // buttons that *open* menus (Radix gives them aria-haspopup). A banner
    // landmark is both correct and useful to navigate to.
    <header
      data-slot="menu-bar"
      aria-label="Menu bar"
      className="aqua-enter-menubar fixed inset-x-0 top-0 z-50 flex items-stretch justify-between border-b border-[#9aa0ab] bg-[linear-gradient(180deg,#fdfdfe_0%,#eceef2_100%)] px-2 text-[#2b2f36] shadow-[0_1px_0_rgba(255,255,255,0.7),0_1px_4px_rgba(20,30,50,0.18)]"
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
          <DropdownMenuItem onSelect={() => setAboutSiteOpen(true)}>
            About this website
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

      <AboutThisSite open={aboutSiteOpen} onOpenChange={setAboutSiteOpen} />
    </header>
  );
}
