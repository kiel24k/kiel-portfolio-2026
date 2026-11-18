# kiel-portfolio

Personal portfolio of Ezekiel "Kiel" A. Bermudez, Full Stack Developer.

Stack: Vite, React, TypeScript, React Router v7 (`react-router`), Tailwind CSS v4 (`@tailwindcss/vite`), shadcn/ui (radix-nova style, neutral base colour), lucide-react, self-hosted Geist Variable font.

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - type-check (`tsc -b`) and build to `dist/`
- `npm run lint` - lint with oxlint
- `npm run preview` - preview the production build (serves deep links such as `/projects/hris`)

## Pages

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
  run it from another folder with `-c "<path to Frontend>"`.
- `public/resume/Ezekiel-Bermudez-Resume.pdf` - downloadable resume

## Deploying

On Vercel, set the project's **Root Directory** to `Frontend` (Project Settings -> Build and Deployment),
since `package.json` and `vercel.json` live there; the Vite preset then builds with `npm run build` into `dist`.

It is a single-page app: the host must serve `index.html` for every route. `vercel.json` already does
this for Vercel (static files are served first). On Netlify, add `public/_redirects` with
`/* /index.html 200`. The base path is `/`.
