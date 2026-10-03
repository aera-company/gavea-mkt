#!/usr/bin/env python3
"""Media for the V3.2 gate: Act 01 (Uma nova dimensão) and Act 02 (Direção).

Reads sources outside the repo (../assets-v2, ../APRESENTAÇÃO  G A V E A),
applies the house grade and writes public/media/gate/:

  p35/{d,m}/0000.webp …  real P-35 aerial pull-back, cropped below the watermark (2:1)
  sea/{d,m}/0000.webp …  V4-02, supply vessel in heavy sea (Kling)
  deep-{d,m}.webp        V4-01 A, the hull above and below the waterline (9:16)
  costado-{d,m}.webp     T-02, hull side with the crew (upscaled crop of H-05)
  strip/0..4-{d,m}.webp  the five business fronts of "Oportunidades"
  p35-photo.webp         P-35 frame (t = 10 s) used under the drawing
  p35-drawing.webp       V4-06, the same frame as an engineering drawing, aligned
                         to the photo and re-inked in the page colours
  manifest.json

Grain is not baked (CSS overlay). Usage: python3 scripts/assets/build-gate.py
"""
from __future__ import annotations

import json
import shutil
import subprocess
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
GEN = ROOT.parent / "assets-v2/generated"
TEASER = ROOT.parent / "APRESENTAÇÃO  G A V E A/GAVEA_TEASER"
OUT = ROOT / "public/media/gate"
NAVY = np.array([6, 18, 28], dtype=np.float32) / 255
PAPER = np.array([0xED, 0xEE, 0xEB], dtype=np.float32) / 255
INK = np.array([0x08, 0x1E, 0x2F], dtype=np.float32) / 255

V4 = GEN / "round-03-v4"
SRC = {
    "p35_video": TEASER / "p-35-upscale.mp4",
    "sea_video": V4 / "V4-02_mar-pesado.mp4",
    "deep": V4 / "V4-01_linha-dagua_a.png",
    "costado": V4 / "T-02_costado-direita-2x.png",
    "p35_photo": V4 / "V4-06_p35-quadro-real.png",
    "p35_drawing": V4 / "V4-06_p35-desenho.png",
}
STRIP = [  # (source, focus x, focus y, alt)
    (Path.home() / "Desktop/landing AERA/portfolio-assets/merus/final/stills/merus-m2-seam-3x2.jpg", 0.56, 0.5,
     "Costura do anel MERUS, em macro, com gotas de água."),
    (Path.home() / "Desktop/GAVEA TECH/Imagens da apresentacao Gavea Green Tech/01_Originais_do_PDF/Fotos_e_equipamentos/p02_robo_em_tunel_x50.jpg",
     0.5, 0.5, "Robô de inspeção com duas luzes dentro de um túnel industrial."),
    (V4 / "V4-04_cais_b.png", 0.5, 0.55, "Aperto de mão no cais; ao fundo, um módulo industrial sendo içado."),
    (GEN / "round-01/H-06_gancho-luva.png", 0.42, 0.5, "Luva de trabalho guiando o gancho de um guindaste."),
    (V4 / "V4-05_feira.png", 0.4, 0.5, "Estande de feira offshore, ainda vazio, antes da abertura."),
]
P35_CROP_TOP = 118          # rows above this carry the "GAVEA GROUP" watermark
P35_LAST_S = 13.0           # the source ends with a soft frame
EDITIONS = {"d": (1600, 900), "m": (720, 1280)}
FRAMES = {"p35": {"d": 60, "m": 44}, "sea": {"d": 60, "m": 44}}
Q_FRAME, Q_STILL = 58, 76


# ── grade and helpers ────────────────────────────────────────────────────
def grade(img: Image.Image, sat: float = 0.86, lift: float = 0.55) -> Image.Image:
    """House grade: mild S-curve, less saturation, shadows pulled to navy."""
    x = np.asarray(img.convert("RGB"), dtype=np.float32) / 255
    lum = x @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    x = lum[..., None] + (x - lum[..., None]) * sat
    s = x * x * (3 - 2 * x)
    x = x * 0.72 + s * 0.28
    shadow = (1 - np.clip(lum, 0, 1))[..., None] ** 3
    x = x + NAVY * shadow * lift
    x = np.minimum(x, 0.965 + (x - 0.965).clip(0) * 0.3)
    return Image.fromarray((np.clip(x, 0, 1) * 255 + 0.5).astype(np.uint8))


def cover(src: Image.Image, w: int, h: int, fx: float = 0.5, fy: float = 0.5) -> Image.Image:
    sw, sh = src.size
    s = max(w / sw, h / sh)
    cw, ch = w / s, h / s
    left = min(max(fx * sw - cw / 2, 0), sw - cw)
    top = min(max(fy * sh - ch / 2, 0), sh - ch)
    return src.resize((w, h), Image.LANCZOS, box=(left, top, left + cw, top + ch))


def fit_w(src: Image.Image, w: int) -> Image.Image:
    return src.resize((w, round(src.height * w / src.width)), Image.LANCZOS)


def video_frames(path: Path, tmp: Path, tag: str, until: float | None = None) -> list[Path]:
    d = tmp / tag
    d.mkdir()
    cmd = ["ffmpeg", "-loglevel", "error", "-i", str(path)]
    if until:
        cmd += ["-t", str(until)]
    subprocess.run(cmd + [str(d / "%04d.png")], check=True)
    return sorted(d.glob("*.png"))


def pick(items: list, n: int) -> list:
    return [items[round((len(items) - 1) * i / max(n - 1, 1))] for i in range(n)]


def save(img: Image.Image, path: Path, q: int) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "WEBP", quality=q, method=6)
    return path.stat().st_size


# ── the drawing, aligned to the photo ─────────────────────────────────────
# The model kept the vessel but not its exact framing, so the drawing is
# mapped onto the photo by landmarks (photo px, drawing px): helideck centre,
# funnel top, stern at deck level, bow keel, crane tip. Residual ≈ 5 px.
LANDMARKS = [((455, 440), (650, 740)), ((630, 255), (910, 470)), ((1855, 245), (2650, 440)),
             ((520, 600), (740, 990)), ((1380, 30), (1960, 140))]


def aligned_drawing(photo: Image.Image, drawing: Image.Image) -> Image.Image:
    """Warp the drawing onto the photo frame and re-ink it in the page
    colours: its paper becomes the page paper exactly, its lines GAVEA navy,
    so it sits on the page without a seam."""
    P = np.array([p for p, _ in LANDMARKS], dtype=float)
    D = np.array([d for _, d in LANDMARKS], dtype=float)
    # PIL wants the inverse map: output (photo) px -> input (drawing) px
    M, *_ = np.linalg.lstsq(np.c_[P, np.ones(len(P))], D, rcond=None)
    W, H = photo.size
    d = drawing.convert("L")
    paper_level = float(np.percentile(np.asarray(d), 60)) / 255
    warped = d.transform((W, H), Image.AFFINE, tuple(M.T.flatten()), Image.BICUBIC, fillcolor=round(paper_level * 255))
    a = np.asarray(warped, dtype=np.float32) / 255
    a[: int(H * 0.04)] = paper_level                                   # drop the horizon rule
    t = np.clip((a - 0.25) / (paper_level - 0.25), 0, 1)              # 1 = paper, 0 = ink
    rgb = PAPER * t[..., None] + INK * (1 - t[..., None])
    return Image.fromarray((rgb * 255 + 0.5).astype(np.uint8))


# ── build ────────────────────────────────────────────────────────────────
def build():
    shutil.rmtree(OUT, ignore_errors=True)
    OUT.mkdir(parents=True)
    manifest: dict = {"frames": {}, "stills": {}}
    sizes: dict[str, int] = {}

    with tempfile.TemporaryDirectory() as t:
        tmp = Path(t)
        p35 = video_frames(SRC["p35_video"], tmp, "p35", P35_LAST_S)
        sea = video_frames(SRC["sea_video"], tmp, "sea")

        for name, frames, prep in (
            ("p35", p35, lambda im: im.crop((0, P35_CROP_TOP, im.width, im.height))),
            ("sea", sea, lambda im: im),
        ):
            for ed, (W, H) in EDITIONS.items():
                n = FRAMES[name][ed]
                if name == "p35":
                    # a 2:1 band in both editions (the source is 1920 wide; never enlarged)
                    W, H = (1600, 800) if ed == "d" else (960, 480)
                total = 0
                for k, f in enumerate(pick(frames, n)):
                    im = prep(Image.open(f).convert("RGB"))
                    fx = 0.62 if (name == "sea" and ed == "m") else 0.5
                    total += save(grade(cover(im, W, H, fx)), OUT / name / ed / f"{k:04d}.webp", Q_FRAME)
                manifest["frames"].setdefault(name, {})[ed] = {"dir": f"/media/gate/{name}/{ed}", "count": n, "w": W, "h": H}
                sizes[f"{name}/{ed}"] = total

    deep = Image.open(SRC["deep"]).convert("RGB")
    for ed, w in (("d", 1600), ("m", 1080)):
        im = fit_w(deep, w)
        sizes[f"deep-{ed}"] = save(grade(im), OUT / f"deep-{ed}.webp", Q_STILL)
    manifest["stills"]["deep"] = {"w": 1600, "h": round(deep.height * 1600 / deep.width), "waterline": 0.355}

    costado = Image.open(SRC["costado"]).convert("RGB")
    for ed, w in (("d", 2400), ("m", 1400)):
        sizes[f"costado-{ed}"] = save(grade(fit_w(costado, w)), OUT / f"costado-{ed}.webp", Q_STILL)
    manifest["stills"]["costado"] = {"w": 2400, "h": round(costado.height * 2400 / costado.width)}

    strip = []
    for k, (src, fx, fy, alt) in enumerate(STRIP):
        im = Image.open(src).convert("RGB")
        for ed, (w, h) in (("d", (1100, 1500)), ("m", (720, 1280))):
            sizes[f"strip/{k}-{ed}"] = save(grade(cover(im, w, h, fx, fy)), OUT / "strip" / f"{k}-{ed}.webp", Q_STILL)
        strip.append({"src": f"/media/gate/strip/{k}", "alt": alt})
    manifest["stills"]["strip"] = strip

    photo = Image.open(SRC["p35_photo"]).convert("RGB")
    sizes["p35-photo"] = save(grade(photo), OUT / "p35-photo.webp", 80)
    drawing = aligned_drawing(photo, Image.open(SRC["p35_drawing"]))
    sizes["p35-drawing"] = save(drawing, OUT / "p35-drawing.webp", 84)
    manifest["stills"]["p35"] = {"w": photo.width, "h": photo.height}

    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False))
    for k, v in sizes.items():
        print(f"{k:16s} {v / 1e6:6.2f} MB")
    print(f"{'total':16s} {sum(sizes.values()) / 1e6:6.2f} MB")


if __name__ == "__main__":
    build()
