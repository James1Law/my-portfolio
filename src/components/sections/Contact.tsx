import { Mail, ExternalLink } from "lucide-react";
import { contactInfo } from "@/lib/data";

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-2xl px-6 py-24 text-center md:py-32"
    >
      <div className="mb-4 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
        <span className="block h-px w-6 bg-accent" />
        Contact
      </div>

      <h2 className="hero-gradient-text mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Let&apos;s talk.
      </h2>

      <p className="mb-10 text-base leading-relaxed text-text-muted sm:text-lg">
        Open to senior product leadership opportunities.
        <br />
        Based in {contactInfo.location} — happy to work remotely.
      </p>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href={`mailto:${contactInfo.email}`}
          aria-label="Email me"
          className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-bg-card px-7 py-3.5 text-sm font-medium text-text-primary transition-all hover:border-accent hover:bg-accent-dim"
        >
          <Mail size={18} className="text-accent" />
          Email me
        </a>
        <a
          href={contactInfo.linkedin}
          aria-label="LinkedIn profile"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-bg-card px-7 py-3.5 text-sm font-medium text-text-primary transition-all hover:border-accent hover:bg-accent-dim"
        >
          <ExternalLink size={18} className="text-accent" />
          LinkedIn
        </a>
        {contactInfo.github && (
          <a
            href={contactInfo.github}
            aria-label="GitHub profile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-bg-card px-7 py-3.5 text-sm font-medium text-text-primary transition-all hover:border-accent hover:bg-accent-dim"
          >
            <ExternalLink size={18} className="text-accent" />
            GitHub
          </a>
        )}
      </div>
    </section>
  );
}
