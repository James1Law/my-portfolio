import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/layout/Header";

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    setTheme: vi.fn(),
  }),
}));

describe("Header", () => {
  it("renders site name/logo", () => {
    const { container } = render(<Header />);
    const logo = container.querySelector("header > a");
    expect(logo).toBeInTheDocument();
    expect(logo?.textContent).toBe("JL");
    expect(logo).toHaveAttribute("href", "#hero");
  });

  it("renders all navigation links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /experience/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /projects/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /skills/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
  });

  it("navigation links have correct hrefs", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute(
      "href",
      "#about"
    );
    expect(screen.getByRole("link", { name: /experience/i })).toHaveAttribute(
      "href",
      "#experience"
    );
    expect(screen.getByRole("link", { name: /projects/i })).toHaveAttribute(
      "href",
      "#projects"
    );
    expect(screen.getByRole("link", { name: /skills/i })).toHaveAttribute(
      "href",
      "#skills"
    );
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute(
      "href",
      "#contact"
    );
  });

  it("renders theme toggle button", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /toggle theme/i })
    ).toBeInTheDocument();
  });

  it("renders mobile menu button", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /menu/i })
    ).toBeInTheDocument();
  });

  it("mobile menu toggles on click", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const menuBtn = screen.getByRole("button", { name: /menu/i });
    await user.click(menuBtn);
    // After opening, mobile nav should be visible
    const mobileNav = screen.getByTestId("mobile-nav");
    expect(mobileNav).toBeInTheDocument();
  });
});
