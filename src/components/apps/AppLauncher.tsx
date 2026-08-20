"use client";

import { Button } from "@/components/aqua/button";
import { useWindowManager } from "@/components/desktop/WindowManager";
import type { AppId } from "@/lib/window-config";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "@/components/aqua/button";

/**
 * A small client island so server-rendered app content can still open windows.
 * Keeps the client boundary at the leaf rather than making a whole app
 * interactive (PRD §44).
 */
export function AppLauncher({
  target,
  children,
  variant,
  size = "sm",
}: {
  target: AppId;
  children: React.ReactNode;
} & VariantProps<typeof buttonVariants>) {
  const { activateApp } = useWindowManager();

  return (
    <Button variant={variant} size={size} onClick={() => activateApp(target)}>
      {children}
    </Button>
  );
}
