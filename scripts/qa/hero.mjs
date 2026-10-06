// Hero film QA (Act 01): autoplay, titles on the film clock, scroll hand-off to the line and the rail.
// node scripts/qa/hero.mjs <url> <outDir> <width> [mobile]
import { mkdirSync } from "node:fs";
import { openPage } from "./cdp.mjs";

const [url = "http://localhost:3051", out = "docs/qa/hero", w = "1440", mobile] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const page = await openPage({ width: Number(w), mobile: mobile === "mobile" });
await page.go(url);
await page.wait(1500);
const state = () => page.ev(`(() => {
  const v = document.querySelector('.a1-film video');
  const vis = (s) => { const e = document.querySelector(s + ' > span'); if (!e) return null; const m = new DOMMatrix(getComputedStyle(e).transform); return Math.abs(m.m42) < 2; };
  return { t: +v.currentTime.toFixed(2), paused: v.paused, ended: v.ended, src: v.currentSrc.split('/').pop(),
    t1: vis('.a1-t1'), t2: vis('.a1-t2'), l1: vis('.a1-l1') };
})()`);
const log = [];
for (const at of [1.5, 6.8, 11.2, 16.2, 20.5]) {
  const t0 = Date.now();
  while (Date.now() - t0 < 30000) { const s = await state(); if (s && (s.t >= at || s.ended)) break; await page.wait(100); }
  await page.wait(900);
  const s = await state();
  log.push([`t≈${at}`, s]);
  await page.shot(`${out}/film-${String(at).replace(".", "_")}.png`);
}
// scroll hand-off: rests of the pin
const pin = await page.ev(`(() => { const s = document.querySelector('.a1'); const sp = s.parentElement.classList.contains('pin-spacer') ? s.parentElement : s; return { top: sp.getBoundingClientRect().top + scrollY, len: sp.offsetHeight - innerHeight }; })()`);
for (const p of [0.46, 0.84, 1.0]) {
  await page.ev(`window.scrollTo(0, ${Math.round(pin.top + p * pin.len)})`);
  await page.wait(2200);
  log.push([`p=${p}`, await state(), await page.ev(`({ rail: getComputedStyle(document.querySelector('.rail-label') || document.body).opacity })`)]);
  await page.shot(`${out}/scroll-${Math.round(p * 100)}.png`);
}
await page.ev(`window.scrollTo(0, 0)`);
await page.wait(2500);
log.push(["back to top", await state()]);
const bytes = await page.ev("performance.getEntriesByType('resource').filter(e => e.name.includes('/media/')).reduce((a, e) => a + (e.transferSize || e.encodedBodySize || 0), 0)");
console.log(JSON.stringify({ log, mediaBytes: bytes, errors: page.errors().map((e) => JSON.stringify(e.params).slice(0, 220)) }, null, 1));
page.close();
