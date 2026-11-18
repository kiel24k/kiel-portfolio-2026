import type { Project, TechStack } from '@/data/types'

export const stackGroupKeys = ['frontend', 'backend', 'database', 'devops', 'hardware'] as const
export type StackGroupKey = (typeof stackGroupKeys)[number]

export interface StackGroup {
  key: StackGroupKey
  items: string[]
}

/** Non-empty tech stack groups in display order. */
export function getStackGroups(stack: TechStack): StackGroup[] {
  return stackGroupKeys
    .map((key) => ({ key, items: stack[key] ?? [] }))
    .filter((group) => group.items.length > 0)
}

/** A short "key stack" summary used in the projects overview. */
export function getKeyStack(stack: TechStack): string[] {
  const picks = [
    ...stack.frontend.slice(0, 2),
    ...stack.backend.slice(0, 1),
    ...stack.database.slice(0, 1),
    ...(stack.hardware ?? []).slice(0, 1),
  ]
  return Array.from(new Set(picks))
}

export function countFeatures(project: Project): number {
  return project.featureGroups.reduce((total, group) => total + group.items.length, 0)
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/** "Key results" text for the overview: every sourced number, or an empty string when there are none. */
export function formatResults(project: Project): string {
  return project.results.map((stat) => `${stat.value} ${stat.label}`).join(' · ')
}

/**
 * Resolves a public-folder path ("/resume/x.pdf" or "resume/x.pdf") against Vite's `base`,
 * so links keep working if the site is deployed under a subpath (e.g. GitHub Pages /repo/).
 */
export function publicUrl(path: string): string {
  if (/^[a-z][a-z\d+.-]*:/i.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}

export function getProjectBySlug(projects: Project[], slug: string | undefined): Project | undefined {
  return slug ? projects.find((project) => project.slug === slug) : undefined
}

/** The projects before and after `slug` in display order (no wrap-around). */
export function getAdjacentProjects(
  projects: Project[],
  slug: string,
): { previous: Project | undefined; next: Project | undefined } {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return { previous: undefined, next: undefined }
  return { previous: projects[index - 1], next: projects[index + 1] }
}
