import { Badge } from "@/components/aqua/badge";
import { Button } from "@/components/aqua/button";
import { ProjectIcon } from "@/components/icons/ProjectIcons";
import { ProjectBrowser } from "./ProjectBrowser";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";

function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      <div className="flex items-start gap-3.5">
        <ProjectIcon id={project.id} />
        <div className="min-w-0">
          <h3 className="text-[17px] font-bold leading-tight tracking-[-0.01em] text-[#2b2f36]">
            {project.name}
          </h3>
          {project.featured ? (
            <Badge variant="secondary" className="mt-1.5">
              Featured
            </Badge>
          ) : null}
        </div>
      </div>

      <p className="mt-4 max-w-[58ch] text-[13px] leading-relaxed text-[#43484f]">
        {project.description}
      </p>

      <h4 className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#565c64]">
        Built with
      </h4>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <li key={tech}>
            <Badge variant="secondary" className="normal-case tracking-normal">
              {tech}
            </Badge>
          </li>
        ))}
      </ul>

      {project.liveUrl || project.githubUrl ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.liveUrl ? (
            <Button asChild size="sm" className="px-5 py-1.5 text-[12px]">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open {project.name}
              </a>
            </Button>
          ) : null}
          {project.githubUrl ? (
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="px-5 py-1.5 text-[12px]"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View source
              </a>
            </Button>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

/**
 * Replaces the Projects section: an icon view of the projects directory that
 * opens into a detail view.
 *
 * The detail shows what `data.ts` actually holds. PRD §17 also asks for Problem
 * / What it does / What James contributed, which is copy that doesn't exist yet
 * — inventing it would be fabricating portfolio claims, so those sections wait
 * for real content.
 */
export function ProjectsApp() {
  return (
    <ProjectBrowser
      items={projects.map((project) => ({
        id: project.id,
        name: project.name,
        icon: <ProjectIcon id={project.id} />,
        detail: <ProjectDetail project={project} />,
      }))}
    />
  );
}
