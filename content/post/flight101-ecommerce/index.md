---
title: "Flight 101: A Preliminary Study for a Stationery E-Commerce Site"
subtitle: "First steps toward a bilingual online store for Japanese premium stationery"
summary: "An early landing page and preliminary study for Flight 101, a planned e-commerce site for curated Japanese premium stationery -- bilingual (English/Chinese), hosted on Cloudflare Workers, live as a work-in-progress at flight101.wi-cruzm.workers.dev."
authors:
- adminWill
date: "2026-01-20"
categories: ["Projects"]
tags: ["E-Commerce", "Web Development", "Cloudflare Workers"]
image:
  caption: ""
  focal_point: "Center"
---

[**Flight 101**](https://flight101.wi-cruzm.workers.dev/en/) is an early-stage, preliminary study toward a proper e-commerce site for curated Japanese premium stationery — notebooks, fountain pens, ink, writing paper, and accessories. Right now it's a live landing page, not yet a full store: a first pass at the brand, navigation, and bilingual structure before building out product listings, cart, and checkout.

## What exists so far

- **Bilingual from the start**: English and Chinese (中文) versions, since the target audience spans both.
- **A defined product taxonomy**: Notebooks, Fountain Pens, Ink, Writing Paper, and Accessories — even before any of them are populated with real inventory, having the categories fixed early keeps the information architecture consistent as the store grows.
- **Home / Products / About / Contact** navigation already in place, with a Kaohsiung business address for the About/Contact sections.
- **Deployed on Cloudflare Workers**, which keeps hosting simple and fast for a static-first site that will likely need some edge logic later (cart state, regional pricing, etc.).

## What's next

This is deliberately a "coming soon" stage — the point of publishing it this early is to validate the bilingual structure and navigation before investing in a full product catalog and checkout flow. Next steps: populate the five product categories with real inventory, and decide on a checkout/payment approach that works cleanly with the Cloudflare Workers setup already in place.
