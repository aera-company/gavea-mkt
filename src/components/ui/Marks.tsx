import { logos } from "@/lib/media";

/** AERA mark: approved raster, masked so it takes the current colour. */
export function AeraMark({ className = "" }: { className?: string }) {
  return <span role="img" aria-label="AERA" className={`aera-mark inline-block aspect-[6/1] ${className}`} />;
}

/** Official GAVEA GROUP logo (never redrawn). */
export function GaveaLogo({
  tone = "color",
  className = "",
}: {
  tone?: "color" | "white";
  className?: string;
}) {
  const l = tone === "white" ? logos.groupBranco : logos.groupCor;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={l.src} width={l.w} height={l.h} alt="GAVEA Group" className={className} />;
}
