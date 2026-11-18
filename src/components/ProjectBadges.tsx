import { Badge } from '@/components/ui/badge'
import type { ProjectKind } from '@/data/types'
import { ui } from '@/data/site'
import { cn } from '@/lib/utils'

const kindStyles: Record<ProjectKind, string> = {
  'Client / Production': 'border-primary/25 bg-primary/10 text-primary',
  Personal: 'border-border bg-secondary text-secondary-foreground',
  Academic: 'border-border bg-transparent text-muted-foreground',
}

export function KindBadge({ kind, className }: { kind: ProjectKind; className?: string }) {
  return (
    <Badge variant="outline" className={cn('font-medium', kindStyles[kind], className)}>
      {ui.kinds[kind]}
    </Badge>
  )
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn('h-auto min-h-5 max-w-full text-left font-normal whitespace-normal text-muted-foreground', className)}
    >
      {status}
    </Badge>
  )
}
