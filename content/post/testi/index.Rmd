---
title: "Hello R Markdown"
author: "Frida Gomam"
date: 2015-07-23T21:13:14-05:00
categories: ["R"]
tags: ["R Markdown", "plot", "regression"]
output: 
  bookdown::html_document2:
    fig_caption: yes
    
---

```{r setup, include=TRUE}
knitr::opts_chunk$set(echo = FALSE)
```

# R Markdown

This is an R Markdown document. Markdown is a simple formatting syntax for authoring HTML, PDF, and MS Word documents. For more details on using R Markdown see <http://rmarkdown.rstudio.com>.

You can embed an R code chunk like this:

```{r cars, echo=TRUE}
summary(cars)
fit <- lm(dist ~ speed, data = cars)
fit
```

# Including Plots

You can also embed plots, for example:

```{r pie, echo=FALSE, fig.cap="A fancy pie chart",fig.show = 'hide'} 
par(mar = c(0, 1, 0, 1))
pie(
  c(280, 60, 20),
  c('Sky', 'Sunny side of pyramid', 'Shady side of pyramid'),
  col = c('#0292D8', '#F7EA39', '#C4B632'),
  init.angle = -50, border = NA
)
```
![A fancy pie chart.](img/pie.png)


