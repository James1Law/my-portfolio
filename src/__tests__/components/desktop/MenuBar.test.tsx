import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenuBar } from "@/components/desktop/MenuBar";
import { PortfolioWindow } from "@/components/desktop/PortfolioWindow";
import { renderInDesktop } from "./test-utils";

describe("MenuBar", () => {
  it("renders the personal identity rather than an Apple mark", () => {
    renderInDesktop(<MenuBar />);
    expect(screen.getByRole("button", { name: "JL" })).toBeInTheDocument();
  });

  it("opens a menu on click", async () => {
    const user = userEvent.setup();
    renderInDesktop(<MenuBar />);

    await user.click(screen.getByRole("button", { name: "Portfolio" }));
    expect(
      screen.getByRole("menuitem", { name: "Experience" })
    ).toBeInTheDocument();
  });

  it("launches the application a menu item names", async () => {
    const user = userEvent.setup();
    renderInDesktop(
      <>
        <MenuBar />
        <PortfolioWindow id="skills">Skills</PortfolioWindow>
      </>
    );

    expect(screen.getByRole("region", { name: "Skills" })).toHaveAttribute(
      "inert"
    );

    await user.click(screen.getByRole("button", { name: "Portfolio" }));
    await user.click(screen.getByRole("menuitem", { name: "Skills" }));

    expect(screen.getByRole("region", { name: "Skills" })).not.toHaveAttribute(
      "inert"
    );
  });

  it("is operable from the keyboard", async () => {
    const user = userEvent.setup();
    renderInDesktop(
      <>
        <MenuBar />
        <PortfolioWindow id="contact">Contact</PortfolioWindow>
      </>
    );

    screen.getByRole("button", { name: "JL" }).focus();
    await user.keyboard("{Enter}");
    // Arrow keys move through the menu; Enter activates the focused item.
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    expect(
      screen.getByRole("region", { name: "Contact James" })
    ).not.toHaveAttribute("inert");
  });

  it("closes an open menu on Escape", async () => {
    const user = userEvent.setup();
    renderInDesktop(<MenuBar />);

    await user.click(screen.getByRole("button", { name: "View" }));
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("lists open windows, and says so when there are none", async () => {
    const user = userEvent.setup();
    renderInDesktop(<MenuBar />);

    await user.click(screen.getByRole("button", { name: "Window" }));
    expect(
      screen.getByRole("menuitem", { name: /Welcome/ })
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("button", { name: "View" }));
    await user.click(screen.getByRole("menuitem", { name: "Minimise all" }));

    await user.click(screen.getByRole("button", { name: "Window" }));
    expect(
      screen.getByRole("menuitem", { name: /Welcome \(minimised\)/ })
    ).toBeInTheDocument();
  });

  it("links out to the source repository", async () => {
    const user = userEvent.setup();
    renderInDesktop(<MenuBar />);

    await user.click(screen.getByRole("button", { name: "Help" }));
    const link = screen.getByRole("menuitem", { name: "View source on GitHub" });
    expect(link).toHaveAttribute("href", "https://github.com/James1Law");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
