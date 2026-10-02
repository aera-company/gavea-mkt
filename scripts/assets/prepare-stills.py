"""Real GAVEA stills, logos and MERUS product → public/media.

Reads the source folder read-only and writes web copies. Every crop box is
documented in docs/ASSETS.md (source, what was removed, final size). Nothing
here is AI-generated: sources are GAVEA's website, its Jan/2026 deck (images
extracted with `pdfimages -j`), its Instagram screenshot and MERUS files.

Usage: python3 scripts/assets/prepare-stills.py <deck_pages_dir>
  deck_pages_dir = output of `pdfimages -j APRESENTACAO_Gavea-Group_Jan2026.pdf pg`
"""

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT.parent / "APRESENTAÇÃO  G A V E A"
OUT = ROOT / "public" / "media"
DECK = Path(sys.argv[1]) if len(sys.argv) > 1 else None

REFS = SRC / "01_GAVEA-GROUP" / "05_REFERENCIAS"
SHOTS = SRC / "01_GAVEA-GROUP" / "01_FOTOS-IA"  # holds the two real screenshots
MERUS = SRC / "02_MERUS" / "01_IMAGENS"
LOGOS = SRC / "01_GAVEA-GROUP" / "04_LOGOS"


def save(img: Image.Image, name: str, widths=(None,), quality=84):
    (OUT / "img").mkdir(parents=True, exist_ok=True)
    img = img.convert("RGB")
    for w in widths:
        out = img
        if w and img.width > w:
            out = img.resize((w, round(img.height * w / img.width)), Image.LANCZOS)
        suffix = f"-{w}" if w else ""
        path = OUT / "img" / f"{name}{suffix}.webp"
        out.save(path, "WEBP", quality=quality, method=6)
        print(f"{path.name:34} {out.width}×{out.height}")


def crop(path: Path, box):
    return Image.open(path).crop(box)


# Website (gavea-group.com) ---------------------------------------------------
# Hero photo cut out of the 4480 px retina screenshot (nav bar and page below removed).
save(crop(SHOTS / "27_screenshot-website-gavea-atual.png", (0, 292, 4480, 2104)),
     "site-embarcacao-guanabara", widths=(2400, 1280))
save(crop(REFS / "Group-21.png", (0, 82, 706, 644)), "site-lideranca-reuniao")
save(crop(REFS / "Group-36.png", (0, 0, 552, 772)), "site-dique-casco")
save(crop(REFS / "ENGENEERING.png", (0, 0, 457, 208)), "site-engenharia-dupla")
save(crop(REFS / "REF_Visual-Maritimo_01.jpeg", (0, 0, 770, 582)), "site-cais-noturno")
save(crop(REFS / "maritime.png", (0, 0, 457, 196)), "site-barcaca-bobinas")
save(crop(REFS / "equipament.png", (0, 0, 454, 238)), "site-guindaste-frota")

# Instagram screenshot: only the clean photo area of "Nossa gente" (text removed).
save(crop(SHOTS / "FOTO_Gavea_Screenshot-Instagram.png", (882, 1300, 1320, 1600)),
     "insta-icamento-tubos")

# Deck Jan/2026 (page images, 1920×1080) --------------------------------------
if DECK:
    deck = {
        # mooring master (p.14)
        "deck-mooring-binoculo": ("pg-015.jpg", (970, 86, 1442, 560)),
        "deck-mooring-conves": ("pg-015.jpg", (1458, 86, 1834, 560)),
        "deck-mooring-sinal": ("pg-015.jpg", (970, 574, 1442, 994)),
        "deck-mooring-equipe": ("pg-015.jpg", (1458, 726, 1834, 994)),
        # engineering (p.13)
        "deck-engenharia-casco": ("pg-014.jpg", (970, 86, 1420, 994)),
        "deck-engenharia-bobina": ("pg-014.jpg", (1438, 86, 1834, 514)),
        "deck-engenharia-colete": ("pg-014.jpg", (1438, 534, 1834, 994)),
        # ro-ro (p.18)
        "deck-roro-operador": ("pg-019.jpg", (1444, 198, 1798, 656)),
        "deck-roro-patio": ("pg-019.jpg", (994, 676, 1798, 958)),
        # own equipment (p.12)
        "deck-frota-pa": ("pg-013.jpg", (970, 86, 1544, 364)),
        "deck-frota-guindaste": ("pg-013.jpg", (970, 386, 1544, 714)),
        # about (p.3), barge deck with worker
        "deck-about-barcaca": ("pg-002.jpg", (342, 282, 986, 434)),
    }
    for name, (page, box) in deck.items():
        save(crop(DECK / page, box), name)

# MERUS (manufacturer photography) --------------------------------------------
save(Image.open(MERUS / "FOTO_Merus_Family.png"), "merus-familia", widths=(2400,))
save(Image.open(MERUS / "FOTO_Merus_Main-Image.png"), "merus-anel", widths=(1600,))
for side in ("Antes", "Depois"):
    save(Image.open(MERUS / f"FOTO_Merus_Tubulacao-{side}.png"),
         f"merus-tubulacao-{side.lower()}", widths=(1400,))

# Logos (official PNG, kept as PNG for alpha) ---------------------------------
logo_out = OUT / "logos"
logo_out.mkdir(parents=True, exist_ok=True)
logos = {
    "gavea-group-cor": LOGOS / "01_GAVEA-GROUP" / "06.a logo gavea hor simples.png",
    "gavea-group-branco": LOGOS / "01_GAVEA-GROUP" / "06.c logo gavea hor simples branco.png",
    "gavea-simbolo": LOGOS / "01_GAVEA-GROUP" / "LOGO_Gavea_Simbolo.png",
    "gavea-log": LOGOS / "LOGOS_GAVEA GROUP" / "Gavea Log.png",
    "gavea-terminals": LOGOS / "LOGOS_GAVEA GROUP" / "Gavea Terminals.png",
    "gavea-trade": LOGOS / "LOGOS_GAVEA GROUP" / "Gavea Trade.png",
    "gavea-green": LOGOS / "LOGOS_GAVEA GROUP" / "Gavea Green.png",
}
for name, path in logos.items():
    im = Image.open(path).convert("RGBA")
    im = im.crop(im.getbbox())
    if im.width > 1200:
        im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
    im.save(logo_out / f"{name}.png", optimize=True)
    print(f"{name + '.png':34} {im.width}×{im.height}")
