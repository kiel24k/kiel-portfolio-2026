import { copyFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { portfolio } from './src/data/portfolio.ts'
import { joinBase, normalizeBase } from './src/lib/base.ts'
import { buildPageMeta, type PageMeta } from './src/lib/meta.ts'

/**
 * URL sub-path the site is served from. "/" by default (dev, preview, root-domain hosts); the GitHub
 * Pages workflow builds with BASE_PATH=/kiel-portfolio-2026/. Leading/trailing slashes are optional.
 */
const base = normalizeBase(process.env.BASE_PATH)

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Replaces `{{meta.<key>}}` placeholders in index.html with copy built from src/data/portfolio.ts.
 * (Kept out of index.html as comments so they never ship in dist/index.html.)
 * The résumé link sits in <noscript>, which Vite does not rewrite, so it gets `base` here.
 *
 * TODO(owner): to add a canonical URL / og:url / og:image for https://kiel24k.github.io/kiel-portfolio-2026/,
 *   add to index.html <link rel="canonical" href="..."> and <meta property="og:url" content="...">,
 *   and optionally an og:image (1200x630 PNG in public/) plus twitter:card "summary_large_image".
 */
function profileMeta(): Plugin {
  const meta = buildPageMeta(portfolio.profile)
  const values: PageMeta = { ...meta, resumeUrl: joinBase(base, meta.resumeUrl) }
  return {
    name: 'profile-meta',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(/\{\{meta\.(\w+)\}\}/g, (match, key: string) =>
          key in values ? escapeHtml(values[key as keyof PageMeta]) : match,
        )
      },
    },
  }
}

/**
 * GitHub Pages has no SPA rewrites, so after the build index.html is copied to:
 * - projects/<slug>.html for every project: Pages serves /projects/hris from projects/hris.html with
 *   status 200, so shared project links get a normal response (link previews, crawlers);
 * - 404.html: Pages serves it for any other unknown path (status 404); the app then routes it, e.g.
 *   to the Not Found page or a project added after the last deploy.
 */
function githubPagesFallbacks(): Plugin {
  let outDir = 'dist'
  return {
    name: 'github-pages-fallbacks',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = path.join(outDir, 'index.html')
      copyFileSync(index, path.join(outDir, '404.html'))
      mkdirSync(path.join(outDir, 'projects'), { recursive: true })
      for (const { slug } of portfolio.projects) {
        copyFileSync(index, path.join(outDir, 'projects', `${slug}.html`))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [profileMeta(), react(), tailwindcss(), githubPagesFallbacks()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
