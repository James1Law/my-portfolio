/**
 * The application registry and workspace geometry for the desktop shell.
 *
 * This is the single source of truth for both TypeScript and CSS: `Desktop`
 * publishes the geometry as custom properties so stylesheets never re-declare
 * numbers that the clamping maths also depends on.
 */

export type AppId =
  | "welcome"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "contact";

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface AppConfig {
  id: AppId;
  /** Window title, and the noun used in control labels ("Close Experience"). */
  title: string;
  /** Shorter label for the Dock, where horizontal space is tight. */
  dockLabel: string;
  /** Deep-link fragment. Wired up in Phase 5. */
  hash: string;
  /** Preferred size on a roomy desktop; clamped to the workspace when smaller. */
  size: Size;
  /**
   * Opening offset from the workspace centre. Deliberate, so windows cascade
   * rather than stack — and never randomised (PRD §14).
   */
  offset: Point;
  /** Appears as a wallpaper shortcut. Kept to a handful (PRD §11). */
  onDesktop: boolean;
  /**
   * Appears in the mobile bottom navigation. Five fit comfortably at 320px with
   * readable labels; About is reached from Welcome instead (PRD §21).
   */
  inMobileNav: boolean;
}

/** Menu bar height. Fixed across breakpoints so the maths stays honest. */
export const MENU_BAR_HEIGHT = 30;
/** Space kept clear at the bottom for the Dock, including its shadow. */
export const DOCK_RESERVED_HEIGHT = 104;
/** Breathing room between the workspace and the viewport edges. */
export const WORKSPACE_PADDING = 12;
/** Aqua's titlebar height, from `WindowTitlebar`. */
export const TITLEBAR_HEIGHT = 34;
/**
 * How much of a window must stay inside the workspace horizontally. Guarantees
 * the titlebar is always grabbable, so a window can never be dragged out of
 * reach (PRD §13).
 */
export const MIN_TITLEBAR_VISIBLE = 96;

export const APP_ORDER: AppId[] = [
  "welcome",
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
];

export const APPS: Record<AppId, AppConfig> = {
  welcome: {
    id: "welcome",
    title: "Welcome",
    dockLabel: "Home",
    hash: "#welcome",
    size: { width: 700, height: 430 },
    offset: { x: 0, y: -40 },
    onDesktop: false,
    inMobileNav: true,
  },
  about: {
    id: "about",
    title: "About James",
    dockLabel: "About",
    hash: "#about",
    size: { width: 560, height: 470 },
    offset: { x: -190, y: 30 },
    onDesktop: true,
    inMobileNav: false,
  },
  experience: {
    id: "experience",
    title: "Experience",
    dockLabel: "Experience",
    hash: "#experience",
    size: { width: 840, height: 520 },
    offset: { x: 130, y: 10 },
    onDesktop: true,
    inMobileNav: true,
  },
  projects: {
    id: "projects",
    title: "Projects",
    dockLabel: "Projects",
    hash: "#projects",
    size: { width: 780, height: 500 },
    offset: { x: -40, y: 50 },
    onDesktop: true,
    inMobileNav: true,
  },
  skills: {
    id: "skills",
    title: "Skills",
    dockLabel: "Skills",
    hash: "#skills",
    size: { width: 700, height: 470 },
    offset: { x: 170, y: 60 },
    onDesktop: false,
    inMobileNav: true,
  },
  contact: {
    id: "contact",
    title: "Contact James",
    dockLabel: "Contact",
    hash: "#contact",
    size: { width: 540, height: 400 },
    offset: { x: 20, y: 0 },
    onDesktop: true,
    inMobileNav: true,
  },
};

/**
 * Windows open on first arrival — never an empty desktop (PRD §12).
 * Order matters: the last one opens frontmost.
 */
export const DEFAULT_OPEN: AppId[] = ["welcome"];

export const DESKTOP_ICONS: AppId[] = APP_ORDER.filter(
  (id) => APPS[id].onDesktop
);

export const MOBILE_NAV: AppId[] = APP_ORDER.filter(
  (id) => APPS[id].inMobileNav
);

/**
 * Welcome is the default state, so it is the bare URL rather than a fragment —
 * only the frontmost application needs representing (PRD §32).
 */
export const HOME_APP: AppId = "welcome";

/** Resolves a URL fragment to an app. `#welcome` is accepted but never written. */
export function appIdFromHash(hash: string): AppId | null {
  const normalised = hash.startsWith("#") ? hash : `#${hash}`;
  return APP_ORDER.find((id) => APPS[id].hash === normalised) ?? null;
}

export function hashForApp(id: AppId | null): string {
  return id && id !== HOME_APP ? APPS[id].hash : "";
}
