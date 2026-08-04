---
abstract: A practical reference guide for researchers without a strong statistics background, walking through the main multivariate techniques used in the social sciences — what each one is for, what assumptions it requires, and how to tell dependence techniques (ANOVA, MANOVA, multiple regression, discriminant analysis, logistic regression, SEM) apart from interdependence techniques (factor analysis, cluster analysis, PCA, neural networks). Three worked examples, built from real datasets, show what goes wrong in practice when a technique's assumptions are ignored.
authors:
- Avendaño-Prieto BL
- Avendaño-Prieto G
- adminWill
- Cárdenas-Avendaño A
date: "2014-01-01T00:00:00Z"
doi: ""
featured: false
links:
- icon: researchgate
  icon_pack: fab
  name: Read on ResearchGate
  url: https://www.researchgate.net/publication/287897786_Guia_de_referencia_para_investigadores_no_expertos_en_el_uso_de_estadistica_multivariada
projects: []
publication: '*Diversitas: Perspectivas en Psicología*, 10(1), 13–27'
publication_short: ""
publication_types:
- "2"
summary: A reference guide walking non-expert researchers through the main multivariate statistical techniques (ANOVA, MANOVA, regression, discriminant analysis, SEM, factor analysis, cluster analysis, PCA), with real-data examples of what breaks when their assumptions are ignored.
tags:
- Statistics
- Multivariate Analysis
- Research Methods
title: Guía de Referencia para Investigadores no Expertos en el Uso de Estadística Multivariada
url_code: ""
url_dataset: ""
url_pdf: ""
url_poster: ""
url_project: ""
url_slides: ""
url_source: ""
url_video: ""
---

## Why This Guide Exists

Researchers who aren't statisticians tend to hit the same wall: they know what question they want to answer, but not which technique actually answers it, what it assumes about the data, or how to read the output once they have it. That gap tends to breed a negative attitude toward quantitative methods long before it becomes a technical problem. This guide was written as a practical bridge — a single reference that lays out the major multivariate techniques used in social-science research, the minimum assumptions each one requires, and, critically, what happens when those assumptions get skipped.

## Dependence vs. Interdependence

The guide organizes multivariate techniques along one central distinction:

- **Dependence techniques** designate some variables as independent (predictors) and others as dependent (outcomes) in advance. This family covers **ANOVA**, **MANOVA** (ANOVA extended to multiple simultaneous dependent variables), **Multiple Linear Regression**, **Discriminant Analysis**, **Logistic Regression**, and **Structural Equation Models (SEM)**.
- **Interdependence techniques** don't assume any variable is independent or dependent — all variables are analyzed jointly and simultaneously. This family covers **Factor Analysis**, **Cluster Analysis**, **Principal Component Analysis (PCA)**, and **Neural Networks**.

For each technique, the article lays out its purpose, typical use cases, and the specific statistical assumptions that must hold — normality (Kolmogorov-Smirnov, Shapiro-Wilk, Mardia's test), homoscedasticity (Box's test), absence of multicollinearity, minimum sample size, and so on — before it can be trusted.

## Three Cautionary Examples

Rather than stop at theory, the guide walks through three real-data cases where skipping an assumption check produces misleading conclusions:

1. **Factor analysis and sample size.** A 79-item organizational climate survey, administered to 1,825 employees across 3 countries, was theoretically expected to yield 9 factors. Re-running the same factor analysis at shrinking sample sizes (from the full 1,825 down to just 36 respondents) shows the number of extracted factors climbing from 10 up to 19, with "explained variance" inflating from 58.6% to over 90%. The technique doesn't fail loudly — it just quietly produces a more impressive-looking, and wrong, structure as the sample shrinks below the recommended *n* ≈ 10 × (number of items).
2. **Multicollinearity in multiple regression.** Using data from 5,493 Colombian adolescents (ages 10–18), the guide models depression as a function of two risk factors: negative affect and stressful life events. Checked individually, negative affect correlates with depression at *r* = 0.79, but stressful life events barely register (*r* = 0.23, not significant) — which already disqualifies simple multiple regression, since the predictors turn out to be correlated with each other too. Running the regression anyway would have suggested both variables jointly "explain" 64% of the variance in depression, masking the fact that essentially all of that signal comes from a single predictor.
3. **Measurement scale in PCA.** Plotting height against weight using visually "equal" axis intervals makes the two variables look unrelated. Rescaling the axes to reflect each variable's *actual* measurement units reveals a clear, strong relationship. The lesson: components and correlations computed on inconsistently scaled variables can hide relationships that are perfectly obvious once the scaling is fixed.

## Takeaway

None of the techniques covered are inherently difficult to use — modern statistical software (SPSS, R, MATLAB, STATISTICA) makes running any of them a matter of a few clicks. The actual risk is running a sophisticated technique mechanically, without checking whether its assumptions hold for the data at hand. As the three examples show, violating an assumption rarely causes an obvious error message; it just quietly returns a number that looks legitimate and isn't. The guide's underlying argument is that choosing the right multivariate technique — and verifying its assumptions — matters at least as much as the sophistication of the technique itself.
