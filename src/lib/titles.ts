import { portfolio } from '@/data/portfolio'
import { meta } from '@/data/site'
import type { Project } from '@/data/types'
import { buildPageMeta } from '@/lib/meta'
import { getWordmark } from '@/lib/text'

const wordmark = getWordmark(portfolio.profile.name)

/** Same title index.html gets at build time, restored when returning to the home page. */
export const homeTitle: string = buildPageMeta(portfolio.profile).title

export const projectTitle = (project: Project): string => meta.projectTitle(project.name, wordmark)

export const notFoundTitle: string = meta.notFoundTitle(wordmark)
