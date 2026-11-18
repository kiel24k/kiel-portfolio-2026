import { ArrowUp } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { Container } from '@/components/Container'
import type { Profile } from '@/data/types'
import { ui } from '@/data/site'
import { focusRing } from '@/lib/styles'
import { cn } from '@/lib/utils'

// Evaluated once when the page loads (a static site is rebuilt or reloaded long before the year matters).
const year = new Date().getFullYear()

export function SiteFooter({ profile }: { profile: Profile }) {
  const { pathname } = useLocation()

  return (
    <footer className="border-t py-8">
      <Container className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name} · {profile.title} · {profile.location}
        </p>
        <Link
          to={{ pathname, hash: '#top' }}
          className={cn(
            'inline-flex items-center gap-1.5 self-start rounded-sm transition-colors hover:text-foreground sm:self-auto print:hidden',
            focusRing,
          )}
        >
          <ArrowUp aria-hidden="true" className="size-4" />
          {ui.footer.backToTop}
        </Link>
      </Container>
    </footer>
  )
}
