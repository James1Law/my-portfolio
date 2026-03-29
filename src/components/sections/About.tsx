import { Anchor, Users, LayoutGrid, BarChart3 } from "lucide-react";
import { aboutStats } from "@/lib/data";
import { CountUp } from "@/components/animations/CountUp";

const iconMap = {
  blue: Anchor,
  green: Users,
  purple: LayoutGrid,
  orange: BarChart3,
};

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-32">
      <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
        <span className="block h-px w-6 bg-accent" />
        About
      </div>

      <h2 className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-[40px] md:leading-tight">
        From the bridge of a cruise ship
        <br className="hidden sm:block" /> to building the products that run them.
      </h2>

      <p className="mb-14 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
        Product leader with a rare combination: deep operational experience from
        11 years at sea, and 5+ years building complex SaaS platforms from the
        ground up.
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {aboutStats.map((stat) => {
          const Icon = iconMap[stat.color];
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-bg-card p-6 text-center transition-all hover:-translate-y-0.5 hover:border-border-light hover:shadow-lg"
            >
              <div
                className={`mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
                  stat.color === "blue"
                    ? "bg-accent-dim text-accent"
                    : stat.color === "green"
                    ? "bg-accent-green/15 text-accent-green"
                    : stat.color === "purple"
                    ? "bg-accent-purple/15 text-accent-purple"
                    : "bg-accent-orange/15 text-accent-orange"
                }`}
              >
                <Icon size={22} />
              </div>
              <div className="text-3xl font-extrabold tracking-tight md:text-4xl">
                <CountUp value={stat.value} />
              </div>
              <div className="mt-1 text-sm text-text-muted">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
