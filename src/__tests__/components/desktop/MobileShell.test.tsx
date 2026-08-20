import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Desktop } from "@/components/desktop/Desktop";
import { APPS, APP_ORDER, MOBILE_NAV } from "@/lib/window-config";
import type { AppId } from "@/lib/window-config";

const apps = Object.fromEntries(
  APP_ORDER.map((id) => [id, <p key={id}>{APPS[id].title} body</p>])
) as Record<AppId, React.ReactNode>;

/** Puts the shell into its mobile model, the way a phone viewport would. */
function useMobileViewport() {
  const original = { width: window.innerWidth, height: window.innerHeight };

  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 375,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 780,
    });
    window.matchMedia = ((query: string) => ({
      // A phone: coarse pointer, no hover.
      matches: false,
      media: query,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: original.width,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: original.height,
    });
    vi.restoreAllMocks();
  });
}

/**
 * jsdom applies no Tailwind, so an inactive view's `hidden` class does nothing
 * here and every mounted view looks visible. `inert` is the attribute that marks
 * a view as off-screen, so tests scope to the one view that lacks it.
 */
function activeView() {
  const view = APP_ORDER.map((id) =>
    screen.getByRole("region", { name: APPS[id].title, hidden: true })
  ).find((el) => !el.hasAttribute("inert"));
  if (!view) throw new Error("no active view");
  return view;
}

describe("MobileShell", () => {
  useMobileViewport();

  it("does not render the desktop menu bar", () => {
    render(<Desktop apps={apps} />);
    expect(screen.queryByRole("menubar")).toBeNull();
  });

  it("shows Welcome as the home view on arrival", () => {
    render(<Desktop apps={apps} />);
    const welcome = screen.getByRole("region", { name: "Welcome" });
    expect(welcome).not.toHaveAttribute("inert");
  });

  it("offers the five navigation applications, with visible labels", () => {
    render(<Desktop apps={apps} />);
    const nav = screen.getByRole("navigation", { name: "Applications" });

    for (const id of MOBILE_NAV) {
      const item = within(nav).getByRole("button", {
        name: new RegExp(APPS[id].dockLabel),
      });
      // The label must be permanently rendered, not the desktop Dock's
      // hover-revealed one. jsdom can't compute opacity, so assert that no
      // element carrying the label text is the hover-only variant. (The
      // browser check in the verification script measures painted opacity.)
      expect(item).toHaveTextContent(APPS[id].dockLabel);
      const labelled = [...item.querySelectorAll("span")].filter(
        (span) => span.textContent?.trim() === APPS[id].dockLabel
      );
      expect(labelled.length).toBeGreaterThan(0);
      for (const span of labelled) {
        expect(span.className).not.toContain("opacity-0");
      }
    }
    expect(within(nav).getAllByRole("button")).toHaveLength(MOBILE_NAV.length);
  });

  it("keeps About out of the navigation but reachable from Welcome", async () => {
    const user = userEvent.setup();
    render(<Desktop apps={apps} />);

    const nav = screen.getByRole("navigation", { name: "Applications" });
    expect(within(nav).queryByRole("button", { name: /About/ })).toBeNull();

    // Welcome's own launcher covers it. (The real WelcomeApp provides this; here
    // the stub content stands in, so drive it through the nav-equivalent path.)
    await user.click(within(nav).getByRole("button", { name: /Experience/ }));
    expect(
      screen.getByRole("region", { name: "Experience" })
    ).not.toHaveAttribute("inert");
  });

  it("replaces the active view rather than stacking windows", async () => {
    const user = userEvent.setup();
    render(<Desktop apps={apps} />);
    const nav = screen.getByRole("navigation", { name: "Applications" });

    await user.click(within(nav).getByRole("button", { name: /Projects/ }));
    await user.click(within(nav).getByRole("button", { name: /Skills/ }));

    expect(screen.getByRole("region", { name: "Skills" })).not.toHaveAttribute(
      "inert"
    );
    // Only one view is active at a time.
    expect(activeView()).toHaveAccessibleName("Skills");
  });

  it("offers a back control that returns to Welcome, and none on Welcome itself", async () => {
    const user = userEvent.setup();
    render(<Desktop apps={apps} />);
    const nav = screen.getByRole("navigation", { name: "Applications" });

    // Welcome is home: no back control on it, and no decorative ones either.
    expect(activeView()).toHaveAccessibleName("Welcome");
    expect(
      within(activeView()).queryByRole("button", { name: /Back to/ })
    ).toBeNull();

    await user.click(within(nav).getByRole("button", { name: /Contact/ }));
    const back = within(activeView()).getByRole("button", {
      name: "Back to Welcome",
    });

    await user.click(back);
    expect(screen.getByRole("region", { name: "Welcome" })).not.toHaveAttribute(
      "inert"
    );
  });

  it("never renders minimise or maximise, which have no meaning here", async () => {
    const user = userEvent.setup();
    render(<Desktop apps={apps} />);
    const nav = screen.getByRole("navigation", { name: "Applications" });

    await user.click(within(nav).getByRole("button", { name: /Experience/ }));
    // Not anywhere in the shell, active or not — a control that does nothing is
    // worse than no control (PRD §22).
    expect(screen.queryByRole("button", { name: /Minimise/ })).toBeNull();
    expect(screen.queryByRole("button", { name: /Maximise/ })).toBeNull();
  });

  it("renders no draggable window chrome", () => {
    const { container } = render(<Desktop apps={apps} />);
    expect(container.querySelector(".touch-none")).toBeNull();
  });

  it("keeps every application's content in the document", () => {
    render(<Desktop apps={apps} />);
    for (const id of APP_ORDER) {
      expect(screen.getByText(`${APPS[id].title} body`)).toBeInTheDocument();
    }
  });
});
