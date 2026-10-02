import type { ReactNode } from "react";
import { moments, momentIndex, pad2, type MomentId } from "@/lib/content";

/** One narrative moment. Sets the theme slots and the folio the header reads. */
export function Moment({
  id,
  children,
  className = "",
  label,
}: {
  id: MomentId;
  children: ReactNode;
  className?: string;
  /** Accessible name; defaults to the folio name. */
  label?: string;
}) {
  const i = momentIndex(id);
  const m = moments[i];
  return (
    <section
      id={id}
      data-moment={i}
      data-theme={m.theme}
      aria-label={label ?? m.folio}
      className={`moment ${className}`}
    >
      {children}
    </section>
  );
}

/** Small folio at the head of a moment: "03 · Direção" over a hairline. */
export function Folio({ id, className = "" }: { id: MomentId; className?: string }) {
  const i = momentIndex(id);
  return (
    <div className={`pad-x ${className}`}>
      <div className="flex items-baseline justify-between gap-6 pb-3">
        <span className="t-folio">
          {pad2(i + 1)} · {moments[i].folio}
        </span>
        <span className="t-folio fg-2">{pad2(moments.length)}</span>
      </div>
      <div className="rule" />
    </div>
  );
}
