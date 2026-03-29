import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/sections/Hero";

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
}));

describe("Hero", () => {
  it("renders with id='hero'", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("#hero")).toBeInTheDocument();
  });

  it("renders name as h1", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("James Law");
  });

  it("renders tagline", () => {
    render(<Hero />);
    expect(
      screen.getByText(/11 years commanding ships/i)
    ).toBeInTheDocument();
  });

  it("renders CTA link to experience", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /see my work/i });
    expect(cta).toHaveAttribute("href", "#experience");
  });

  it("renders contact CTA", () => {
    render(<Hero />);
    const cta = screen.getByRole("link", { name: /get in touch/i });
    expect(cta).toHaveAttribute("href", "#contact");
  });

  it("renders status badge", () => {
    render(<Hero />);
    expect(
      screen.getByText(/open to opportunities/i)
    ).toBeInTheDocument();
  });
});
