import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType, type Location } from 'react-router'
import { hashId, projectPath, projectSlugFromPath, routeHref } from '@/lib/routes'

const STORAGE_KEY = 'scroll-positions'
/** React Router's key for history entries it did not create (first load, plain #fragment links). */
const UNKNOWN_KEY = 'default'

function loadPositions(): Map<string, number> {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    if (parsed && typeof parsed === 'object') {
      return new Map(Object.entries(parsed).filter((entry): entry is [string, number] => typeof entry[1] === 'number'))
    }
  } catch {
    // Storage unavailable or corrupt: start fresh.
  }
  return new Map()
}

function savePositions(positions: Map<string, number>): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(positions)))
  } catch {
    // Storage unavailable: positions are kept for this page view only.
  }
}
/**
 * Storage key for a history entry. Entries React Router did not create share the key "default": without
 * a hash that is the first page opened in this tab, so it is keyed by path; plain #fragment entries
 * (also "default") are not restored.
 */
function entryKey({ key, pathname, hash }: Location): string | null {
  if (key !== UNKNOWN_KEY) return key
  return hash ? null : `${UNKNOWN_KEY}:${pathname}`
}

/**
 * Scroll and focus handling for client-side navigation:
 * - back/forward restores the scroll position the visitor left the page at (also after a reload), and
 *   when that leaves a project page, focuses the link to that project (e.g. its card on the home page)
 *   so keyboard users carry on from where they were instead of from the top of the document;
 * - a link with a hash (e.g. /#skills from a project page) scrolls to that section and focuses it;
 * - any other navigation starts at the top and moves focus to the page's `[data-route-focus]`
 *   element (the project title) or <main>, so screen readers announce the new page.
 *
 * Render it before the routed content: its layout effect then runs before the page's own layout
 * effects, so useReveal measures what is in view at the final scroll position. The scroll is applied
 * again in a microtask (after React's commit, before paint) because page layout effects can still
 * change the height, e.g. the feature accordions collapse in theirs.
 */
export function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const positions = useRef<Map<string, number> | null>(null)
  const currentKey = useRef<string | null>(null)
  const handledKey = useRef<string | null>(null)
  const previousPathname = useRef<string | null>(null)

  if (positions.current === null) positions.current = loadPositions()

  useEffect(() => {
    const store = positions.current
    if (!store) return
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    const onScroll = () => {
      if (currentKey.current) store.set(currentKey.current, window.scrollY)
    }
    const onPageHide = () => savePositions(store)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pagehide', onPageHide)
    return () => {
      window.history.scrollRestoration = previous
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pagehide', onPageHide)
    }
  }, [])

  useLayoutEffect(() => {
    if (handledKey.current === location.key) return // StrictMode re-run
    const isFirstLoad = handledKey.current === null
    handledKey.current = location.key
    const leftPathname = previousPathname.current
    previousPathname.current = location.pathname
    const key = entryKey(location)
    currentKey.current = key

    const runNowAndAfterCommit = (apply: () => void) => {
      apply()
      queueMicrotask(apply)
    }

    const saved = key ? positions.current?.get(key) : undefined
    if (navigationType === 'POP' && saved !== undefined) {
      runNowAndAfterCommit(() => window.scrollTo(0, saved))
      const leftSlug = leftPathname ? projectSlugFromPath(leftPathname) : null
      if (leftSlug && leftPathname !== location.pathname) {
        document
          .querySelector<HTMLElement>(`a[href="${routeHref(projectPath(leftSlug))}"]`)
          ?.focus({ preventScroll: true })
      }
      return
    }

    const moveFocus = !isFirstLoad && navigationType !== 'POP'
    const target = location.hash ? document.getElementById(hashId(location.hash)) : null
    if (target) {
      runNowAndAfterCommit(() => target.scrollIntoView({ block: 'start' }))
      if (moveFocus && target.hasAttribute('tabindex')) target.focus({ preventScroll: true })
      return
    }

    window.scrollTo(0, 0)
    if (moveFocus) {
      const focusTarget = document.querySelector<HTMLElement>('[data-route-focus]') ?? document.getElementById('main')
      focusTarget?.focus({ preventScroll: true })
    }
  }, [location, navigationType])

  return null
}
