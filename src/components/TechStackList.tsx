import { TagList } from '@/components/TagList'
import type { TechStack } from '@/data/types'
import { ui } from '@/data/site'
import { getStackGroups } from '@/lib/portfolio'

/** Tech stack grouped by layer; empty groups are omitted. */
export function TechStackList({ stack }: { stack: TechStack }) {
  const groups = getStackGroups(stack)
  if (groups.length === 0) return null

  return (
    <dl className="grid gap-3">
      {groups.map((group) => (
        <div key={group.key} className="grid gap-1.5 sm:grid-cols-[7rem_1fr] sm:items-baseline sm:gap-4">
          <dt className="text-sm text-muted-foreground">{ui.project.stackGroups[group.key]}</dt>
          <dd>
            <TagList items={group.items} variant="outline" />
          </dd>
        </div>
      ))}
    </dl>
  )
}
