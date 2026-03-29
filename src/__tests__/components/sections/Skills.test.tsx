import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skills } from "@/components/sections/Skills";

describe("Skills", () => {
  it("renders with id='skills'", () => {
    const { container } = render(<Skills />);
    expect(container.querySelector("#skills")).toBeInTheDocument();
  });

  it("renders all four category headings", () => {
    render(<Skills />);
    expect(screen.getByText(/product & strategy/i)).toBeInTheDocument();
    expect(screen.getByText(/technical/i)).toBeInTheDocument();
    expect(screen.getByText(/leadership/i)).toBeInTheDocument();
    expect(screen.getByText(/domain/i)).toBeInTheDocument();
  });

  it("renders skills within categories", () => {
    render(<Skills />);
    expect(screen.getByText(/0→1 product development/i)).toBeInTheDocument();
    expect(screen.getByText(/react & typescript/i)).toBeInTheDocument();
    expect(screen.getByText(/cross-functional teams/i)).toBeInTheDocument();
    expect(screen.getByText(/maritime & shipping/i)).toBeInTheDocument();
  });
});
