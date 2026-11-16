---
date: "2026-08-04T00:00:00Z"
external_link: ""
image:
  caption: Market Shift and FVG：MT4/MT5 指標
  focal_point: Smart
links:
- icon: download
  icon_pack: fas
  name: MT4 版本
  url: https://www.mql5.com/en/market/product/131053?source=Site+Market+MT4+Indicator+Free+Rating006
- icon: download
  icon_pack: fas
  name: MT5 版本
  url: https://www.mql5.com/en/market/product/133346?source=Site+Market+MT5+Indicator+New+Search+Rating006%3amarket+shift
summary: 免費的 MT4/MT5 指標（v6.0），可自動偵測市場結構轉變與公允價值缺口，並提供終端機與手機的即時通知。
tags:
- Trading
title: Market Shift and FVG
---

**Market Shift and FVG** 是一款免費的 MetaTrader 指標，同時提供 MT4 與 MT5 版本，用來自動標示價格行為交易者十分重視的兩個概念：**市場結構轉變（Market Structure Shift, MSS）**與**公允價值缺口（Fair Value Gap, FVG）**。

- **市場結構轉變**：當價格突破重要的波段高點或低點時發生，代表買賣雙方的主導權可能正在改變。
- **公允價值缺口**：當市場移動得太快而「跳過」正常的交易區間時，所留下的價格失衡區域。

你不必再逐根 K 線用肉眼尋找波段點與失衡區；這款指標會持續監看圖表，並在這兩種事件確認的當下立即標示出來，同時把通知直接送到你的終端機或手機。

## 主要功能

- **市場結構轉變偵測**：結合波段高低點突破與 K 線實體分析，辨識多頭／空頭轉變，並以方向箭頭顯示在圖表上
- **公允價值缺口辨識**：以三根 K 線的分析偵測價格失衡，並用彩色矩形標示，一眼就能看出
- **手機通知**：偵測到轉變與缺口時即時推播
- **終端機通知**：在平台內提示交易機會
- **不重繪**：訊號只在 K 線完全收盤後才產生，不會事後變動
- **可自訂參數**：可針對不同商品與券商微調指標

## 輸入參數

| 參數 | 功能 |
|---|---|
| Lookback Period（回溯期間） | 調整波段高低點計算的敏感度 |
| Displacement Factor（位移係數） | 設定有效訊號所需的最小 K 線實體大小（相對於平均值） |
| Minimum FVG Size（最小缺口大小） | 設定公允價值缺口被視為有意義的門檻（以點數計），依券商與商品而異 |
| Candle Body Size（K 線實體大小） | 定義判定市場轉變訊號所需的最小 K 線大小 |
| Bottom Arrow Line（箭頭位置） | 調整箭頭相對於轉變線的垂直位置 |

預設值是針對 MT5 上的 EURUSD 調整的。由於點值與典型的 K 線大小會因券商與商品而不同，在其他商品上使用這款指標之前，務必先對這些參數做完整的測試與最佳化。

## 幾件值得知道的事

- 它是一項**輔助**工具，而不是獨立的交易系統；請搭配你自己的分析與風險管理使用，不要盲目依訊號交易。
- 指標不會重繪：訊號一旦畫出就不會移動。
- 目前為 **6.0 版**，於 2025 年 2 月首次發布於 MQL5 市集，MT4 與 MT5 版本皆可免費下載（連結見上方）。

*交易免責聲明：技術指標與交易工具本身帶有風險，過去的績效不代表未來的結果。做出交易決策之前，請務必自行研究。*
