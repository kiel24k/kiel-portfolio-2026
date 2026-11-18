import type { MouseEvent } from 'react'
import { ui } from '@/data/site'

/** Moves focus to <main> without changing the URL (a #main fragment would add a history entry). */
function skipToMain(event: MouseEvent<HTMLAnchorElement>) {
  const main = document.getElementById('main')
  if (!main) return
  event.preventDefault()
  main.focus()
}

export function SkipLink() {
  return (
    <a
      href="#main"
      onClick={skipToMain}
      className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground outline-none focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background print:hidden"
    >
      {ui.skipToContent}
    </a>
  )
}
