import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AboutApp } from "@/components/apps/AboutApp";
import { ExperienceApp } from "@/components/apps/ExperienceApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { SkillsApp } from "@/components/apps/SkillsApp";
import { ContactApp } from "@/components/apps/ContactApp";
import { WelcomeApp } from "@/components/apps/WelcomeApp";
import { WindowManager } from "@/components/desktop/WindowManager";
import {
  aboutStats,
  contactInfo,
  experiences,
  projects,
  siteMetadata,
  skills,
} from "@/lib/data";

/**
 * These are the guard against the redesign quietly losing or altering career
 * facts (PRD §35). They assert against `data.ts` rather than hardcoded strings,
 * so editing the data updates the expectation with it.
 */

describe("WelcomeApp", () => {
  it("carries the page's h1 and the headline positioning", () => {
    render(
      <WindowManager>
        <WelcomeApp />
      </WindowManager>
    );
    expect(
      screen.getByRole("heading", { level: 1, name: siteMetadata.name })
    ).toBeInTheDocument();
    expect(screen.getByText(siteMetadata.tagline)).toBeInTheDocument();
  });

  it("offers a route into every other application", () => {
    render(
      <WindowManager>
        <WelcomeApp />
      </WindowManager>
    );
    for (const label of [
      "Explore my experience",
      "About James",
      "View projects",
      "Get in touch",
    ]) {
      expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    }
  });
});

describe("AboutApp", () => {
  it("shows every headline metric at its real value", () => {
    render(<AboutApp />);
    for (const stat of aboutStats) {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    }
  });

  it("renders metrics as text, not as counters starting at zero", () => {
    render(<AboutApp />);
    // "11" years at sea must be in the markup immediately.
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.queryByText("0")).toBeNull();
  });
});

describe("ExperienceApp", () => {
  it("lists every role from the data", () => {
    render(<ExperienceApp />);
    const sidebar = screen.getByRole("tablist", { name: "Career" });
    for (const role of experiences) {
      expect(
        within(sidebar).getAllByText(role.company).length
      ).toBeGreaterThan(0);
    }
  });

  it("groups roles by discipline, with MSC Cruises under Maritime", () => {
    render(<ExperienceApp />);
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Maritime")).toBeInTheDocument();

    const msc = experiences.find((role) => role.company === "MSC Cruises");
    expect(msc?.group).toBe("maritime");
  });

  it("keeps every role's detail in the document, not just the selected one", () => {
    render(<ExperienceApp />);
    for (const role of experiences) {
      expect(screen.getByText(role.description)).toBeInTheDocument();
    }
  });

  it("shows a role's detail when it is selected", async () => {
    const user = userEvent.setup();
    render(<ExperienceApp />);

    const princess = experiences.find(
      (role) => role.company === "Princess Cruises"
    )!;
    const sidebar = screen.getByRole("tablist", { name: "Career" });
    await user.click(
      within(sidebar).getByRole("tab", { name: /Princess Cruises/ })
    );

    expect(screen.getByText(princess.description)).toBeVisible();
  });

  it("renders each role's metrics", () => {
    render(<ExperienceApp />);
    const current = experiences.find((role) => role.id === "90poe-hop")!;
    for (const metric of current.metrics) {
      expect(screen.getByText(metric.value)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(metric.label))).toBeInTheDocument();
    }
  });

  it("is navigable by keyboard", async () => {
    const user = userEvent.setup();
    render(<ExperienceApp />);
    const sidebar = screen.getByRole("tablist", { name: "Career" });
    const tabs = within(sidebar).getAllByRole("tab");

    tabs[0].focus();
    await user.keyboard("{ArrowDown}");
    expect(tabs[1]).toHaveFocus();
  });
});

describe("ProjectsApp", () => {
  it("shows every project in the icon view", () => {
    render(<ProjectsApp />);
    for (const project of projects) {
      expect(
        screen.getByRole("button", { name: project.name })
      ).toBeInTheDocument();
    }
  });

  it("opens a project's detail, then returns to the grid", async () => {
    const user = userEvent.setup();
    render(<ProjectsApp />);

    const priori = projects.find((p) => p.id === "priori")!;
    await user.click(screen.getByRole("button", { name: priori.name }));

    // Scoped to the open panel: tech names recur across projects, and every
    // project's detail stays in the document.
    const detail = screen.getByRole("group", { name: priori.name });
    expect(within(detail).getByText(priori.description)).toBeVisible();
    for (const tech of priori.techStack) {
      expect(within(detail).getByText(tech)).toBeVisible();
    }
    expect(
      within(detail).getByRole("link", { name: `Open ${priori.name}` })
    ).toHaveAttribute("href", priori.liveUrl);

    await user.click(screen.getByRole("button", { name: /All projects/ }));
    expect(screen.getByRole("button", { name: priori.name })).toBeVisible();
  });

  it("keeps every project's description in the document", () => {
    render(<ProjectsApp />);
    for (const project of projects) {
      expect(screen.getByText(project.description)).toBeInTheDocument();
    }
  });
});

describe("SkillsApp", () => {
  it("offers all four categories", () => {
    render(<SkillsApp />);
    const sidebar = screen.getByRole("tablist", { name: "Skill categories" });
    for (const label of [
      "Product & Strategy",
      "Technical",
      "Leadership",
      "Domain",
    ]) {
      expect(
        within(sidebar).getByRole("tab", { name: label })
      ).toBeInTheDocument();
    }
  });

  it("keeps every skill in the document", () => {
    render(<SkillsApp />);
    for (const skill of skills) {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    }
  });

  it("shows no percentage bars", () => {
    const { container } = render(<SkillsApp />);
    expect(container.querySelector('[role="progressbar"]')).toBeNull();
    expect(container.textContent).not.toMatch(/\d{1,3}%/);
  });
});

describe("ContactApp", () => {
  it("makes email the primary action and links out correctly", () => {
    render(<ContactApp />);
    expect(screen.getByRole("link", { name: "Email James" })).toHaveAttribute(
      "href",
      `mailto:${contactInfo.email}`
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      contactInfo.linkedin
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      contactInfo.github
    );
  });

  it("opens external links safely", () => {
    render(<ContactApp />);
    for (const name of ["LinkedIn", "GitHub"]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute(
        "rel",
        expect.stringContaining("noopener")
      );
    }
  });

  it("does not introduce a contact form", () => {
    const { container } = render(<ContactApp />);
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input")).toBeNull();
  });
});
