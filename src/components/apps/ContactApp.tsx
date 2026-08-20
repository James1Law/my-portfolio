import { Button } from "@/components/aqua/button";
import { contactInfo } from "@/lib/data";

/**
 * Replaces the Contact section, framed like a small mail application. Email is
 * the strongest action; there is no form, because the site never had one and the
 * redesign is not a reason to introduce one (PRD §19).
 */
export function ContactApp() {
  return (
    <section className="flex h-full flex-col">
      <header className="shrink-0 border-b border-[#b6bcc6] bg-[linear-gradient(180deg,#fbfcfd_0%,#e9ecf1_100%)] px-5 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6b7483]">
          New message
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-7 py-6 text-center">
        <h2 className="text-[26px] font-bold tracking-[-0.02em] text-[#2b2f36] [text-shadow:0_1px_0_rgba(255,255,255,0.9)]">
          Let&apos;s talk.
        </h2>

        <p className="mt-3 max-w-[42ch] text-[13px] leading-relaxed text-[#43484f]">
          Open to senior product leadership opportunities.
          <br />
          Based in {contactInfo.location} — happy to work remotely.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <Button asChild size="sm">
            <a href={`mailto:${contactInfo.email}`}>Email James</a>
          </Button>
          <Button asChild size="sm" variant="secondary">
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </Button>
          {contactInfo.github ? (
            <Button asChild size="sm" variant="secondary">
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
          ) : null}
        </div>

        <p className="mt-5 text-[11px] text-[#7a8089]">{contactInfo.email}</p>
      </div>
    </section>
  );
}
