#!/usr/bin/env bash
# Real GAVEA footage → web clips. Reads the source read-only, writes copies to
# public/media/video. Source: GAVEA's own P-35 film (848×478, 30 fps, GAVEA
# GROUP watermark top-right). Every crop starts at y ≥ 48 and, for the 4:5
# mobile cuts, stays left of x = 600, so the watermark never reaches the page.
# Cut points come from `scdet` (see docs/ASSETS.md); trims sit inside them.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SRC="$ROOT/../APRESENTAÇÃO  G A V E A/video_gavea-demo-ver-final/VIDEO-2026-06-11-19-34-44.mp4"
OUT="$ROOT/public/media/video"
mkdir -p "$OUT"

BAND="crop=848:355:0:56"      # 2.39:1, aerials
WIDE="crop=848:424:0:52"      # 2:1, close shots
TALL="crop=344:430:252:48"    # 4:5, mobile

clip() { # name start end filter
  local name="$1" ss="$2" to="$3" vf="$4"
  ffmpeg -loglevel error -y -ss "$ss" -to "$to" -i "$SRC" -an \
    -vf "$vf,format=yuv420p" -c:v libx264 -preset slow -crf 20 \
    -movflags +faststart "$OUT/$name.mp4"
  ffmpeg -loglevel error -y -ss "$ss" -i "$SRC" -frames:v 1 \
    -vf "$vf" -c:v libwebp -quality 82 "$OUT/$name.webp"
  echo "$name $(du -h "$OUT/$name.mp4" | cut -f1)"
}

clip p35-baia             70.5  88.4  "$BAND"
clip p35-baia-tall        70.5  88.4  "$TALL"
clip p35-heliponto        19.4  35.3  "$BAND"
clip p35-reboque           2.9  10.2  "$BAND"
clip p35-zenital          53.7  56.0  "$BAND"
clip p35-zenital-reboque  56.2  58.2  "$BAND"
clip p35-pao              58.4  62.4  "$BAND"
clip p35-casco            65.9  68.0  "$WIDE"
clip p35-estrutura        68.2  70.3  "$WIDE"
clip p35-atracacao       114.6 119.8  "$BAND"
clip p35-zenital-cais    122.8 124.6  "$BAND"
clip p35-defensa         124.8 126.25 "$WIDE"
clip p35-defensa-tall    124.8 126.25 "$TALL"
clip p35-equipamento     126.4 128.35 "$WIDE"
clip p35-equipe          128.5 129.4  "$WIDE"
