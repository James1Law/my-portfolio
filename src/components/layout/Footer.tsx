import { Mail, ExternalLink } from "lucide-react";
import { contactInfo } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8">
        <div className="flex gap-4">
          <a
            href={`mailto:${contactInfo.email}`}
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-text-muted hover:text-text-primary"
          >
            <Mail size={16} />
          </a>
          <a
            href={contactInfo.linkedin}
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-text-muted hover:text-text-primary"
          >
            <ExternalLink size={16} />
          </a>
          {contactInfo.github && (
            <a
              href={contactInfo.github}
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-text-muted hover:text-text-primary"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
        <p className="text-sm text-text-muted">
          Built with <span className="text-accent">Next.js</span>,{" "}
          <span className="text-accent">Tailwind CSS</span>, and{" "}
          <span className="text-accent">Motion</span>
        </p>
        <p className="text-xs text-text-muted">
          &copy; {year} James Law. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
