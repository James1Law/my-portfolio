import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotFound from "@/app/not-found";
import { MenuBar } from "@/components/desktop/MenuBar";
import { renderInDesktop } from "./test-utils";

describe("not-found", () => {
  it("says plainly what happened, not a cryptic fake fault", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", { level: 1, name: /can't be found/i })
    ).toBeInTheDocument();
  });

  it("offers the way back to the desktop", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("link", { name: /back to the desktop/i })
    ).toHaveAttribute("href", "/");
  });

  it("renders no window controls, having no window manager to drive them", () => {
    render(<NotFound />);
    for (const verb of ["Close", "Minimise", "Maximise"]) {
      expect(screen.queryByRole("button", { name: new RegExp(verb) })).toBeNull();
    }
  });

  it("borrows no Apple application name for its title", () => {
    const { container } = render(<NotFound />);
    expect(container.textContent).not.toMatch(/Finder|Safari|Apple/i);
  });
});

describe("About this website", () => {
  it("opens from the Help menu", async () => {
    const user = userEvent.setup();
    renderInDesktop(<MenuBar />);

    expect(screen.queryByRole("dialog")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Help" }));
    await user.click(
      screen.getByRole("menuitem", { name: "About this website" })
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAccessibleName("JamesOS");
    expect(dialog).toHaveTextContent("Version 2.0");
  });

  it("credits the interface it borrows from, and disclaims Apple", async () => {
    const user = userEvent.setup();
    renderInDesktop(<MenuBar />);

    await user.click(screen.getByRole("button", { name: "Help" }));
    await user.click(
      screen.getByRole("menuitem", { name: "About this website" })
    );

    const credit = screen.getByRole("link", { name: /igorfelipeduca\/aqua/ });
    expect(credit).toHaveAttribute(
      "href",
      "https://github.com/igorfelipeduca/aqua"
    );
    expect(screen.getByRole("dialog")).toHaveTextContent(/Not affiliated with Apple/i);
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    renderInDesktop(<MenuBar />);

    await user.click(screen.getByRole("button", { name: "Help" }));
    await user.click(
      screen.getByRole("menuitem", { name: "About this website" })
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes on its OK button", async () => {
    const user = userEvent.setup();
    renderInDesktop(<MenuBar />);

    await user.click(screen.getByRole("button", { name: "Help" }));
    await user.click(
      screen.getByRole("menuitem", { name: "About this website" })
    );
    await user.click(screen.getByRole("button", { name: "OK" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
