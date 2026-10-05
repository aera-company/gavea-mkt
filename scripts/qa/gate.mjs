// V3.2 gate (Act 01 + Act 02): screenshots at fixed progress points of each
// pinned scene, plus load weight and console errors. QA only.
// node scripts/qa/gate.mjs <url> <outDir> <width> [mobile] [reduce] [only=a1,a2p]
import { mkdirSync } from "node:fs";
import { openPage } from "./cdp.mjs";

const [url = "http://localhost:3051", out = "docs/qa/gate", w = "1440", mobile, reduce, onlyArg] = process.argv.slice(2);
const only = onlyArg?.startsWith("only=") ? onlyArg.slice(5).split(",") : null;
mkdirSync(out, { recursive: true });
const page = await openPage({ width: Number(w), mobile: mobile === "mobile", reduce: reduce === "reduce" });
const t0 = Date.now();
await page.go(url);
await page.wait(4500);
const load = Date.now() - t0;

const POINTS = {
  a1: [0, 0.07, 0.14, 0.22, 0.27, 0.33, 0.42, 0.48, 0.56, 0.64, 0.72, 0.8, 0.84, 0.93, 0.975, 1],
  a2p: [0.05, 0.2, 0.42, 0.62, 0.8, 0.93],
  a2o: [0.04, 0.16, 0.3, 0.48, 0.66, 0.8, 0.93, 1],
  a2i: [0.06, 0.18, 0.3, 0.45, 0.6, 0.73, 0.86, 0.94],
  a2d: [0.12, 0.3, 0.52, 0.86],
  a3e: [0.2, 0.7],
  a3m: [0.2, 0.34, 0.52, 0.86],
  a3t: [0.14, 0.5, 0.94],
  a4: [0.16, 0.5, 0.95],
  a5m: [0.2, 0.5, 0.84],
  a5k: [0.28, 0.5, 0.86],
  a5f: [0.4, 0.86],
  a5c: [0.4, 0.86],
};

if (reduce === "reduce") {
  const H = await page.ev("document.documentElement.scrollHeight");
  for (let y = 0, i = 0; y < H; y += page.VH, i++) {
    await page.ev(`window.scrollTo(0, ${y})`);
    await page.wait(600);
    await page.shot(`${out}/static-${String(i).padStart(2, "0")}.png`);
  }
} else {
  // each pinned scene: start = section top, length = pin spacer height - viewport
  const scenes = await page.ev(`(() => [...document.querySelectorAll('main > section')].map((s) => {
    const sp = s.closest('.pin-spacer') || s.querySelector('.pin-spacer') || s.parentElement;
    const spacer = s.querySelector(':scope > .pin-spacer');
    const top = s.getBoundingClientRect().top + scrollY;
    const len = (spacer ? spacer.offsetHeight : s.offsetHeight) - innerHeight;
    return { cls: s.className, top, len };
  }))()`);
  for (const sc of scenes) {
    const id = sc.cls.split(" ")[0];
    if (!POINTS[id] || (only && !only.includes(id))) continue;
    for (const p of POINTS[id]) {
      await page.ev(`window.scrollTo(0, ${Math.round(sc.top + p * sc.len)})`);
      await page.wait(1300);
      await page.shot(`${out}/${id}-${String(Math.round(p * 100)).padStart(3, "0")}.png`);
    }
  }
  console.log(JSON.stringify(scenes));
}
const bytes = await page.ev("performance.getEntriesByType('resource').filter(e => e.name.includes('/media/gate/')).reduce((a, e) => a + (e.transferSize || e.encodedBodySize || 0), 0)");
console.log(JSON.stringify({ loadMs: load, gateBytes: bytes, errors: page.errors().map((e) => JSON.stringify(e.params).slice(0, 240)) }));
page.close();
