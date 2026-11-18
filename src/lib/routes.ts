import type { MouseEvent } from 'react'
import type { Path } from 'react-router'
import { nav } from '@/data/site'
import { joinBase } from '@/lib/base'

const PROJECT_PREFIX = '/projects/'

/**
 * The router's basename: Vite's `base` ("/kiel-portfolio-2026/" on GitHub Pages, "/" locally). Route
 * paths in this file stay root-relative; <Link>/navigate add the basename. The trailing slash is kept
 * so links to the home page are "/kiel-portfolio-2026/" (GitHub Pages redirects the slash-less form).
 */
export const routerBasename: string = import.meta.env.BASE_URL

/** The href a <Link to={path}> renders, e.g. `/projects/hris` -> `/kiel-portfolio-2026/projects/hris`. */
export function routeHref(path: string): string {
  return joinBase(import.meta.env.BASE_URL, path)
}

/** URL of a project's own page. */
export function projectPath(slug: string): string {
  return `${PROJECT_PREFIX}${slug}`
}

/** The slug in a project page path (`/projects/hris` -> `hris`), or null for any other path. */
export function projectSlugFromPath(pathname: string): string | null {
  if (!pathname.startsWith(PROJECT_PREFIX)) return null
  const slug = pathname.slice(PROJECT_PREFIX.length).replace(/\/$/, '')
  return slug && !slug.includes('/') ? slug : null
}

/**
 * Element ids on the home page that links point at (/#projects etc., the footer's #top, the skip
 * link's #main). An old /#<slug> link redirects to the project page, so these ids never redirect, and
 * a project slug must not use these names (see the add-portfolio-project skill).
 */
export const homeAnchorIds: ReadonlySet<string> = new Set([...nav.map((item) => item.id), 'top', 'main'])

/** Link target for a section of the home page, e.g. `/#projects`. Works from any route. */
export function homeSection(id: string): Partial<Path> {
  return { pathname: '/', hash: `#${id}` }
}

/**
 * History state set by links in the home page's project list. The project page's Back button uses it
 * to go back in history (restoring the list's scroll position) instead of adding a new entry.
 */
export interface FromProjectsState {
  fromProjects: true
}

export const fromProjectsState: FromProjectsState = { fromProjects: true }

export function isFromProjectsState(state: unknown): state is FromProjectsState {
  return typeof state === 'object' && state !== null && 'fromProjects' in state && state.fromProjects === true
}

/** True for an unmodified primary click, i.e. not a click meant to open the link in a new tab/window. */
export function isPlainLeftClick(event: MouseEvent<HTMLElement>): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

/**
 * The element id in a location hash (`#skills` -> `skills`), percent-decoded. A malformed escape such
 * as `#%E0` would make decodeURIComponent throw, so the raw text is returned instead.
 */
export function hashId(hash: string): string {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}
