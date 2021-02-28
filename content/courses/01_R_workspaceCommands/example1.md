---
date: "2021-01-11T00:00:00+01:00"
draft: false
linktitle: Example Setup
menu:
  example:
    parent: R tips
    weight: 1
title: Example Setup
toc: true
type: docs
weight: 1
---

## Example working directory setup

This is one of the working directory setups I frequently use, you can extend the number of packages as required

```{r, echo = FALSE}
.libPaths("/Users/williamcruz/Documents/R Packages") # change the path accordingly to your packages folder
r <- getOption("repos")
r["CRAN"] <- "http://cran.csie.ntu.edu.tw/"          # set repository to a National Repository in your country
options(repos=r)
library(pacman)
pacman::p_load(simstudy,minerva,pcaPP,parallel,dplyr,ggplot2,grid,
               scales,plyr,ggthemes,ggrepel,ggpubr,simFrame,corTest)

options(scipen = 99)               # turn off scientific notation (optional)
options(encoding = "UTF-8")        # Select the encoding of the files, not absolutely required
rm(list=ls())                      # Erasing all objects from the current work environment
cat("\014")                        # Erasing previous commands from the console
```
