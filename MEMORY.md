# Project Memory & Roadmap — WebsiteW (CV / About / Professional Front Door)

This file is the living plan and day-by-day log for `WebsiteW`, William Cruz's CV/About/
professional site (`starter-academic` / Wowchemy theme), live at `williamcruz.netlify.app`.
Update the "Log" section at the bottom every session: check off finished items, add new ones,
note blockers.

This file was split out from `psych_stat/MEMORY.md` on 2026-08-03, which until then tracked both
sites together. See `/Users/williamcruz/Documents/GitHub/psych_stat/MEMORY.md` for `psych_stat`'s
own plan (the technical knowledge-base site) — the two sites are cross-linked but tracked
separately now that work on `WebsiteW` has grown well beyond a side note.

## Role in the two-site plan

Decision (2026-08-01): two sites, cross-linked.
- `psych_stat` = technical knowledge base (R/MATLAB/Python/projects), at `psychstat.netlify.app`.
- **`WebsiteW` = CV/About/professional front door** (this repo), at `williamcruz.netlify.app`.

Cross-links so far (both directions now exist):
- `WebsiteW` → `psych_stat`: the "Courses" nav item links directly to `psychstat.netlify.app/en/`,
  and the "Stats Station" entry in the profile's Websites section links there too.
- `psych_stat` → `WebsiteW`: not yet added — do this once `psych_stat`'s own content exists
  (its Phase 4+).

## Repo basics

- Repo: `github.com/billytaipei101/WebsiteW`, local clone at
  `/Users/williamcruz/Documents/GitHub/WebsiteW`.
- Theme: `starter-academic` (Wowchemy), a proper academic/CV portfolio theme.
- Hosting: Netlify, linked to this GitHub repo with continuous deployment (confirmed).
- **Hugo version matters a lot here**: this theme is 2021-vintage and breaks on modern Hugo
  (e.g. `.Site.GoogleAnalytics` was removed in newer Hugo). Pinned to **0.83.1** in two places
  that must stay in sync:
  - `netlify.toml` → `HUGO_VERSION = "0.83.1"` (controls the live Netlify build)
  - `.Rprofile` → `options(blogdown.hugo.version = "0.83.1")` (controls local
    `blogdown::build_site()`/`serve_site()` in RStudio — these are independent settings, fixing
    one does not fix the other)
- William's workflow: he reviews and pushes via **GitHub Desktop** himself. Nothing gets pushed
  automatically in these sessions — commits are prepared and verified locally, then left for him.
- `WebsiteW-main` (`/Users/williamcruz/Documents/GitHub/WebsiteW-main`) is a redundant ZIP-download
  duplicate of this same repo, no remote attached — safe to delete, not yet done, William's call.

## Content structure notes (for future edits)

- Author/profile content: `content/authors/adminWill/_index.md` — bio, education, interests,
  languages, websites, social links. Rendered by a **site-level override** of the theme's About
  widget (`layouts/partials/widgets/about.html`) — the theme's stock version only supports
  Interests/Education; Languages and Websites sections were added by extending this override.
- Experience: `content/home/experience.md` — auto-sorted by `date_start` descending, no need to
  order entries manually in the file.
- Site-wide contact/social config: `config/_default/params.toml`.
- Site-level CSS/JS overrides live in `layouts/partials/custom_head.html` (the theme's sanctioned
  override hook for `<head>` additions) and `assets/js/custom.js` (loaded via the theme's
  `plugins_js` mechanism in `params.toml`) — used for the wave animation and section-spacing
  tweaks. Avoid duplicating this pattern casually; check here first before adding new custom CSS/JS.
- Blog posts: `content/post/<slug>/index.md`, each its own page bundle. A cover image is any file
  with `featured` in its name in that same folder (`featured.jpg`/`.png`) — auto-detected by the
  theme, no front-matter wiring needed.
- Build verification habit established this project: don't just "should work" — download the
  pinned Hugo 0.83.1 binary if not already at `/tmp/hugo083/hugo` (or wherever it's currently
  cached), run a real `hugo` build, and screenshot via headless Chrome
  (`google-chrome --headless --disable-gpu --window-size=W,H --virtual-time-budget=5000
  --screenshot=out.png URL`) when layout/visual changes are involved — the site's browser
  extension automation hangs on this theme's pages (persistent animation/script loop), so headless
  Chrome via Bash is the reliable fallback.

## Log

### 2026-08-01 — Discovery and recovery

- William recalled another personal website project; investigation led to two local folders:
  `WebsiteW` (real git clone, in sync with GitHub) and `WebsiteW-main` (redundant ZIP duplicate,
  no remote). `WebsiteW`'s content turned out to be the MDFriday "Long Teng" product-landing-page
  theme, personalized for a metals-trading placeholder ("Yieh Corp", Kaohsiung) — **not** the real
  personal site. Decision: Yieh Corp not needed, don't merge/reuse. (Initially treated as a dead
  end, in favor of building out `psych_stat` alone.)
- **Correction**: William noticed the *live* `williamcruz.netlify.app` site looked nothing like
  what building `WebsiteW` locally produced. Investigated: the live site was serving a stale
  successful deploy from *before* the Yieh Corp overwrite. Git history showed a Dec 31 2024 commit
  ("total") had accidentally wiped the real site (110k lines deleted) and replaced it with the
  Yieh Corp/Long Teng content — that commit likely broke the Netlify build (missing Hugo Module),
  so Netlify kept quietly serving the last good deploy, which is why the live site still showed
  the real content while the repo itself was broken.
- The real site: `starter-academic` (Wowchemy) theme, genuine content — bio, PhD (NCKU), MSc
  (NCCU), BSc (Universidad Nacional de Colombia), a real CV PDF, real email/LinkedIn/GitHub.
- Presented recovery options; William chose **"two sites, cross-linked"** (see Role section above).
- **Fixed**: restored the tree from the last good commit (`f3c888a`) as two new, non-destructive
  commits (no force-push, no history rewrite):
  1. `dcf500e` — restore the WC StatsPsy tree.
  2. `e7ba6a5` — housekeeping: gitignore `public/`/`resources/` (~250 build artifacts had been
     committed by accident), add `netlify.toml` pinning `HUGO_VERSION=0.83.1` explicitly, and
     drop the `netlify-cms-academic` module import from the theme's default config (renamed/
     restructured upstream, no longer resolves — it only powered the `/admin` CMS editor UI, not
     the public site, safe to drop).
  - Verified locally: downloaded a period-correct Hugo v0.83.1 extended binary, built the site
    (88 pages, 0 errors), served it locally, confirmed real content renders.
  - **Pushed**: William reviewed and pushed `dcf500e`/`e7ba6a5` via GitHub Desktop, plus his own
    `5e8c37e "housekeeping"` commit (legitimate stray blogdown render files). `origin/main`
    confirmed caught up.
  - **Local Hugo mismatch found**: William hit the same error locally via `blogdown::build_site()`
    — `netlify.toml`'s pin only affects Netlify, not local blogdown (was using system Hugo
    0.140.1). Fixed with `.Rprofile` pinning `blogdown.hugo.version = "0.83.1"`, mirroring
    `psych_stat`'s existing `.Rprofile`. William needs `blogdown::install_hugo("0.83.1")` once.

### 2026-08-01 → 2026-08-03 — Content and design pass

All committed locally, William reviews/pushes via GitHub Desktop as usual:

- **CV**: updated to William's current `cv_en.pdf`/`cv_en.tex` (source in `cv/`, published copy
  at `static/files/cv.pdf`, matching the "Download my resumé" link). Verified output matches.
- **Bio**: 3 rewrites per feedback — third-person → first-person → final pronoun-free
  descriptive-fragment style (CV-summary style, no "I"/"he"/name-as-subject).
- **Contact info**: replaced demo placeholders (test@example.org, Stanford address, Calendly)
  with real info. Removed Twitter/Skype/Keybase/forum links entirely. Kept only real email +
  WhatsApp (no raw phone number). Address is "Kaohsiung, Taiwan" only. Map re-enabled at
  city-level coordinates/zoom (was briefly disabled, then re-enabled per follow-up). Added GitHub
  link alongside WhatsApp.
- **Interests**: added Decision-Making & Judgment, Multi-Agent Systems, Computational Social
  Science (subtly aligned with a postdoc job posting William was considering, phrased as natural
  extensions rather than copying the ad's language) — Multi-Agent Systems later removed.
- **Profile photo**: replaced with William's supplied photo, overwrote
  `content/authors/adminWill/avatar.jpg`.
- **Wave animation section** (between Skills and Experience): two design pivots — (1) a
  stats/facts number row (2019/3/9+/3+) inspired by an alphasights.com component William
  described; (2) William clarified he meant alphasights.com's canvas dot-wave animation instead,
  so the numbers were replaced entirely with a custom vanilla-JS canvas particle wave (no new
  library). Iterated on visual style (reverted a too-scattered jitter version back to William's
  preferred grid-aligned "stacked" dots, enlarged them), and fixed a real theme quirk: this
  Wowchemy theme subtly alternates section background shades odd/even (~2% lightness difference
  in dark mode) — forced the wave section to match the page's true background exactly. Section
  spacing tightened via targeted per-section CSS overrides in `custom_head.html`.
- **Skills**: removed "Photography".
- **Experience** (built up across multiple requests, see structure notes above for the
  auto-sort behavior): removed the English-tutor entry (focus on real field experience per
  William's request); added CEO @ ApexFintech (2025–present); added Research Assistant @ NCKU VR
  research (2019–present); corrected ICFES end date to Aug 2019 (was mis-set to Dec 2018); added
  an earlier NCKU Eye Movement & Reading Lab RA role (2013–2015, per William's direct correction —
  differs from what the CV text says, trusted William's statement); added Research Intern @ Trend
  Micro (Jan–Sep 2015) and three 2011–2012 Colombia roles (Research Assistant @ Universidad
  Antonio Nariño, Psychometrician @ Universidad Nacional de Colombia, Auditor @ Universidad
  Nacional de Colombia) straight from the CV. **8 entries total**, ApexFintech (2025) back to the
  Auditor role (Mar 2011).
- **New Languages section**: added below Interests/Education (required the site-level About
  widget override) — Spanish/Native, English/Fluent, Chinese/Intermediate, with two iKnow badge
  images (3,500 items mastered, 650 hours studied) under Chinese. Badge PNGs moved from `assets/`
  (not served) to `static/media/badges/`.
- **New Websites section**: added below Languages (title + hyperlink + description) — Apex
  Fintech (Algorithmic Trading), Scroll Master (Speed Reading App), Stats Station (→
  `psychstat.netlify.app/en/`, the psych_stat cross-link).
- William confirmed pushing through this batch himself (his own commit `ded954e "NewNew"`
  landed on top, just committing a stray profile-photo source file — no conflicts).

### 2026-08-03 — Posts, Courses nav, more Experience

- **All three "Recent Post" demo entries replaced** with real content:
  - "Hello R Markdown" (stray copy, no `.Rmd` source, `content/post/2020-12-01-r-rmarkdown/`) →
    **`content/post/mvpa-notebooks/`**: writeup of
    `github.com/billytaipei101/A-JUPYTER-notebooks` (fetched the repo's README via GitHub API to
    summarize accurately — MVPA on fMRI data, MATLAB + Python notebooks, real decode-accuracy
    results). Cover image generated by William from a provided prompt. Date corrected to the true
    one, May 15, 2023 (was auto-set to session date).
  - "Display Jupyter Notebooks with Academic" (theme demo, `content/post/jupyter/`) →
    **`content/post/guitar-tabs/`**: writeup of
    `github.com/billytaipei101/1-GITHUB_GUITAR_TABS` (guitar tabs typeset in LaTeX +
    `guitartabs`, plus William's ASCII-to-LaTeX converter script). Cover image added same way.
  - "Writing technical content in Academic" (theme demo,
    `content/post/writing-technical-content/`) → **`content/post/flight101-ecommerce/`**: a
    "preliminary study" writeup of `flight101.wi-cruzm.workers.dev`, an early-stage bilingual
    (EN/中文) e-commerce landing page for Japanese premium stationery on Cloudflare Workers.
    Cover image supplied directly by William (visually different style from the other two
    AI-generated dark-navy covers — flagged, left as William's choice).
  - Found and deleted a **second, older "Hello R Markdown" duplicate**
    (`content/post/testi/`, the real blogdown starter post with `.Rmd` source, dated 2015) missed
    in the first pass.
  - **Gotcha resolved**: William reported still seeing a deleted post live at `localhost:4321`.
    Diagnosed: a long-running `blogdown::serve_site()` Hugo dev server (found via
    `ps aux`/`lsof -i :4321`, running since before the deletions) with stale live-reload state —
    Hugo 0.83.1 doesn't always handle bulk `rm -rf`-style deletions cleanly. Fix:
    `blogdown::stop_server()` + `blogdown::serve_site()` to restart clean. **If this happens
    again: check for a stale local dev server (`ps aux | grep hugo`, `lsof -i :<port>`) before
    assuming a fix didn't take.**
- **Courses nav item**: removed the local Courses section entirely (demo content + William's
  started-but-unused "01_R_workspaceCommands") and pointed "Courses" directly at
  `https://psychstat.netlify.app/en/` (opens in new tab, theme's nav template already handles
  absolute URLs correctly). Second, more prominent cross-link to `psych_stat`.
- **Experience**: added the four remaining CV roles (Trend Micro + three Colombia roles) — see
  full list above.
- `WebsiteW` is **10 commits ahead of `origin/main`** as of this entry (on top of `ded954e`),
  none pushed yet.

### 2026-08-03 — Memory split

This file created, splitting `WebsiteW`'s history out of `psych_stat/MEMORY.md` (which tracked
both sites together up to this point) per William's request. `psych_stat/MEMORY.md` keeps its own
plan/phases and a short pointer here instead of full `WebsiteW` detail.

### 2026-09-25 — Bilingual CV download (English + Chinese)

- **CV pipeline clarified**: source of truth is `cv/cv_en.tex` → compiled to `cv/cv_en.pdf` →
  copied to `static/files/cv.pdf`, which is what the "Download my resumé" link on the profile
  page (`content/authors/adminWill/_index.md`) actually serves. Compiling requires
  `friggeri-cv.cls` plus Lato/texgyreheros font files that live only in William's local
  `~/Desktop/C_WORK/8_CV/CV_Project/` folder, not in this repo — grabbed temporarily to compile
  and verify, not committed (same "don't commit build tooling" pattern as the Hugo binary).
- **Discovered a divergence**: that Desktop `CV_Project` folder has a newer, more detailed
  `cv_en.tex` (compiled Aug 14, later than this repo's copy) with additional content — a "Vision
  Laboratory, NCKU" current role, consolidated teaching-job entries, split Publications/
  Conferences sections, custom color-cycling section headers. **William's call: keep this repo's
  simpler `cv_en.tex` as-is for now** — the Desktop version was not synced in. Revisit if he wants
  the site's CV to match his newer Desktop draft.
- **Added Chinese CV**: `cv/cv_zh.tex` existed only as a stale, uncompiled draft (older project
  list, missing a 2023 conference entry, different section order, included a profile photo
  `cv_en.tex` doesn't have). Fully resynced its content/order to match the current `cv_en.tex`
  exactly, translated, then compiled and verified (3 pages, correct CJK rendering via headless
  Chrome screenshot of the rendered PDF pages). Published to `static/files/cv_zh.pdf`.
- **Profile page**: the single "Download my resumé" line is now two lines — "Download my resumé
  in English" (→ `cv.pdf`) and "Download my resumé in 中文" (→ `cv_zh.pdf`) — William's explicit
  phrasing choice (kept the sentence in English rather than fully translating the Chinese option's
  label).
- Verified with a real Hugo 0.83.1 build (0 errors) + headless-Chrome screenshot of the homepage
  showing both lines rendering correctly and both PDF URLs returning 200.
- Committed (`3cc7993`) but not pushed, per William's usual GitHub-Desktop-review workflow.
  Left unrelated pre-existing uncommitted changes (`menus.toml` Courses-link edit, a `cv_en.tex`
  comment-line edit, `.DS_Store`, untracked `Empirica/`) untouched/uncommitted since they predate
  this session and aren't part of this task.
- **Follow-up same session**: the uncommitted `menus.toml` Courses-link edit had a typo —
  `psycoder.netlify.app` instead of `psychstat.netlify.app` (the actual live Stats Station site,
  confirmed correct by William). Fixed in place; still uncommitted along with the rest of that
  pre-existing diff, left for William to commit/push himself.
- **Bug found and fixed same session**: William reported the Chinese CV's header (name/tagline
  banner) wasn't rendering. Root cause was two bugs in `friggeri-cv.cls`, not a translation issue:
  (1) the header is drawn via a TikZ `remember picture, overlay` node, which needs **two xelatex
  passes** to draw at all — the first CV build only ran one pass; (2) the class's default
  `\section` macro colors only the first 3 tokens of a title (a stylistic split like "sum"+"mary"),
  which crashes with a "Runaway argument" error on short CJK titles like "學歷" (2 characters).
  Fixed by overriding `\section` in `cv_zh.tex` to color the whole title instead of splitting it
  (also fixes it for any future short-title section). Also swapped a `・` (katakana interpunct,
  missing from Heiti TC) for `·` in the tagline. **Any future CV rebuild must run xelatex twice**
  (or via `latexmk`) or the header silently disappears with no error — verified via headless-Chrome
  screenshots of all 3 pages after the fix. Committed as `d603e36`.
- **Reversal same session**: William reviewed his Desktop `CV_Project/cv_en.tex` more closely and
  confirmed it (not the repo's simpler version) is the one he wants live — reversing the earlier
  "keep repo's simpler cv_en.tex" call. Synced it in: new tagline ("Cognitive Science ·
  Computational Behavioral Research · Advanced Statistics"), new Vision Laboratory NCKU RA role
  (current), teaching jobs consolidated into one 2015–2024 entry, Conferences and Publications
  split into two sections, extended 9-color section-heading palette (added teal/gold/coral/
  indigo). Found and fixed a real bug carried over from the Desktop source: an unescaped `&` in
  "Spatial Cognition & VR Methods" broke xelatex compilation (`Misplaced alignment tab character`)
  — **fixed here but William's Desktop master copy still has the bug**, flagged to him directly to
  fix there too. `cv_zh.tex` fully resynced again to match (extended the earlier crash-fix's color
  cycle to all 9 colors). Site bio paragraph (`content/authors/adminWill/_index.md`) intentionally
  **left unchanged** — William's call to keep it as independently-maintained copy, not mirroring
  the CV's new framing. Verified both PDFs compile cleanly (2 xelatex passes each) and render
  correctly via screenshots of all pages. Committed as `c4b0356`.

## Still open

- `WebsiteW-main` duplicate folder — not deleted yet, William's call.
- William hasn't confirmed pushing the latest (posts/Courses/Experience) batch yet.
- No reciprocal cross-link from `psych_stat` back to `WebsiteW` yet (waiting on `psych_stat`
  having real content to link from).
- Visual inconsistency flagged, not fixed: the Flight 101 post's cover image (pastel gradient) vs.
  the other two posts' dark-navy AI-generated covers — William's choice, not acted on.
- Desktop `CV_Project/cv_en.tex` still has the unescaped-`&` bug ("Spatial Cognition & VR
  Methods") that was fixed in this repo's copy — William needs to fix it there too (`\&`) so his
  master source compiles and stays consistent with the repo.
- Uncommitted at end of 2026-09-25 session: `menus.toml`'s Courses-link fix (psychstat, not
  psycoder) and unrelated pre-existing changes (`.DS_Store`) — left for William to review/push via
  GitHub Desktop.
