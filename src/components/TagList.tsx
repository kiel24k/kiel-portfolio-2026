import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface TagListProps {
  items: string[]
  label?: string
  variant?: 'secondary' | 'outline'
  className?: string
}

/** Wrapping list of badges. Long labels wrap instead of overflowing on narrow screens. */
export function TagList({ items, label, variant = 'secondary', className }: TagListProps) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li key={item} className="max-w-full">
          <Badge
            variant={variant}
            className="h-auto max-w-full min-h-6 px-2.5 py-0.5 text-left text-[0.8125rem] font-normal whitespace-normal"
          >
            {item}
          </Badge>
        </li>
      ))}
    </ul>
  )
}
