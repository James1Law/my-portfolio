/**
 * Vendored from Aqua — https://github.com/igorfelipeduca/aqua (MIT)
 * Upstream: registry/aqua/ui/dialog.tsx @ d72926188b9b
 *
 * Aqua is a shadcn-style registry, so these files are application source.
 * The registry host is unreachable from CI, so components are copied from
 * the upstream repo rather than installed via `npx shadcn add @aqua/dialog`.
 * Local forks are marked with FORK comments; everything else is upstream.
 *
 * FORK — upstream's tailwindcss-animate classes are replaced with the local
 * `.aqua-fade` and `.aqua-zoom` in globals.css, so we don't take on the
 * plugin dependency for two transitions.
 *
 * FORK — muted text darkened from #7a8089 to #565c64. Upstream's grey is
 * about 3.9:1 against these surfaces at 11-13px, below the 4.5:1 WCAG AA
 * floor this project targets (PRD §26, §30).
 */
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-[rgba(30,38,50,0.35)] aqua-fade",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 flex w-[min(480px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-xl bg-[linear-gradient(180deg,#fbfbfc_0%,#eceef2_100%)] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_0_0_1px_rgba(20,30,50,0.2),0_26px_60px_rgba(20,30,50,0.35),0_5px_14px_rgba(20,30,50,0.18)] outline-none aqua-zoom",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex justify-end gap-2.5 pt-1", className)}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-[15px] font-bold tracking-tight text-[#33383f]",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-[13px] leading-5 text-[#565c64]", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
