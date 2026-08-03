---
title: "Typesetting Guitar Tabs in LaTeX, and a Script to Speed It Up"
subtitle: "A personal repo of guitar tabs, plus an ASCII-to-LaTeX converter"
summary: "A small side project: a personal collection of guitar tabs typeset in LaTeX with the guitartabs package, and a Python script that converts a plain ASCII tab transcription into LaTeX \\note{} commands automatically."
authors:
- adminWill
date: "2022-11-08"
categories: ["Projects"]
tags: ["LaTeX", "Python", "Guitar", "Music"]
image:
  caption: ""
  focal_point: "Center"
---

Outside of research and data work, I keep a small repo, [**1-GITHUB_GUITAR_TABS**](https://github.com/billytaipei101/1-GITHUB_GUITAR_TABS), of guitar tabs I've transcribed and typeset in LaTeX using the [`guitartabs`](https://ctan.org/pkg/guitartabs?lang=en) package. Each tab starts as a plain ASCII transcription and ends up as a clean, properly typeset PDF — currently including an arrangement of "Echoing" and Bach's Cello Suite No. 1 Prelude, arranged for guitar.

## The workflow

Every tab starts from a blank `@TEMPLATE/` (`guitartabs.cls` + `template.tex`). From there:

1. Transcribe the tab as plain ASCII — the familiar six-line-per-bar format guitarists already use.
2. Convert it to LaTeX with `tab2latex.py`, a small Python script I wrote for this repo. It parses each six-line ASCII block, maps character position within a bar to a note's rhythmic position, and emits `\note{}{}{}{}` commands ready to paste into the `.tex` file — no manual placement required.
3. Compile with `pdflatex`.

```bash
python3 tab2latex.py "NNN_Song Name/SongName_TAB.txt"
cd "NNN_Song Name"
pdflatex SongName.tex
```

The script handles the details that make hand-writing `guitartabs` output tedious: mapping six string lines (high string first) to the correct string numbers, two-digit frets, dead notes (`x`), and brush-down annotations (`^N`).

Only the compiled PDFs are published in the repo for each finished tab — reach out if you'd like a `.tex` source for something specific.
