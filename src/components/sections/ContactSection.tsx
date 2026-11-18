import type { ReactNode } from 'react'
import { Download, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { Card, CardContent } from '@/components/ui/card'
import type { Profile } from '@/data/types'
import { ui } from '@/data/site'
import { publicUrl, telHref } from '@/lib/portfolio'
import { focusRing } from '@/lib/styles'
import { cn } from '@/lib/utils'

interface ContactItem {
  key: string
  icon: LucideIcon
  label: string
  value: ReactNode
}

const linkClass = cn(
  'rounded-sm font-medium [overflow-wrap:anywhere] text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary',
  focusRing,
)

export function ContactSection({ profile }: { profile: Profile }) {
  const items: ContactItem[] = [
    {
      key: 'email',
      icon: Mail,
      label: ui.contact.email,
      value: (
        <a href={`mailto:${profile.email}`} className={linkClass}>
          {profile.email}
        </a>
      ),
    },
    {
      key: 'phone',
      icon: Phone,
      label: ui.contact.phone,
      value: (
        <a href={telHref(profile.phone)} className={linkClass}>
          {profile.phone}
        </a>
      ),
    },
    {
      key: 'resume',
      icon: Download,
      label: ui.contact.resume,
      value: (
        <a href={publicUrl(profile.resumeUrl)} download className={linkClass}>
          {ui.contact.resumeAction}
        </a>
      ),
    },
    {
      key: 'location',
      icon: MapPin,
      label: ui.contact.location,
      value: <span className="font-medium">{profile.location}</span>,
    },
  ]

  return (
    <Section id="contact" title={ui.contact.title} intro={ui.contact.intro}>
      <Reveal>
        <address className="not-italic">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
            {items.map(({ key, icon: Icon, label, value }) => (
              <li key={key} className="flex">
                <Card className="w-full">
                  <CardContent className="flex flex-col gap-2">
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon aria-hidden="true" className="size-4 text-primary" />
                      {label}
                    </span>
                    <span className="text-[0.9375rem]">{value}</span>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </address>
      </Reveal>
    </Section>
  )
}
