import { describe, it, expect } from "vitest";
import {
  isExperience,
  isProject,
  isSkill,
  isContactInfo,
  type Experience,
  type Project,
  type Skill,
  type ContactInfo,
} from "@/lib/types";

describe("Type Guards", () => {
  describe("isExperience", () => {
    it("returns true for valid experience", () => {
      const exp: Experience = {
        id: "90poe-hop",
        company: "90POE",
        title: "Head of Product",
        startDate: "Nov 2025",
        description: "Leading crewing platform",
        era: "product",
        metrics: [{ label: "people", value: "18" }],
      };
      expect(isExperience(exp)).toBe(true);
    });

    it("returns true for experience with optional endDate", () => {
      const exp: Experience = {
        id: "smartstream",
        company: "Smartstream",
        title: "Product Owner",
        startDate: "Apr 2021",
        endDate: "Apr 2022",
        description: "Agile transformation",
        era: "product",
        metrics: [],
      };
      expect(isExperience(exp)).toBe(true);
    });

    it("returns false for invalid experience (missing id)", () => {
      expect(isExperience({ company: "X", title: "Y" })).toBe(false);
    });

    it("returns false for non-object", () => {
      expect(isExperience("string")).toBe(false);
      expect(isExperience(null)).toBe(false);
    });
  });

  describe("isProject", () => {
    it("returns true for valid project", () => {
      const proj: Project = {
        id: "priori",
        name: "Priori",
        description: "Prioritisation tool",
        techStack: ["React", "TypeScript"],
        featured: true,
      };
      expect(isProject(proj)).toBe(true);
    });

    it("returns true for project with optional URLs", () => {
      const proj: Project = {
        id: "priori",
        name: "Priori",
        description: "Prioritisation tool",
        techStack: ["React"],
        liveUrl: "https://priori.work",
        githubUrl: "https://github.com/example",
        featured: false,
      };
      expect(isProject(proj)).toBe(true);
    });

    it("returns false for invalid project", () => {
      expect(isProject({ name: "X" })).toBe(false);
    });
  });

  describe("isSkill", () => {
    it("returns true for valid skill", () => {
      const skill: Skill = {
        name: "React",
        category: "technical",
      };
      expect(isSkill(skill)).toBe(true);
    });

    it("validates category values", () => {
      expect(isSkill({ name: "X", category: "product" })).toBe(true);
      expect(isSkill({ name: "X", category: "leadership" })).toBe(true);
      expect(isSkill({ name: "X", category: "domain" })).toBe(true);
      expect(isSkill({ name: "X", category: "invalid" })).toBe(false);
    });
  });

  describe("isContactInfo", () => {
    it("returns true for valid contact info", () => {
      const contact: ContactInfo = {
        email: "james@jamesslaw.co.uk",
        linkedin: "https://linkedin.com/in/james",
        location: "Dorset, UK",
      };
      expect(isContactInfo(contact)).toBe(true);
    });

    it("returns true with optional github", () => {
      const contact: ContactInfo = {
        email: "james@jamesslaw.co.uk",
        linkedin: "https://linkedin.com/in/james",
        location: "Dorset, UK",
        github: "https://github.com/james",
      };
      expect(isContactInfo(contact)).toBe(true);
    });

    it("returns false for missing fields", () => {
      expect(isContactInfo({ email: "x" })).toBe(false);
    });
  });
});
