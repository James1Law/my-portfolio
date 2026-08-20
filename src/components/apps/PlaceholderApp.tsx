/**
 * Phase 2 stands the shell up before the content moves in. These panels exist so
 * window behaviour — focus, overlap, dragging, scrolling — can be judged at a
 * realistic size; Phase 3 replaces each one with the real application.
 */
export function PlaceholderApp({
  heading,
  summary,
  children,
}: {
  heading: string;
  summary: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="flex h-full flex-col">
      <header className="shrink-0 border-b border-[#c4c8d0] bg-[linear-gradient(180deg,#fbfcfd_0%,#eef0f3_100%)] px-5 py-3">
        <h2 className="text-[15px] font-bold text-[#2b2f36]">{heading}</h2>
        <p className="mt-0.5 text-[12px] text-[#5b6169]">{summary}</p>
      </header>

      <div className="min-h-0 flex-1">
        {children ?? (
          <p className="px-5 py-6 text-[12px] text-[#7a8089]">
            Content arrives in Phase 3.
          </p>
        )}
      </div>
    </section>
  );
}
