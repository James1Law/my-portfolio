import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "@/components/sections/About";

describe("About", () => {
  it("renders with id='about'", () => {
    const { container } = render(<About />);
    expect(container.querySelector("#about")).toBeInTheDocument();
  });

  it("renders section heading", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders all four stat cards", () => {
    render(<About />);
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("5,500")).toBeInTheDocument();
    expect(screen.getByText("5+")).toBeInTheDocument();
    expect(screen.getByText("18")).toBeInTheDocument();
  });

  it("renders stat labels", () => {
    render(<About />);
    // Use getAllByText since "years at sea" also appears in the paragraph
    expect(screen.getAllByText(/years at sea/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/lives responsible for/i)).toBeInTheDocument();
    expect(screen.getAllByText(/years in product/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/people leading/i)).toBeInTheDocument();
  });
});
