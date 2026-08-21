/**
 * Window manager state. Deliberately small: this is a portfolio, not an
 * operating system (PRD §13). Everything here is pure so the behaviour can be
 * tested without rendering a desktop.
 */

import {
  APPS,
  APP_ORDER,
  DEFAULT_OPEN,
  HOME_APP,
  DOCK_RESERVED_HEIGHT,
  MENU_BAR_HEIGHT,
  MIN_TITLEBAR_VISIBLE,
  TITLEBAR_HEIGHT,
  WORKSPACE_PADDING,
  type AppId,
  type Point,
  type Size,
} from "./window-config";

/** The usable area, with the menu bar and Dock already excluded. */
export interface Workspace {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimised: boolean;
  isMaximised: boolean;
  zIndex: number;
  position: Point;
}

export interface DesktopState {
  windows: Record<AppId, WindowState>;
  nextZIndex: number;
}

export type WindowAction =
  | { type: "open"; id: AppId; workspace: Workspace }
  | { type: "activateSolo"; id: AppId; workspace: Workspace }
  | { type: "close"; id: AppId }
  | { type: "minimise"; id: AppId }
  | { type: "restore"; id: AppId }
  | { type: "focus"; id: AppId }
  | { type: "toggleMaximise"; id: AppId }
  | { type: "move"; id: AppId; position: Point; workspace: Workspace }
  | { type: "minimiseAll" }
  | { type: "centreActive"; workspace: Workspace }
  | { type: "reset"; workspace: Workspace }
  | { type: "reflow"; workspace: Workspace };

export function computeWorkspace(viewport: Size): Workspace {
  const top = MENU_BAR_HEIGHT + WORKSPACE_PADDING;
  return {
    left: WORKSPACE_PADDING,
    top,
    width: Math.max(240, viewport.width - WORKSPACE_PADDING * 2),
    height: Math.max(
      200,
      viewport.height - top - DOCK_RESERVED_HEIGHT
    ),
  };
}

function clamp(value: number, min: number, max: number): number {
  if (min > max) return min;
  return Math.min(Math.max(value, min), max);
}

/** Caps a window's preferred size to what the workspace can actually show. */
export function fitSize(size: Size, workspace: Workspace): Size {
  return {
    width: Math.min(size.width, workspace.width),
    height: Math.min(size.height, workspace.height),
  };
}

/**
 * Keeps a window usable wherever it is dragged.
 *
 * The left edge never leaves the workspace, because the close, minimise and
 * maximise controls live there — letting them slide off would leave a window you
 * can only drag, not close. The right edge may overhang, so long as
 * `MIN_TITLEBAR_VISIBLE` of the titlebar stays grabbable. Vertically the
 * titlebar stays clear of the menu bar and the Dock. So a window can never end
 * up somewhere it can't be brought back from, however the viewport changes.
 *
 * The bounds don't depend on the window's size: the left edge is pinned to the
 * workspace, and the right bound is where the left edge may travel to.
 */
export function clampToWorkspace(
  position: Point,
  workspace: Workspace
): Point {
  return {
    x: clamp(
      position.x,
      workspace.left,
      workspace.left + workspace.width - MIN_TITLEBAR_VISIBLE
    ),
    y: clamp(
      position.y,
      workspace.top,
      workspace.top + workspace.height - TITLEBAR_HEIGHT
    ),
  };
}

/**
 * Centred, then nudged by the app's configured offset.
 *
 * Dragging may leave a window hanging off the edge, but *opening* one there
 * would hide content the visitor never chose to hide, so an opening position is
 * pulled fully into the workspace (PRD §14).
 */
export function initialPosition(id: AppId, workspace: Workspace): Point {
  const { size, offset } = APPS[id];
  const fitted = fitSize(size, workspace);
  return {
    x: clamp(
      workspace.left + (workspace.width - fitted.width) / 2 + offset.x,
      workspace.left,
      workspace.left + workspace.width - fitted.width
    ),
    y: clamp(
      workspace.top + (workspace.height - fitted.height) / 2 + offset.y,
      workspace.top,
      workspace.top + workspace.height - fitted.height
    ),
  };
}

export function centredPosition(id: AppId, workspace: Workspace): Point {
  const fitted = fitSize(APPS[id].size, workspace);
  return {
    x: workspace.left + (workspace.width - fitted.width) / 2,
    y: workspace.top + (workspace.height - fitted.height) / 2,
  };
}

export function createInitialState(workspace: Workspace): DesktopState {
  const windows = {} as Record<AppId, WindowState>;

  for (const id of APP_ORDER) {
    windows[id] = {
      id,
      isOpen: DEFAULT_OPEN.includes(id),
      isMinimised: false,
      isMaximised: false,
      zIndex: 0,
      position: initialPosition(id, workspace),
    };
  }

  // Stack by opening order, not by APP_ORDER, so the last default window is the
  // one the visitor is looking at.
  let nextZIndex = 1;
  for (const id of DEFAULT_OPEN) {
    windows[id].zIndex = nextZIndex++;
  }

  return { windows, nextZIndex };
}

/** The window a click would land on: highest z-index among visible windows. */
export function frontmostApp(state: DesktopState): AppId | null {
  let front: WindowState | null = null;
  for (const id of APP_ORDER) {
    const w = state.windows[id];
    if (!w.isOpen || w.isMinimised) continue;
    if (!front || w.zIndex > front.zIndex) front = w;
  }
  return front?.id ?? null;
}

export function openApps(state: DesktopState): AppId[] {
  return APP_ORDER.filter((id) => state.windows[id].isOpen);
}

function update(
  state: DesktopState,
  id: AppId,
  patch: Partial<WindowState>
): DesktopState {
  return {
    ...state,
    windows: { ...state.windows, [id]: { ...state.windows[id], ...patch } },
  };
}

/** Raises a window to the front. No-op for a window that isn't visible. */
function raise(state: DesktopState, id: AppId): DesktopState {
  const target = state.windows[id];
  if (!target.isOpen || target.isMinimised) return state;
  if (target.zIndex === state.nextZIndex - 1) return state;
  return {
    ...update(state, id, { zIndex: state.nextZIndex }),
    nextZIndex: state.nextZIndex + 1,
  };
}

export function windowReducer(
  state: DesktopState,
  action: WindowAction
): DesktopState {
  switch (action.type) {
    case "open": {
      const target = state.windows[action.id];
      // Opening an app that is already running focuses or restores it rather
      // than resetting where the visitor put it.
      if (target.isOpen) {
        return raise(
          target.isMinimised
            ? update(state, action.id, { isMinimised: false })
            : state,
          action.id
        );
      }
      return raise(
        update(state, action.id, {
          isOpen: true,
          isMinimised: false,
          position: initialPosition(action.id, action.workspace),
        }),
        action.id
      );
    }

    case "activateSolo": {
      // The mobile model shows one application at a time: opening one replaces
      // whatever was on screen (PRD §22). Welcome stays open underneath as the
      // home view, so closing an app always lands somewhere.
      let next = windowReducer(state, {
        type: "open",
        id: action.id,
        workspace: action.workspace,
      });
      for (const id of openApps(next)) {
        if (id === action.id || id === HOME_APP) continue;
        next = windowReducer(next, { type: "close", id });
      }
      return next;
    }

    case "close":
      // The Dock shortcut stays available, so closing resets the window's own
      // state rather than remembering a maximised or minimised shape.
      return update(state, action.id, {
        isOpen: false,
        isMinimised: false,
        isMaximised: false,
        zIndex: 0,
      });

    case "minimise":
      if (!state.windows[action.id].isOpen) return state;
      return update(state, action.id, { isMinimised: true });

    case "restore":
      if (!state.windows[action.id].isOpen) return state;
      return raise(
        update(state, action.id, { isMinimised: false }),
        action.id
      );

    case "focus":
      return raise(state, action.id);

    case "toggleMaximise": {
      const target = state.windows[action.id];
      if (!target.isOpen) return state;
      return raise(
        update(state, action.id, { isMaximised: !target.isMaximised }),
        action.id
      );
    }

    case "move": {
      const target = state.windows[action.id];
      if (!target.isOpen || target.isMaximised) return state;
      return update(state, action.id, {
        position: clampToWorkspace(action.position, action.workspace),
      });
    }

    case "minimiseAll": {
      let next = state;
      for (const id of openApps(state)) {
        next = update(next, id, { isMinimised: true });
      }
      return next;
    }

    case "centreActive": {
      const front = frontmostApp(state);
      if (!front) return state;
      return update(state, front, {
        isMaximised: false,
        position: centredPosition(front, action.workspace),
      });
    }

    case "reset":
      return createInitialState(action.workspace);

    case "reflow": {
      // After a viewport change, pull every window back into the visible area.
      let next = state;
      for (const id of APP_ORDER) {
        const w = state.windows[id];
        const position = clampToWorkspace(w.position, action.workspace);
        if (position.x !== w.position.x || position.y !== w.position.y) {
          next = update(next, id, { position });
        }
      }
      return next;
    }
  }
}
