import { describe, it, expect } from "vitest";
import { existsSync, statSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { metadata, viewport } from "@/app/layout";

const appDir = resolve(__dirname, "../../app");

/**
 * The share card and icons are easy to forget and easy to regress — the old
 * favicon survived the whole redesign carrying the deleted dark palette. These
 * pin the pieces that no page renders.
 */
describe("icons", () => {
  it("ships a favicon drawn from the Aqua palette, not the retired dark one", () => {
    const svg = readFileSync(resolve(appDir, "icon.svg"), "utf8");
    // The gel plate's stops, the same ones the Dock icons use.
    expect(svg).toContain("#4a90ec");
    expect(svg).toContain("#2f7de0");
    // The dark-theme palette this replaced.
    expect(svg).not.toContain("#0a0a0a");
    expect(svg).not.toContain("#38bdf8");
  });

  it("ships an apple touch icon", () => {
    const file = resolve(appDir, "apple-icon.png");
    expect(existsSync(file)).toBe(true);
    expect(statSync(file).size).toBeGreaterThan(1000);
  });

  it("labels the iOS home screen without claiming standalone mode", () => {
    expect(metadata.appleWebApp).toMatchObject({ title: "James Law" });
    // `capable` would launch without browser chrome, which this site doesn't want.
    expect(
      (metadata.appleWebApp as { capable?: boolean }).capable
    ).toBeUndefined();
  });
});

describe("share card", () => {
  it("ships an Open Graph image", () => {
    const file = resolve(appDir, "opengraph-image.jpg");
    expect(existsSync(file)).toBe(true);
    const { size } = statSync(file);
    expect(size).toBeGreaterThan(10_000);
    // Comfortably inside what the platforms accept.
    expect(size).toBeLessThan(2_000_000);
  });

  it("describes the image for anyone who cannot see it", () => {
    const alt = readFileSync(
      resolve(appDir, "opengraph-image.alt.txt"),
      "utf8"
    ).trim();
    expect(alt.length).toBeGreaterThan(60);
    expect(alt).toMatch(/desktop/i);
  });

  it("asks for a large card, so the desktop is legible", () => {
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("sells the interaction in the share description", () => {
    const og = metadata.openGraph as { description?: string };
    expect(og.description).toMatch(/interactive desktop/i);
    expect(og.description).toContain("Now shipping product");
  });
});

describe("page metadata", () => {
  it("keeps the title plain for search results and browser tabs", () => {
    expect(metadata.title).toBe("James Law | Product Leader & Builder");
    expect(String(metadata.title)).not.toMatch(/JamesOS/);
  });

  it("keeps the canonical base and indexing intact", () => {
    expect(String(metadata.metadataBase)).toContain("jamesslaw.co.uk");
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });

  it("uses the wallpaper blue as the browser theme colour", () => {
    expect(viewport.themeColor).toBe("#0b4c9e");
  });
});
