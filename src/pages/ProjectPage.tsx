import { useParams } from 'react-router'
import { Container } from '@/components/Container'
import { ProjectBackBar } from '@/components/project/ProjectBackBar'
import { ProjectPager } from '@/components/project/ProjectPager'
import { ProjectSection } from '@/components/sections/ProjectSection'
import type { Project } from '@/data/types'
import { portfolio } from '@/data/portfolio'
import { ui } from '@/data/site'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { getAdjacentProjects, getProjectBySlug } from '@/lib/portfolio'
import { projectTitle } from '@/lib/titles'
import { NotFoundPage } from '@/pages/NotFoundPage'

/** /projects/:slug – one project only, with a sticky Back bar and previous/next links. */
export function ProjectPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(portfolio.projects, slug)

  if (!project) return <NotFoundPage message={ui.notFound.projectBody} />
  // Keyed by slug so moving to the previous/next project starts with fresh state (accordions closed).
  return <ProjectView key={project.slug} project={project} />
}

function ProjectView({ project }: { project: Project }) {
  const { previous, next } = getAdjacentProjects(portfolio.projects, project.slug)
  useDocumentTitle(projectTitle(project))

  return (
    <>
      <ProjectBackBar project={project} />
      <Container className="py-10 md:py-14">
        <ProjectSection project={project} />
        <ProjectPager previous={previous} next={next} />
      </Container>
    </>
  )
}
