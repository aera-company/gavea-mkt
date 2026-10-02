import type { Still } from "@/lib/media";

type Variant = "bleed" | "frame" | "proof";

/**
 * Real photograph with a documentary caption. "proof" is for low-resolution
 * sources: shown near physical size on a paper margin, slightly turned,
 * never enlarged beyond 1.5× (see globals.css .proof).
 */
export function Photo({
  still,
  variant = "frame",
  className = "",
  sizes,
  tilt = 0,
  priority = false,
  caption = true,
  aspect,
}: {
  still: Still;
  variant?: Variant;
  className?: string;
  sizes?: string;
  tilt?: number;
  priority?: boolean;
  caption?: boolean;
  /** Override the frame ratio (CSS aspect-ratio), e.g. "2.39 / 1". */
  aspect?: string;
}) {
  const ratio = aspect ?? `${still.w} / ${still.h}`;
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={still.src}
      width={still.w}
      height={still.h}
      alt={still.alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );

  if (variant === "proof") {
    return (
      <figure
        className={`proof ${className}`}
        style={{ rotate: tilt ? `${tilt}deg` : undefined, maxWidth: still.w * 1.5 }}
      >
        <div className="media" style={{ aspectRatio: ratio }}>
          {image}
        </div>
        {caption && <figcaption className="t-caption">{still.caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className={className}>
      <div className={`media ${variant === "bleed" ? "grain" : ""}`} style={{ aspectRatio: ratio }}>
        {image}
      </div>
      {caption && <figcaption className="t-caption mt-2">{still.caption}</figcaption>}
    </figure>
  );
}
