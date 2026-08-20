/**
 * Vendored from Aqua — https://github.com/igorfelipeduca/aqua (MIT)
 * Upstream: registry/aqua/ui/window.tsx @ d72926188b9b
 *
 * Aqua is a shadcn-style registry, so these files are application source.
 * The registry host is unreachable from CI, so components are copied from
 * the upstream repo rather than installed via `npx shadcn add @aqua/window`.
 * Local forks are marked with FORK comments; everything else is upstream.
 */
import * as React from "react"

import { cn } from "@/lib/utils"

function Window({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="window"
      className={cn(
        "overflow-hidden rounded-[10px] bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,rgba(0,0,0,0.03)_1px,rgba(0,0,0,0.03)_2px),linear-gradient(180deg,#d9dbde_0%,#c3c6ca_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_0_0_1px_rgba(40,45,55,0.35),0_18px_40px_rgba(30,40,60,0.3),0_4px_10px_rgba(30,40,60,0.2)]",
        className
      )}
      {...props}
    />
  )
}

function WindowTitlebar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="window-titlebar"
      className={cn("relative flex h-[34px] items-center px-3", className)}
      {...props}
    />
  )
}

function WindowTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="window-title"
      className={cn(
        "pointer-events-none absolute inset-x-0 text-center text-[13px] font-semibold text-[#43484f] [text-shadow:0_1px_0_rgba(255,255,255,0.6)]",
        className
      )}
      {...props}
    />
  )
}

const LIGHT_TINTS = {
  red: "border-[#c93a2b] bg-[radial-gradient(circle_at_50%_30%,#ff8a80,#ec4c3c_70%)]",
  yellow: "border-[#cf9325] bg-[radial-gradient(circle_at_50%_30%,#ffe082,#f5b731_70%)]",
  green: "border-[#43a12f] bg-[radial-gradient(circle_at_50%_30%,#b9f6a5,#56c93f_70%)]",
} as const

/** Upstream's gel styling for a single light, reused verbatim by the buttons below. */
const LIGHT_BASE =
  "relative size-[13px] rounded-full border shadow-[inset_0_1px_2px_rgba(0,0,0,0.25),0_1px_0_rgba(255,255,255,0.5)] after:absolute after:left-[3px] after:right-[3px] after:top-px after:h-[5px] after:rounded-full after:bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.15))] after:content-['']"

/**
 * FORK — upstream `TrafficLights` renders three non-interactive <span>s with no
 * props, which cannot carry handlers or accessible names. These are real buttons
 * with labels of the form "Close Experience" (PRD §13, §30). The gel styling
 * above is upstream's, untouched.
 *
 * A control is rendered only when it has a handler: mobile shows close alone
 * rather than inert decoration (PRD §22 — never render fake controls).
 */
function WindowControl({
  tint,
  label,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  tint: keyof typeof LIGHT_TINTS
  label: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        // The button *is* the target, rather than a 13px dot with an invisible
        // pseudo-element over it: a real box can be measured and tested. At 21px
        // with no gap between buttons, the dots still sit 8px apart, which is
        // upstream's spacing exactly. Touch gets a larger box.
        "inline-flex size-[21px] shrink-0 items-center justify-center rounded-full",
        "pointer-coarse:size-[30px]",
        "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#1c5fb8]",
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className={cn(LIGHT_BASE, LIGHT_TINTS[tint])} />
    </button>
  )
}

function WindowControls({
  title,
  onClose,
  onMinimise,
  onMaximise,
  closeLabel,
  controlClassName,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  title: string
  onClose?: () => void
  onMinimise?: () => void
  onMaximise?: () => void
  /** Overrides the close label where the control means something else, e.g. the
   * mobile shell's "Back to Welcome". */
  closeLabel?: string
  /** Sizing for the individual controls, so a lone control can be larger. */
  controlClassName?: string
}) {
  return (
    <div
      data-slot="window-controls"
      className={cn("z-10 flex", className)}
      {...props}
    >
      {onClose ? (
        <WindowControl
          tint="red"
          label={closeLabel ?? `Close ${title}`}
          onClick={onClose}
          className={controlClassName}
        />
      ) : null}
      {onMinimise ? (
        <WindowControl
          tint="yellow"
          label={`Minimise ${title}`}
          onClick={onMinimise}
          className={controlClassName}
        />
      ) : null}
      {onMaximise ? (
        <WindowControl
          tint="green"
          label={`Maximise ${title}`}
          onClick={onMaximise}
          className={controlClassName}
        />
      ) : null}
    </div>
  )
}

function WindowContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="window-content"
      className={cn("bg-[#f4f5f8] text-[13px] text-[#33383f]", className)}
      {...props}
    />
  )
}

export {
  Window,
  WindowTitlebar,
  WindowTitle,
  WindowContent,
  WindowControl,
  WindowControls,
}
