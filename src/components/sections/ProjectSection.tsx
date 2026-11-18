import type { ReactNode } from 'react'
import { Info } from 'lucide-react'
import { BulletList } from '@/components/BulletList'
import { DemoNotice } from '@/components/DemoNotice'
import { FactsGrid } from '@/components/FactsGrid'
import { FeatureAccordion } from '@/components/FeatureAccordion'
import { KindBadge, StatusBadge } from '@/components/ProjectBadges'
import { Reveal } from '@/components/Reveal'
import { StatList } from '@/components/StatList'
import { TechStackList } from '@/components/TechStackList'
import type { Project } from '@/data/types'
import { ui } from '@/data/site'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">{title}</h2>
      {children}
    </div>
  )
}

function ProjectNotes({ notes }: { notes: string[] }) {
  return (
    <div role="note" className="flex gap-3 rounded-lg border bg-muted/50 p-3.5 text-sm leading-relaxed">
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div>
        <span className="sr-only">{ui.project.noteLabel}: </span>
        {notes.length === 1 ? (
          <p>{notes[0]}</p>
        ) : (
          <ul className="list-disc space-y-1 pl-4">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/**
 * The whole of one project, as the main content of its page (the title is the page's h1):
 * identity, live-demo notice, facts, results, highlights, ownership, stack, caveats and every feature.
 */
export function ProjectSection({ project }: { project: Project }) {
  const titleId = `${project.slug}-title`
  const hasHighlights = project.summary.length > 0
  const hasResponsibilities = project.responsibilities.length > 0
  const notes = project.notes ?? []

  return (
    <article aria-labelledby={titleId}>
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <KindBadge kind={project.kind} />
          <StatusBadge status={project.status} />
        </div>
        {/* data-route-focus: ScrollManager focuses the title when the page opens, so it is announced. */}
        <h1
          id={titleId}
          tabIndex={-1}
          data-route-focus
          className="mt-3 text-3xl font-semibold tracking-tight text-balance outline-none md:text-4xl"
        >
          {project.name}
          {project.shortName !== project.name ? (
            <>
              {' '}
              <span className="ml-1 align-middle text-lg font-normal text-muted-foreground md:text-xl">
                ({project.shortName})
              </span>
            </>
          ) : null}
        </h1>
        <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-pretty text-foreground/85 md:text-lg">
          {project.tagline}
        </p>
      </header>

      <DemoNotice project={project} className="mt-6" />

      <Reveal className="mt-8 grid gap-6">
        <FactsGrid project={project} />
        <StatList stats={project.results} label={`${project.shortName} ${ui.project.resultsLabel.toLowerCase()}`} />
      </Reveal>

      {hasHighlights || hasResponsibilities ? (
        <Reveal className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
          {hasHighlights ? (
            <Block title={ui.project.highlights}>
              <BulletList items={project.summary} />
            </Block>
          ) : null}
          {hasResponsibilities ? (
            <Block title={ui.project.responsibilities}>
              <BulletList items={project.responsibilities} />
            </Block>
          ) : null}
        </Reveal>
      ) : null}

      <Reveal className="mt-10 grid gap-6">
        <Block title={ui.project.stack}>
          <TechStackList stack={project.stack} />
        </Block>
        {notes.length > 0 ? <ProjectNotes notes={notes} /> : null}
      </Reveal>

      <Reveal>
        <FeatureAccordion projectSlug={project.slug} projectName={project.name} groups={project.featureGroups} />
      </Reveal>
    </article>
  )
}
