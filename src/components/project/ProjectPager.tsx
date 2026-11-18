import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import type { Project } from '@/data/types'
import { ui } from '@/data/site'
import { projectPath } from '@/lib/routes'
import { focusRing } from '@/lib/styles'
import { cn } from '@/lib/utils'

interface PagerLinkProps {
  project: Project
  direction: 'previous' | 'next'
}

function PagerLink({ project, direction }: PagerLinkProps) {
  const isNext = direction === 'next'
  const Icon = isNext ? ArrowRight : ArrowLeft

  return (
    <Link
      to={projectPath(project.slug)}
      className={cn(
        'group flex flex-col gap-1 rounded-xl border p-4 transition-colors hover:border-primary/40 hover:bg-muted/30 md:p-5',
        isNext && 'sm:col-start-2 sm:items-end sm:text-right',
        focusRing,
      )}
    >
      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        {isNext ? null : <Icon aria-hidden="true" className="size-4" />}
        {isNext ? ui.projectPage.next : ui.projectPage.previous}
        {isNext ? <Icon aria-hidden="true" className="size-4" /> : null}
      </span>
      <span className="font-medium text-balance group-hover:text-primary">{project.name}</span>
    </Link>
  )
}

interface ProjectPagerProps {
  previous: Project | undefined
  next: Project | undefined
}

/** Previous / next project links at the end of a project page. */
export function ProjectPager({ previous, next }: ProjectPagerProps) {
  if (!previous && !next) return null

  return (
    <nav aria-label={ui.projectPage.pagerLabel} className="mt-14 border-t pt-8 md:mt-16 print:hidden">
      <div className="grid gap-4 sm:grid-cols-2">
        {previous ? <PagerLink project={previous} direction="previous" /> : null}
        {next ? <PagerLink project={next} direction="next" /> : null}
      </div>
    </nav>
  )
}
