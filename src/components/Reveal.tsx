import type { ComponentProps } from 'react'
import { useReveal } from '@/hooks/useReveal'

type RevealProps = Omit<ComponentProps<'div'>, 'ref'> & {
  /** Extra delay before the fade starts, for a slight stagger between neighbouring cards (keep it small). */
  delay?: number
}

/** A block that fades in once when it first scrolls into view. See useReveal for the safeguards. */
export function Reveal({ delay = 0, ...props }: RevealProps) {
  const ref = useReveal<HTMLDivElement>(delay)
  return <div ref={ref} {...props} />
}
