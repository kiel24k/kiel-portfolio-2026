import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { KindBadge, StatusBadge } from '@/components/ProjectBadges'
import { Reveal } from '@/components/Reveal'
import type { Project } from '@/data/types'
import { ui } from '@/data/site'
import { countFeatures, formatResults, getKeyStack } from '@/lib/portfolio'
import { fromProjectsState, projectPath } from '@/lib/routes'
import { revealStagger } from '@/lib/styles'

const headingId = 'projects-glance-heading'
const { columns } = ui.projects

/**
 * One project as a card. The title link is stretched over the whole card (::after), so the card is a
 * single, clearly named link target; the focus ring is drawn on the card itself.
 */
function ProjectCard({ project }: { project: Project }) {
  const titleId = `${project.slug}-card-title`
  const results = formatResults(project)
  const features = countFeatures(project)

  return (
    <article
      aria-labelledby={titleId}
      className="group relative flex w-full flex-col gap-4 rounded-xl border bg-card p-5 text-card-foreground transition-colors hover:border-primary/40 hover:bg-muted/30 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-background md:p-6"
    >
      <div className="flex flex-wrap items-center gap-2">
        <KindBadge kind={project.kind} />
        <StatusBadge status={project.status} />
      </div>

      <div>
        <h4 id={titleId} className="text-lg font-semibold tracking-tight text-balance">
          <Link
            to={projectPath(project.slug)}
            state={fromProjectsState}
            className="outline-none transition-colors group-hover:text-primary after:absolute after:inset-0 after:rounded-xl"
          >
            {project.name}
          </Link>
        </h4>
        <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">{project.tagline}</p>
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
        {results ? (
          <>
            <dt className="text-muted-foreground">{columns.result}</dt>
            <dd className="font-medium">{results}</dd>
          </>
        ) : null}
        {project.timeline ? (
          <>
            <dt className="text-muted-foreground">{columns.timeline}</dt>
            <dd>{project.timeline}</dd>
          </>
        ) : null}
        <dt className="text-muted-foreground">{columns.stack}</dt>
        <dd>{getKeyStack(project.stack).join(' · ')}</dd>
      </dl>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-1 text-sm">
        {features > 0 ? <span className="text-muted-foreground">{ui.project.featureCount(features)}</span> : <span />}
        <span aria-hidden="true" className="inline-flex items-center gap-1 font-medium text-primary">
          {ui.projects.viewProject}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  )
}

/** Every project as a card linking to its own page (/projects/<slug>). */
export function ProjectsOverview({ projects }: { projects: Project[] }) {
  return (
    <div>
      <h3 id={headingId} className="mb-4 text-lg font-semibold tracking-tight">
        {ui.projects.glanceTitle}
      </h3>
      <ul aria-labelledby={headingId} className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.slug} className="flex">
            <Reveal delay={revealStagger(index, 2)} className="flex w-full">
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
