import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("renders with id='contact'", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });

  it("renders email link with mailto", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", { name: /email/i });
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:james@jamesslaw.co.uk"
    );
  });

  it("renders LinkedIn link", () => {
    render(<Contact />);
    const link = screen.getByRole("link", { name: /linkedin/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("linkedin.com"));
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders location text", () => {
    render(<Contact />);
    expect(screen.getByText(/dorset/i)).toBeInTheDocument();
  });

  it("renders heading", () => {
    render(<Contact />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
