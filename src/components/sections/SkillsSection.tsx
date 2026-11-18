import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { TagList } from '@/components/TagList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SkillGroup } from '@/data/types'
import { ui } from '@/data/site'
import { revealStagger } from '@/lib/styles'

export function SkillsSection({ skills }: { skills: SkillGroup[] }) {
  return (
    <Section id="skills" title={ui.skills.title}>
      <ul className="grid gap-4 md:grid-cols-2">
        {skills.map((group, index) => (
          <li key={group.category} className="flex">
            <Reveal delay={revealStagger(index, 2)} className="flex w-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>
                    <h3 className="text-base font-semibold">{group.category}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TagList items={group.items} label={group.category} />
                </CardContent>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
