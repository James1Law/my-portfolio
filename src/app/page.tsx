import { Desktop, type AppContent } from "@/components/desktop/Desktop";
import { WelcomeApp } from "@/components/apps/WelcomeApp";
import { PlaceholderApp } from "@/components/apps/PlaceholderApp";
import { experiences } from "@/lib/data";
import { formatDateRange } from "@/lib/utils";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "James Law",
  jobTitle: "Head of Product",
  url: "https://jamesslaw.co.uk",
  sameAs: ["https://www.linkedin.com/in/james-law-4386b553/"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sherborne",
    addressRegion: "Dorset",
    addressCountry: "GB",
  },
};

/**
 * Phase 2 scaffold for the Experience window: enough of the Finder sidebar and
 * detail split to judge the split-pane chrome at a realistic size. The roles are
 * read straight from `data.ts`; Phase 3 builds the real application.
 */
function ExperienceSkeleton() {
  const groups = [
    { label: "Product", era: "product" as const },
    { label: "Maritime", era: "sea" as const },
  ];

  return (
    <div className="flex h-full">
      <nav className="w-[210px] shrink-0 overflow-y-auto border-r border-[#c4c8d0] bg-[linear-gradient(180deg,#dfe5ee_0%,#d3dae5_100%)] px-2 py-3">
        {groups.map((group) => (
          <div key={group.era} className="mb-3">
            <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#6b7483]">
              {group.label}
            </p>
            <ul>
              {experiences
                .filter((role) => role.era === group.era)
                .map((role) => (
                  <li
                    key={role.id}
                    className="rounded px-2 py-1 text-[12px] text-[#33383f]"
                  >
                    <span className="block font-semibold">{role.company}</span>
                    <span className="block text-[11px] text-[#6b7483]">
                      {role.title}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="min-w-0 flex-1 overflow-y-auto px-6 py-5">
        <h3 className="text-[17px] font-bold text-[#2b2f36]">
          {experiences[0].title}
        </h3>
        <p className="text-[13px] font-semibold text-[#1c5fb8]">
          {experiences[0].company}
        </p>
        <p className="mt-0.5 text-[12px] text-[#6b7483]">
          {formatDateRange(experiences[0].startDate, experiences[0].endDate)}
        </p>
        <p className="mt-4 max-w-[46ch] text-[13px] leading-relaxed text-[#43484f]">
          {experiences[0].description}
        </p>
        <p className="mt-5 text-[11px] text-[#7a8089]">
          Role selection, metrics and the full career detail arrive in Phase 3.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const apps: AppContent = {
    welcome: <WelcomeApp />,
    about: (
      <PlaceholderApp
        heading="About James"
        summary="System-information framing for the about content and headline metrics."
      />
    ),
    experience: (
      <PlaceholderApp
        heading="Career"
        summary="Finder-style sidebar of roles, with a detail panel for each."
      >
        <ExperienceSkeleton />
      </PlaceholderApp>
    ),
    projects: (
      <PlaceholderApp
        heading="Projects"
        summary="Icon grid of projects, opening into a detail view."
      />
    ),
    skills: (
      <PlaceholderApp
        heading="Skills"
        summary="System Profiler layout over the four skill categories."
      />
    ),
    contact: (
      <PlaceholderApp
        heading="Contact James"
        summary="Mail-style panel with email as the primary action."
      />
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Desktop apps={apps} />
    </>
  );
}
