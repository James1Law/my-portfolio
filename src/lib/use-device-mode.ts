"use client";

import { useEffect, useState } from "react";

export type DeviceMode = "mobile" | "tablet" | "desktop";

export interface DeviceProfile {
  mode: DeviceMode;
  /** True for a mouse or trackpad. Viewport width alone doesn't tell us (PRD §23). */
  pointerFine: boolean;
  viewport: { width: number; height: number };
  /** False until after mount, so server and client markup agree. */
  ready: boolean;
}

const TABLET_MIN = 768;
const DESKTOP_MIN = 1024;

function read(): Omit<DeviceProfile, "ready"> {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    mode: width >= DESKTOP_MIN ? "desktop" : width >= TABLET_MIN ? "tablet" : "mobile",
    pointerFine: window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    viewport: { width, height },
  };
}

/**
 * Behaviour-driven breakpoints: width decides the layout model, pointer type
 * decides whether hover and dragging are offered.
 */
export function useDeviceMode(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>({
    mode: "desktop",
    pointerFine: true,
    viewport: { width: 1280, height: 800 },
    ready: false,
  });

  useEffect(() => {
    const sync = () => setProfile({ ...read(), ready: true });
    sync();

    window.addEventListener("resize", sync);
    window.addEventListener("orientationchange", sync);
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    pointer.addEventListener("change", sync);

    return () => {
      window.removeEventListener("resize", sync);
      window.removeEventListener("orientationchange", sync);
      pointer.removeEventListener("change", sync);
    };
  }, []);

  return profile;
}
