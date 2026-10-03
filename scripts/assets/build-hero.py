#!/usr/bin/env python3
"""Hero frame sequences for ACT 01 (PASS R1).

Reads the generated round-01 assets (outside the repo), the Green Tech photo
and the already-cropped P-35 clip, applies one house grade, and writes:

  public/media/hero/d/0000.webp …   desktop, 1920×1080
  public/media/hero/m/0000.webp …   mobile, 720×1280 (every other frame)
  public/media/hero/words/*.webp    stills that fill the four peak words
  public/media/hero/p35-zenital-bw.mp4   the "second reality" in F02

Sequence layout (desktop indices):
  0–121    S1 · recuo, V-01 (macro → hull in dry dock)
  122–241  S2 · brand film, 6 shots × 20 frames with whip cuts

Grain is not baked: it lives in a CSS overlay so the WebPs stay small.
Usage: python3 scripts/assets/build-hero.py
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
PLAN = ROOT.parent
GEN = PLAN / "assets-v2/generated/round-01"
GREEN = Path.home() / "Desktop/GAVEA TECH/Imagens da apresentacao Gavea Green Tech/01_Originais_do_PDF/Fotos_e_equipamentos"
P35 = ROOT / "public/media/video"
OUT = ROOT / "public/media/hero"

DW, DH = 1920, 1080
MW, MH = 720, 1280
SHOT = 20  # frames per montage shot
NAVY = np.array([6, 18, 28], dtype=np.float32) / 255


# ── grade ────────────────────────────────────────────────────────────────
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


def whip(img: Image.Image, blur: int) -> Image.Image:
    """Horizontal motion cut: directional box blur (the offset comes from framing)."""
    a = np.asarray(img, dtype=np.float32)
    pad = np.pad(a, ((0, 0), (blur, blur), (0, 0)), mode="edge")
    c = np.cumsum(pad, axis=1)
    a = (c[:, 2 * blur:] - c[:, :-2 * blur]) / (2 * blur)
    return Image.fromarray(np.clip(a[:, : img.width], 0, 255).astype(np.uint8))


# ── framing ──────────────────────────────────────────────────────────────
def frame(src: Image.Image, w: int, h: int, fx: float, fy: float = 0.5,
          zoom: float = 1.0) -> Image.Image:
    """Cover-crop src to w×h around focus (fx, fy), with extra zoom."""
    sw, sh = src.size
    scale = max(w / sw, h / sh) * zoom
    cw, ch = w / scale, h / scale
    left = min(max(fx * sw - cw / 2, 0), sw - cw)
    top = min(max(fy * sh - ch / 2, 0), sh - ch)
    return src.resize((w, h), Image.LANCZOS, box=(left, top, left + cw, top + ch))


def video_frames(path: Path, tmp: Path, tag: str) -> list[Path]:
    d = tmp / tag
    d.mkdir()
    subprocess.run(["ffmpeg", "-loglevel", "error", "-i", str(path), str(d / "%04d.png")], check=True)
    return sorted(d.glob("*.png"))


def pick(frames: list, n: int, start: float = 0.0, end: float = 1.0) -> list:
    last = len(frames) - 1
    return [frames[round(last * (start + (end - start) * i / (n - 1)))] for i in range(n)]


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


# ── shots ────────────────────────────────────────────────────────────────
def build(tmp: Path):
    v01 = video_frames(GEN / "video/V-01_recuo-aco-dique.mp4", tmp, "v01")
    v02 = video_frames(GEN / "video/V-02_deriva-zenital.mp4", tmp, "v02")
    v04 = video_frames(GEN / "video/V-04_costado.mp4", tmp, "v04")
    p35 = video_frames(P35 / "p35-defensa.mp4", tmp, "p35")

    seq: list[dict] = []  # each: source loader + desktop/mobile framing

    # S1 · recuo. Mobile focus walks from the weld seam to the person.
    for i, f in enumerate(v01):
        t = i / (len(v01) - 1)
        seq.append(dict(path=f, fx=0.5, mfx=lerp(0.42, 0.355, t ** 2), shot="recuo"))

    # S2 · six shots. (name, frames, desktop fx, mobile fx, zoom from→to, grade kw)
    stills = {
        "carta": Image.open(GEN / "H-04_maos-carta.png"),
        "gancho": Image.open(GEN / "H-06_gancho-luva.png"),
        "tunel": Image.open(GREEN / "p02_robo_em_tunel_x50.jpg"),
    }
    shots = [
        ("carta", [stills["carta"]] * SHOT, 0.47, 0.47, (1.00, 1.07), {}),
        ("defensa", pick(p35, SHOT), 0.5, 0.33, (1.04, 1.08), dict(sat=0.62, lift=0.7)),
        ("baia", pick(v02, SHOT, 0.1, 0.9), 0.5, 0.52, (1.0, 1.04), {}),
        ("gancho", [stills["gancho"]] * SHOT, 0.62, 0.42, (1.02, 1.10), {}),
        ("tunel", [stills["tunel"]] * SHOT, 0.5, 0.5, (1.00, 1.06), dict(sat=0.8)),
        ("costado", pick(v04, SHOT, 0.0, 0.8), 0.5, 0.36, (1.0, 1.03), {}),
    ]
    for name, frames, fx, mfx, (z0, z1), kw in shots:
        for i, f in enumerate(frames):
            t = i / (SHOT - 1)
            seq.append(dict(path=f, fx=fx, mfx=mfx, zoom=lerp(z0, z1, t), shot=name, kw=kw, i=i))

    return seq


def render(seq: list[dict]):
    for sub in ("d", "m"):
        if (OUT / sub).exists():
            shutil.rmtree(OUT / sub)
        (OUT / sub).mkdir(parents=True)

    cache: dict = {}
    def load(p):
        if isinstance(p, Image.Image):
            return p
        if p not in cache:
            cache.clear()
            cache[p] = Image.open(p).convert("RGB")
        return cache[p]

    mobile_index = []
    sizes = {"d": 0, "m": 0}
    for n, s in enumerate(seq):
        src = load(s["path"])
        kw = s.get("kw", {})
        zoom = s.get("zoom", 1.0)
        # whip cuts: the last two frames of a montage shot leave to the left,
        # the first two of the next enter from the right (pushed in, offset, blurred)
        i = s.get("i")
        k = 0
        if i is not None:
            first_shot = n < 122 + SHOT
            last_shot = n >= 122 + SHOT * 5
            if i >= SHOT - 2 and not last_shot:
                k = -(i - (SHOT - 3))  # -1, -2
            elif i < 2 and not first_shot:
                k = 2 - i  # 2, 1
        wz = zoom * (1 + 0.06 * abs(k))
        d = grade(frame(src, DW, DH, s["fx"] - 0.035 * k, zoom=wz), **kw)
        if k:
            d = whip(d, 22 * abs(k))
        p = OUT / "d" / f"{n:04d}.webp"
        d.save(p, "WEBP", quality=64, method=5)
        sizes["d"] += p.stat().st_size

        if n % 2 == 0:
            if s["shot"] == "defensa":
                # 848 px real footage: a band on night instead of a 3× upscale
                band = grade(frame(src, MW, MW // 2, s["mfx"] + 0.17 - 0.02 * k, zoom=wz), **kw)
                m = Image.new("RGB", (MW, MH), tuple(int(c * 255) for c in NAVY))
                m.paste(band, (0, (MH - band.height) // 2))
            else:
                m = grade(frame(src, MW, MH, s["mfx"] - 0.02 * k, zoom=wz), **kw)
            if k:
                m = whip(m, 9 * abs(k))
            p = OUT / "m" / f"{len(mobile_index):04d}.webp"
            m.save(p, "WEBP", quality=62, method=5)
            sizes["m"] += p.stat().st_size
            mobile_index.append(n)

    manifest = {
        "desktop": {"count": len(seq), "w": DW, "h": DH},
        "mobile": {"count": len(mobile_index), "w": MW, "h": MH, "step": 2},
        "s1": [0, 121],
        "s2": [122, len(seq) - 1],
        "shots": [s["shot"] for s in seq[122::SHOT]],
        "shotLength": SHOT,
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2))
    print(f"desktop {len(seq)} frames {sizes['d'] / 1e6:.1f} MB · mobile {len(mobile_index)} frames {sizes['m'] / 1e6:.1f} MB")


def words():
    """Stills that show through the peak words (wide, graded)."""
    (OUT / "words").mkdir(parents=True, exist_ok=True)
    jobs = {
        "business": (GEN / "H-05_costado-sem-nome.png", 0.5, {}),
        "brand": (GEN / "H-07_arco-luz.png", 0.62, {"lift": 0.2}),
        "commercial": (GEN / "H-04_maos-carta.png", 0.47, {}),
        "intelligence": (GREEN / "p02_robo_em_tunel_x50.jpg", 0.5, {"sat": 0.8}),
    }
    for name, (path, fx, kw) in jobs.items():
        img = grade(frame(Image.open(path).convert("RGB"), 2400, 1029, fx), **kw)
        img.save(OUT / "words" / f"{name}.webp", "WEBP", quality=70, method=5)
        img.resize((1200, 515), Image.LANCZOS).save(OUT / "words" / f"{name}-sm.webp", "WEBP", quality=70, method=5)


def second_reality():
    """P-35 aerial as graded black and white, for the F02 window."""
    subprocess.run([
        "ffmpeg", "-loglevel", "error", "-y", "-i", str(P35 / "p35-zenital.mp4"), "-an",
        "-vf", "hue=s=0,eq=contrast=1.18:brightness=-0.03,format=yuv420p",
        "-c:v", "libx264", "-preset", "slow", "-crf", "22", "-movflags", "+faststart",
        str(OUT / "p35-zenital-bw.mp4"),
    ], check=True)
    subprocess.run([
        "ffmpeg", "-loglevel", "error", "-y", "-i", str(OUT / "p35-zenital-bw.mp4"),
        "-frames:v", "1", "-c:v", "libwebp", "-quality", "80", str(OUT / "p35-zenital-bw.webp"),
    ], check=True)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as t:
        render(build(Path(t)))
    words()
    second_reality()
