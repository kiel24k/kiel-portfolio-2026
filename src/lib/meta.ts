// Builds the document <head> copy from the profile. Used by the `profile-meta` plugin in vite.config.ts,
// so only relative imports and no browser/Vite-client APIs are allowed here.
import { meta } from '../data/site.ts'
import type { Profile } from '../data/types.ts'
import { getWordmark } from './text.ts'

export interface PageMeta {
  title: string
  description: string
  socialDescription: string
  author: string
  noscriptHeading: string
  noscriptBody: string
  noscriptResume: string
  email: string
  resumeUrl: string
}

/** "Ezekiel A. Bermudez" + "Kiel" -> 'Ezekiel "Kiel" A. Bermudez'. */
function nameWithNickname(name: string, preferredName: string): string {
  const [first, ...rest] = name.split(/\s+/)
  return [first, `"${preferredName}"`, ...rest].join(' ')
}

export function buildPageMeta(profile: Profile): PageMeta {
  return {
    title: meta.title(getWordmark(profile.name), profile.title),
    description: meta.description(nameWithNickname(profile.name, profile.preferredName), profile.title, profile.location),
    socialDescription: meta.socialDescription(profile.title, profile.location),
    author: profile.name,
    noscriptHeading: meta.noscriptHeading(profile.name, profile.title),
    noscriptBody: meta.noscriptBody,
    noscriptResume: meta.noscriptResume,
    email: profile.email,
    resumeUrl: profile.resumeUrl,
  }
}
