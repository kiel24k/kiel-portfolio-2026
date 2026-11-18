import { cn } from '@/lib/utils'

interface BulletListProps {
  items: string[]
  className?: string
}

export function BulletList({ items, className }: BulletListProps) {
  if (items.length === 0) return null

  return (
    <ul className={cn('space-y-2 text-[0.9375rem] leading-relaxed', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
