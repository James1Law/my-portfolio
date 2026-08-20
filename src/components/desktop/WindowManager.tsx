"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import {
  computeWorkspace,
  createInitialState,
  frontmostApp,
  openApps,
  windowReducer,
  type DesktopState,
  type Workspace,
} from "@/lib/window-state";
import type { AppId, Point } from "@/lib/window-config";
import { useDeviceMode, type DeviceProfile } from "@/lib/use-device-mode";

interface WindowManagerValue {
  state: DesktopState;
  workspace: Workspace;
  device: DeviceProfile;
  frontmost: AppId | null;
  openAppIds: AppId[];
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimiseWindow: (id: AppId) => void;
  restoreWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  toggleMaximise: (id: AppId) => void;
  moveWindow: (id: AppId, position: Point) => void;
  minimiseAll: () => void;
  centreActive: () => void;
  resetDesktop: () => void;
  /** Dock and Desktop share this: launch, restore or focus as appropriate. */
  activateApp: (id: AppId) => void;
}

const WindowManagerContext = createContext<WindowManagerValue | null>(null);

export function useWindowManager(): WindowManagerValue {
  const value = useContext(WindowManagerContext);
  if (!value) {
    throw new Error("useWindowManager must be used inside a WindowManager");
  }
  return value;
}

export function WindowManager({ children }: { children: React.ReactNode }) {
  const device = useDeviceMode();
  const workspace = useMemo(
    () => computeWorkspace(device.viewport),
    [device.viewport]
  );
  const [state, dispatch] = useReducer(
    windowReducer,
    workspace,
    createInitialState
  );

  // The first render uses an assumed viewport so server and client agree. Once
  // the real one is known, re-derive the opening layout; later changes only pull
  // windows back into view so we don't move something the visitor placed.
  const initialised = useRef(false);
  useEffect(() => {
    if (!device.ready) return;
    if (!initialised.current) {
      initialised.current = true;
      dispatch({ type: "reset", workspace });
      return;
    }
    dispatch({ type: "reflow", workspace });
  }, [device.ready, workspace]);

  const value = useMemo<WindowManagerValue>(() => {
    const openWindow = (id: AppId) =>
      dispatch({ type: "open", id, workspace });

    return {
      state,
      workspace,
      device,
      frontmost: frontmostApp(state),
      openAppIds: openApps(state),
      openWindow,
      closeWindow: (id) => dispatch({ type: "close", id }),
      minimiseWindow: (id) => dispatch({ type: "minimise", id }),
      restoreWindow: (id) => dispatch({ type: "restore", id }),
      focusWindow: (id) => dispatch({ type: "focus", id }),
      toggleMaximise: (id) => dispatch({ type: "toggleMaximise", id }),
      moveWindow: (id, position) =>
        dispatch({ type: "move", id, position, workspace }),
      minimiseAll: () => dispatch({ type: "minimiseAll" }),
      centreActive: () => dispatch({ type: "centreActive", workspace }),
      resetDesktop: () => dispatch({ type: "reset", workspace }),
      // Every launcher shares this one entry point. `open` already restores a
      // minimised window and focuses a visible one; on mobile it also replaces
      // whatever was on screen, because that model shows one app at a time
      // (PRD §22). Callers don't need to know which model is active.
      activateApp: (id: AppId) =>
        dispatch(
          device.mode === "mobile"
            ? { type: "activateSolo", id, workspace }
            : { type: "open", id, workspace }
        ),
    };
  }, [state, workspace, device]);

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

/** Convenience for launchers that only need to know whether an app is running. */
export function useAppStatus(id: AppId) {
  const { state, frontmost } = useWindowManager();
  const window = state.windows[id];
  return {
    isOpen: window.isOpen,
    isMinimised: window.isMinimised,
    isFrontmost: frontmost === id,
  };
}
