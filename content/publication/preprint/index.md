---
abstract: Mild traumatic brain injury (mTBI) disrupts working memory (WM), yet EEG-based classification research in this area rarely confronts a basic methodological problem — most reported accuracies come from within-subject validation, which can substantially inflate apparent performance relative to testing on unseen patients, the condition a clinical biomarker actually requires. Using mTBI and a visuospatial WM task as a test case (29 mTBI and 29 age- and sex-matched healthy Controls; OpenNeuro ds003523), we directly compared within-subject and strict leave-one-subject-out (LOSO-CV) validation, with permutation-based significance testing throughout, to quantify this generalization gap. Within-subject validation overstated cross-subject accuracy by as much as 0.15 balanced accuracy. Under LOSO-CV, a modest but statistically detectable cross-subject effect emerged when predicting trial-level WM performance within the mTBI group; the parallel analysis in healthy Controls was null. No EEG feature set reliably classified mTBI versus healthy-control diagnosis between subjects under LOSO-CV, consistent with the small observed effect sizes and limited statistical power available at this sample size. Together, these findings quantify how much apparent EEG-classification accuracy in this literature may reflect subject-specific information rather than a generalizable signal, and they offer a replicable LOSO-CV-with-permutation template for evaluating clinical EEG classifiers in small samples.
authors:
- adminWill
- Cavanagh JF
- Huang Pi-Chun
date: "2026-07-27T00:00:00Z"
doi: ""
featured: true
links:
- icon: project-diagram
  icon_pack: fas
  name: Original Project Writeup
  url: /project/example/
projects:
- example
publication: '*Preprint / working paper*'
publication_short: ""
publication_types:
- "3"
publishDate: "2026-07-27T00:00:00Z"
summary: A methodological follow-up to the 2022 VSS random forest study, directly comparing within-subject and strict leave-one-subject-out (LOSO-CV) validation on the same mTBI EEG dataset — and finding that within-subject accuracy was inflated by up to 0.15 balanced accuracy, with diagnosis classification failing to generalize to unseen patients.
tags:
- EEG
- Machine Learning
- Neuroscience
- Methodology
title: 'EEG Classification of Visuospatial Working Memory in mTBI: Within-Subject Inflation, Diagnostic Null, and LOSO-CV Benchmarking'
url_code: ""
url_dataset: ""
url_pdf: ""
url_poster: ""
url_project: ""
url_slides: ""
url_source: ""
url_video: ""
---

*William Cruz Molina, James F. Cavanagh, Pi-Chun Huang.* Department of Psychology, National Cheng Kung University, Tainan, Taiwan; Department of Psychology, University of New Mexico, Albuquerque, New Mexico, USA.

## Why This Follow-Up

The [random forest / EEG classification project](/project/example/) presented at VSS 2022 — like most of the mTBI-EEG classification literature — reported strong accuracy using **within-subject validation**, where trials from the same participant appear in both the training and test sets. That's a methodologically convenient approach, but it lets a classifier exploit a person's own stable EEG "fingerprint" rather than a genuinely generalizable signal. A model built this way can look highly accurate while carrying almost no information about how it would perform on a patient it has never seen — which is exactly the condition a real clinical biomarker has to meet. This working paper directly tests how large that gap actually is, using the same dataset, task, and general classification approach as the earlier project.

## What Changed Methodologically

Working from the same OpenNeuro visuospatial working memory (VSWM) dataset (ds003523), this analysis used a tighter, more conservative pipeline throughout:

- **Sample:** 58 participants (29 mTBI, 29 age- and sex-matched healthy Controls) from Session 1 (3–14 days post-injury), after quality screening and 1:1 propensity-score matching.
- **Classifier:** shrinkage linear discriminant analysis (sLDA) with Ledoit-Wolf covariance regularization — a more conservative choice than random forest for a feature space this size.
- **Validation:** strict leave-one-subject-out cross-validation (LOSO-CV), directly contrasted against a within-subject 60/40 split (the kind of split used in the original VSS 2022 analysis), with 1,000-permutation significance testing throughout.

Two questions were asked: can EEG features predict trial-level WM accuracy *across* unseen subjects within each group, and can EEG features classify mTBI vs. healthy-control diagnosis in a subject the classifier has never encountered?

## Key Findings

- **Within-subject validation inflated apparent accuracy.** The 60/40 within-subject split reached 0.655 balanced accuracy in the mTBI group and 0.577 in Controls — well above what the same features achieved under LOSO-CV.
- **Trial-level WM decoding within mTBI was real, but modest.** Under strict LOSO-CV, the classifier predicted correct vs. incorrect WM trials in the mTBI group at 0.508 balanced accuracy — small in absolute terms, but statistically significant against its permutation null (*p* = .004) and surviving Benjamini–Hochberg correction. The identical analysis in healthy Controls was null (*p* = .842).
- **Diagnosis (mTBI vs. Control) did not generalize.** None of the five EEG feature sets tested — spectral power, ERP amplitude, probe P300, or a combined 900-feature set — classified diagnosis between unseen subjects above chance (all *p* > .23). A univariate effect-size survey across all 900 features found the median between-group effect was small (Cohen's *d* = 0.14), peaking at *d* = 0.46 for retention-phase delta power at right fronto-temporal electrode FT8 — an effect size this sample was only powered to detect about 41% of the time even at its strongest.
- **The largest spectral differences were right-lateralized and reduced in mTBI** (delta, alpha, and beta power at FT8, F8, P8), while two ERP components at parietal sites were elevated in mTBI relative to Controls — a pattern that didn't translate into reliable between-subject classification at this sample size.

## Why It Matters

The central contribution isn't a diagnostic classifier — a balanced accuracy of 0.508 has no standalone clinical utility. It's the direct, apples-to-apples comparison of validation schemes on the same data: it quantifies how much of the accuracy reported in this literature (including the earlier VSS 2022 analysis) may reflect subject-specific EEG signatures rather than a signal that would transfer to a new patient. The paper also offers a reusable LOSO-CV-with-permutation template for evaluating clinical EEG classifiers built on small samples, where this generalization gap is easy to miss.

This is a preprint / working paper, currently being prepared for journal submission.
