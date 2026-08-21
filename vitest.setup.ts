import { beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";

// Mock IntersectionObserver for motion/react's useInView
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

global.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// jsdom has no matchMedia; the desktop shell uses it to pick a device model.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: query.includes("hover: hover") || query.includes("pointer: fine"),
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

// The window manager writes real history entries, which would otherwise leak
// from one test to the next and pre-open an application.
beforeEach(() => {
  window.history.replaceState(null, "", "/");
});
