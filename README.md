# kiel-portfolio

Personal portfolio of Ezekiel "Kiel" A. Bermudez, Full Stack Developer.

Stack: Vite, React, TypeScript, React Router v7 (`react-router`), Tailwind CSS v4 (`@tailwindcss/vite`), shadcn/ui (radix-nova style, neutral base colour), lucide-react, self-hosted Geist Variable font.

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - type-check (`tsc -b`) and build to `dist/`
- `npm run lint` - lint with oxlint
- `npm run preview` - preview the production build (serves deep links such as `/projects/hris`)

The build and preview default to the root path `/`; see [Base path](#base-path) for the GitHub Pages sub-path.

## Pages

Paths below are relative to the site root (`/kiel-portfolio-2026/` on GitHub Pages).

- `/` - home: hero, Projects (live-demo notice + one card per project), Skills, Education, Contact.
  Section anchors: `/#projects`, `/#skills`, `/#education`, `/#contact`.
- `/projects/<slug>` - one project per page, with a sticky "Back to projects" bar and previous/next links.
  Old `/#<slug>` links redirect here.
- Anything else - "Page not found".

## Structure

- `src/data/types.ts`, `src/data/portfolio.ts` - all portfolio content (typed)
- `src/data/site.ts` - interface copy (navigation, headings, labels, the live-demo notice)
- `src/pages/` - route pages (`HomePage`, `ProjectPage`, `NotFoundPage`); routes are in `src/App.tsx`
- `src/components/ScrollManager.tsx` - scroll restoration, `#section` scrolling and focus on navigation
- `src/components/Reveal.tsx`, `src/hooks/useReveal.ts` - one-time scroll fade-in (off under reduced motion and in print)
- `src/components/ui/` - shadcn/ui primitives. `npx shadcn@latest add <name>` fails inside this folder (tslib);
  run it from another folder with `-c "<path to this project folder>"`.
- `public/resume/Ezekiel-Bermudez-Resume.pdf` - downloadable resume

## Deploying (GitHub Pages)

Live site: **https://kiel24k.github.io/kiel-portfolio-2026/**

Every push to `main` runs `.github/workflows/deploy.yml`: `npm ci`, `npm run build` (type check + bundle)
for the `/kiel-portfolio-2026/` sub-path, `npm run lint`, then publishes `dist/` to GitHub Pages. It can
also be started by hand from the repo's **Actions** tab (Deploy to GitHub Pages -> Run workflow).

One-time setup (repo owner): **Settings -> Pages -> Build and deployment -> Source: GitHub Actions**.
Until this is set, the workflow fails at the `configure-pages` step of the build job; set the source, then
re-run the workflow from the Actions tab.

### Base path

The site is a project site, so it is served from `/kiel-portfolio-2026/`, not `/`. The build reads the
sub-path from the `BASE_PATH` environment variable (default `/`, used by `npm run dev`/`preview`):

- Vite `base` (asset, favicon and font URLs), the router's `basename` (`src/lib/routes.ts`) and
  `publicUrl()` (résumé link) all follow it, so data and route paths stay root-relative
  (`/resume/...`, `/projects/hris`). Do not hard-code `/kiel-portfolio-2026/` anywhere.
- GitHub Pages has no SPA rewrites, so the build also writes `dist/projects/<slug>.html` for each project
  (served with status 200 at `/projects/<slug>`) and `dist/404.html` (any other path; the app shows its
  Not Found page). `public/.nojekyll` is shipped too (the workflow uploads with `include-hidden-files: true`),
  but it only matters for branch-based Pages: an Actions deployment never runs Jekyll.

To build and check the GitHub Pages version locally:

```bash
# macOS / Linux
BASE_PATH=/kiel-portfolio-2026/ npm run build
# Git Bash on Windows (stops MSYS from turning /kiel-portfolio-2026/ into a Windows path)
MSYS_NO_PATHCONV=1 BASE_PATH=/kiel-portfolio-2026/ npm run build
```

```powershell
# Windows PowerShell
$env:BASE_PATH = '/kiel-portfolio-2026/'; npm run build; Remove-Item Env:BASE_PATH
```

Then `npm run preview` with the same `BASE_PATH` serves it at http://localhost:4173/kiel-portfolio-2026/.
Run a plain `npm run build` afterwards for root-path use.
