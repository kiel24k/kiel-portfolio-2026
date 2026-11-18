import { useRef, useState, type MouseEvent } from 'react'
import { Menu } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { ResumeButton } from '@/components/ResumeButton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { nav, ui } from '@/data/site'
import { homeSection, isPlainLeftClick } from '@/lib/routes'
import { focusRing } from '@/lib/styles'
import { cn } from '@/lib/utils'

/**
 * Navigation drawer for small screens. A plain click closes the drawer first and navigates once it
 * has closed, so ScrollManager can scroll to and focus the chosen section (from any route).
 */
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pendingTarget = useRef<string | null>(null)
  const navigate = useNavigate()

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!isPlainLeftClick(event)) return
    event.preventDefault()
    pendingTarget.current = id
    setOpen(false)
  }

  const onCloseAutoFocus = (event: Event) => {
    const id = pendingTarget.current
    pendingTarget.current = null
    if (!id) return
    event.preventDefault()
    requestAnimationFrame(() => {
      void navigate(homeSection(id))
    })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-10 md:hidden" aria-label={ui.header.openMenu}>
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        aria-describedby={undefined}
        closeLabel={ui.header.closeMenu}
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <SheetHeader>
          <SheetTitle>{ui.header.menuTitle}</SheetTitle>
        </SheetHeader>
        <nav aria-label={ui.header.navLabel} className="px-2">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.id}>
                <Link
                  to={homeSection(item.id)}
                  onClick={(event) => onNavigate(event, item.id)}
                  className={cn(
                    'block rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted',
                    focusRing,
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Separator />
        <div className="px-4">
          <ResumeButton size="lg" className="w-full" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
