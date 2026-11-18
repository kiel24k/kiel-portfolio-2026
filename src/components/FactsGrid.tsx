import type { Project } from '@/data/types'
import { ui } from '@/data/site'
import { cn } from '@/lib/utils'

type FactKey = keyof typeof ui.project.facts

/** Status is not listed: the StatusBadge above the project title already shows it. */
const factOrder: FactKey[] = ['audience', 'role', 'timeline']

/** Column templates by number of facts, so facts that are left out never leave an empty strip. */
const columnsByCount: Record<number, string> = {
  1: 'sm:w-fit sm:min-w-56',
  2: 'sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr]',
  3: 'sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]',
}

/** Key facts for a project. Facts with no value in the data are left out rather than shown as a gap. */
export function FactsGrid({ project }: { project: Project }) {
  const facts = factOrder.filter((key) => project[key].trim() !== '')
  if (facts.length === 0) return null

  return (
    <dl
      className={cn(
        'grid gap-x-8 gap-y-4 rounded-xl border bg-muted/40 p-4 md:p-5',
        columnsByCount[facts.length] ?? columnsByCount[3],
      )}
    >
      {facts.map((key) => (
        <div key={key} className="min-w-0">
          <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {ui.project.facts[key]}
          </dt>
          <dd className="mt-1 text-sm leading-relaxed">{project[key]}</dd>
        </div>
      ))}
    </dl>
  )
}
