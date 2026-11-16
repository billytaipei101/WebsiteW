---
title: "MVPA 實驗筆記本：以 MATLAB 與 Python 解碼 fMRI 型態"
subtitle: "兩份關於多體素型態分析的敘事式 Jupyter 筆記本，已公開於 GitHub"
summary: "介紹一個小型儲存庫，收錄以多體素型態分析（MVPA）處理 fMRI 資料的實驗筆記本。MATLAB 與 Python 兩種工具鏈各一份，包含完整的環境建置過程與實際的解碼結果。"
authors:
- adminWill
date: "2023-05-15"
categories: ["神經科學", "機器學習"]
tags: ["MVPA", "fMRI", "Python", "MATLAB", "PyMVPA", "Jupyter"]
image:
  caption: ""
  focal_point: "Center"
---

我公開了一個小型的實驗筆記本儲存庫 [**A-JUPYTER-notebooks**](https://github.com/billytaipei101/A-JUPYTER-notebooks)，記錄我如何對 fMRI 資料進行**多體素型態分析（Multi-Voxel Pattern Analysis, MVPA）**，MATLAB 與 Python 兩種工具鏈各一份筆記本。它們是以敘事式實驗筆記的形式寫成，而不是拿來就能執行的腳本：實際的 API 呼叫，與第一次摸索各個工具箱時直接在終端機或 MATLAB 主控台輸入的指令交錯出現，連寫死的本機路徑都保留著。這是刻意的安排，目的是讓它讀起來像一份過程紀錄，而不只是一條完成的分析流程。

## 什麼是 MVPA？

傳統的單變量 GLM 分析是逐一、獨立地檢驗每個體素；MVPA 則是同時分析一個腦區內多個體素之間的分散式活動型態。這正是「讀腦」得以實現的原因，也就是直接從 fMRI 的活動型態解碼心理狀態。標準的 GLM 回答的是：「在條件 A 與條件 B 之間，X 腦區的 BOLD 訊號是否較強？」MVPA 回答的則是另一個問題：「不論整體訊號強度如何，兩種條件下的*型態*是否不同？」

## 筆記本一：MATLAB

涵蓋兩種以 MATLAB 為基礎的方法，兩者都建立在 [Neuroelf](https://neuroelf.net/) 之上：

- **[Princeton MVPA Toolbox](https://github.com/princetonuniversity/princeton-mvpa-toolbox)**：應用於經典的 Haxby 等人八類視覺物體資料集。在建立 `subj` 結構、進行 z 分數標準化與逐體素特徵選取之後，以留一回合（leave-one-run-out）交叉驗證的倒傳遞分類器，在八類分類中達到**約 49.4% 的正確率**（機率水準為 12.5%）。
- **[Searchmight](http://www.franciscopereira.org/searchmight/)**：應用於一組視野資料集，搭配由 Neurosynth 產生的視覺皮質遮罩，並以 LIBSVM 分類。在 intra/inter 條件的區分上達到**約 83% 的正確率**，明顯高於上述的倒傳遞流程。

## 筆記本二：Python

基本上是一份系統建置日誌，接著是實際操作 [PyMVPA](http://www.pymvpa.org/) `Dataset` 物件的導覽：從全新安裝的 Debian 建立 NeuroDebian 環境，逐步處理相依套件的安裝（其中包含一次有紀錄的失敗嘗試，也就是從原始碼編譯 Shogun；這段刻意保留，因為它同樣是紀錄的一部分），再以 `fmri_dataset()` 載入真實的 fMRI 資料、以遮罩篩選感興趣的體素、檢視各樣本與各特徵的屬性集合，並將資料集儲存為 HDF5。

## 閱讀完整導覽

儲存庫的 [README](https://github.com/billytaipei101/A-JUPYTER-notebooks) 是兩份筆記本的完整逐節導覽，不必先打開原始的 `.ipynb` 檔也能跟上內容。
