# Assets · GAVEA × AERA

Regra do projeto: **só material real da GAVEA.** Nenhuma imagem gerada por IA (PASS 00, decisão D4).
Fonte de tudo: `../APRESENTAÇÃO  G A V E A/` (lida, nunca alterada). Cópias web geradas por:

```bash
# fotos, logos (precisa das páginas do PDF extraídas)
pdfimages -j "../APRESENTAÇÃO  G A V E A/03_DOCUMENTOS/02_APRESENTACOES/APRESENTACAO_Gavea-Group_Jan2026.pdf" /tmp/deck/pg
python3 scripts/assets/prepare-stills.py /tmp/deck

# vídeo (filme da P-35)
./scripts/assets/prepare-video.sh
```

## Vídeo · filme da P-35 (GAVEA GROUP)

Fonte: `video_gavea-demo-ver-final/VIDEO-2026-06-11-19-34-44.mp4` · 848×478 · 30 fps · 135,7 s · marca d'água GAVEA GROUP no topo direito.
É um filme da própria GAVEA: chegada da P-35 pela Baía de Guanabara, atracação e equipe Gavea Logística na amarração.

Cortes detectados com `scdet` (s): 2,77 · 10,33 · 19,3 · 35,43 · 51,23 · 53,6 · 56,1 · 58,27 · 62,5 · 65,77 · 68,07 · 70,37 · 88,53 · 112,53 · 114,47 · 119,87 · 122,67 · 124,67 · 126,33 · 128,43 · 129,47.

Recortes: `BAND` 848×355 a partir de y=56 (2,39:1) · `WIDE` 848×424 a partir de y=52 (2:1) · `TALL` 344×430 em x=252, y=48 (4:5, mobile). Todos eliminam a marca d'água.

| Arquivo | Trecho | Recorte | Conteúdo | Uso atual |
|---|---|---|---|---|
| `p35-baia` | 70,5–88,4 | band | travessia de lado diante do Pão de Açúcar, 18 s contínuos | 01, 10 |
| `p35-baia-tall` | 70,5–88,4 | tall | idem, vertical | reserva mobile |
| `p35-heliponto` | 19,4–35,3 | band | sobrevoo do heliponto "BR P-35" | reserva |
| `p35-reboque` | 2,9–10,2 | band | rebocador puxando a P-35 | reserva |
| `p35-zenital` | 53,7–56,0 | band | navio inteiro visto de cima | 04 (a gávea) |
| `p35-zenital-reboque` | 56,2–58,2 | band | zenital da proa com rebocadores | reserva |
| `p35-pao` | 58,4–62,4 | band | passagem pelo Pão de Açúcar | reserva |
| `p35-casco` | 65,9–68,0 | wide | casco "PETROBRAS 35" | reserva |
| `p35-estrutura` | 68,2–70,3 | wide | estrutura com equipe no convés | reserva |
| `p35-atracacao` | 114,6–119,8 | band | atracação ao longo do cais | reserva |
| `p35-zenital-cais` | 122,8–124,6 | band | P-35 atracada vista de cima | reserva |
| `p35-defensa` | 124,8–126,25 | wide | equipe de colete laranja, defensa "GAVEA LOGISTICA" | 08 |
| `p35-defensa-tall` | idem | tall | idem, vertical | reserva mobile |
| `p35-equipamento` | 126,4–128,35 | wide | equipamento com a marca Gavea Logística | reserva |
| `p35-equipe` | 128,5–129,4 | wide | equipe preparando a amarração | reserva |

Qualidade: fonte de 848 px. Em tela cheia fica suave; o grão (`.media.grain`) segura. **Pedir o master** continua sendo a melhoria nº 1.

## Fotos

| Arquivo | Fonte | Recorte (px) | Final | Uso |
|---|---|---|---|---|
| `site-embarcacao-guanabara-{2400,1280}` | print 4480 px do site (`01_FOTOS-IA/27_screenshot-website-gavea-atual.png`) | 0,292 → 4480,2104 (sem nav) | 2400×971 | 01 herói |
| `site-lideranca-reuniao` | `05_REFERENCIAS/Group-21.png` (gavea-group.com) | 0,82 → 706,644 (sem moldura) | 706×562 | 08 |
| `site-dique-casco` | `Group-36.png` | 0,0 → 552,772 (sem faixa verde) | 552×772 | reserva |
| `site-engenharia-dupla` | `ENGENEERING.png` | 0,0 → 457,208 (sem texto) | 457×208 | reserva |
| `site-cais-noturno` | `REF_Visual-Maritimo_01.jpeg` | 0,0 → 770,582 | 770×582 | 02 |
| `site-barcaca-bobinas` | `maritime.png` | 0,0 → 457,196 (sem texto) | 457×196 | 02 |
| `site-guindaste-frota` | `equipament.png` | 0,0 → 454,238 (sem texto) | 454×238 | reserva |
| `insta-icamento-tubos` | print do Instagram, post "Nossa gente" | 882,1300 → 1320,1600 (sem texto) | 438×300 | reserva |
| `deck-mooring-binoculo` | PDF Jan/2026 p.14 (`pg-015`) | 970,86 → 1442,560 | 472×474 | 02, 08 |
| `deck-mooring-conves` | p.14 | 1458,86 → 1834,560 | 376×474 | reserva |
| `deck-mooring-sinal` | p.14 | 970,574 → 1442,994 | 472×420 | 08 |
| `deck-mooring-equipe` | p.14 | 1458,726 → 1834,994 | 376×268 | reserva |
| `deck-engenharia-casco` | p.13 (`pg-014`) | 970,86 → 1420,994 | 450×908 | 02 |
| `deck-engenharia-bobina` | p.13 | 1438,86 → 1834,514 | 396×428 | reserva |
| `deck-engenharia-colete` | p.13 | 1438,534 → 1834,994 | 396×460 | 02 |
| `deck-roro-operador` | p.18 (`pg-019`) | 1444,198 → 1798,656 | 354×458 | 02 |
| `deck-roro-patio` | p.18 | 994,676 → 1798,958 | 804×282 | reserva |
| `deck-frota-pa` | p.12 (`pg-013`) | 970,86 → 1544,364 | 574×278 | reserva |
| `deck-frota-guindaste` | p.12 | 970,386 → 1544,714 | 574×328 | 02 |
| `deck-about-barcaca` | p.3 (`pg-002`) | 342,282 → 986,434 | 644×152 | reserva |
| `merus-familia-2400` | `02_MERUS/01_IMAGENS/FOTO_Merus_Family.png` | inteira | 2400×898 | 05 |
| `merus-anel-1600` | `FOTO_Merus_Main-Image.png` | inteira | 1600×964 | reserva |
| `merus-tubulacao-{antes,depois}-1400` | `FOTO_Merus_Tubulacao-*.png` | inteira | 1400 px | reserva |

Fotos abaixo de ~900 px são **provas** (`variant="proof"`): tamanho físico, margem de papel, nunca ampliadas além de 1,5×.

## Logos

`public/media/logos/`: GAVEA Group horizontal simples (cor e branco), símbolo, Log, Terminals, Trade, Green (PNG oficiais recortados ao conteúdo). AERA: `public/brand/aera-mark.png` (asset aprovado, o mesmo do site AERA e do MITANG), aplicado como máscara CSS.

## Não usar

Tudo de `01_FOTOS-IA`, `02_HERO`, `VID_Magnific_*`, `VID_KLING_*`, `VID_A*`, `VID_B*`, `video-gavea-final.mp4`, `gavea-meeting.*` e os "fast frames" do `Clip Selected`. Motivos no PASS 00, seção 2.

## Ainda a pedir à GAVEA

1. Master do filme da P-35 (resolução original, sem marca d'água).
2. Originais das fotos do site e do PDF Jan/2026.
3. Originais das fotos de pessoas e eventos do Instagram (OTC Houston 2026, equipe), com autorização de uso de imagem.
