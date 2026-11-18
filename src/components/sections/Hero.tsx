import { ArrowDown, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/Container'
import { ResumeButton } from '@/components/ResumeButton'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/data/types'
import { ui } from '@/data/site'
import { telHref } from '@/lib/portfolio'
import { homeSection } from '@/lib/routes'

const contactButtonClass = 'h-auto min-h-9 max-w-full whitespace-normal break-all py-1.5 text-left'

/** Who, role and location, the summary, then contact actions and a pointer to the projects. */
export function Hero({ profile }: { profile: Profile }) {
  return (
    <section aria-labelledby="hero-heading" className="pt-12 pb-16 md:pt-24 md:pb-24">
      <Container>
        <div className="max-w-3xl">
          <h1 id="hero-heading" className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-xl font-medium text-primary sm:text-2xl">{profile.title}</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-4" />
              {profile.location}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {ui.hero.goesBy} “{profile.preferredName}”
            </span>
          </p>
        </div>

        <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-pretty text-foreground/85 sm:mt-8 sm:text-lg">
          {profile.summary}
        </p>

        <div className="mt-8 flex max-w-3xl flex-wrap gap-2.5 sm:mt-10">
          <ul aria-label={ui.hero.contactLabel} className="flex max-w-full min-w-0 flex-wrap gap-2.5">
            <li className="max-w-full">
              <Button asChild variant="outline" size="lg" className={contactButtonClass}>
                <a href={`mailto:${profile.email}`} aria-label={ui.hero.emailAria(profile.email)}>
                  <Mail aria-hidden="true" />
                  {profile.email}
                </a>
              </Button>
            </li>
            <li className="max-w-full">
              <Button asChild variant="outline" size="lg" className={contactButtonClass}>
                <a href={telHref(profile.phone)} aria-label={ui.hero.phoneAria(profile.phone)}>
                  <Phone aria-hidden="true" />
                  {profile.phone}
                </a>
              </Button>
            </li>
            <li className="max-w-full">
              <ResumeButton size="lg" />
            </li>
          </ul>
          <Button asChild variant="ghost" size="lg">
            <Link to={homeSection('projects')}>
              {ui.hero.viewProjects}
              <ArrowDown aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
