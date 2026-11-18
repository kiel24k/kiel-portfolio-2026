import type { Stat } from '@/data/types'
import { cn } from '@/lib/utils'

interface StatListProps {
  stats: Stat[]
  label: string
  className?: string
}

/** A row of numbers with labels. Renders nothing when there are no stats. */
export function StatList({ stats, label, className }: StatListProps) {
  if (stats.length === 0) return null

  return (
    <dl
      aria-label={label}
      className={cn(
        'grid gap-px overflow-hidden rounded-xl border bg-border',
        // Below the 2-column breakpoint an odd last stat spans the full row, so the gap colour never
        // shows as an empty grey cell (e.g. a project with a single result on a phone).
        'grid-cols-2 max-sm:[&>*:last-child:nth-child(odd)]:col-span-2 sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]',
        className,
      )}
    >
      {stats.map((stat) => (
        <div key={`${stat.value}-${stat.label}`} className="flex flex-col-reverse justify-end gap-1 bg-background p-4">
          <dt className="text-sm leading-snug text-muted-foreground">{stat.label}</dt>
          <dd className="text-xl font-semibold tracking-tight text-foreground tabular-nums md:text-2xl">{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}
