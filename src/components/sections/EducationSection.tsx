import { GraduationCap } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { TagList } from '@/components/TagList'
import type { Education } from '@/data/types'
import { ui } from '@/data/site'

export function EducationSection({ education }: { education: Education[] }) {
  return (
    <Section id="education" title={ui.education.title}>
      <ul className="grid gap-6">
        {education.map((entry) => (
          <li key={`${entry.school}-${entry.degree}`}>
            <Reveal className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50 text-primary"
              >
                <GraduationCap className="size-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight">{entry.degree}</h3>
                <p className="text-muted-foreground">{entry.school}</p>
                {entry.coursework.length > 0 ? (
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">{ui.education.coursework}</h4>
                    <TagList items={entry.coursework} variant="outline" label={ui.education.coursework} />
                  </div>
                ) : null}
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
