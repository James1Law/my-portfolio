import { describe, it, expect } from "vitest";
import {
  clampToWorkspace,
  computeWorkspace,
  createInitialState,
  centredPosition,
  fitSize,
  frontmostApp,
  initialPosition,
  openApps,
  windowReducer,
  type DesktopState,
  type Workspace,
} from "@/lib/window-state";
import {
  APPS,
  DEFAULT_OPEN,
  MENU_BAR_HEIGHT,
  MIN_TITLEBAR_VISIBLE,
  TITLEBAR_HEIGHT,
  WORKSPACE_PADDING,
  type AppId,
} from "@/lib/window-config";

const workspace = computeWorkspace({ width: 1440, height: 900 });

function open(state: DesktopState, id: AppId): DesktopState {
  return windowReducer(state, { type: "open", id, workspace });
}

describe("computeWorkspace", () => {
  it("excludes the menu bar and the Dock", () => {
    expect(workspace.top).toBe(MENU_BAR_HEIGHT + WORKSPACE_PADDING);
    expect(workspace.left).toBe(WORKSPACE_PADDING);
    expect(workspace.width).toBe(1440 - WORKSPACE_PADDING * 2);
    expect(workspace.height).toBeLessThan(900 - workspace.top);
  });

  it("never collapses to nothing on a tiny viewport", () => {
    const tiny = computeWorkspace({ width: 200, height: 180 });
    expect(tiny.width).toBeGreaterThan(0);
    expect(tiny.height).toBeGreaterThan(0);
  });
});

describe("fitSize", () => {
  it("caps a window to the workspace", () => {
    const small = computeWorkspace({ width: 500, height: 500 });
    const fitted = fitSize({ width: 840, height: 520 }, small);
    expect(fitted.width).toBe(small.width);
    expect(fitted.height).toBeLessThanOrEqual(small.height);
  });

  it("leaves a window that already fits alone", () => {
    expect(fitSize({ width: 400, height: 300 }, workspace)).toEqual({
      width: 400,
      height: 300,
    });
  });
});

describe("clampToWorkspace", () => {

  it("keeps the window controls on screen when dragged off the left", () => {
    const { x } = clampToWorkspace({ x: -5000, y: 200 }, workspace);
    // The close/minimise/maximise controls sit at the window's left edge, so
    // that edge has to stay inside the workspace.
    expect(x).toBe(workspace.left);
  });

  it("keeps the titlebar grabbable when dragged off the right", () => {
    const { x } = clampToWorkspace({ x: 5000, y: 200 }, workspace);
    expect(x).toBeLessThanOrEqual(
      workspace.left + workspace.width - MIN_TITLEBAR_VISIBLE
    );
  });

  it("never lets the titlebar slide under the menu bar", () => {
    const { y } = clampToWorkspace({ x: 100, y: -400 }, workspace);
    expect(y).toBeGreaterThanOrEqual(workspace.top);
    expect(y).toBeGreaterThanOrEqual(MENU_BAR_HEIGHT);
  });

  it("keeps the titlebar above the Dock", () => {
    const { y } = clampToWorkspace({ x: 100, y: 5000 }, workspace);
    expect(y + TITLEBAR_HEIGHT).toBeLessThanOrEqual(
      workspace.top + workspace.height
    );
  });

  it("leaves a position inside the workspace untouched", () => {
    const inside = { x: 300, y: 200 };
    expect(clampToWorkspace(inside, workspace)).toEqual(inside);
  });

  it("still returns a usable position on a viewport smaller than a window", () => {
    const tiny = computeWorkspace({ width: 320, height: 400 });
    const position = clampToWorkspace({ x: 0, y: 0 }, tiny);
    expect(Number.isFinite(position.x)).toBe(true);
    expect(Number.isFinite(position.y)).toBe(true);
    expect(position.y).toBeGreaterThanOrEqual(tiny.top);
  });
});

describe("initialPosition", () => {
  it("places windows inside the workspace", () => {
    for (const id of ["welcome", "about", "experience"] as const) {
      const position = initialPosition(id, workspace);
      expect(position.y).toBeGreaterThanOrEqual(workspace.top);
      expect(position.x).toBeLessThanOrEqual(
        workspace.left + workspace.width - MIN_TITLEBAR_VISIBLE
      );
    }
  });

  it("cascades rather than stacking windows on top of each other", () => {
    const about = initialPosition("about", workspace);
    const experience = initialPosition("experience", workspace);
    expect(about).not.toEqual(experience);
  });

  it("opens a window fully on screen rather than hanging off an edge", () => {
    // Experience carries a rightward offset, so a narrow desktop is the case
    // that would push it past the edge.
    const narrow = computeWorkspace({ width: 900, height: 1000 });
    const position = initialPosition("experience", narrow);
    const fitted = fitSize(APPS.experience.size, narrow);
    expect(position.x).toBeGreaterThanOrEqual(narrow.left);
    expect(position.x + fitted.width).toBeLessThanOrEqual(
      narrow.left + narrow.width
    );
    expect(position.y + fitted.height).toBeLessThanOrEqual(
      narrow.top + narrow.height
    );
  });

  it("is deterministic, never randomised", () => {
    expect(initialPosition("projects", workspace)).toEqual(
      initialPosition("projects", workspace)
    );
  });
});

describe("createInitialState", () => {
  it("opens the default windows and nothing else", () => {
    const state = createInitialState(workspace);
    expect(openApps(state).toSorted()).toEqual([...DEFAULT_OPEN].toSorted());
  });

  it("puts the last of the default windows in front", () => {
    const state = createInitialState(workspace);
    expect(frontmostApp(state)).toBe(DEFAULT_OPEN[DEFAULT_OPEN.length - 1]);
  });

  it("never starts on an empty desktop", () => {
    expect(openApps(createInitialState(workspace)).length).toBeGreaterThan(0);
  });
});

describe("windowReducer", () => {
  it("opens a window", () => {
    const state = open(createInitialState(workspace), "experience");
    expect(state.windows.experience.isOpen).toBe(true);
    expect(frontmostApp(state)).toBe("experience");
  });

  it("closes a window but leaves the app launchable", () => {
    let state = open(createInitialState(workspace), "about");
    state = windowReducer(state, { type: "close", id: "about" });
    expect(state.windows.about.isOpen).toBe(false);
    state = open(state, "about");
    expect(state.windows.about.isOpen).toBe(true);
  });

  it("minimises a window without closing it", () => {
    let state = open(createInitialState(workspace), "about");
    state = windowReducer(state, { type: "minimise", id: "about" });
    expect(state.windows.about.isOpen).toBe(true);
    expect(state.windows.about.isMinimised).toBe(true);
    expect(frontmostApp(state)).not.toBe("about");
  });

  it("restores a minimised window and brings it forward", () => {
    let state = open(createInitialState(workspace), "about");
    state = open(state, "experience");
    state = windowReducer(state, { type: "minimise", id: "about" });
    state = windowReducer(state, { type: "restore", id: "about" });
    expect(state.windows.about.isMinimised).toBe(false);
    expect(frontmostApp(state)).toBe("about");
  });

  it("treats opening a minimised app as a restore, keeping its position", () => {
    let state = open(createInitialState(workspace), "about");
    state = windowReducer(state, {
      type: "move",
      id: "about",
      position: { x: 200, y: 120 },
      workspace,
    });
    const moved = state.windows.about.position;
    state = windowReducer(state, { type: "minimise", id: "about" });
    state = open(state, "about");
    expect(state.windows.about.isMinimised).toBe(false);
    expect(state.windows.about.position).toEqual(moved);
  });

  it("changes z-order on focus", () => {
    let state = open(createInitialState(workspace), "about");
    state = open(state, "experience");
    expect(frontmostApp(state)).toBe("experience");
    state = windowReducer(state, { type: "focus", id: "about" });
    expect(frontmostApp(state)).toBe("about");
    expect(state.windows.about.zIndex).toBeGreaterThan(
      state.windows.experience.zIndex
    );
  });

  it("does not raise a window that is not visible", () => {
    const state = createInitialState(workspace);
    expect(
      windowReducer(state, { type: "focus", id: "skills" })
    ).toBe(state);
  });

  it("toggles the maximised state", () => {
    let state = open(createInitialState(workspace), "projects");
    state = windowReducer(state, { type: "toggleMaximise", id: "projects" });
    expect(state.windows.projects.isMaximised).toBe(true);
    state = windowReducer(state, { type: "toggleMaximise", id: "projects" });
    expect(state.windows.projects.isMaximised).toBe(false);
  });

  it("moves a window, clamped into the workspace", () => {
    let state = open(createInitialState(workspace), "about");
    state = windowReducer(state, {
      type: "move",
      id: "about",
      position: { x: -9999, y: -9999 },
      workspace,
    });
    expect(state.windows.about.position.y).toBe(workspace.top);
    expect(state.windows.about.position.x).toBeGreaterThan(-9999);
  });

  it("ignores a move on a maximised window", () => {
    let state = open(createInitialState(workspace), "about");
    state = windowReducer(state, { type: "toggleMaximise", id: "about" });
    const before = state.windows.about.position;
    state = windowReducer(state, {
      type: "move",
      id: "about",
      position: { x: 400, y: 300 },
      workspace,
    });
    expect(state.windows.about.position).toEqual(before);
  });

  it("minimises every open window at once", () => {
    let state = open(createInitialState(workspace), "about");
    state = open(state, "projects");
    state = windowReducer(state, { type: "minimiseAll" });
    expect(frontmostApp(state)).toBeNull();
    expect(openApps(state)).toContain("about");
  });

  it("centres the active window", () => {
    let state = open(createInitialState(workspace), "about");
    state = windowReducer(state, { type: "centreActive", workspace });
    expect(state.windows.about.position).toEqual(
      centredPosition("about", workspace)
    );
  });

  it("resets the desktop to its initial state", () => {
    let state = open(createInitialState(workspace), "experience");
    state = windowReducer(state, { type: "reset", workspace });
    expect(openApps(state).toSorted()).toEqual([...DEFAULT_OPEN].toSorted());
  });

  it("reflows windows back into view after the viewport shrinks", () => {
    let state = open(createInitialState(workspace), "experience");
    state = windowReducer(state, {
      type: "move",
      id: "experience",
      position: { x: 1200, y: 700 },
      workspace,
    });
    const shrunk: Workspace = computeWorkspace({ width: 700, height: 520 });
    state = windowReducer(state, { type: "reflow", workspace: shrunk });
    const { position } = state.windows.experience;
    expect(position.x).toBeLessThanOrEqual(
      shrunk.left + shrunk.width - MIN_TITLEBAR_VISIBLE
    );
    expect(position.y + TITLEBAR_HEIGHT).toBeLessThanOrEqual(
      shrunk.top + shrunk.height
    );
  });
});
