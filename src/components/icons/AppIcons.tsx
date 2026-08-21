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
      // Person. The baseline this used to sit on read as a shelf, not a card.
      return (
        <svg {...common}>
          <circle cx="16" cy="11.6" r="4.6" fill="rgba(255,255,255,0.35)" />
          <path d="M6.9 25.6c0-5.1 4.1-8.3 9.1-8.3s9.1 3.2 9.1 8.3" />
        </svg>
      );
    case "experience":
      // Ship's wheel — eleven years at sea, then product. A thin rim with
      // handles standing off it, so the silhouette can't be mistaken for the
      // cog next door: spokes inside, grips outside.
      return (
        <svg {...common}>
          <path
            d="M23.4 16h3.2M8.6 16H5.4M19.7 22.4l1.6 2.8M12.3 9.6L10.7 6.8M12.3 22.4l-1.6 2.8M19.7 9.6l1.6-2.8"
            strokeWidth={2.6}
          />
          <circle cx="16" cy="16" r="7.4" strokeWidth={2.2} />
          <path
            d="M9 16h14M12.5 22.1L19.5 9.9M19.5 22.1L12.5 9.9"
            strokeWidth={1.5}
          />
          <circle cx="16" cy="16" r="2.1" fill="rgba(255,255,255,0.45)" />
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
      // A cog, drawn solid. The wheel next door is an outline, so filled mass
      // versus open rim keeps the two apart at Dock size — which a second
      // ring-of-radiating-lines glyph did not.
      return (
        <svg {...common} fill="currentColor" stroke="none">
          {[0, 45, 90, 135].map((angle) => (
            <rect
              key={angle}
              x="14.1"
              y="5"
              width="3.8"
              height="22"
              rx="1.4"
              transform={`rotate(${angle} 16 16)`}
            />
          ))}
          <circle cx="16" cy="16" r="7.6" />
          <circle cx="16" cy="16" r="2.9" fill="rgba(10,40,90,0.55)" />
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
