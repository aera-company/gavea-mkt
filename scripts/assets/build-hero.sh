#!/bin/sh
# Hero film (GW-T1 v4, scope 2.39:1, no titles) -> public/media/hero
# Source master: ../assets-v2/generated/gw-t1/GW-T1_hero_v4_scope.mp4 (1920x804, 24 fps, 19.1 s)
set -e
SRC="../assets-v2/generated/gw-t1/GW-T1_hero_v4_scope.mp4"
OUT="public/media/hero"
mkdir -p "$OUT"
ffmpeg -loglevel error -y -i "$SRC" -an -c:v libx264 -profile:v high -crf 25 -preset slow -pix_fmt yuv420p -g 48 -movflags +faststart "$OUT/hero-d.mp4"
ffmpeg -loglevel error -y -i "$SRC" -an -vf scale=1280:536 -c:v libx264 -profile:v high -crf 26 -preset slow -pix_fmt yuv420p -g 48 -movflags +faststart "$OUT/hero-m.mp4"
# poster = first frame of the film (the macro), stills for the static edition
ffmpeg -loglevel error -y -ss 0.20 -i "$SRC" -frames:v 1 -c:v libwebp -quality 82 "$OUT/poster.webp"
ffmpeg -loglevel error -y -ss 8.30 -i "$SRC" -frames:v 1 -c:v libwebp -quality 82 "$OUT/still-p35.webp"
ffmpeg -loglevel error -y -ss 12.00 -i "$SRC" -frames:v 1 -c:v libwebp -quality 82 "$OUT/still-cais.webp"
ffmpeg -loglevel error -y -ss 14.80 -i "$SRC" -frames:v 1 -c:v libwebp -quality 82 "$OUT/still-deep.webp"
ls -la "$OUT"
