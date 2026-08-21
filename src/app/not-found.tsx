import Link from "next/link";
import {
  Window,
  WindowContent,
  WindowTitle,
  WindowTitlebar,
} from "@/components/aqua/window";
import { Button } from "@/components/aqua/button";

export const metadata = {
  title: "Not found | James Law",
};

/**
 * The 404, as an Aqua alert on the desktop. It extends the concept rather than
 * dropping the visitor onto a bare error page — but it says plainly what
 * happened and offers the way back, instead of a cryptic fake system fault
 * (PRD §40).
 *
 * No window controls: there is no window manager here to close anything, and a
 * control that does nothing is worse than no control.
 */
export default function NotFound() {
  return (
    <main className="aqua-desktop flex h-dvh w-full items-center justify-center p-6">
      <Window className="w-[min(440px,100%)]">
        <WindowTitlebar className="justify-center">
          {/* Not "Finder": borrowing an Apple application name is the sort of
              unnecessary branding the concept is meant to avoid (PRD §6). */}
          <WindowTitle className="static">JamesOS</WindowTitle>
        </WindowTitlebar>

        <WindowContent className="px-7 py-6 text-center">
          <h1 className="text-[17px] font-bold tracking-[-0.01em] text-[#2b2f36]">
            That page can&apos;t be found
          </h1>
          <p className="mx-auto mt-2 max-w-[36ch] text-[13px] leading-relaxed text-[#5b6169]">
            The address may have changed, or it may never have existed. Nothing
            has broken — everything is still on the desktop.
          </p>

          <div className="mt-6 flex justify-center">
            <Button asChild size="sm">
              <Link href="/">Back to the desktop</Link>
            </Button>
          </div>
        </WindowContent>
      </Window>
    </main>
  );
}
