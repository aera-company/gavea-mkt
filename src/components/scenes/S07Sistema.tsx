import { copy } from "@/lib/content";
import { Folio, Moment } from "@/components/ui/Moment";

const c = copy.sistema;
const i = c.intelligence;

/* Week ruler: relative weeks, no real dates (nothing invented). */
const weeks = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];

/**
 * 07 · GAVEA Marketing System (brief scenes 10 + 11). Not a dashboard: the
 * planning room on screen. Rows read like a production schedule; each item
 * carries an engineering-style title block (frente · fase · responsável);
 * owners are roles, never people; the blue mark only where GAVEA must decide.
 * Light, like the rest of the page. PASS 05 makes the three views live.
 */
export function S07Sistema() {
  return (
    <Moment id="sistema" className="pt-[calc(var(--header-h)+40px)] pb-24 md:pb-32">
      <Folio id="sistema" />

      <div className="grid-x mt-14 gap-y-4 md:mt-20">
        <p className="t-label col-span-4 md:col-span-8 lg:col-span-12">
          {c.label} <span className="fg-2 normal-case tracking-normal">· {c.note}</span>
        </p>
        <h2 className="t-h1 balance col-span-4 md:col-span-8 lg:col-span-9">{c.title}</h2>
      </div>

      {/* Board */}
      <div className="pad-x mt-16 md:mt-24">
        <div className="border border-[var(--line)] bg-[#f4f5f2]">
          <nav aria-label="Vistas do sistema (conceito)" className="flex gap-6 overflow-x-auto border-b border-[var(--line)] px-5 py-4">
            {c.tabs.map((t, k) => (
              <span
                key={t}
                className={`t-label shrink-0 pb-1 ${k === 0 ? "border-b border-[var(--ink)]" : "fg-2"}`}
                aria-current={k === 0 ? "page" : undefined}
              >
                {t}
              </span>
            ))}
          </nav>

          <div className="hidden grid-cols-[1.1fr_2fr_repeat(8,minmax(0,1fr))_1.2fr] border-b border-[var(--line)] px-5 py-2 lg:grid">
            <span className="t-label fg-2">Frente</span>
            <span className="t-label fg-2">Item</span>
            {weeks.map((w, k) => (
              <span key={w} className={`t-folio fg-2 ${k === 3 ? "accent" : ""}`}>
                {w}
              </span>
            ))}
            <span className="t-label fg-2">Responsável</span>
          </div>

          <ol>
            {c.rows.map((r, k) => {
              const start = (k * 3) % 5;
              const span = 2 + (k % 3);
              return (
                <li
                  key={r.item}
                  className="grid grid-cols-2 items-center gap-y-1 border-b border-[var(--line)] px-5 py-3 last:border-b-0 lg:grid-cols-[1.1fr_2fr_repeat(8,minmax(0,1fr))_1.2fr]"
                >
                  <span className="t-caption">{r.front}</span>
                  <span className="t-body flex items-center gap-2 lg:col-auto">
                    {r.attention && <span aria-label="aguarda decisão" className="inline-block size-1.5 bg-[var(--accent)]" />}
                    {r.item}
                  </span>
                  <span className="relative col-span-2 hidden h-5 lg:col-span-8 lg:block">
                    <span
                      className={`absolute top-1/2 h-[3px] -translate-y-1/2 ${r.attention ? "bg-[var(--accent)]" : "bg-[var(--ink)]"}`}
                      style={{ left: `${(start / 8) * 100}%`, width: `${(span / 8) * 100}%` }}
                    />
                    <span className="t-caption absolute top-1/2 -translate-y-1/2 whitespace-nowrap pl-2" style={{ left: `${((start + span) / 8) * 100}%` }}>
                      {r.phase}
                    </span>
                  </span>
                  <span className="t-caption lg:hidden">{r.phase}</span>
                  <span className="t-caption text-right lg:text-left">{r.owner}</span>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="t-caption mt-3">Exemplos ilustrativos. Responsáveis por papel, nunca por pessoa.</p>
      </div>

      {/* Intelligence beat */}
      <div className="grid-x mt-24 gap-y-6 md:mt-36">
        <h3 className="t-h2 balance col-span-4 md:col-span-6 lg:col-span-6">{i.title}</h3>
        <p className="t-body fg-2 pretty col-span-4 md:col-span-5 lg:col-start-8 lg:col-span-4 lg:pt-2">{i.body}</p>
      </div>
      <div className="grid-x mt-14 gap-y-4 md:mt-20">
        <p className="t-word col-span-4 flex flex-wrap gap-x-4 gap-y-2 md:col-span-8 lg:col-span-12" style={{ fontSize: "clamp(20px, 2vw, 32px)" }}>
          {i.sum.map((s, k) => (
            <span key={s} className="flex items-baseline gap-4">
              {k > 0 && <span className="fg-2">+</span>}
              {s}
            </span>
          ))}
        </p>
        <p className="t-display col-span-4 md:col-span-8 lg:col-span-12">
          <span className="fg-2">= </span>
          {i.result}
        </p>
        <p className="t-h3 col-span-4 md:col-span-6 lg:col-start-1 lg:col-span-5">{i.sub}</p>
      </div>
    </Moment>
  );
}
