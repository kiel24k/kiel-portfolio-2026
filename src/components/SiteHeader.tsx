import { Link } from 'react-router'
import { Container } from '@/components/Container'
import { MobileNav } from '@/components/MobileNav'
import { ResumeButton } from '@/components/ResumeButton'
import { ThemeToggle } from '@/components/ThemeToggle'
import { nav, ui } from '@/data/site'
import { homeSection } from '@/lib/routes'
import { focusRing } from '@/lib/styles'
import { cn } from '@/lib/utils'

/**
 * Sticky site header: section links on the left, actions on the right. No wordmark, since the hero
 * already introduces the owner. Section links point at the home page (/#projects …) so they work from
 * every route; on project pages the sticky Back bar also leads home.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm supports-backdrop-filter:bg-background/80 print:hidden">
      <Container className="flex h-14 items-center justify-between gap-3">
        {/* -ml-3 lines the first link's text up with the page content below. */}
        <nav aria-label={ui.header.navLabel} className="-ml-3 hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  to={homeSection(item.id)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                    focusRing,
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Below md the icon buttons grow to 40px for easier tapping. */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle className="size-10 md:size-8" />
          <ResumeButton iconOnly className="size-10 sm:hidden" />
          <ResumeButton className="hidden h-10 sm:inline-flex md:h-8" />
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}
