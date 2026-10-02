import { copy } from "@/lib/content";
import { stills } from "@/lib/media";
import { Folio, Moment } from "@/components/ui/Moment";
import { Photo } from "@/components/ui/Photo";

const c = copy.diaADia;

/**
 * 05 · No dia a dia (brief scenes 06 + 07). Acceleration. The flow is the
 * spine and shows who acts at each step, so "a agência continua criando" is
 * a visible fact, not a defence. The three examples run along the same
 * spine. PASS 03: each example lights its path step by step.
 */
export function S05DiaADia() {
  return (
    <Moment id="dia-a-dia" className="pt-[calc(var(--header-h)+40px)] pb-24 md:pb-32">
      <Folio id="dia-a-dia" />

      <div className="grid-x mt-14 md:mt-20">
        <h2 className="t-h1 col-span-4 md:col-span-8 lg:col-span-10">
          {c.title[0]}
          <br />
          <span className="fg-2">{c.title[1]}</span>
        </h2>
      </div>

      {/* Spine */}
      <ol className="pad-x mt-16 grid grid-cols-2 gap-x-[var(--gutter)] gap-y-8 md:mt-24 md:grid-cols-4 lg:grid-cols-8">
        {c.flow.map((f, i) => {
          const aera = f.who.includes("AERA");
          return (
            <li key={f.step} className={`border-t pt-3 ${aera ? "border-[var(--accent)]" : "border-[var(--line)]"}`}>
              <span className="t-folio fg-2">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="t-word mt-2" style={{ fontSize: "clamp(20px, 1.7vw, 28px)" }}>
                {f.step}
              </h3>
              <p className={`t-caption mt-2 ${aera ? "accent" : ""}`}>{f.who}</p>
            </li>
          );
        })}
      </ol>

      <div className="grid-x mt-16 gap-y-6 md:mt-24">
        <ul className="t-h3 col-span-4 space-y-1 md:col-span-5 lg:col-span-5">
          {c.continues.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <p className="t-h3 pretty col-span-4 md:col-span-5 md:col-start-4 lg:col-start-7 lg:col-span-5">{c.shift}</p>
      </div>

      <div className="grid-x mt-24 md:mt-36">
        <h3 className="t-h1 balance col-span-4 md:col-span-8 lg:col-span-9">{c.title2}</h3>
      </div>

      <div className="pad-x mt-14 md:mt-20">
        {c.examples.map((ex, i) => (
          <div key={ex.trigger} className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-5 border-t border-[var(--line)] py-8 md:grid-cols-8 lg:grid-cols-12">
            <span className="t-folio fg-2 col-span-4 md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <p className="t-h3 col-span-4 md:col-span-7 lg:col-span-4">{ex.trigger}</p>
            <ol className="col-span-4 flex flex-wrap items-baseline gap-x-3 gap-y-2 md:col-span-8 md:col-start-2 lg:col-span-7 lg:col-start-6">
              {ex.path.map((p, j) => (
                <li key={p} className="t-word flex items-baseline gap-3" style={{ fontSize: "clamp(17px, 1.35vw, 22px)" }}>
                  {j > 0 && <span aria-hidden className="inline-block h-px w-5 translate-y-[-0.3em] bg-[var(--line)]" />}
                  {p}
                </li>
              ))}
            </ol>
            {i === 0 && (
              <Photo
                still={stills.merusFamilia}
                className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-6"
                aspect="2.39 / 1"
              />
            )}
          </div>
        ))}
        <div className="rule" />
      </div>

      <div className="grid-x mt-20 md:mt-28">
        <p className="t-h2 balance col-span-4 md:col-span-7 lg:col-start-4 lg:col-span-8">
          {c.close[0]}
          <br />
          <span className="fg-2">{c.close[1]}</span>
        </p>
      </div>
    </Moment>
  );
}
