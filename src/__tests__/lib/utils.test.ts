import { describe, it, expect } from "vitest";
import { cn, formatDateRange } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("resolves Tailwind conflicts", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
  });
});

describe("formatDateRange", () => {
  it("formats range with start and end", () => {
    expect(formatDateRange("Sep 2022", "Nov 2025")).toBe(
      "Sep 2022 — Nov 2025"
    );
  });

  it("formats range with start only as Present", () => {
    expect(formatDateRange("Nov 2025")).toBe("Nov 2025 — Present");
  });

  it("formats range with explicit undefined end", () => {
    expect(formatDateRange("Nov 2025", undefined)).toBe(
      "Nov 2025 — Present"
    );
  });
});
