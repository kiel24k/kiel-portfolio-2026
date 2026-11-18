// Helpers for Vite's `base`, the URL sub-path the site is served from ("/" locally,
// "/kiel-portfolio-2026/" on GitHub Pages). Also imported by vite.config.ts, so only pure functions:
// no imports, no browser or Vite-client APIs.

/** "kiel-portfolio-2026", "/kiel-portfolio-2026" or "/kiel-portfolio-2026/" -> "/kiel-portfolio-2026/"; empty -> "/". */
export function normalizeBase(value: string | undefined): string {
  const trimmed = (value ?? '').trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}/` : '/'
}

/**
 * Prefixes a root-relative path ("/resume/x.pdf", "resume/x.pdf", "/projects/hris") with `base`.
 * Absolute URLs (https:, mailto:, ...) are returned unchanged.
 */
export function joinBase(base: string, path: string): string {
  if (/^[a-z][a-z\d+.-]*:/i.test(path)) return path
  return `${normalizeBase(base)}${path.replace(/^\/+/, '')}`
}
