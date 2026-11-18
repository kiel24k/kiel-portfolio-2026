import { DemoNotice } from '@/components/DemoNotice'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { ProjectsOverview } from '@/components/sections/ProjectsOverview'
import type { Project } from '@/data/types'
import { ui } from '@/data/site'

/** Home page Projects section: the live-demo notice, then one card per project. */
export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects" title={ui.projects.title} intro={ui.projects.intro}>
      <Reveal className="mb-10">
        <DemoNotice />
      </Reveal>
      <ProjectsOverview projects={projects} />
    </Section>
  )
}
