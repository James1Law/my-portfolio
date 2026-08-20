import { DockIcon } from "@/components/aqua/dock";
import { cn } from "@/lib/utils";
import type { AppId } from "@/lib/window-config";

/**
 * Original icons in the Aqua idiom — glossy, dimensional, a little playful, and
 * colourful enough to tell apart at a glance (PRD §27). Aqua's `DockIcon`
 * supplies the plate, gloss and shadow; each app overrides the plate tint and
 * drops a bold glyph on top. Nothing here copies a historical Apple icon.
 *
 * SVG rather than raster: crisp at any density, recolourable, and a few hundred
 * bytes each instead of an image request per Dock item (PRD §34).
 */

const PLATES: Record<AppId, string> = {
  welcome:
    "bg-[linear-gradient(180deg,#8ec2f9_0%,#4a90ec_55%,#2f7de0_100%)]",
  about:
    "bg-[linear-gradient(180deg,#bda5ee_0%,#7d5fc4_55%,#5c40a6_100%)]",
  experience:
    "bg-[linear-gradient(180deg,#f6d493_0%,#d99a2b_55%,#b07414_100%)]",
  projects:
    "bg-[linear-gradient(180deg,#a2e3af_0%,#3fa45c_55%,#298043_100%)]",
  skills:
    "bg-[linear-gradient(180deg,#ccd5e0_0%,#7d8b9c_55%,#5c6978_100%)]",
  contact:
    "bg-[linear-gradient(180deg,#a6ddf4_0%,#2fa7d6_55%,#1a80b0_100%)]",
};

/** Soft drop shadow under each glyph — the source of the dimensional feel. */
const GLYPH = "drop-shadow-[0_1px_1px_rgba(10,30,60,0.45)]";

function Glyph({ id }: { id: AppId }) {
  const common = {
    viewBox: "0 0 32 32",
    className: cn("relative z-10 size-[58%] text-white", GLYPH),
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "welcome":
      // House.
      return (
        <svg {...common}>
          <path d="M4 14.6 16 5l12 9.6" />
          <path d="M7.2 13.4V26h17.6V13.4" />
          <path d="M13 26v-6.4h6V26" fill="rgba(255,255,255,0.35)" />
        </svg>
      );
    case "about":
      // Person on a card.
      return (
        <svg {...common}>
          <circle cx="16" cy="12" r="4.4" fill="rgba(255,255,255,0.35)" />
          <path d="M7.4 26c0-4.6 3.9-7.4 8.6-7.4s8.6 2.8 8.6 7.4" />
          <path d="M4 26h24" />
        </svg>
      );
    case "experience":
      // Ship's wheel — eleven years at sea, then product.
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="8.2" />
          <circle cx="16" cy="16" r="2.6" fill="rgba(255,255,255,0.4)" />
          <path d="M16 4.6v3.2M16 24.2v3.2M4.6 16h3.2M24.2 16h3.2" />
          <path d="M8.1 8.1l2.3 2.3M21.6 21.6l2.3 2.3M23.9 8.1l-2.3 2.3M10.4 21.6l-2.3 2.3" />
        </svg>
      );
    case "projects":
      // Toolbox.
      return (
        <svg {...common}>
          <path d="M12 9.4V7.6h8v1.8" />
          <path d="M4.6 9.4h22.8v16.2H4.6z" fill="rgba(255,255,255,0.28)" />
          <path d="M4.6 16.4h22.8" />
          <path d="M13.6 14.2h4.8v4.4h-4.8z" fill="rgba(255,255,255,0.55)" />
        </svg>
      );
    case "skills":
      // Interlocking cogs.
      return (
        <svg {...common}>
          <circle cx="13" cy="13" r="5.4" fill="rgba(255,255,255,0.3)" />
          <path d="M13 4.6v2.4M13 19v2.4M4.6 13h2.4M19 13h2.4M7.1 7.1l1.7 1.7M17.2 17.2l1.7 1.7M18.9 7.1l-1.7 1.7M8.8 17.2l-1.7 1.7" />
          <circle cx="22.6" cy="22.6" r="3.4" fill="rgba(255,255,255,0.45)" />
        </svg>
      );
    case "contact":
      // Envelope.
      return (
        <svg {...common}>
          <path d="M4 9h24v14H4z" fill="rgba(255,255,255,0.28)" />
          <path d="M4.8 9.8 16 18.4 27.2 9.8" />
        </svg>
      );
  }
}

export function AppIcon({
  id,
  className,
}: {
  id: AppId;
  className?: string;
}) {
  return (
    <DockIcon className={cn(PLATES[id], className)}>
      <Glyph id={id} />
    </DockIcon>
  );
}
