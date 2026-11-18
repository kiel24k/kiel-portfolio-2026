export interface Stat { value: string; label: string }
export interface FeatureGroup { title: string; items: string[] }
export interface TechStack { frontend: string[]; backend: string[]; database: string[]; devops: string[]; hardware?: string[] }
export type ProjectKind = 'Client / Production' | 'Personal' | 'Academic'
export interface Project {
  slug: string            // kebab-case, unique; project page URL is /projects/<slug>
  name: string            // full name
  shortName: string       // e.g. "HRIS"
  kind: ProjectKind
  status: string          // e.g. "In production", "Completed Nov 2026 - handed over to the school's consultant"
  timeline: string        // e.g. "Dec 2025 - Jul 2026"
  audience: string        // who it is for (from notes item 1)
  role: string            // e.g. "Full Stack Developer"
  tagline: string         // one sentence: what it is
  summary: string[]       // 1-3 employer-facing bullets (resume-level)
  responsibilities: string[] // what Kiel personally owned (dev, server, backups, testing...)
  results: Stat[]         // numbers ONLY from sources; [] if unknown
  stack: TechStack
  featureGroups: FeatureGroup[] // ALL features from notes, grouped; may be [] only where sources give none
  notes?: string[]        // honest caveats, e.g. "No public users yet"
}
export interface SkillGroup { category: string; items: string[] }
export interface Education { school: string; degree: string; coursework: string[] }
export interface Profile {
  name: string; preferredName: string; title: string; location: string
  email: string; phone: string; resumeUrl: string
  summary: string
}
export interface Portfolio { profile: Profile; education: Education[]; skills: SkillGroup[]; projects: Project[] }
