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
  },
  about: {
    id: "about",
    title: "About James",
    dockLabel: "About",
    hash: "#about",
    size: { width: 560, height: 470 },
    offset: { x: -190, y: 30 },
    onDesktop: true,
  },
  experience: {
    id: "experience",
    title: "Experience",
    dockLabel: "Experience",
    hash: "#experience",
    size: { width: 840, height: 520 },
    offset: { x: 130, y: 10 },
    onDesktop: true,
  },
  projects: {
    id: "projects",
    title: "Projects",
    dockLabel: "Projects",
    hash: "#projects",
    size: { width: 780, height: 500 },
    offset: { x: -40, y: 50 },
    onDesktop: true,
  },
  skills: {
    id: "skills",
    title: "Skills",
    dockLabel: "Skills",
    hash: "#skills",
    size: { width: 700, height: 470 },
    offset: { x: 170, y: 60 },
    onDesktop: false,
  },
  contact: {
    id: "contact",
    title: "Contact James",
    dockLabel: "Contact",
    hash: "#contact",
    size: { width: 540, height: 400 },
    offset: { x: 20, y: 0 },
    onDesktop: true,
  },
};

/**
 * Windows open on first arrival — never an empty desktop (PRD §12).
 *
 * REVIEW BUILD: Experience opens alongside Welcome so window focus, overlap and
 * dragging are visible without a click. PRD §12 wants Welcome alone, so Phase 3
 * drops back to `["welcome"]`.
 */
// Order matters: the last one opens frontmost.
export const DEFAULT_OPEN: AppId[] = ["experience", "welcome"];

export const DESKTOP_ICONS: AppId[] = APP_ORDER.filter(
  (id) => APPS[id].onDesktop
);
