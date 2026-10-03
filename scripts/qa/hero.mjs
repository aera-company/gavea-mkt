// Hero scroll film: screenshots at fixed points of the pinned timeline. QA only.
// node scripts/qa/hero.mjs <url> <outDir> <width> [mobile] [reduce]
import { mkdirSync } from "node:fs";
import { openPage } from "./cdp.mjs";

const [url = "http://localhost:3051", out = "docs/qa/r1", w = "1440", mobile, reduce] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const isMobile = mobile === "mobile";
const page = await openPage({ width: Number(w), mobile: isMobile, reduce: reduce === "reduce" });
const t0 = Date.now();
await page.go(url);
await page.wait(4000);
const load = Date.now() - t0;

if (reduce === "reduce") {
  const H = await page.ev("document.documentElement.scrollHeight");
  for (let y = 0, i = 0; y < H; y += page.VH, i++) {
    await page.ev(`window.scrollTo(0, ${y})`);
    await page.wait(500);
    await page.shot(`${out}/static-${i}.png`);
  }
} else {
  const pin = await page.ev("(() => { const s = document.querySelector('.pin-spacer'); return s ? s.offsetHeight - innerHeight : 0 })()");
  const points = { f00: 0, f01: 0.15, f02: 0.3, "f02-second": 0.26, "f03-1": 0.39, "f03-2": 0.44, "f03-4": 0.55, "f03-6": 0.63, "f04-business": 0.69, "f04-brand": 0.735, "f04-commercial": 0.78, "f04-intelligence": 0.825, f05: 0.87, f06: 0.995 };
  for (const [name, p] of Object.entries(points)) {
    await page.ev(`window.scrollTo(0, ${Math.round(p * pin)})`);
    await page.wait(1400);
    await page.shot(`${out}/${name}.png`);
  }
  console.log(JSON.stringify({ pin, vh: page.VH }));
}
const frames = await page.ev("performance.getEntriesByType('resource').filter(e => e.name.includes('/media/hero/')).reduce((a, e) => a + (e.transferSize || e.encodedBodySize || 0), 0)");
console.log(JSON.stringify({ loadMs: load, heroBytes: frames, errors: page.errors().map((e) => JSON.stringify(e.params).slice(0, 200)) }));
page.close();
