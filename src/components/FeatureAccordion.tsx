import { useCallback, useState } from 'react'
import { Check, ChevronsDownUp, ChevronsUpDown } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { FeatureGroup } from '@/data/types'
import { ui } from '@/data/site'
import { useHiddenUntilFound } from '@/hooks/useHiddenUntilFound'
import { usePrinting } from '@/hooks/usePrinting'
import { cn } from '@/lib/utils'

/** From this many groups the list splits into two columns on large screens. */
const TWO_COLUMN_MIN_GROUPS = 6

interface FeatureAccordionProps {
  projectSlug: string
  projectName: string
  groups: FeatureGroup[]
}

/** Every feature group of a project, collapsible, with expand/collapse-all. Nothing is truncated. */
export function FeatureAccordion({ projectSlug, projectName, groups }: FeatureAccordionProps) {
  const [openGroups, setOpenGroups] = useState<string[]>([])
  const printing = usePrinting()
  const openGroup = useCallback(
    (value: string) => setOpenGroups((current) => (current.includes(value) ? current : [...current, value])),
    [],
  )

  if (groups.length === 0) return null

  const values = groups.map((_, index) => `${projectSlug}-features-${index}`)
  const total = groups.reduce((sum, group) => sum + group.items.length, 0)
  const allOpen = openGroups.length === values.length
  const headingId = `${projectSlug}-features-heading`
  const openValues = printing ? values : openGroups
  const twoColumns = groups.length >= TWO_COLUMN_MIN_GROUPS
  const split = twoColumns ? Math.ceil(groups.length / 2) : groups.length
  const columns = [
    { start: 0, groups: groups.slice(0, split) },
    { start: split, groups: groups.slice(split) },
  ].filter((column) => column.groups.length > 0)

  return (
    <section aria-labelledby={headingId} className="mt-10">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div>
          <h2 id={headingId} className="text-xl font-semibold tracking-tight">
            {ui.project.features}
          </h2>
          <p className="text-sm text-muted-foreground">
            {ui.project.featureCount(total)} · {ui.project.groupCount(groups.length)}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="print:hidden"
          onClick={() => setOpenGroups(allOpen ? [] : values)}
          aria-label={`${allOpen ? ui.project.collapseAll : ui.project.expandAll}: ${projectName} ${ui.project.features.toLowerCase()}`}
        >
          {allOpen ? <ChevronsDownUp aria-hidden="true" /> : <ChevronsUpDown aria-hidden="true" />}
          {allOpen ? ui.project.collapseAll : ui.project.expandAll}
        </Button>
      </div>

      {/*
        Long lists sit in two columns on lg+ (one on smaller screens and in print). The split is by
        column, not row, so reading and Tab order run down the left column and then the right, and
        opening a group never moves groups between columns. Arrow keys still move across both.
      */}
      <Accordion
        type="multiple"
        value={openValues}
        onValueChange={setOpenGroups}
        className={cn('grid gap-4', twoColumns && 'lg:grid-cols-2 lg:items-start print:grid-cols-1')}
      >
        {columns.map((column) => (
          <div key={column.start} className="rounded-xl border">
            {column.groups.map((group, offset) => {
              const value = values[column.start + offset]
              return (
                <FeatureGroupItem
                  key={value}
                  value={value}
                  group={group}
                  open={openValues.includes(value)}
                  compact={twoColumns}
                  onReveal={openGroup}
                />
              )
            })}
          </div>
        ))}
      </Accordion>
    </section>
  )
}

interface FeatureGroupItemProps {
  value: string
  group: FeatureGroup
  open: boolean
  /** In a half-width column on lg+: list the items in one column instead of two. */
  compact: boolean
  onReveal: (value: string) => void
}

/**
 * One feature group. Its content stays in the DOM while collapsed (hidden="until-found"), so
 * find-in-page can match any feature and opens the group that holds it.
 */
function FeatureGroupItem({ value, group, open, compact, onReveal }: FeatureGroupItemProps) {
  const reveal = useCallback(() => onReveal(value), [onReveal, value])
  const contentRef = useHiddenUntilFound<HTMLDivElement>(open, reveal)

  return (
    <AccordionItem value={value} className="px-4 md:px-5">
      <AccordionTrigger
        headingLevel={3}
        className="items-center rounded-none py-3.5 text-[0.9375rem] hover:no-underline hover:text-primary focus-visible:ring-offset-0 [&_[data-slot=accordion-trigger-icon]]:print:hidden"
      >
        <span className="flex min-w-0 flex-1 items-center gap-2.5 pr-3">
          <span>{group.title}</span>
          <Badge variant="secondary" className="tabular-nums">
            {group.items.length}
            <span className="sr-only"> {ui.project.featureWord(group.items.length)}</span>
          </Badge>
        </span>
      </AccordionTrigger>
      <AccordionContent ref={contentRef} forceMount className="h-auto pb-4">
        <ul className={cn('grid gap-x-8 gap-y-2.5 md:grid-cols-2', compact && 'lg:grid-cols-1 print:grid-cols-2')}>
          {group.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed break-inside-avoid">
              <Check aria-hidden="true" className="mt-[0.2em] size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}
