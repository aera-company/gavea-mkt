#!/usr/bin/env python3
"""Media for Acts 03 to 05 (V3.2, after the gate): brand marks and the
marketing stills. Reads sources outside the repo, writes public/media/next/
and public/brand/. Logos are never altered, only resized.
Usage: python3 scripts/assets/build-next.py
"""
from __future__ import annotations

import importlib.util
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
LOGOS = ROOT.parent / "APRESENTAÇÃO  G A V E A/01_GAVEA-GROUP/04_LOGOS/LOGOS_GAVEA GROUP"
MERUS = Path.home() / "Desktop/landing AERA/portfolio-assets/merus/final/stills"
OUT = ROOT / "public/media/next"
BRAND = ROOT / "public/brand"

# the house grade and cover crop live in build-gate.py
spec = importlib.util.spec_from_file_location("gate", ROOT / "scripts/assets/build-gate.py")
gate = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gate)


def logo(src: Path, dst: Path, width: int):
    im = Image.open(src).convert("RGBA")
    # some exports carry a small artboard label ("06.c") in the top right
    # corner, far from the mark: drop alpha islands right of the wordmark
    a = im.getchannel("A")
    cols = [x for x in range(im.width) if a.crop((x, 0, x + 1, im.height)).getbbox()]
    gaps = [cols[i] for i in range(1, len(cols)) if cols[i] - cols[i - 1] > im.width * 0.04]
    if gaps:
        im = im.crop((0, 0, gaps[-1] - 1, im.height)) if (im.width - gaps[-1]) < im.width * 0.08 else im
    bbox = im.getbbox()  # trim transparent margins
    im = im.crop(bbox)
    im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    im.save(dst, "WEBP", quality=92, method=6)
    return im.size


def build():
    OUT.mkdir(parents=True, exist_ok=True)
    sizes = {}
    sizes["gavea-white"] = logo(LOGOS / "PNG/06.c logo gavea hor simples branco.png", BRAND / "gavea-white.webp", 1200)
    for unit in ("Log", "Terminals", "Green", "Trade"):
        sizes[unit] = logo(LOGOS / f"Gavea {unit}.png", BRAND / f"unit-{unit.lower()}.webp", 640)

    seam = Image.open(MERUS / "merus-m2-seam-3x2.jpg").convert("RGB")
    gate.save(gate.grade(gate.cover(seam, 1600, 1000, 0.55, 0.5), sat=0.92, lift=0.35), OUT / "merus-seam.webp", 78)
    gate.save(gate.grade(gate.cover(seam, 900, 1100, 0.6, 0.5), sat=0.92, lift=0.35), OUT / "merus-seam-m.webp", 76)
    portrait = Image.open(MERUS / "merus-p1-portrait-4x5.jpg").convert("RGB")
    gate.save(gate.grade(gate.cover(portrait, 800, 1000), sat=0.92, lift=0.35), OUT / "merus-portrait.webp", 78)
    for k, v in sizes.items():
        print(k, v)
    for f in sorted(OUT.glob("*.webp")) + sorted(BRAND.glob("*.webp")):
        print(f.name, f"{f.stat().st_size / 1e3:.0f} kB")


if __name__ == "__main__":
    build()
