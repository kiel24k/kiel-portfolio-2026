import { MonitorPlay } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { Project } from '@/data/types'
import { ui } from '@/data/site'
import { cn } from '@/lib/utils'

interface DemoNoticeProps {
  /**
   * On a project page: shorter copy that gives the reason this project has no public link (it depends
   * on the project's kind). Omit it for the home page notice.
   */
  project?: Pick<Project, 'kind'>
  className?: string
}

/**
 * Explains why there are no public links (some systems run in production for clients) and offers a
 * live walkthrough on localhost. A calm note, not a warning: role="note" instead of the Alert's role="alert".
 */
export function DemoNotice({ project, className }: DemoNoticeProps) {
  const copy = project ? ui.demoNotice.project[project.kind] : ui.demoNotice

  return (
    <Alert
      role="note"
      className={cn(
        'border-primary/20 bg-primary/5 text-foreground has-[>svg]:gap-x-3 *:[svg]:text-primary',
        project ? 'px-3.5 py-3' : 'px-4 py-4 md:px-5',
        className,
      )}
    >
      <MonitorPlay aria-hidden="true" />
      <AlertTitle className="font-semibold">{copy.title}</AlertTitle>
      <AlertDescription className="max-w-[70ch] leading-relaxed text-pretty text-foreground/80">
        <p>{copy.body}</p>
      </AlertDescription>
    </Alert>
  )
}
