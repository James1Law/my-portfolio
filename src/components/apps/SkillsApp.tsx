import { MasterDetail, type DetailGroup } from "./MasterDetail";
import { skills } from "@/lib/data";
import type { SkillCategory } from "@/lib/types";

const CATEGORIES: { key: SkillCategory; label: string }[] = [
  { key: "product", label: "Product & Strategy" },
  { key: "technical", label: "Technical" },
  { key: "leadership", label: "Leadership" },
  { key: "domain", label: "Domain" },
];

/**
 * Replaces the Skills section, laid out like System Profiler: a category list
 * beside its detail.
 *
 * No percentage bars — "Product Management: 95%" isn't a meaningful measurement
 * of anything (PRD §18).
 */
export function SkillsApp() {
  const groups: DetailGroup[] = [
    {
      items: CATEGORIES.map(({ key, label }) => ({
        id: key,
        label,
        detail: (
          <article>
            <h3 className="text-[15px] font-bold text-[#2b2f36]">{label}</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {skills
                .filter((skill) => skill.category === key)
                .map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-baseline gap-2 text-[13px] text-[#43484f]"
                  >
                    <span aria-hidden="true" className="text-[#2f8f3f]">
                      ✓
                    </span>
                    {skill.name}
                  </li>
                ))}
            </ul>
          </article>
        ),
      })),
    },
  ];

  return <MasterDetail groups={groups} listLabel="Skill categories" />;
}
