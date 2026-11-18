import type { ComponentProps } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { portfolio } from '@/data/portfolio'
import { ui } from '@/data/site'
import { publicUrl } from '@/lib/portfolio'

type ResumeButtonProps = Pick<ComponentProps<typeof Button>, 'className' | 'size' | 'variant'> & {
  /** Show only the icon (the label stays available to assistive tech). */
  iconOnly?: boolean
}

export function ResumeButton({ className, size = 'default', variant = 'default', iconOnly = false }: ResumeButtonProps) {
  return (
    <Button asChild size={iconOnly ? 'icon' : size} variant={variant} className={className}>
      <a
        href={publicUrl(portfolio.profile.resumeUrl)}
        download
        aria-label={iconOnly ? ui.downloadResume : undefined}
        title={iconOnly ? ui.downloadResume : undefined}
      >
        <Download aria-hidden="true" />
        {!iconOnly && ui.downloadResume}
      </a>
    </Button>
  )
}
