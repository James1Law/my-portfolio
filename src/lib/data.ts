import type {
  Experience,
  Project,
  Skill,
  ContactInfo,
  SiteMetadata,
} from "./types";

export const siteMetadata: SiteMetadata = {
  name: "James Law",
  title: "Head of Product",
  tagline: "11 years commanding ships. Now shipping product.",
  description:
    "Strategic Product Leader with 5+ years delivering complex SaaS platforms, following 11 years at sea as a Senior Deck Officer. Building AI-powered tools and shipping great product.",
};

export const contactInfo: ContactInfo = {
  email: "james@jamesslaw.co.uk",
  linkedin: "https://www.linkedin.com/in/james-law-4386b553/",
  location: "Sherborne, Dorset, UK",
  github: "https://github.com/James1Law",
};

export const experiences: Experience[] = [
  {
    id: "90poe-hop",
    company: "90POE",
    title: "Head of Product",
    startDate: "Nov 2025",
    description:
      "Leading strategy and delivery for the Crewing platform. Overseeing product vision, roadmap, and execution across compliance, HR, payroll, and workforce planning.",
    era: "product",
    metrics: [
      { label: "people across 2 teams", value: "18" },
      { label: "ARR target by end-2026", value: "$2M" },
    ],
  },
  {
    id: "90poe-pm",
    company: "90POE",
    title: "Product Manager",
    startDate: "Sep 2022",
    endDate: "Nov 2025",
    description:
      "Built the Chartering platform 0→1 — an end-to-end voyage management solution. Shaped it from concept to production across three major shipping companies.",
    era: "product",
    metrics: [
      { label: "product build", value: "0→1" },
      { label: "users", value: "150+" },
      { label: "ARR", value: "$100k" },
      { label: "vessels", value: "500+" },
    ],
    expandedDescription:
      "Delivered MVP in under 18 months. Won Zodiac Maritime (~150 ships), Golden Union (~35 ships), and Kyklades (~25 ships) through demos, targeted feature additions, and hands-on onboarding.",
  },
  {
    id: "thames-water",
    company: "Thames Water",
    title: "Product Owner",
    startDate: "Apr 2022",
    endDate: "Sep 2022",
    description:
      "Led the digital transformation of customer-facing services for a major UK water utility.",
    era: "product",
    metrics: [],
  },
  {
    id: "smartstream",
    company: "Smartstream Technologies",
    title: "Product Owner",
    startDate: "Apr 2021",
    endDate: "Apr 2022",
    description:
      "Introduced Agile across five development teams. Drove Scrum adoption, improving delivery predictability and stakeholder transparency.",
    era: "product",
    metrics: [{ label: "dev teams transformed", value: "5" }],
  },
  {
    id: "lr-oneocean",
    company: "LR OneOcean",
    title: "Product Manager",
    startDate: "Feb 2020",
    endDate: "Aug 2021",
    description:
      "Managed a portfolio of B2B/B2C maritime SaaS products. Led the ground-up rebuild of the flagship compliance platform and a major enterprise rollout.",
    era: "product",
    metrics: [
      { label: "ships (Carnival Corp)", value: "120+" },
      { label: "deal value", value: "£2M+" },
      { label: "users", value: "1,500+" },
    ],
  },
  {
    id: "msc",
    company: "MSC Cruises",
    title: "Maritime Support Officer",
    startDate: "Sep 2018",
    endDate: "Jan 2020",
    description:
      "Shore-based fleet operations for 17 cruise ships. First responder for the MSC Opera Venice incident — coordinated the full emergency response across multiple stakeholders.",
    era: "product",
    metrics: [{ label: "ships monitored", value: "17" }],
  },
  {
    id: "princess",
    company: "Princess Cruises",
    title: "Senior Officer of the Watch",
    startDate: "2007",
    endDate: "2018",
    description:
      "Progressed from Cadet to Senior 2nd Officer across 11 years. Responsible for the safety of 5,500 passengers on 330m vessels through extreme weather, emergencies, and complex navigation.",
    era: "sea",
    metrics: [
      { label: "passengers", value: "5,500" },
      { label: "vessel", value: "330m" },
      { label: "years", value: "11" },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "priori",
    name: "Priori",
    description:
      "A product prioritisation tool supporting RICE, MoSCoW, and Value vs Effort frameworks. Built to scratch my own itch — demonstrates deep understanding of prioritisation methodology.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "OpenAI API"],
    liveUrl: "https://priori.work",
    featured: true,
  },
  {
    id: "laytime-calculator",
    name: "Laytime Calculator",
    description:
      "Automates laytime calculation from event data and clauses using natural language prompts. Solves a real maritime commercial pain point.",
    techStack: ["TypeScript", "GPT API", "React"],
    featured: false,
  },
  {
    id: "voyage-estimator",
    name: "Voyage Estimator",
    description:
      "Generates TCE estimates from voyage inputs using LLMs, improving scenario analysis for commercial shipping decisions.",
    techStack: ["TypeScript", "GPT API", "Next.js"],
    featured: false,
  },
  {
    id: "user-story-generator",
    name: "User Story Generator",
    description:
      "AI assistant for generating user stories based on product goals and constraints. A product tool, built by a product person.",
    techStack: ["React", "GPT API", "TypeScript"],
    featured: false,
  },
  {
    id: "portfolio",
    name: "This Portfolio",
    description:
      "The site you're looking at. Built with Next.js, Tailwind CSS, Motion, and strict TDD.",
    techStack: ["Next.js", "Motion", "Tailwind CSS", "Vitest"],
    featured: false,
  },
];

export const skills: Skill[] = [
  // Product & Strategy
  { name: "0→1 Product Development", category: "product" },
  { name: "Product Roadmaps & Vision", category: "product" },
  { name: "Evidence-Based Prioritisation", category: "product" },
  { name: "Go-to-Market Planning", category: "product" },
  { name: "UX Research & Design Thinking", category: "product" },
  // Technical
  { name: "React & TypeScript", category: "technical" },
  { name: "AI & GPT APIs", category: "technical" },
  { name: "SQL & Data Analysis", category: "technical" },
  { name: "Figma & Prototyping", category: "technical" },
  { name: "GIS & Mapping Tech", category: "technical" },
  // Leadership
  { name: "Cross-Functional Teams", category: "leadership" },
  { name: "Stakeholder Management", category: "leadership" },
  { name: "Agile & Scrum", category: "leadership" },
  { name: "Crisis Management", category: "leadership" },
  { name: "Calm Under Pressure", category: "leadership" },
  // Domain
  { name: "Maritime & Shipping", category: "domain" },
  { name: "Compliance & Regulation", category: "domain" },
  { name: "Logistics & Supply Chain", category: "domain" },
  { name: "B2B & B2C SaaS", category: "domain" },
  { name: "Financial Services", category: "domain" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroSubtitles = [
  "Head of Product",
  "Product Leader",
  "Builder",
  "Former Senior Officer",
];

export const aboutStats = [
  { value: "11", label: "Years at sea", color: "blue" as const },
  { value: "5,500", label: "Lives responsible for", color: "green" as const },
  { value: "5+", label: "Years in product", color: "purple" as const },
  { value: "18", label: "People leading", color: "orange" as const },
];
