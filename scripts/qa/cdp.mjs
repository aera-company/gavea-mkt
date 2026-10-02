// Minimal headless-Chrome driver over CDP (Node 22+ WebSocket). QA only.
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export async function openPage({ width, height, mobile = false, reduce = false, timeout = 300000 }) {
  const port = 9300 + Math.floor(Math.random() * 500);
  const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, "--hide-scrollbars",
    `--user-data-dir=${mkdtempSync(join(tmpdir(), "cdp-"))}`, "--window-size=1440,900", "about:blank"], { stdio: "ignore" });
  const kill = () => { try { chrome.kill("SIGKILL"); } catch {} };
  const timer = setTimeout(() => { console.error("timeout"); kill(); process.exit(2); }, timeout);
  let wsUrl;
  for (let i = 0; i < 150 && !wsUrl; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try { wsUrl = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page")?.webSocketDebuggerUrl; } catch {}
  }
  const ws = new WebSocket(wsUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pending = new Map(); const events = [];
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else events.push(d); };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const VH = height ?? (mobile ? 844 : 900);
  await send("Runtime.enable"); await send("Log.enable"); await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width, height: VH, deviceScaleFactor: 1, mobile });
  if (reduce) await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  const page = {
    VH,
    send,
    wait: (ms) => new Promise((r) => setTimeout(r, ms)),
    go: (url) => send("Page.navigate", { url }),
    ev: async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result.result?.value,
    shot: async (file) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(file, Buffer.from(s.result.data, "base64")); },
    errors: () => events.filter((e) => e.method === "Runtime.exceptionThrown" || (e.method === "Log.entryAdded" && e.params.entry.level === "error") || (e.method === "Runtime.consoleAPICalled" && e.params.type === "error")),
    close: () => { clearTimeout(timer); ws.close(); kill(); },
  };
  return page;
}
