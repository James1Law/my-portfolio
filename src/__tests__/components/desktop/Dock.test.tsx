import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dock } from "@/components/desktop/Dock";
import { PortfolioWindow } from "@/components/desktop/PortfolioWindow";
import { APPS, APP_ORDER, DEFAULT_OPEN } from "@/lib/window-config";
import { renderInDesktop } from "./test-utils";

describe("Dock", () => {
  it("offers every portfolio application as a named button", async () => {
    renderInDesktop(<Dock />);
    for (const id of APP_ORDER) {
      expect(
        screen.getByRole("button", { name: new RegExp(APPS[id].dockLabel) })
      ).toBeInTheDocument();
    }
  });

  it("marks running applications as open, and closed ones not", () => {
    renderInDesktop(<Dock />);
    const running = APPS[DEFAULT_OPEN[0]].dockLabel;
    expect(
      screen.getByRole("button", { name: new RegExp(`${running}.*open`, "i") })
    ).toBeInTheDocument();

    const notRunning = APP_ORDER.find((id) => !DEFAULT_OPEN.includes(id))!;
    expect(
      screen.getByRole("button", { name: APPS[notRunning].dockLabel })
    ).toBeInTheDocument();
  });

  it("opens a closed application when clicked", async () => {
    const user = userEvent.setup();
    renderInDesktop(
      <>
        <Dock />
        <PortfolioWindow id="skills">Skills content</PortfolioWindow>
      </>
    );

    const skills = screen.getByRole("region", { name: "Skills" });
    expect(skills).toHaveAttribute("inert");

    await user.click(screen.getByRole("button", { name: "Skills" }));
    expect(screen.getByRole("region", { name: "Skills" })).not.toHaveAttribute(
      "inert"
    );
  });

  it("restores a minimised application", async () => {
    const user = userEvent.setup();
    renderInDesktop(
      <>
        <Dock />
        <PortfolioWindow id="welcome">Welcome content</PortfolioWindow>
      </>
    );

    await user.click(
      screen.getByRole("button", { name: "Minimise Welcome" })
    );
    expect(screen.getByRole("region", { name: "Welcome" })).toHaveAttribute(
      "inert"
    );

    await user.click(screen.getByRole("button", { name: /Home/ }));
    expect(screen.getByRole("region", { name: "Welcome" })).not.toHaveAttribute(
      "inert"
    );
  });

  it("activates an application from the keyboard", async () => {
    const user = userEvent.setup();
    renderInDesktop(
      <>
        <Dock />
        <PortfolioWindow id="projects">Projects content</PortfolioWindow>
      </>
    );

    const launcher = screen.getByRole("button", { name: "Projects" });
    launcher.focus();
    expect(launcher).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(
      screen.getByRole("region", { name: "Projects" })
    ).not.toHaveAttribute("inert");
  });
});
