"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { experiences } from "@/lib/data";
import { formatDateRange } from "@/lib/utils";

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-32">
      <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
        <span className="block h-px w-6 bg-accent" />
        Experience
      </div>

      <h2 className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl">
        Career timeline
      </h2>

      <p className="mb-14 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
        From navigating 330m cruise ships through Baltic storms to navigating
        product strategy at scale.
      </p>

      <div className="relative pl-10">
        {/* Timeline line */}
        <div
          className="absolute left-[7px] top-0 bottom-0 w-0.5 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, var(--accent), var(--accent-purple), var(--accent-green))",
          }}
        />

        {experiences.map((exp, i) => {
          const isExpanded = expandedId === exp.id;
          const isCurrent = !exp.endDate;
          const isSea = exp.era === "sea";

          return (
            <div key={exp.id} className={`relative mb-12 ${i === experiences.length - 1 ? "mb-0" : ""}`}>
              {/* Dot */}
              <div
                className={`absolute -left-10 top-1.5 h-4 w-4 rounded-full border-[3px] ${
                  isCurrent
                    ? "border-accent bg-accent shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    : isSea
                    ? "border-accent-green bg-bg-primary"
                    : "border-accent bg-bg-primary"
                }`}
              />

              <div className="rounded-2xl border border-border bg-bg-card p-6 transition-all hover:border-border-light hover:shadow-md md:p-7">
                {/* Era badge */}
                <span
                  className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                    isSea
                      ? "bg-accent-green/10 text-accent-green"
                      : "bg-accent-dim text-accent"
                  }`}
                >
                  {isSea ? "At Sea" : "Product"}
                </span>

                <div className="mb-1 text-sm font-medium text-text-muted">
                  {formatDateRange(exp.startDate, exp.endDate)}
                </div>

                <div className="mb-0.5 text-xl font-bold tracking-tight">
                  {exp.title}
                </div>

                <div className="mb-3 text-sm text-text-secondary">
                  {exp.company}
                </div>

                <p className="mb-4 text-sm leading-relaxed text-text-muted">
                  {exp.description}
                </p>

                {/* Expanded content */}
                {isExpanded && exp.expandedDescription && (
                  <p className="mb-4 text-sm leading-relaxed text-text-muted">
                    {exp.expandedDescription}
                  </p>
                )}

                {/* Metrics */}
                {exp.metrics.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {exp.metrics.map((m) => (
                      <span
                        key={m.label}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white/[0.04] px-3 py-1.5 text-sm"
                      >
                        <span className="font-semibold">{m.value}</span>
                        <span className="text-text-muted">{m.label}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Expand toggle */}
                {exp.expandedDescription && (
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : exp.id)
                    }
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                  >
                    {isExpanded ? "Show less" : "Show more"}
                    {isExpanded ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
