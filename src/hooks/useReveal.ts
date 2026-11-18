import { useLayoutEffect, useRef } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/**
 * Fades an element in the first time it scrolls into view (styles: `[data-reveal]` in index.css).
 *
 * Content is visible by default; the element is only hidden (before paint) when JavaScript runs, the
 * visitor allows motion, IntersectionObserver exists and the element starts below the viewport. So
 * nothing above the fold ever flashes, and printing / reduced motion / no-JS always show everything.
 * Opacity and `translate` do not affect layout, find-in-page or anchor targets.
 */
export function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia(REDUCED_MOTION).matches || window.matchMedia('print').matches) return
    // Already in (or above) the viewport: leave it alone.
    if (node.getBoundingClientRect().top < window.innerHeight) return

    node.dataset.reveal = 'hidden'
    if (delayMs > 0) node.style.setProperty('--reveal-delay', `${delayMs}ms`)

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        node.dataset.reveal = 'shown'
        observer.disconnect()
      },
      { rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(node)

    return () => {
      observer.disconnect()
      delete node.dataset.reveal
      node.style.removeProperty('--reveal-delay')
    }
  }, [delayMs])

  return ref
}
