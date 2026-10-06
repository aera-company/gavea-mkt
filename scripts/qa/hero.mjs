// Hero QA (Act 01, scroll-driven film): frames drawn, titles on their cues, hand-off to the line and the rail.
// node scripts/qa/hero.mjs <url> <outDir> <width> [mobile]
import { mkdirSync } from "node:fs";
import { openPage } from "./cdp.mjs";

const [url = "http://localhost:3051", out = "docs/qa/hero", w = "1440", mobile] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const page = await openPage({ width: Number(w), mobile: mobile === "mobile" });
await page.go(url);
await page.wait(4000);
const pin = await page.ev(`(() => { const s = document.querySelector('.a1'); const sp = s.parentElement.classList.contains('pin-spacer') ? s.parentElement : s; return { top: sp.getBoundingClientRect().top + scrollY, len: sp.offsetHeight - innerHeight }; })()`);
const state = () => page.ev(`(() => {
  const vis = (s) => { const e = document.querySelector(s + ' > span'); const m = new DOMMatrix(getComputedStyle(e).transform); return Math.abs(m.m42) < 2 && getComputedStyle(document.querySelector(s)).opacity !== '0'; };
  const c = document.querySelector('.a1-film canvas'); const x = c.getContext('2d'); const d = x.getImageData(0, 0, c.width, c.height).data; let s = 0, n = 0; for (let i = 0; i < d.length; i += 4 * 97) { s += d[i] + d[i + 1] + d[i + 2]; n++; }
  return { canvasMean: Math.round(s / n / 3), t1: vis('.a1-t1'), t2: vis('.a1-t2'), l1: vis('.a1-l1'), l2: vis('.a1-l2'),
    rail: getComputedStyle(document.querySelector('.rail-label') || document.body).opacity };
})()`);
const log = [];
for (const p of [0, 0.1, 0.215, 0.345, 0.5, 0.6, 0.84, 1.0]) {
  await page.ev(`window.scrollTo(0, ${Math.round(pin.top + p * pin.len)})`);
  await page.wait(2000);
  log.push([`p=${p}`, await state()]);
  await page.shot(`${out}/p${String(Math.round(p * 1000)).padStart(4, "0")}.png`);
}
const bytes = await page.ev("performance.getEntriesByType('resource').filter(e => e.name.includes('/media/')).reduce((a, e) => a + (e.transferSize || e.encodedBodySize || 0), 0)");
console.log(JSON.stringify({ log, mediaBytes: bytes, errors: page.errors().map((e) => JSON.stringify(e.params).slice(0, 220)) }, null, 1));
page.close();
