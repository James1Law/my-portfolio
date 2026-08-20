import { cn } from "@/lib/utils";

/**
 * One glossy icon per project, in the same gel idiom as the Dock set. Distinct
 * tints so the grid reads as a folder of different things rather than five
 * copies of the same document (PRD §17, §27).
 */

const TINTS: Record<string, string> = {
  priori: "bg-[linear-gradient(180deg,#a9c9f6_0%,#3f7fd4_55%,#2a63b4_100%)]",
  "laytime-calculator":
    "bg-[linear-gradient(180deg,#f7cf9a_0%,#d68f28_55%,#ac6d12_100%)]",
  "voyage-estimator":
    "bg-[linear-gradient(180deg,#9fdcd2_0%,#2f9e8c_55%,#1d7a6b_100%)]",
  "user-story-generator":
    "bg-[linear-gradient(180deg,#c8b0ee_0%,#7a5cc0_55%,#5b40a0_100%)]",
  portfolio: "bg-[linear-gradient(180deg,#c3ccd8_0%,#7d8b9c_55%,#5c6978_100%)]",
};

const FALLBACK_TINT =
  "bg-[linear-gradient(180deg,#c3ccd8_0%,#7d8b9c_55%,#5c6978_100%)]";

function Glyph({ id }: { id: string }) {
  const common = {
    viewBox: "0 0 32 32",
    className: "relative z-10 size-[56%] text-white drop-shadow-[0_1px_1px_rgba(10,30,60,0.45)]",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "priori":
      // Stacked ranking bars — prioritisation.
      return (
        <svg {...common}>
          <path d="M6 9h20M6 16h13M6 23h7" />
        </svg>
      );
    case "laytime-calculator":
      // Clock — laytime is time counted against a clause.
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="10.5" />
          <path d="M16 10v6.4l4.4 2.6" />
        </svg>
      );
    case "voyage-estimator":
      // Course line between two waypoints.
      return (
        <svg {...common}>
          <circle cx="8" cy="23" r="2.6" fill="rgba(255,255,255,0.45)" />
          <circle cx="24" cy="9" r="2.6" fill="rgba(255,255,255,0.45)" />
          <path d="M10.2 21.2 21.8 11.2" />
          <path d="M5 13.5c2.4-2.2 5-2.2 7.4 0" />
        </svg>
      );
    case "user-story-generator":
      // A page of written lines.
      return (
        <svg {...common}>
          <path d="M8 5h12l5 5v17H8z" fill="rgba(255,255,255,0.26)" />
          <path d="M19.6 5v5.6h5" />
          <path d="M12 16h9M12 21h9" />
        </svg>
      );
    default:
      // A window — this site.
      return (
        <svg {...common}>
          <path d="M5 7h22v18H5z" fill="rgba(255,255,255,0.26)" />
          <path d="M5 12.4h22" />
          <circle cx="8.6" cy="9.7" r="1.15" fill="currentColor" />
          <circle cx="12.4" cy="9.7" r="1.15" fill="currentColor" />
        </svg>
      );
  }
}

export function ProjectIcon({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex size-[52px] items-center justify-center overflow-hidden rounded-[13px] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_3px_8px_rgba(20,30,50,0.25)] before:absolute before:inset-x-[8%] before:top-[4%] before:h-[45%] before:rounded-[11px] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(255,255,255,0.1))] before:content-['']",
        TINTS[id] ?? FALLBACK_TINT,
        className
      )}
    >
      <Glyph id={id} />
    </div>
  );
}
