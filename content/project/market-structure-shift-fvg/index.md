---
date: "2026-08-04T00:00:00Z"
external_link: ""
image:
  caption: Market Shift and FVG — MT4/MT5 indicator
  focal_point: Smart
links:
- icon: download
  icon_pack: fas
  name: MT4 Version
  url: https://www.mql5.com/en/market/product/131053?source=Site+Market+MT4+Indicator+Free+Rating006
- icon: download
  icon_pack: fas
  name: MT5 Version
  url: https://www.mql5.com/en/market/product/133346?source=Site+Market+MT5+Indicator+New+Search+Rating006%3amarket+shift
summary: A free MT4/MT5 indicator (v6.0) that automatically detects Market Structure Shifts and Fair Value Gaps, with real-time terminal and mobile alerts.
tags:
- Trading
title: Market Shift and FVG
---

**Market Shift and FVG** is a free MetaTrader indicator, available for both MT4 and MT5, built to automatically flag two concepts that price-action traders care a lot about: **Market Structure Shifts (MSS)** and **Fair Value Gaps (FVGs)**.

- **Market Structure Shift** happens when price breaks through a meaningful swing high or low, signaling that the balance of control between buyers and sellers may be changing.
- **Fair Value Gap** refers to a pocket of price imbalance left behind when the market moves quickly enough that it "skips over" a normal trading range.

Rather than eyeballing swing points and imbalance zones candle by candle, the indicator watches the chart continuously and surfaces both events the moment they're confirmed — with a notification sent straight to your terminal or phone.

## Key Features

- **Market Structure Shift detection** — identifies bullish/bearish shifts via swing high/low breaks combined with candle body analysis, visualized with directional arrows on the chart
- **Fair Value Gap identification** — detects pricing imbalances using three-candle analysis, highlighted with colored rectangles so they're easy to spot at a glance
- **Mobile notifications** — real-time push alerts for detected shifts and FVGs
- **Terminal notifications** — in-platform alerts for trading opportunities
- **No repainting** — signals are only generated after a candle has fully closed, so nothing shifts retroactively
- **Customizable parameters** — fine-tune the indicator for different assets and brokers

## Input Parameters

| Parameter | What It Does |
|---|---|
| Lookback Period | Adjusts the sensitivity of the swing high/low calculation |
| Displacement Factor | Controls the minimum candle body size, relative to the average, required for a valid signal |
| Minimum FVG Size | Sets the threshold (in points) for a Fair Value Gap to be considered significant — broker and asset dependent |
| Candle Body Size | Defines the minimum candle size required to register a market shift signal |
| Bottom Arrow Line | Adjusts the vertical placement of arrows relative to the shift lines |

Default settings are tuned for EURUSD on MT5. Because point values and typical candle sizes vary by broker and instrument, thorough testing and optimization of these inputs is essential before relying on the indicator elsewhere.

## A Few Things Worth Knowing

- It's designed as a **supplementary** tool, not a standalone trading system — pair it with your own analysis and risk management rather than trading off it blindly.
- The indicator does not repaint: once a signal is plotted, it stays put.
- Currently on **version 6.0**, first published to the MQL5 Marketplace in February 2025, and free to download for both MT4 and MT5 (links above).

*This trading disclaimer applies: technical indicators and trading tools carry inherent risk, and past performance is not indicative of future results. Always do your own research before making trading decisions.*
