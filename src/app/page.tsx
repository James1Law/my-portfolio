import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <hr className="mx-auto max-w-5xl border-t border-border" />
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <hr className="mx-auto max-w-5xl border-t border-border" />
      <ScrollReveal delay={0.1}>
        <Experience />
      </ScrollReveal>
      <hr className="mx-auto max-w-5xl border-t border-border" />
      <ScrollReveal delay={0.1}>
        <Projects />
      </ScrollReveal>
      <hr className="mx-auto max-w-5xl border-t border-border" />
      <ScrollReveal delay={0.1}>
        <Skills />
      </ScrollReveal>
      <hr className="mx-auto max-w-5xl border-t border-border" />
      <ScrollReveal delay={0.1}>
        <Contact />
      </ScrollReveal>
    </>
  );
}
