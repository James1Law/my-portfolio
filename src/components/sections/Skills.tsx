import { Globe, Code, Users, MapPin } from "lucide-react";
import { skills } from "@/lib/data";
import type { SkillCategory } from "@/lib/types";

const categories: {
  key: SkillCategory;
  label: string;
  icon: typeof Globe;
  colorClass: string;
  dotClass: string;
}[] = [
  {
    key: "product",
    label: "Product & Strategy",
    icon: Globe,
    colorClass: "bg-accent-dim text-accent",
    dotClass: "bg-accent",
  },
  {
    key: "technical",
    label: "Technical",
    icon: Code,
    colorClass: "bg-accent-purple/15 text-accent-purple",
    dotClass: "bg-accent-purple",
  },
  {
    key: "leadership",
    label: "Leadership",
    icon: Users,
    colorClass: "bg-accent-green/15 text-accent-green",
    dotClass: "bg-accent-green",
  },
  {
    key: "domain",
    label: "Domain",
    icon: MapPin,
    colorClass: "bg-accent-orange/15 text-accent-orange",
    dotClass: "bg-accent-orange",
  },
];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-32">
      <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
        <span className="block h-px w-6 bg-accent" />
        Skills
      </div>

      <h2 className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl">
        What I bring
      </h2>

      <p className="mb-14 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
        A product leader who understands the code, the customer, and the
        commercial reality.
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const catSkills = skills.filter((s) => s.category === cat.key);

          return (
            <div
              key={cat.key}
              className="rounded-2xl border border-border bg-bg-card p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${cat.colorClass}`}
                >
                  <Icon size={18} />
                </div>
                <span className="text-sm font-bold">{cat.label}</span>
              </div>

              <ul className="flex flex-col gap-2.5">
                {catSkills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${cat.dotClass}`}
                    />
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
