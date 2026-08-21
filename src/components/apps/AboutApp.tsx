import { aboutStats, siteMetadata } from "@/lib/data";

/**
 * Replaces the About section. Takes its cue from About This Mac — an identity
 * block beside a plain table of system facts — without parodying it.
 *
 * The metrics render as their real values, never animated up from zero: a
 * counter that starts at 0 is what a crawler and a screen reader would read
 * (PRD §15).
 */
export function AboutApp() {
  return (
    <div className="@container h-full">
      <section className="flex h-full flex-col gap-5 px-7 py-6 @md:flex-row @md:gap-7">
        <div className="flex shrink-0 flex-col items-center gap-2 @md:w-[124px]">
          {/* The JL mark, in the same gel idiom as the Dock icons. */}
          <div
            aria-hidden="true"
            className="relative flex size-[76px] items-center justify-center overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#8ec2f9_0%,#4a90ec_55%,#2f7de0_100%)] text-[30px] font-bold tracking-tight text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_3px_8px_rgba(20,30,50,0.25)] before:absolute before:inset-x-[8%] before:top-[4%] before:h-[45%] before:rounded-[15px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,255,255,0.1))] before:content-[''] [text-shadow:0_-1px_1px_rgba(0,0,0,0.3)]"
          >
            JL
          </div>
          <p className="text-center text-[11px] leading-tight text-[#565c64]">
            JamesOS
            <br />
            Version 2.0
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="text-[19px] font-bold leading-snug tracking-[-0.01em] text-[#2b2f36]">
            From the bridge of a cruise ship to building the products that run
            them.
          </h2>

          <p className="mt-3 max-w-[52ch] text-[13px] leading-relaxed text-[#43484f]">
            Product leader with a rare combination: deep operational experience
            from 11 years at sea, and 5+ years building complex SaaS platforms
            from the ground up.
          </p>

          <dl className="mt-5 overflow-hidden rounded-[6px] border border-[#b6bcc6] bg-white/70 shadow-[inset_0_1px_2px_rgba(20,30,50,0.08)]">
            {aboutStats.map((stat, index) => (
              <div
                key={stat.label}
                className={
                  "flex items-baseline justify-between gap-4 px-3.5 py-2" +
                  (index % 2 === 1 ? " bg-[#eef1f6]" : "")
                }
              >
                <dt className="text-[12px] text-[#5b6169]">{stat.label}</dt>
                <dd className="text-[15px] font-bold tabular-nums text-[#1c5fb8]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-[12px] leading-relaxed text-[#5b6169]">
            {siteMetadata.description}
          </p>
        </div>
      </section>
    </div>
  );
}
