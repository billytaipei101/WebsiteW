---
title: "用 LaTeX 排版吉他譜，以及一支加速流程的腳本"
subtitle: "個人吉他譜儲存庫，外加 ASCII 轉 LaTeX 的轉換工具"
summary: "一個小型的業餘專案：以 LaTeX 的 guitartabs 套件排版的個人吉他譜收藏，以及一支能將純 ASCII 吉他譜自動轉換為 LaTeX \\note{} 指令的 Python 腳本。"
authors:
- adminWill
date: "2022-11-08"
categories: ["專案"]
tags: ["LaTeX", "Python", "Guitar", "Music"]
image:
  caption: ""
  focal_point: "Center"
---

在研究與資料工作之外，我維護著一個小型儲存庫 [**1-GITHUB_GUITAR_TABS**](https://github.com/billytaipei101/1-GITHUB_GUITAR_TABS)，收錄我自己採譜並以 LaTeX 的 [`guitartabs`](https://ctan.org/pkg/guitartabs?lang=en) 套件排版的吉他譜。每一份譜都從純 ASCII 的記譜開始，最後成為一份乾淨、排版完整的 PDF。目前收錄的曲目包含〈Echoing〉的編曲，以及改編為吉他演奏的巴哈《第一號無伴奏大提琴組曲》前奏曲。

## 工作流程

每一份譜都從空白的 `@TEMPLATE/`（`guitartabs.cls` + `template.tex`）開始，接著：

1. 以純 ASCII 記下吉他譜，也就是吉他手熟悉的每小節六行格式。
2. 用 `tab2latex.py` 轉換為 LaTeX。這是我為這個儲存庫寫的小型 Python 腳本：它會解析每一組六行的 ASCII 區塊，將字元在小節中的位置對應到音符的節奏位置，並輸出可直接貼進 `.tex` 檔的 `\note{}{}{}{}` 指令，不需要手動排位置。
3. 以 `pdflatex` 編譯。

```bash
python3 tab2latex.py "NNN_Song Name/SongName_TAB.txt"
cd "NNN_Song Name"
pdflatex SongName.tex
```

這支腳本處理了手寫 `guitartabs` 輸出時最繁瑣的細節：將六條弦的行（高音弦在最上）對應到正確的弦號、兩位數的琴格、悶音（`x`），以及下刷標記（`^N`）。

儲存庫中每份完成的譜只公開編譯後的 PDF；如果你需要某一首的 `.tex` 原始檔，歡迎與我聯絡。
