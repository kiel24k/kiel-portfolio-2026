import { useEffect, useLayoutEffect, useRef } from 'react'
import { flushSync } from 'react-dom'

/**
 * Keeps collapsed content searchable with the browser's find-in-page (Ctrl+F).
 *
 * While `open` is false the element gets `hidden="until-found"` (React 19 only supports `hidden` as a
 * boolean, so the attribute is set on the DOM node directly). When find-in-page matches text inside it,
 * the browser fires `beforematch` and `onReveal` runs synchronously so the owner can mark it open
 * before the browser scrolls to the match. Browsers without support treat the attribute as plain
 * `hidden`, which is the same as a normal collapsed panel.
 *
 * The element must stay mounted while closed (e.g. Radix `forceMount`).
 */
export function useHiddenUntilFound<T extends HTMLElement>(open: boolean, onReveal: () => void) {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    if (open) {
      node.removeAttribute('hidden')
      return
    }

    // Let a closing animation finish before hiding, so the panel collapses with its content visible.
    let cancelled = false
    const hide = () => {
      if (!cancelled) node.setAttribute('hidden', 'until-found')
    }
    const running = typeof node.getAnimations === 'function' ? node.getAnimations() : []
    if (running.length === 0) hide()
    else void Promise.allSettled(running.map((animation) => animation.finished)).then(hide)
    return () => {
      cancelled = true
    }
  }, [open])

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const handleBeforeMatch = () => flushSync(onReveal)
    node.addEventListener('beforematch', handleBeforeMatch)
    return () => node.removeEventListener('beforematch', handleBeforeMatch)
  }, [onReveal])

  return ref
}
