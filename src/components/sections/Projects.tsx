import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-32">
      <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
        <span className="block h-px w-6 bg-accent" />
        Projects
      </div>

      <h2 className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl">
        Things I&apos;ve built
      </h2>

      <p className="mb-14 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
        AI-powered tools and side projects built to solve real problems — and to
        keep my hands dirty with code.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className={cn(
              "flex flex-col rounded-2xl border border-border bg-bg-card p-7 transition-all hover:-translate-y-1 hover:border-border-light hover:shadow-xl",
              project.featured && "md:col-span-2 border-accent/15 bg-gradient-to-br from-bg-card to-accent/[0.03]"
            )}
          >
            {/* Header */}
            <div className="mb-3 flex items-start justify-between">
              <div className="text-xl font-bold tracking-tight">
                {project.name}
              </div>
              <div className="flex gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    aria-label={`Live site for ${project.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-text-muted hover:text-text-primary"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    aria-label={`GitHub for ${project.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-text-muted hover:text-text-primary"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="mb-5 flex-1 text-sm leading-relaxed text-text-muted">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-white/[0.04] px-3 py-1 text-xs font-medium text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
