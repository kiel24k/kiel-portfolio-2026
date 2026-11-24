// Interface copy (navigation, section headings, labels). Portfolio content lives in ./portfolio.ts.
import type { ProjectKind, TechStack } from './types'

export interface NavItem {
  id: string
  label: string
}

/** Sections of the home page. The ids are the anchors (/#projects etc.) used by the header and mobile menu. */
export const nav: NavItem[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const plural = (n: number, one: string, many: string): string => `${n} ${n === 1 ? one : many}`

/** "Philippines" -> "the Philippines" for running text ("based in the Philippines"); a city stays as is. */
const inPlace = (location: string): string =>
  /^(Philippines|Netherlands|United (States|Kingdom|Arab Emirates))$/.test(location) ? `the ${location}` : location

/**
 * Document <title> and meta copy. Filled in from the profile at build time by the `profile-meta`
 * plugin in vite.config.ts (see src/lib/meta.ts), so index.html never repeats profile details by hand.
 * Project and "not found" titles are set at runtime when those pages open.
 */
export const meta = {
  title: (wordmark: string, title: string) => `${wordmark} – ${title}`,
  projectTitle: (projectName: string, wordmark: string) => `${projectName} – ${wordmark}`,
  notFoundTitle: (wordmark: string) => `Page not found – ${wordmark}`,
  description: (fullName: string, title: string, location: string) =>
    `Portfolio of ${fullName}, a ${title} based in ${inPlace(location)}. Production web systems, project details, tech stack, résumé and contact.`,
  socialDescription: (title: string, location: string) =>
    `${title} based in ${inPlace(location)}. Projects, tech stack, résumé and contact.`,
  /** Fallback shown inside <noscript> in index.html when JavaScript is off. */
  noscriptHeading: (fullName: string, title: string) => `${fullName} – ${title}`,
  noscriptBody: 'This site needs JavaScript to show my projects. You can still reach me directly:',
  noscriptResume: 'Download my résumé (PDF)',
}

export const ui = {
  skipToContent: 'Skip to content',
  downloadResume: 'Download Résumé',
  header: {
    navLabel: 'Main',
    openMenu: 'Open navigation menu',
    menuTitle: 'Menu',
    closeMenu: 'Close menu',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
  },
  hero: {
    goesBy: 'Goes by',
    contactLabel: 'Contact options',
    viewProjects: 'See projects',
    emailAria: (email: string) => `Email ${email}`,
    phoneAria: (phone: string) => `Call ${phone}`,
  },
  demoNotice: {
    title: 'About live demos',
    body: "Some of these systems run in production for real clients, and others aren't publicly deployed yet, so I can't share public links or access. I'm happy to walk you through them in a live demo on my local machine (localhost).",
    /** Compact notice on a project page. The reason there is no public link depends on the project's kind. */
    project: {
      'Client / Production': {
        title: 'About live demos',
        body: "This is a client system, so I can't share a public link or access to it. I'm happy to walk you through it in a live demo on my local machine (localhost).",
      },
      Personal: {
        title: 'About live demos',
        body: "This is a personal project that isn't publicly deployed yet, so there's no public link. I'm happy to walk you through it in a live demo on my local machine (localhost).",
      },
      Academic: {
        title: 'About this project',
        body: "This was a capstone project and isn't publicly deployed, so there's no public link. I'm happy to talk you through it.",
      },
    } satisfies Record<ProjectKind, { title: string; body: string }>,
  },
  projects: {
    title: 'Projects',
    intro: 'Production systems and side projects. Open a project for the role, results, tech stack and the complete feature list.',
    glanceTitle: 'Projects at a glance',
    viewProject: 'View project',
    columns: {
      result: 'Key results',
      timeline: 'Timeline',
      stack: 'Key stack',
    },
  },
  project: {
    facts: {
      audience: 'Audience',
      role: 'Role',
      timeline: 'Timeline',
    },
    resultsLabel: 'Results',
    highlights: 'Highlights',
    responsibilities: 'What I owned',
    stack: 'Tech stack',
    stackGroups: {
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      devops: 'DevOps',
      hardware: 'Hardware',
    } satisfies Record<keyof TechStack, string>,
    noteLabel: 'Note',
    features: 'Features',
    expandAll: 'Expand all',
    collapseAll: 'Collapse all',
    featureCount: (n: number) => plural(n, 'feature', 'features'),
    groupCount: (n: number) => plural(n, 'group', 'groups'),
    featureWord: (n: number) => (n === 1 ? 'feature' : 'features'),
  },
  projectPage: {
    back: 'Back to projects',
    pagerLabel: 'More projects',
    previous: 'Previous project',
    next: 'Next project',
  },
  notFound: {
    title: 'Page not found',
    body: "The page you're looking for doesn't exist or may have moved.",
    projectBody: "There's no project at this address. It may have been renamed or removed.",
    home: 'Go to home page',
    projects: 'See all projects',
  },
  kinds: {
    'Client / Production': 'Client project',
    Personal: 'Personal',
    Academic: 'Academic',
  } satisfies Record<ProjectKind, string>,
  skills: {
    title: 'Skills',
  },
  education: {
    title: 'Education',
    coursework: 'Relevant coursework',
  },
  contact: {
    title: 'Contact',
    intro: 'The fastest way to reach me is email. My résumé is available as a PDF.',
    email: 'Email',
    phone: 'Phone',
    resume: 'Résumé',
    resumeAction: 'Download PDF',
    location: 'Location',
  },
  footer: {
    backToTop: 'Back to top',
  },
} as const
