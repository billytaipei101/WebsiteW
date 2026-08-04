---
date: "2022-12-15T00:00:00Z"
external_link: ""
image:
  caption: Random forest classification of EEG features during a visuospatial working memory task
  focal_point: Smart
links:
- icon: external-link-alt
  icon_pack: fas
  name: Read the Abstract (JOV)
  url: https://jov.arvojournals.org/article.aspx?articleid=2784618
summary: A random forest framework for classifying EEG activity during a Visuospatial Working Memory task, distinguishing mild TBI patients from healthy controls with up to 98% accuracy.
tags:
- Machine Learning
- EEG
title: Application of Random Forest to Classify EEG Data of mTBI Patients and Control Adults During a Visuospatial Working Memory Task
---

*Cruz Molina, W., Cavanagh, J., & Lin, C.-Y. (2022). Application of Random Forest to classify EEG data of mTBI patients and control adults obtained during a Visuospatial Working Memory Task. Journal of Vision, 22(14):3842.*

## Background

Mild Traumatic Brain Injury (mTBI) can leave working memory subtly impaired long after standard clinical exams come back clean. This project investigated whether the **random forest** algorithm could serve as a computational framework for pulling the most diagnostically relevant features out of EEG data recorded during a Visuospatial Working Memory (VSWM) task — features that might otherwise stay buried in scalp-wide, multi-band signal.

## Methods

The EEG data came from an OpenNeuro repository ([RRID: ds003523](https://openneuro.org/)). Rather than using every available subject, the mTBI (n = 27) and Healthy Control (n = 27) groups were carefully matched on demographics and task performance, so any classifier differences couldn't be chalked up to confounds — the two groups did not differ significantly by age (*p* = 0.67), sex (*p* = 0.58), or hit ratio (*p* = 0.97).

EEG epochs spanning three memory phases (encoding, retention, and retrieval) were decomposed into 5 frequency bands at each scalp site, then labelled by group and by trial accuracy (correct vs. incorrect). Random forest classifiers were trained on 60% of the data and evaluated on the held-out remainder.

## Results

Behavioral analyses of task performance by stimulus type and age group showed only tenuous differences between groups — underscoring the need for a more sensitive method than accuracy alone to tell mTBI and HC apart. That's where the EEG-based classifiers came in:

- **Model 1** (trial accuracy in HC): classified correct vs. incorrect trials at **85%** accuracy. Occipital beta at baseline, parietal theta at baseline, and parietal delta at encoding carried the highest importance.
- **Model 2** (trial accuracy in mTBI, cross-validated): reached **78%** accuracy, drawing on theta and beta bands across several channels.
- **Model 3** (diagnosis, correct trials only): reached **98%** accuracy, led by central-parietal beta at retention and posterior-occipital gamma and beta at encoding.
- **Model 4** (diagnosis, incorrect trials only): identified central gamma at retention and at baseline as the primary markers of group membership.

## Takeaways

Group differences that were nearly invisible in raw behavioral performance became sharply distinguishable once random forest was applied to the underlying EEG features — particularly when the model was restricted to correctly-answered trials, where diagnosis was recovered with 98% accuracy. The specific bands and phases that mattered most (beta and gamma around encoding and retention) point toward where mTBI leaves its clearest electrophysiological signature during working memory, and toward feature importance from tree-based models as a practical tool for narrowing down EEG biomarkers worth pursuing further.

## What Came Next

This project's within-subject validation approach — like most of the mTBI-EEG classification literature — leaves open the question of how well these classifiers would generalize to a patient they've never seen. That question became the focus of a follow-up methodological study, directly comparing within-subject and strict leave-one-subject-out validation on this same dataset. It's now written up as a [preprint / working paper](/publication/preprint/), currently being prepared for journal submission.
