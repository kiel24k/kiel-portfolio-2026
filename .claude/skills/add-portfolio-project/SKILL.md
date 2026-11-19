---
name: add-portfolio-project
description: Use when adding or updating a project, skill, education entry or profile detail on Kiel's portfolio (Frontend/src/data/portfolio.ts), including from Tagalog/Taglish notes or a new resume.
---

# Add or Update Portfolio Content

Kiel's portfolio (React + TypeScript + Tailwind CSS + shadcn/ui, built with Vite) is driven by data.
All content lives in `Frontend/src/data/portfolio.ts`, typed by `Frontend/src/data/types.ts`. Components
render that data automatically: a new project appears as a card in "Projects at a glance" on the home
page and gets its own page at `/projects/<slug>` (sticky "Back to projects" bar, live-demo notice, full
feature accordion, previous/next links in `projects` order). **You almost never need to touch a component.**

Paths below are relative to the repository root (`C:\Users\kiel\Desktop\Portfolio - 2026`).

## 1. Read before writing (always)

Read these in full first; the files are the source of truth, not this skill:

- `Frontend/src/data/types.ts`: the exact interfaces (`Project`, `FeatureGroup`, `Stat`, `TechStack`,
  `ProjectKind`, `SkillGroup`, `Education`, `Profile`, `Portfolio`). If it differs from what this skill
  says, follow the file.
- `Frontend/src/data/portfolio.ts`: current content, project order, and wording style to copy.
- Any source the owner gives you (notes `.txt`, resume PDF, chat message). Read it all, not just the
  start. Earlier sources live in `.agent-studio/uploads/`.

Know where things belong:

| File | Holds | Edit it when |
| --- | --- | --- |
| `Frontend/src/data/portfolio.ts` | all portfolio content | almost always (the only file in most tasks) |
| `Frontend/src/data/types.ts` | data interfaces | only if the owner asks for a new field or project kind |
| `Frontend/src/data/site.ts` | UI copy: nav, headings, labels, `ui.kinds` | only for interface wording or a new `ProjectKind` |
| `Frontend/public/resume/Ezekiel-Bermudez-Resume.pdf` | downloadable resume (`profile.resumeUrl`) | when the owner gives a new resume PDF (replace the file, keep the name) |
| `Frontend/src/components/**` | rendering only | do not edit for content changes |

Never put portfolio content in components or `site.ts`, and never put UI labels in `portfolio.ts`.

## 2. Gather the 5 facts per project

The owner writes notes in this numbered format (often Tagalog/Taglish). Collect all five; if any is
missing, ask rather than guess:

1. **Para kanino (who it is for)** -> `audience`, and `kind` (`'Client / Production'`, `'Personal'` or `'Academic'`)
2. **Tech Stack** -> `stack` (`frontend`, `backend`, `database`, `devops`, optional `hardware`)
3. **Role mo at Main Features (role and features)** -> `role`, `responsibilities`, `featureGroups`
4. **Timeline** -> `timeline`, and `status`
5. **Results o numbers** -> `results` (the hero has no headline stats any more; numbers live on the projects)

Phrases like "parehas lang ng nasa HRIS" ("same as HRIS") mean: copy the referenced project's values,
then apply only the stated differences (e.g. the School System uses the HRIS stack but with
Node.js/Express/Prisma instead of Laravel). Say in your report which values you carried over.

## 3. Hard rules

- **Translate** Tagalog/Taglish into clear, professional US English a recruiter can scan quickly. Use US
  spelling as the existing data does (program, counseling, aging, not programme, counselling, ageing).
- **Unabridged features.** Every feature line in the source becomes its own string in `featureGroups[].items`.
  Never merge lines, never drop "minor" ones, never write "and more" / "etc.". You may *split* a run-on
  sentence into its separate features, never the other way round. Count source lines vs. output items
  and make the counts match.
- **Never invent** numbers, users, clients, dates, links, testimonials or technologies. Unknown
  values: `results: []`, `timeline: ''`, `role: ''`, `audience: ''` (the UI hides empty facts on the
  project card and page), and add an honest line to `notes`, e.g. `'No users yet – this is a personal side project.'`
  Estimates stay labelled as estimates (see the School System `500+` "(est. minimum)" stat and its note).
- **Conflicts** (e.g. resume vs. notes): prefer the more specific/recent source, apply it consistently
  everywhere (project fields, `results`, `profile.summary`), and report the conflict.
- **Fix obvious typos** ("Sachool" -> "School", "health chec" -> "health checks") without changing meaning.
- `portfolio.ts` stays plain data: no JSX, no functions, no runtime logic beyond constants such as the
  shared `nodeStack`. It must compile under TypeScript `strict`.

## 4. Match the existing style

Copy what `portfolio.ts` already does:

- **Order**: `projects` follows the resume order (currently HRIS, School Management System, RFID Library
  Management System, Agent Studio, Virtual Learning System, Inventory Management of FCIE). For a new
  project, put it where it sits on the resume. If it is not on the resume, **ask the owner where to
  insert it** (offer a suggestion: client/production work first, then personal, then academic). The
  order also sets the card order on the home page and the previous/next links on project pages.
- **Comment banner** above each project object, like the existing ones:
  `// ------------------------------------------------------------------ HRIS`
- **slug**: kebab-case (lowercase letters, digits, hyphens) and unique. It is the project page URL,
  `/projects/<slug>`, so changing an existing slug breaks shared links to that page; ask before you do
  it. Old `/#<slug>` links redirect to the project page automatically, so a slug must not equal a
  home-page anchor: `projects`, `skills`, `education`, `contact`, `top`, `main` (those always stay on the
  home page; see `homeAnchorIds` in `src/lib/routes.ts`).
- **name / shortName**: full name and a short label (e.g. `'Human Resource Information System'` / `'HRIS'`).
  If they are the same, repeat the name; the UI then hides the short name.
- **status**: short, honest, with an en dash for qualifiers: `'In production'`,
  `"Completed Nov 2026 – handed over to the school's consultant"`, `'Pre-deployment – deployment planned'`.
- **timeline**: `'Dec 2025 – Jul 2026'` style (three-letter month, en dash with spaces), `'Nov 2026 (completed)'`,
  a year like `'2025'`, or `''` if unknown.
- **tagline**: one sentence ending in a period, saying what it is (and its biggest number if there is one).
- **summary**: 1-3 resume-level bullets, full sentences ending in periods, starting with a past-tense
  verb ("Built…", "Added…", "Delivered…"). Lead with what it does and for whom, then numbers, then detail.
- **responsibilities**: what Kiel personally owned, short phrases without periods, e.g.
  `'Full stack development: frontend, backend and database'`, `'Server maintenance'`, `'System backups'`, `'Testing'`.
- **results**: `{ value, label }` with the number in `value` only, en dash for ranges: `{ value: '64–70', label: 'companies' }`.
  Numbers must come from the sources. No number -> `[]`.
- **stack**: put the most important items first in each list. The project card's "Key stack" line shows
  the first 2 frontend, first backend, first database and first hardware item. Reuse `nodeStack` when a
  project has exactly that stack; extend it with spread syntax (`{ ...nodeStack, hardware: [...] }`) for
  small differences. Use `devops: []` when none is given (the field is required).
- **featureGroups**: keep the owner's own headings when the notes have them, translated and in Title Case
  with `&` instead of "and" (`'Website & Login'`, `'Finance & Cashier'`, `'Guidance & Clinic (Confidential)'`).
  When the notes give a flat list with no headings, group related items under clear Title Case headings
  (e.g. `'Payroll & Compensation'`, `'Organization & Access'`). HRIS now uses the owner's own 41 headings
  from `.agent-studio/uploads/20261118-HRIS-features-v2.txt` (translated, `&` for "at"/"and"); keep them
  as they are. Items are sentence case, no
  trailing period, no Oxford comma ("payments, official receipts, voids and reprints"), with
  abbreviations spelled out once where helpful ("Role-Based Access Control (RBAC) design").
- **No duplicate strings** inside the same list (`items`, `summary`, `responsibilities`, `notes`) or
  duplicate `value`+`label` pairs in `results`; they are used as React keys.
- **notes**: optional honest caveats only (estimates, not deployed, no users yet, details missing).
  Do not add a "no public link / production" note per project: every project page already shows the
  live-demo notice, worded by the project's `kind` (`ui.demoNotice.project` in `site.ts`: a client
  production system cannot be shared, a personal or academic one is not publicly deployed). Edit the
  wording there, not in `portfolio.ts`, and make sure the project's `kind` matches why it has no link.

### Skills, education and profile

- **Skills**: add to an existing `skills[].category` where it fits (Frontend, Backend, Database,
  DevOps & Tools, AI-Assisted Development, Soft Skills); create a new category only if none fits. Only
  add a skill the owner actually uses or lists. If a new project uses a technology missing from
  `skills`, point it out and ask whether to add it.
- **Education**: `{ school, degree, coursework }`, coursework from the resume only.
- **No headline stats**: the owner removed the hero's stat cards (Nov 2026) and `Profile` has no
  `headlineStats` field. Do not re-add them unless the owner asks; strong numbers go in project `results`
  (and, if the owner wants, in `profile.summary`).
- **profile.summary**: update only when the owner asks or a fact in it is now wrong (e.g. years of
  experience). It also feeds the page `<title>`/meta via `vite.config.ts`, so keep `name`, `title` and
  `location` accurate. `profile.location` is the country only (`'Philippines'`), at the owner's request
  (Nov 2026).
- **New project kind**: adding to `ProjectKind` in `types.ts` also requires a label in `ui.kinds` in
  `site.ts` and its own live-demo notice copy in `ui.demoNotice.project` (both use
  `satisfies Record<ProjectKind, ...>`, so the build fails otherwise). Ask first.

## 5. Verify

From the `Frontend` folder run both and fix every error or warning you introduced:

```bash
cd "C:/Users/kiel/Desktop/Portfolio - 2026/Frontend" && npm run build
cd "C:/Users/kiel/Desktop/Portfolio - 2026/Frontend" && npm run lint
```

`build` runs `tsc -b && vite build` (type check plus bundle), `lint` runs `oxlint`. Do not commit or
push unless the owner asks: every push to `main` deploys the site to GitHub Pages
(https://kiel24k.github.io/kiel-portfolio-2026/, via `Frontend/.github/workflows/deploy.yml`).

The live site is served from the sub-path `/kiel-portfolio-2026/`. Keep every path in `portfolio.ts`
root-relative and base-agnostic (e.g. `resumeUrl: '/resume/Ezekiel-Bermudez-Resume.pdf'`, project pages
`/projects/<slug>`); never write `/kiel-portfolio-2026/` into the data. The build adds the sub-path, and it
also writes `dist/projects/<slug>.html` for each project, so a new project's link works as soon as it deploys.

Then re-check fidelity: for each project you touched, count feature lines in the source vs. strings in
`featureGroups[].items`. They must be equal.

## 6. Report what changed

Finish with a short report:

- Files changed (absolute paths) and what changed in each: projects added/updated, skills, project results,
  profile, resume PDF.
- Per project: feature count in the source vs. in `portfolio.ts` (must match), plus results added.
- Translations or groupings that were judgement calls.
- Conflicts between sources and how you resolved them.
- Gaps left empty or put in `notes` (unknown timeline, no numbers, missing role) and questions for the
  owner to confirm.
- Build and lint results.
