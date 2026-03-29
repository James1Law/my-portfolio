import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Projects } from "@/components/sections/Projects";
import { projects } from "@/lib/data";

describe("Projects", () => {
  it("renders with id='projects'", () => {
    const { container } = render(<Projects />);
    expect(container.querySelector("#projects")).toBeInTheDocument();
  });

  it("renders correct number of projects", () => {
    render(<Projects />);
    projects.forEach((p) => {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    });
  });

  it("renders tech stack tags", () => {
    render(<Projects />);
    expect(screen.getAllByText("React").length).toBeGreaterThan(0);
    expect(screen.getAllByText("TypeScript").length).toBeGreaterThan(0);
  });

  it("renders live URL link for Priori", () => {
    render(<Projects />);
    const liveLinks = screen.getAllByLabelText(/live site/i);
    expect(liveLinks.length).toBeGreaterThan(0);
  });

  it("renders project descriptions", () => {
    render(<Projects />);
    expect(screen.getByText(/prioritisation tool/i)).toBeInTheDocument();
  });
});
