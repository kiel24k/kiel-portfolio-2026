import type { ReactNode } from 'react'
import { Container } from '@/components/Container'
import { Reveal } from '@/components/Reveal'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  title: string
  intro?: string
  className?: string
  children: ReactNode
}

/** A top-level page section with an h2 and an anchor id for the header navigation. */
export function Section({ id, title, intro, className, children }: SectionProps) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      tabIndex={-1}
      className={cn('border-t py-14 outline-none md:py-20', className)}
    >
      <Container>
        <Reveal>
          <header className="mb-8 max-w-2xl md:mb-10">
            <h2 id={headingId} className="text-2xl font-semibold tracking-tight md:text-3xl">
              {title}
            </h2>
            {intro ? <p className="mt-3 text-base leading-relaxed text-muted-foreground">{intro}</p> : null}
          </header>
        </Reveal>
        {children}
      </Container>
    </section>
  )
}
