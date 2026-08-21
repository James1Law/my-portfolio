"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/aqua/button";
import { cn } from "@/lib/utils";

export interface BrowserItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  detail: React.ReactNode;
}

/**
 * Finder's icon view, opening into a detail view with a Back button.
 *
 * One window that changes view, rather than five overlapping child windows
 * (PRD §17). Both views stay mounted so nothing has to be re-rendered, and
 * focus follows the view change — without that, a keyboard user would activate
 * a tile and have no idea where they had landed.
 */
export function ProjectBrowser({ items }: { items: BrowserItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef(new Map<string, HTMLButtonElement>());
  const returnTo = useRef<string | null>(null);
  const mounted = useRef(false);

  const open = (id: string) => {
    returnTo.current = id;
    setOpenId(id);
  };

  const back = useCallback(() => setOpenId(null), []);

  /**
   * Focus follows the view change. This runs in an effect rather than a
   * requestAnimationFrame callback: the effect fires once the DOM already
   * reflects the new view, so the element being focused is no longer `hidden`
   * and focus lands deterministically instead of racing a frame.
   */
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (openId !== null) detailRef.current?.focus();
    else tileRefs.current.get(returnTo.current ?? "")?.focus();
  }, [openId]);

  // Escape leaves the detail view, the same way it closes a menu (PRD §31).
  useEffect(() => {
    if (openId === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        back();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openId, back]);

  return (
    <div className="@container flex h-full min-h-0 flex-col">
      <div
        hidden={openId !== null}
        className="min-h-0 flex-1 overflow-y-auto px-5 py-5"
      >
        <ul className="grid grid-cols-2 gap-2 @md:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                ref={(node) => {
                  if (node) tileRefs.current.set(item.id, node);
                  else tileRefs.current.delete(item.id);
                }}
                onClick={() => open(item.id)}
                className={cn(
                  "flex w-full flex-col items-center gap-1.5 rounded-[7px] px-2 py-3 text-center transition-colors",
                  "hover:bg-[var(--aqua-gel-hi)]/35",
                  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#1c5fb8]"
                )}
              >
                {item.icon}
                <span className="text-[12px] font-semibold leading-tight text-[#33383f]">
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          ref={openId === item.id ? detailRef : undefined}
          role="group"
          aria-label={item.name}
          tabIndex={-1}
          hidden={openId !== item.id}
          className="min-h-0 flex-1 overflow-y-auto px-6 py-5 outline-none"
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={back}
            className="mb-4 px-4 py-1 text-[12px]"
          >
            ‹ All projects
          </Button>
          {item.detail}
        </div>
      ))}
    </div>
  );
}
