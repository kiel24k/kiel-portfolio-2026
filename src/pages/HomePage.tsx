import { Navigate, useLocation } from 'react-router'
import { ContactSection } from '@/components/sections/ContactSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { Hero } from '@/components/sections/Hero'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { portfolio } from '@/data/portfolio'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { getProjectBySlug } from '@/lib/portfolio'
import { hashId, homeAnchorIds, projectPath } from '@/lib/routes'
import { homeTitle } from '@/lib/titles'

export function HomePage() {
  const { profile, projects, skills, education } = portfolio
  const { hash } = useLocation()
  useDocumentTitle(homeTitle)

  // Links shared before projects had their own pages pointed at /#<slug>: send them to the project page.
  // Section anchors (/#projects etc.) always stay on the home page, whatever the project slugs are.
  const id = hashId(hash)
  const legacyProject = homeAnchorIds.has(id) ? undefined : getProjectBySlug(projects, id)
  if (legacyProject) return <Navigate replace to={projectPath(legacyProject.slug)} />

  return (
    <>
      <Hero profile={profile} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <EducationSection education={education} />
      <ContactSection profile={profile} />
    </>
  )
}
