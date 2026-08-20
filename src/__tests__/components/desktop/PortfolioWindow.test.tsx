import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PortfolioWindow } from "@/components/desktop/PortfolioWindow";
import { renderInDesktop } from "./test-utils";

describe("PortfolioWindow", () => {
  it("labels its window controls by what they do, not by their colour", () => {
    renderInDesktop(<PortfolioWindow id="welcome">Content</PortfolioWindow>);

    expect(
      screen.getByRole("button", { name: "Close Welcome" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Minimise Welcome" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Maximise Welcome" })
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /red|yellow|green/i })).toBeNull();
  });

  it("exposes the window as a region named by its title", () => {
    renderInDesktop(<PortfolioWindow id="welcome">Content</PortfolioWindow>);
    expect(screen.getByRole("region", { name: "Welcome" })).toBeInTheDocument();
  });

  it("closes when the red control is used", async () => {
    const user = userEvent.setup();
    renderInDesktop(<PortfolioWindow id="welcome">Content</PortfolioWindow>);

    await user.click(screen.getByRole("button", { name: "Close Welcome" }));
    expect(screen.getByRole("region", { name: "Welcome" })).toHaveAttribute(
      "inert"
    );
  });

  it("minimises when the yellow control is used", async () => {
    const user = userEvent.setup();
    renderInDesktop(<PortfolioWindow id="welcome">Content</PortfolioWindow>);

    await user.click(screen.getByRole("button", { name: "Minimise Welcome" }));
    expect(screen.getByRole("region", { name: "Welcome" })).toHaveAttribute(
      "inert"
    );
  });

  it("toggles maximised size with the green control", async () => {
    const user = userEvent.setup();
    renderInDesktop(<PortfolioWindow id="welcome">Content</PortfolioWindow>);

    const region = screen.getByRole("region", { name: "Welcome" });
    const before = region.style.width;

    await user.click(screen.getByRole("button", { name: "Maximise Welcome" }));
    expect(region.style.width).not.toBe(before);

    await user.click(screen.getByRole("button", { name: "Maximise Welcome" }));
    expect(region.style.width).toBe(before);
  });

  it("keeps a closed window's content in the document for crawlers", async () => {
    const user = userEvent.setup();
    renderInDesktop(
      <PortfolioWindow id="welcome">Portfolio copy</PortfolioWindow>
    );

    await user.click(screen.getByRole("button", { name: "Close Welcome" }));
    // Present in the DOM, but out of the accessibility tree via `inert`.
    expect(
      screen.getByRole("region", { name: "Welcome" })
    ).toHaveTextContent("Portfolio copy");
  });

  it("raises a window above the others when clicked", async () => {
    const user = userEvent.setup();
    renderInDesktop(
      <>
        <PortfolioWindow id="welcome">Welcome</PortfolioWindow>
        <PortfolioWindow id="experience">Experience</PortfolioWindow>
      </>
    );

    const welcome = screen.getByRole("region", { name: "Welcome" });
    const experience = screen.getByRole("region", { name: "Experience" });

    // Welcome opens frontmost, so Experience starts behind it.
    expect(Number(welcome.style.zIndex)).toBeGreaterThan(
      Number(experience.style.zIndex)
    );

    await user.click(experience);
    expect(Number(experience.style.zIndex)).toBeGreaterThan(
      Number(welcome.style.zIndex)
    );
  });
});
