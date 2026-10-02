// Scroll the page viewport by viewport and save numbered screenshots. QA only.
// node scripts/qa/shots.mjs <url> <outDir> <width> [mobile] [reduce]
import { mkdirSync } from "node:fs";
import { openPage } from "./cdp.mjs";

const [url = "http://localhost:3051", out = "docs/qa/shots", w = "1440", mobile, reduce] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const page = await openPage({ width: Number(w), mobile: mobile === "mobile", reduce: reduce === "reduce" });
await page.go(url);
await page.wait(2500);
const H = await page.ev("document.documentElement.scrollHeight");
const step = Math.round(page.VH * 0.9);
let i = 0;
for (let y = 0; y < H; y += step) {
  await page.ev(`window.scrollTo(0, ${y})`);
  await page.wait(700);
  await page.shot(`${out}/${String(i++).padStart(2, "0")}.png`);
}
console.log(JSON.stringify({ height: H, shots: i, errors: page.errors().map((e) => JSON.stringify(e.params).slice(0, 200)) }));
page.close();
