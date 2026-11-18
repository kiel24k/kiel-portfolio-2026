import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { portfolio } from './src/data/portfolio.ts'
import { buildPageMeta, type PageMeta } from './src/lib/meta.ts'

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Replaces `{{meta.<key>}}` placeholders in index.html with copy built from src/data/portfolio.ts.
 * (Kept out of index.html as comments so they never ship in dist/index.html.)
 *
 * TODO(owner): once the deploy domain is known, add to index.html:
 *   <link rel="canonical" href="https://<domain>/" />
 *   <meta property="og:url" content="https://<domain>/" />
 *   and optionally an og:image (1200x630 PNG in public/) plus twitter:card "summary_large_image".
 */
function profileMeta(): Plugin {
  const values: PageMeta = buildPageMeta(portfolio.profile)
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [profileMeta(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
