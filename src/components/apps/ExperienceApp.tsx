import { Badge } from "@/components/aqua/badge";
import { MasterDetail, type DetailGroup } from "./MasterDetail";
import { experiences } from "@/lib/data";
import { formatDateRange } from "@/lib/utils";
import type { Experience, RoleGroup } from "@/lib/types";

const GROUPS: { key: RoleGroup; label: string }[] = [
  { key: "product", label: "Product" },
  { key: "maritime", label: "Maritime" },
];

function RoleDetail({ role }: { role: Experience }) {
  return (
    <article>
      <h3 className="text-[17px] font-bold leading-tight tracking-[-0.01em] text-[#2b2f36]">
        {role.title}
      </h3>
      <p className="mt-0.5 text-[13px] font-semibold text-[#1c5fb8]">
        {role.company}
      </p>
      <p className="mt-0.5 text-[12px] text-[#565c64]">
        {formatDateRange(role.startDate, role.endDate)}
      </p>

      <p className="mt-4 max-w-[58ch] text-[13px] leading-relaxed text-[#43484f]">
        {role.description}
      </p>

      {role.expandedDescription ? (
        <p className="mt-3 max-w-[58ch] text-[13px] leading-relaxed text-[#43484f]">
          {role.expandedDescription}
        </p>
      ) : null}

      {role.metrics.length > 0 ? (
        <>
          <h4 className="mt-5 text-[11px] font-bold uppercase tracking-wider text-[#565c64]">
            Key outcomes
          </h4>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {role.metrics.map((metric) => (
              <li key={metric.label}>
                <Badge className="normal-case tracking-normal">
                  <span className="font-bold">{metric.value}</span>
                  <span className="font-normal"> {metric.label}</span>
                </Badge>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </article>
  );
}

/**
 * Replaces the Experience section, and the richest of the applications.
 *
 * Roles are grouped by discipline rather than chronology, so the shore-based
 * maritime role sits with the sea-going one (PRD §16). Order within a group is
 * `data.ts` order, which is already most-recent-first.
 */
export function ExperienceApp() {
  const groups: DetailGroup[] = GROUPS.map(({ key, label }) => ({
    label,
    items: experiences
      .filter((role) => role.group === key)
      .map((role) => ({
        id: role.id,
        label: role.company,
        sublabel: role.title,
        detail: <RoleDetail role={role} />,
      })),
  })).filter((group) => group.items.length > 0);

  return <MasterDetail groups={groups} listLabel="Career" />;
}
