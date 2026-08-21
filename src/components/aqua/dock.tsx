/**
 * Vendored from Aqua — https://github.com/igorfelipeduca/aqua (MIT)
 * Upstream: registry/aqua/ui/dock.tsx @ d72926188b9b
 *
 * Aqua is a shadcn-style registry, so these files are application source.
 * The registry host is unreachable from CI, so components are copied from
 * the upstream repo rather than installed via `npx shadcn add @aqua/dock`.
 * Local forks are marked with FORK comments; everything else is upstream.
 */
import * as React from "react"

import { cn } from "@/lib/utils"

function Dock({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dock"
      className={cn(
        "flex w-fit items-end gap-[18px] rounded-[22px] border border-white/90 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(235,238,243,0.75)_100%)] px-[26px] pb-2.5 pt-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_0_1px_rgba(20,40,80,0.08),0_16px_38px_rgba(30,40,60,0.18)]",
        className
      )}
      {...props}
    />
  )
}

/**
 * FORK — upstream `DockItem` is a <div> whose label is revealed by hover opacity
 * only, so it has no accessible name and cannot be reached by keyboard. This is
 * a real button; the label stays in the DOM (opacity-0 text is still exposed to
 * assistive tech) and is revealed on hover *or* focus.
 *
 * Magnification is gated behind `pointer-fine` so touch devices don't inherit a
 * sticky hover transform (PRD §21). `motion-reduce` handling is upstream's.
 */
function DockItem({
  label,
  active = false,
  alwaysShowLabel = false,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  label: string
  active?: boolean
  /**
   * FORK — shows the label permanently beneath the icon instead of floating it
   * above on hover. Bottom navigation on a touch device has no hover to reveal
   * it, and a row of unlabelled icons is a guessing game (PRD §21).
   */
  alwaysShowLabel?: boolean
}) {
  return (
    <button
      type="button"
      data-slot="dock-item"
      data-active={active || undefined}
      className={cn(
        "group relative flex flex-col items-center gap-[5px] rounded-[14px] transition-transform duration-200 ease-out",
        "pointer-fine:hover:-translate-y-2.5 pointer-fine:hover:scale-[1.12]",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
        "motion-reduce:transition-none motion-reduce:hover:transform-none",
        className
      )}
      {...props}
    >
      {alwaysShowLabel ? null : (
        <span className="pointer-events-none absolute -top-[30px] whitespace-nowrap text-[13px] font-semibold text-white opacity-0 transition-opacity [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_0_5px_rgba(0,0,0,0.65),0_0_10px_rgba(0,0,0,0.45)] group-hover:opacity-100 group-focus-visible:opacity-100">
          {label}
        </span>
      )}
      {children}
      {alwaysShowLabel ? (
        <span className="pointer-events-none w-full truncate px-0.5 text-center text-[10px] font-semibold leading-tight text-[#33383f]">
          {label}
        </span>
      ) : null}
      {active ? <span className="sr-only"> (open)</span> : null}
      <span
        aria-hidden="true"
        className={cn(
          "size-[4px] rounded-full bg-[#5a6270]",
          active ? "opacity-100" : "opacity-0"
        )}
      />
    </button>
  )
}

function DockIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dock-icon"
      aria-hidden="true"
      className={cn(
        "relative flex size-[58px] items-center justify-center overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,#8ec2f9_0%,#4a90ec_55%,#2f7de0_100%)] text-[26px] font-bold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_3px_8px_rgba(20,30,50,0.25)] before:absolute before:inset-x-[8%] before:top-[4%] before:h-[45%] before:rounded-[12px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,255,255,0.1))] before:content-[''] [text-shadow:0_-1px_1px_rgba(0,0,0,0.3)]",
        className
      )}
      {...props}
    />
  )
}

export { Dock, DockItem, DockIcon }
