import type { MouseEvent } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import type { Project } from '@/data/types'
import { ui } from '@/data/site'
import { homeSection, isFromProjectsState, isPlainLeftClick } from '@/lib/routes'

/**
 * Sticky bar under the site header on project pages, so "Back to projects" is always one tap away.
 * Its link is /#projects (works in a new tab too). When the visitor came from the home page's project
 * list, a plain click goes back in history instead, which restores the exact place in the list.
 */
export function ProjectBackBar({ project }: { project: Project }) {
  const location = useLocation()
  const navigate = useNavigate()
  const cameFromList = isFromProjectsState(location.state)

  const onBack = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!cameFromList || !isPlainLeftClick(event)) return
    event.preventDefault()
    void navigate(-1)
  }

  return (
    <div
      data-project-bar
      className="sticky top-14 z-30 border-b bg-background/90 backdrop-blur-sm supports-backdrop-filter:bg-background/80 print:hidden"
    >
      <Container className="flex h-12 items-center gap-3">
        <Button asChild variant="ghost" size="lg" className="-ml-2.5 shrink-0">
          <Link to={homeSection('projects')} onClick={onBack}>
            <ArrowLeft aria-hidden="true" />
            {ui.projectPage.back}
          </Link>
        </Button>
        <span aria-hidden="true" className="ml-auto min-w-0 truncate text-sm text-muted-foreground">
          {project.shortName}
        </span>
      </Container>
    </div>
  )
}
