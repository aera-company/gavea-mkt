#!/bin/sh
# Hero film (GW-T1 v4, scope 2.39:1, no titles) -> public/media/hero
# Scroll-driven: a frame sequence (every other frame of the 24 fps master, from frame 10 on so it opens on the macro, not on the fade from black = 225 frames).
# Source master: ../assets-v2/generated/gw-t1/GW-T1_hero_v4_scope.mp4 (1920x804, 459 frames, 19.1 s)
set -e
SRC="../assets-v2/generated/gw-t1/GW-T1_hero_v4_scope.mp4"
OUT="public/media/hero"
mkdir -p "$OUT/d" "$OUT/m"
ffmpeg -loglevel error -y -i "$SRC" -vf "select='gte(n\,10)*not(mod(n\,2))',scale=1600:670:flags=lanczos" -vsync 0 -start_number 0 -c:v libwebp -quality 74 "$OUT/d/%04d.webp"
ffmpeg -loglevel error -y -i "$SRC" -vf "select='gte(n\,10)*not(mod(n\,2))',scale=960:402:flags=lanczos" -vsync 0 -start_number 0 -c:v libwebp -quality 72 "$OUT/m/%04d.webp"
# poster = first frame (the macro); stills for the static edition
ffmpeg -loglevel error -y -ss 0.45 -i "$SRC" -frames:v 1 -c:v libwebp -quality 82 "$OUT/poster.webp"
ffmpeg -loglevel error -y -ss 8.30 -i "$SRC" -frames:v 1 -c:v libwebp -quality 82 "$OUT/still-p35.webp"
ffmpeg -loglevel error -y -ss 12.00 -i "$SRC" -frames:v 1 -c:v libwebp -quality 82 "$OUT/still-cais.webp"
ffmpeg -loglevel error -y -ss 14.80 -i "$SRC" -frames:v 1 -c:v libwebp -quality 82 "$OUT/still-deep.webp"
echo "d: $(ls "$OUT/d" | wc -l) frames, $(du -sh "$OUT/d" | cut -f1) · m: $(ls "$OUT/m" | wc -l) frames, $(du -sh "$OUT/m" | cut -f1)"
