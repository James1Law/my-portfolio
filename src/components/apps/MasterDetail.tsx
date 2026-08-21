"use client";

import { Fragment, useRef, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export interface DetailItem {
  id: string;
  label: string;
  sublabel?: string;
  detail: React.ReactNode;
}

export interface DetailGroup {
  label?: string;
  items: DetailItem[];
}

/**
 * Finder's sidebar-and-detail layout, the shape both Experience and Skills want.
 *
 * Built on Radix's tab primitives rather than hand-rolled buttons, so roving
 * focus and arrow-key navigation come from a tested implementation (PRD §30).
 * Aqua has no sidebar primitive, so the styling is ours, drawn from the same
 * --aqua-* tokens as everything else.
 *
 * Every panel is force-mounted and hidden when inactive, so the whole career
 * history is in the served HTML rather than appearing on click (PRD §33).
 *
 * The sidebar sits beside the detail when the *window* is wide enough, which is
 * a container query — window width is independent of the viewport.
 */
export function MasterDetail({
  groups,
  listLabel,
  className,
}: {
  groups: DetailGroup[];
  listLabel: string;
  className?: string;
}) {
  const items = groups.flatMap((group) => group.items);
  const panels = useRef(new Map<string, HTMLDivElement>());
  const [value, setValue] = useState(items[0]?.id);

  if (items.length === 0) return null;

  /**
   * When the sidebar sits above the detail rather than beside it, the detail can
   * be below the fold — so selecting something scrolls to it. Side by side the
   * panel is already in view and this is a no-op, which keeps one code path for
   * both layouts.
   */
  const select = (next: string) => {
    setValue(next);
    requestAnimationFrame(() =>
      panels.current.get(next)?.scrollIntoView?.({ block: "nearest" })
    );
  };

  return (
    // The container query has to sit on an ancestor: a `@container` element
    // styles its descendants, never itself — so every `@md:` class below is on a
    // child, not here.
    <div className={cn("@container h-full", className)}>
      <TabsPrimitive.Root
        value={value}
        onValueChange={select}
        orientation="vertical"
        className="flex min-h-full flex-col @md:h-full @md:flex-row"
      >
        <TabsPrimitive.List
          aria-label={listLabel}
          className="shrink-0 border-b border-[#b6bcc6] bg-[linear-gradient(180deg,#e2e7ef_0%,#d2d9e4_100%)] px-2 py-2.5 @md:w-[212px] @md:overflow-y-auto @md:border-b-0 @md:border-r"
        >
          {groups.map((group, index) => (
            <Fragment key={group.label ?? index}>
              {group.label ? (
                <p className="px-2 pb-1 pt-1.5 text-[10px] font-bold uppercase tracking-wider text-[#565c64]">
                  {group.label}
                </p>
              ) : null}
              {group.items.map((item) => (
                <TabsPrimitive.Trigger
                  key={item.id}
                  value={item.id}
                  className={cn(
                    "block w-full rounded-[5px] px-2 py-1.5 text-left outline-none transition-colors",
                    "hover:bg-white/55",
                    "focus-visible:ring-2 focus-visible:ring-[var(--aqua-ring)]",
                    // Finder's selected row: the Aqua gel, straight from the tokens.
                    "data-[state=active]:bg-[linear-gradient(180deg,var(--aqua-gel-light)_0%,var(--aqua-gel-deep)_100%)] data-[state=active]:text-white data-[state=active]:[text-shadow:0_-1px_1px_rgba(10,40,90,0.35)]",
                  )}
                >
                  <span className="block text-[12px] font-semibold leading-tight">
                    {item.label}
                  </span>
                  {/* The sublabel inherits the trigger's colour, so it stays
                      legible on the gel highlight without a second state rule. */}
                  {item.sublabel ? (
                    <span className="mt-px block text-[11px] leading-tight opacity-65">
                      {item.sublabel}
                    </span>
                  ) : null}
                </TabsPrimitive.Trigger>
              ))}
            </Fragment>
          ))}
        </TabsPrimitive.List>

        <div className="min-w-0 @md:min-h-0 @md:flex-1 @md:overflow-y-auto">
          {items.map((item) => (
            <TabsPrimitive.Content
              key={item.id}
              value={item.id}
              forceMount
              ref={(node) => {
                if (node) panels.current.set(item.id, node);
                else panels.current.delete(item.id);
              }}
              // Radix makes the active panel a tab stop, which is the tabs
              // pattern working as intended — so it needs a focus indicator.
              // The outline is inset, or it would be clipped by the scroll
              // container around it.
              className={cn(
                "px-6 py-5 data-[state=inactive]:hidden",
                "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--aqua-ring)]"
              )}
            >
              {item.detail}
            </TabsPrimitive.Content>
          ))}
        </div>
      </TabsPrimitive.Root>
    </div>
  );
}
