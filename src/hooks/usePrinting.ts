import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

/**
 * True while the browser is preparing to print. The state is flushed synchronously in
 * `beforeprint` so collapsed content (the feature accordions) is in the DOM before the snapshot.
 */
export function usePrinting(): boolean {
  const [printing, setPrinting] = useState(false)

  useEffect(() => {
    const onBefore = () => flushSync(() => setPrinting(true))
    const onAfter = () => setPrinting(false)
    window.addEventListener('beforeprint', onBefore)
    window.addEventListener('afterprint', onAfter)
    return () => {
      window.removeEventListener('beforeprint', onBefore)
      window.removeEventListener('afterprint', onAfter)
    }
  }, [])

  return printing
}
