import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Desktop } from "@/components/desktop/Desktop";
import { APPS, APP_ORDER } from "@/lib/window-config";
import type { AppId } from "@/lib/window-config";

const apps = Object.fromEntries(
  APP_ORDER.map((id) => [id, <p key={id}>{APPS[id].title} body</p>])
) as Record<AppId, React.ReactNode>;

const isOpen = (id: AppId) =>
  !screen
    .getByRole("region", { name: APPS[id].title, hidden: true })
    .hasAttribute("inert");

describe("deep linking", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("opens the application named in the URL on arrival", async () => {
    window.history.replaceState(null, "", "/#experience");
    render(<Desktop apps={apps} />);

    await waitFor(() => expect(isOpen("experience")).toBe(true));
    // Welcome stays open behind it rather than being replaced.
    expect(isOpen("welcome")).toBe(true);
  });

  it("ignores a fragment that names nothing", async () => {
    window.history.replaceState(null, "", "/#nonsense");
    render(<Desktop apps={apps} />);

    await waitFor(() => expect(isOpen("welcome")).toBe(true));
    for (const id of APP_ORDER.filter((app) => app !== "welcome")) {
      expect(isOpen(id)).toBe(false);
    }
  });

  it("puts the frontmost application in the URL when one is launched", async () => {
    const user = userEvent.setup();
    render(<Desktop apps={apps} />);
    const dock = screen.getByRole("navigation", { name: "Applications" });

    await user.click(within(dock).getByRole("button", { name: /Projects/ }));
    await waitFor(() => expect(window.location.hash).toBe("#projects"));
  });

  it("leaves the URL bare for Welcome, which is the default state", async () => {
    const user = userEvent.setup();
    render(<Desktop apps={apps} />);
    const dock = screen.getByRole("navigation", { name: "Applications" });

    await user.click(within(dock).getByRole("button", { name: /Skills/ }));
    await waitFor(() => expect(window.location.hash).toBe("#skills"));

    await user.click(within(dock).getByRole("button", { name: /Home/ }));
    await waitFor(() => expect(window.location.hash).toBe(""));
  });

  it("responds to Back by returning to the previous application", async () => {
    const user = userEvent.setup();
    render(<Desktop apps={apps} />);
    const dock = screen.getByRole("navigation", { name: "Applications" });

    await user.click(within(dock).getByRole("button", { name: /Experience/ }));
    await waitFor(() => expect(window.location.hash).toBe("#experience"));
    await user.click(within(dock).getByRole("button", { name: /Contact/ }));
    await waitFor(() => expect(window.location.hash).toBe("#contact"));

    // jsdom implements history, but not the popstate event browsers fire, so
    // this drives the listener the way a Back button would.
    window.history.back();
    window.dispatchEvent(new PopStateEvent("popstate"));

    await waitFor(() => expect(isOpen("experience")).toBe(true));
  });

  it("does not record a history entry merely for focusing a window", async () => {
    const user = userEvent.setup();
    render(<Desktop apps={apps} />);
    const dock = screen.getByRole("navigation", { name: "Applications" });

    await user.click(within(dock).getByRole("button", { name: /Projects/ }));
    await waitFor(() => expect(window.location.hash).toBe("#projects"));
    const before = window.history.length;

    // Clicking the window behind changes which is frontmost, but that is not
    // navigation — the URL is rewritten in place.
    await user.click(screen.getByRole("region", { name: "Welcome" }));
    await waitFor(() => expect(window.location.hash).toBe(""));
    expect(window.history.length).toBe(before);
  });
});

describe("focus management", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("moves focus into a window when it opens", async () => {
    const user = userEvent.setup();
    render(<Desktop apps={apps} />);
    const dock = screen.getByRole("navigation", { name: "Applications" });

    await user.click(within(dock).getByRole("button", { name: /Skills/ }));
    await waitFor(() =>
      expect(screen.getByRole("region", { name: "Skills" })).toHaveFocus()
    );
  });

  it("hands focus back to the Dock item when a window closes", async () => {
    const user = userEvent.setup();
    render(<Desktop apps={apps} />);
    const dock = screen.getByRole("navigation", { name: "Applications" });
    const launcher = within(dock).getByRole("button", { name: /Contact/ });

    await user.click(launcher);
    await waitFor(() =>
      expect(screen.getByRole("region", { name: "Contact James" })).toHaveFocus()
    );

    await user.click(
      screen.getByRole("button", { name: "Close Contact James" })
    );
    await waitFor(() =>
      expect(
        within(dock).getByRole("button", { name: /Contact/ })
      ).toHaveFocus()
    );
  });

  it("does not steal focus on arrival", () => {
    render(<Desktop apps={apps} />);
    expect(document.body).toHaveFocus();
  });

  it("re-focuses on a second launch of the same application", async () => {
    const user = userEvent.setup();
    render(<Desktop apps={apps} />);
    const dock = screen.getByRole("navigation", { name: "Applications" });

    await user.click(within(dock).getByRole("button", { name: /Skills/ }));
    await waitFor(() =>
      expect(screen.getByRole("region", { name: "Skills" })).toHaveFocus()
    );

    // Move focus away, then launch the same app again.
    within(dock).getByRole("button", { name: /Home/ }).focus();
    await user.click(within(dock).getByRole("button", { name: /Skills/ }));
    await waitFor(() =>
      expect(screen.getByRole("region", { name: "Skills" })).toHaveFocus()
    );
  });
});
