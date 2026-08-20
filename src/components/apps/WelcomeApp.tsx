import { Badge } from "@/components/aqua/badge";
import { AppLauncher } from "./AppLauncher";
import { siteMetadata } from "@/lib/data";

/**
 * Replaces the old hero. Carries the page's only <h1>, and has to answer both
 * "who is James?" and "how does this interface work?" (PRD §12).
 */
export function WelcomeApp() {
  return (
    <section className="flex h-full flex-col items-center justify-center px-8 py-7 text-center">
      <h1 className="text-[34px] font-bold leading-none tracking-[-0.02em] text-[#2b2f36] [text-shadow:0_1px_0_rgba(255,255,255,0.9)]">
        {siteMetadata.name}
      </h1>

      <p className="mt-2 text-[15px] font-semibold text-[#1c5fb8]">
        Product Leader &amp; Builder
      </p>

      <p className="mt-4 text-[14px] font-semibold text-[#43484f]">
        {siteMetadata.tagline}
      </p>

      <p className="mx-auto mt-2 max-w-[430px] text-[13px] leading-relaxed text-[#5b6169]">
        Strategic product leader with 5+ years delivering complex SaaS platforms,
        following 11 years at sea as a Senior Deck Officer.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
        <AppLauncher target="experience">Explore my experience</AppLauncher>
        <AppLauncher target="projects" variant="secondary">
          View projects
        </AppLauncher>
        <AppLauncher target="contact" variant="secondary">
          Get in touch
        </AppLauncher>
      </div>

      <Badge className="mt-6">Open to opportunities</Badge>

      {/* The Dock is on every breakpoint; the menu bar is not, so the hint only
          names the Dock. */}
      <p className="mt-5 text-[11px] text-[#7a8089]">
        Open an application from the Dock below.
      </p>
    </section>
  );
}
