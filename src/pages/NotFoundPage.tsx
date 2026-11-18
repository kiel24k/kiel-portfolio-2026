import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { ui } from '@/data/site'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { homeSection } from '@/lib/routes'
import { notFoundTitle } from '@/lib/titles'

/** Unknown route or project slug. */
export function NotFoundPage({ message = ui.notFound.body }: { message?: string }) {
  useDocumentTitle(notFoundTitle)

  return (
    <Container className="py-20 md:py-28">
      <div className="max-w-xl">
        <h1 tabIndex={-1} data-route-focus className="text-3xl font-semibold tracking-tight outline-none md:text-4xl">
          {ui.notFound.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{message}</p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          <Button asChild size="lg">
            <Link to="/">
              <ArrowLeft aria-hidden="true" />
              {ui.notFound.home}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to={homeSection('projects')}>{ui.notFound.projects}</Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
