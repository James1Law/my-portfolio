import { describe, it, expect } from "vitest";
import {
  experiences,
  projects,
  skills,
  contactInfo,
  siteMetadata,
} from "@/lib/data";
import { isExperience, isProject, isSkill, isContactInfo } from "@/lib/types";

describe("Portfolio Data", () => {
  describe("experiences", () => {
    it("is non-empty", () => {
      expect(experiences.length).toBeGreaterThan(0);
    });

    it("each entry matches Experience type", () => {
      experiences.forEach((exp) => {
        expect(isExperience(exp)).toBe(true);
      });
    });

    it("has no duplicate IDs", () => {
      const ids = experiences.map((e) => e.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("includes current role at 90POE", () => {
      const current = experiences.find((e) => e.id === "90poe-hop");
      expect(current).toBeDefined();
      expect(current?.title).toBe("Head of Product");
    });

    it("includes sea career", () => {
      const sea = experiences.filter((e) => e.era === "sea");
      expect(sea.length).toBeGreaterThan(0);
    });
  });

  describe("projects", () => {
    it("is non-empty", () => {
      expect(projects.length).toBeGreaterThan(0);
    });

    it("each entry matches Project type", () => {
      projects.forEach((proj) => {
        expect(isProject(proj)).toBe(true);
      });
    });

    it("has no duplicate IDs", () => {
      const ids = projects.map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("includes Priori as featured", () => {
      const priori = projects.find((p) => p.id === "priori");
      expect(priori).toBeDefined();
      expect(priori?.featured).toBe(true);
    });

    it("each project has at least one tech stack item", () => {
      projects.forEach((p) => {
        expect(p.techStack.length).toBeGreaterThan(0);
      });
    });
  });

  describe("skills", () => {
    it("is non-empty", () => {
      expect(skills.length).toBeGreaterThan(0);
    });

    it("each entry matches Skill type", () => {
      skills.forEach((skill) => {
        expect(isSkill(skill)).toBe(true);
      });
    });

    it("covers all four categories", () => {
      const categories = new Set(skills.map((s) => s.category));
      expect(categories).toContain("product");
      expect(categories).toContain("technical");
      expect(categories).toContain("leadership");
      expect(categories).toContain("domain");
    });
  });

  describe("contactInfo", () => {
    it("matches ContactInfo type", () => {
      expect(isContactInfo(contactInfo)).toBe(true);
    });

    it("has valid email", () => {
      expect(contactInfo.email).toContain("@");
    });

    it("has LinkedIn URL", () => {
      expect(contactInfo.linkedin).toContain("linkedin.com");
    });
  });

  describe("siteMetadata", () => {
    it("has required fields", () => {
      expect(siteMetadata.name).toBeDefined();
      expect(siteMetadata.title).toBeDefined();
      expect(siteMetadata.description).toBeDefined();
      expect(siteMetadata.tagline).toBeDefined();
    });
  });
});
