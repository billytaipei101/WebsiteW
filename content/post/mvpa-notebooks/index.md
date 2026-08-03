---
title: "MVPA Lab Notebooks: Decoding fMRI Patterns in MATLAB and Python"
subtitle: "Two narrative Jupyter notebooks on Multi-Voxel Pattern Analysis, now on GitHub"
summary: "A walkthrough of a small repo of lab notebooks on Multi-Voxel Pattern Analysis (MVPA) for fMRI — one notebook per toolchain, MATLAB and Python, including full environment setup and real decoding results."
authors:
- adminWill
date: "2023-05-15"
categories: ["Neuroscience", "Machine Learning"]
tags: ["MVPA", "fMRI", "Python", "MATLAB", "PyMVPA", "Jupyter"]
image:
  caption: ""
  focal_point: "Center"
---

I've published a small repo of lab notebooks, [**A-JUPYTER-notebooks**](https://github.com/billytaipei101/A-JUPYTER-notebooks), documenting how I ran **Multi-Voxel Pattern Analysis (MVPA)** on fMRI data — one notebook per toolchain, MATLAB and Python. They're written as narrative lab notebooks rather than turnkey scripts: real API calls mixed with commands run directly in a terminal or MATLAB console while working through each toolbox for the first time, hard-coded local paths and all. That's intentional — it's meant to be read as a record of the process, not just a finished pipeline.

## What is MVPA?

Unlike a conventional univariate GLM analysis, which tests single voxels independently, MVPA jointly analyzes distributed patterns of activity across voxels within a region. That's what makes "brain reading" — decoding a mental state directly from a pattern of fMRI activity — possible in the first place. A standard GLM answers "is there more BOLD signal in region X during condition A vs. B?" MVPA answers a different question: "is the *pattern* different between conditions, regardless of overall signal magnitude?"

## Notebook 1 — MATLAB

Covers two MATLAB-based approaches, both built on [Neuroelf](https://neuroelf.net/):

- **[Princeton MVPA Toolbox](https://github.com/princetonuniversity/princeton-mvpa-toolbox)**, applied to the classic Haxby et al. 8-category visual object dataset. After building the `subj` structure, z-scoring, and voxel-wise feature selection, a leave-one-run-out cross-validated backprop classifier reached **~49.4% accuracy** on an 8-way classification (chance = 12.5%).
- **[Searchmight](http://www.franciscopereira.org/searchmight/)**, applied to a visual-field dataset with a Neurosynth-derived visual-cortex mask, classified with LIBSVM — **~83% accuracy** on the intra/inter condition split, notably higher than the backprop pipeline above.

## Notebook 2 — Python

Effectively a system-setup diary followed by a hands-on tour of [PyMVPA](http://www.pymvpa.org/)'s `Dataset` object: standing up NeuroDebian from a fresh Debian install, working through dependency installs (including a documented failed attempt at compiling Shogun from source — left in, because that's part of the record too), then loading real fMRI data with `fmri_dataset()`, masking to voxels of interest, inspecting per-sample and per-feature attribute collections, and persisting datasets to HDF5.

## Read the full walkthrough

The repo's [README](https://github.com/billytaipei101/A-JUPYTER-notebooks) is a full guided walkthrough of both notebooks, section by section, so you can follow the material without opening the raw `.ipynb` files first.
