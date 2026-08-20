"use client";

import { Fragment } from "react";
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
  if (items.length === 0) return null;

  return (
    // The container query has to sit on an ancestor: a `@container` element
    // styles its descendants, never itself — so every `@md:` class below is on a
    // child, not here.
    <div className={cn("@container h-full", className)}>
      <TabsPrimitive.Root
        defaultValue={items[0].id}
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
                <p className="px-2 pb-1 pt-1.5 text-[10px] font-bold uppercase tracking-wider text-[#6b7483]">
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
              className="px-6 py-5 outline-none data-[state=inactive]:hidden"
            >
              {item.detail}
            </TabsPrimitive.Content>
          ))}
        </div>
      </TabsPrimitive.Root>
    </div>
  );
}
