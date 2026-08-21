"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
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
import {
  appIdFromHash,
  hashForApp,
  HOME_APP,
  type AppId,
  type Point,
} from "@/lib/window-config";
import { useDeviceMode, type DeviceProfile } from "@/lib/use-device-mode";

/**
 * A request to move focus, so opening a window puts the keyboard there and
 * closing one hands focus back to the Dock item that launched it (PRD §31).
 * The token makes repeat requests for the same target distinguishable.
 */
export interface FocusRequest {
  target: "window" | "dock";
  id: AppId;
  token: number;
}

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
  focusRequest: FocusRequest | null;
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

  const [focusRequest, setFocusRequest] = useState<FocusRequest | null>(null);
  const focusToken = useRef(0);
  const requestFocus = useCallback((target: "window" | "dock", id: AppId) => {
    focusToken.current += 1;
    setFocusRequest({ target, id, token: focusToken.current });
  }, []);

  const frontmost = frontmostApp(state);

  /**
   * "Show this application", expressed for whichever model is running. Mobile
   * shows one app at a time, so it replaces rather than stacks (PRD §22); the
   * desktop opens or focuses. Deep links and Back go through here too, so a
   * shared link lands in the same state a tap would produce.
   */
  const showApp = useCallback(
    (id: AppId, ws: Workspace) =>
      dispatch(
        device.mode === "mobile"
          ? { type: "activateSolo", id, workspace: ws }
          : { type: "open", id, workspace: ws }
      ),
    [device.mode]
  );

  /**
   * How the next frontmost change should be recorded in history. Launching an
   * app is navigation and earns an entry; merely focusing, closing or minimising
   * a window rewrites the current one, so Back doesn't have to step through
   * every click. "silent" covers changes we caused *from* the URL.
   */
  const historyMode = useRef<"push" | "replace" | "silent">("silent");

  /**
   * The first render uses an assumed viewport so server and client agree. Once
   * the real one is known, re-derive the opening layout and then honour the URL,
   * so a shared link lands on its application. These have to happen together:
   * re-deriving the layout on its own would discard whatever the URL opened.
   *
   * Later viewport changes only pull windows back into view, so we never move
   * something the visitor placed.
   */
  const initialised = useRef(false);
  useEffect(() => {
    if (!device.ready) return;

    if (initialised.current) {
      dispatch({ type: "reflow", workspace });
      return;
    }

    initialised.current = true;
    historyMode.current = "silent";
    dispatch({ type: "reset", workspace });

    const requested = appIdFromHash(window.location.hash);
    if (requested) {
      showApp(requested, workspace);
      requestFocus("window", requested);
    }
  }, [device.ready, workspace, requestFocus, showApp]);

  // Back and forward move between applications.
  useEffect(() => {
    const onPopState = () => {
      const id = appIdFromHash(window.location.hash) ?? HOME_APP;
      historyMode.current = "silent";
      showApp(id, workspace);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [workspace, showApp]);

  // Reflect the frontmost application in the URL.
  useEffect(() => {
    const mode = historyMode.current;
    historyMode.current = "replace";
    if (mode === "silent") return;

    const target = hashForApp(frontmost);
    if (window.location.hash === target) return;
    // An empty fragment has to be written as the bare path, or the "#" lingers.
    const url = target || `${window.location.pathname}${window.location.search}`;
    if (mode === "push") window.history.pushState(null, "", url);
    else window.history.replaceState(null, "", url);
  }, [frontmost]);

  const value = useMemo<WindowManagerValue>(() => {
    const openWindow = (id: AppId) => {
      historyMode.current = "push";
      dispatch({ type: "open", id, workspace });
      requestFocus("window", id);
    };

    return {
      state,
      workspace,
      device,
      frontmost,
      openAppIds: openApps(state),
      focusRequest,
      openWindow,
      closeWindow: (id) => {
        dispatch({ type: "close", id });
        // Focus would otherwise fall to the document; hand it to the launcher.
        requestFocus("dock", id);
      },
      minimiseWindow: (id) => dispatch({ type: "minimise", id }),
      restoreWindow: (id) => dispatch({ type: "restore", id }),
      focusWindow: (id) => dispatch({ type: "focus", id }),
      toggleMaximise: (id) => dispatch({ type: "toggleMaximise", id }),
      moveWindow: (id, position) =>
        dispatch({ type: "move", id, position, workspace }),
      minimiseAll: () => dispatch({ type: "minimiseAll" }),
      centreActive: () => dispatch({ type: "centreActive", workspace }),
      resetDesktop: () => dispatch({ type: "reset", workspace }),
      // Every launcher shares this one entry point, and none of them needs to
      // know which model is active.
      activateApp: (id: AppId) => {
        historyMode.current = "push";
        showApp(id, workspace);
        requestFocus("window", id);
      },
    };
  }, [
    state,
    workspace,
    device,
    frontmost,
    focusRequest,
    requestFocus,
    showApp,
  ]);

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
