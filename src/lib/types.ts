export interface Metric {
  label: string;
  value: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  description: string;
  era: "sea" | "product";
  metrics: Metric[];
  expandedDescription?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export type SkillCategory = "product" | "technical" | "leadership" | "domain";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  location: string;
  github?: string;
}

export interface SiteMetadata {
  name: string;
  title: string;
  tagline: string;
  description: string;
}

// Type guards

const VALID_ERAS = ["sea", "product"];
const VALID_CATEGORIES: SkillCategory[] = [
  "product",
  "technical",
  "leadership",
  "domain",
];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isExperience(value: unknown): value is Experience {
  if (!isObject(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.company === "string" &&
    typeof value.title === "string" &&
    typeof value.startDate === "string" &&
    typeof value.description === "string" &&
    VALID_ERAS.includes(value.era as string) &&
    Array.isArray(value.metrics)
  );
}

export function isProject(value: unknown): value is Project {
  if (!isObject(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.description === "string" &&
    Array.isArray(value.techStack) &&
    typeof value.featured === "boolean"
  );
}

export function isSkill(value: unknown): value is Skill {
  if (!isObject(value)) return false;
  return (
    typeof value.name === "string" &&
    VALID_CATEGORIES.includes(value.category as SkillCategory)
  );
}

export function isContactInfo(value: unknown): value is ContactInfo {
  if (!isObject(value)) return false;
  return (
    typeof value.email === "string" &&
    typeof value.linkedin === "string" &&
    typeof value.location === "string"
  );
}
