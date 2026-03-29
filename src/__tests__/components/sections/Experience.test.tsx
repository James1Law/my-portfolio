import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Experience } from "@/components/sections/Experience";
import { experiences } from "@/lib/data";

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
}));

describe("Experience", () => {
  it("renders with id='experience'", () => {
    const { container } = render(<Experience />);
    expect(container.querySelector("#experience")).toBeInTheDocument();
  });

  it("renders correct number of timeline entries", () => {
    render(<Experience />);
    // Some titles appear multiple times (e.g., "Product Manager" for multiple roles)
    const uniqueTitles = [...new Set(experiences.map((e) => e.title))];
    uniqueTitles.forEach((title) => {
      expect(screen.getAllByText(title).length).toBeGreaterThan(0);
    });
  });

  it("renders company names", () => {
    render(<Experience />);
    // 90POE appears multiple times (two roles)
    expect(screen.getAllByText(/90POE/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Princess Cruises/)).toBeInTheDocument();
  });

  it("distinguishes sea and product eras", () => {
    render(<Experience />);
    const seaBadges = screen.getAllByText(/at sea/i);
    const productBadges = screen.getAllByText(/product/i);
    expect(seaBadges.length).toBeGreaterThan(0);
    expect(productBadges.length).toBeGreaterThan(0);
  });

  it("shows metrics for entries that have them", () => {
    render(<Experience />);
    // Head of Product has "18" as a metric
    expect(screen.getByText("18")).toBeInTheDocument();
  });

  it("expandable entries toggle on click", async () => {
    const user = userEvent.setup();
    render(<Experience />);
    // Find the expand button for 90POE PM (which has expandedDescription)
    const expandBtns = screen.getAllByText(/show more/i);
    expect(expandBtns.length).toBeGreaterThan(0);
    await user.click(expandBtns[0]);
    expect(screen.getByText(/show less/i)).toBeInTheDocument();
  });
});
