import { Desktop, type AppContent } from "@/components/desktop/Desktop";
import { WelcomeApp } from "@/components/apps/WelcomeApp";
import { AboutApp } from "@/components/apps/AboutApp";
import { ExperienceApp } from "@/components/apps/ExperienceApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { SkillsApp } from "@/components/apps/SkillsApp";
import { ContactApp } from "@/components/apps/ContactApp";

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
 * Stays a server component. Each application's content is rendered here and
 * handed to the client shell, so the portfolio copy is in the initial HTML
 * rather than appearing after hydration (PRD §33, §44).
 */
export default function Home() {
  const apps: AppContent = {
    welcome: <WelcomeApp />,
    about: <AboutApp />,
    experience: <ExperienceApp />,
    projects: <ProjectsApp />,
    skills: <SkillsApp />,
    contact: <ContactApp />,
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
