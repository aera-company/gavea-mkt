/**
 * Scroll-scrubbed image sequence drawn on a 2D canvas.
 * Frames are pre-rendered WebPs (scripts/assets/build-hero.py). The scroll
 * picks the frame; nothing plays on its own. Loads the opening frames first,
 * then the rest with a small concurrency, and always draws the nearest frame
 * already decoded so a fast scroll never shows a blank.
 */

export type SequenceSpec = { dir: string; count: number; step: number };

const PRIORITY = 42; // frames covering F00–F01 go first
const CONCURRENCY = 6;

export class FrameSequence {
  private imgs: (HTMLImageElement | undefined)[];
  private ready: boolean[];
  private ctx: CanvasRenderingContext2D | null;
  private target = 0;
  private drawn = -1;
  private raf = 0;
  private dead = false;
  private ro: ResizeObserver;

  constructor(
    private canvas: HTMLCanvasElement,
    private spec: SequenceSpec,
  ) {
    this.imgs = new Array(spec.count);
    this.ready = new Array(spec.count).fill(false);
    this.ctx = canvas.getContext("2d", { alpha: false });
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);
    this.resize();
  }

  private url(i: number) {
    return `${this.spec.dir}/${String(i).padStart(4, "0")}.webp`;
  }

  load() {
    const order = Array.from({ length: this.spec.count }, (_, i) => i);
    const first = order.slice(0, PRIORITY);
    // after the opening, load every 4th frame first so a fast scroll has coverage
    const rest = order.slice(PRIORITY);
    const sparse = rest.filter((i) => i % 4 === 0);
    const dense = rest.filter((i) => i % 4 !== 0);
    const queue = [...first, ...sparse, ...dense];

    const next = () => {
      if (this.dead) return;
      const i = queue.shift();
      if (i === undefined) return;
      const img = new Image();
      img.decoding = "async";
      if (i === 0) img.fetchPriority = "high";
      img.src = this.url(i);
      this.imgs[i] = img;
      img
        .decode()
        .then(() => {
          if (this.dead) return;
          this.ready[i] = true;
          if (this.nearest(this.target) === i) this.schedule();
        })
        .catch(() => {})
        .finally(next);
    };
    for (let k = 0; k < CONCURRENCY; k++) next();
  }

  /** f is in desktop frame space; the mobile sequence keeps every other frame. */
  seek(f: number) {
    const i = Math.min(this.spec.count - 1, Math.max(0, Math.round(f / this.spec.step)));
    if (i === this.target) return;
    this.target = i;
    this.schedule();
  }

  private nearest(i: number) {
    for (let d = 0; d < this.spec.count; d++) {
      if (this.ready[i - d]) return i - d;
      if (this.ready[i + d]) return i + d;
    }
    return -1;
  }

  private schedule() {
    if (this.raf) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      this.draw();
    });
  }

  private resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(this.canvas.clientWidth * dpr);
    const h = Math.round(this.canvas.clientHeight * dpr);
    if (!w || !h) return;
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.drawn = -1;
      this.draw();
    }
  }

  private draw() {
    const i = this.nearest(this.target);
    const img = i >= 0 ? this.imgs[i] : undefined;
    if (!img || !this.ctx || i === this.drawn) return;
    const { width: cw, height: ch } = this.canvas;
    const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * s;
    const h = img.naturalHeight * s;
    this.ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    this.drawn = i;
  }

  destroy() {
    this.dead = true;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.imgs.forEach((img) => img && (img.src = ""));
  }
}
