import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

describe("ScrollReveal", () => {
  it("renders children", () => {
    render(
      <ScrollReveal>
        <p>Hello</p>
      </ScrollReveal>
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("accepts and passes through className", () => {
    const { container } = render(
      <ScrollReveal className="test-class">
        <p>Content</p>
      </ScrollReveal>
    );
    expect(container.firstChild).toHaveClass("test-class");
  });

  it("keeps children in the DOM for SEO", () => {
    render(
      <ScrollReveal>
        <p>SEO content</p>
      </ScrollReveal>
    );
    expect(screen.getByText("SEO content")).toBeInTheDocument();
  });
});
