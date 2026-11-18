import { Outlet, Route, Routes } from 'react-router'
import { ScrollManager } from '@/components/ScrollManager'
import { SiteHeader } from '@/components/SiteHeader'
import { SkipLink } from '@/components/SkipLink'
import { SiteFooter } from '@/components/sections/SiteFooter'
import { portfolio } from '@/data/portfolio'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProjectPage } from '@/pages/ProjectPage'

/** Shared page chrome. ScrollManager comes before <main> so it settles scroll before the page measures. */
function Layout() {
  return (
    // tabIndex: the footer's "Back to top" link (#top) also moves keyboard focus here, before the skip link.
    <div id="top" tabIndex={-1} className="flex min-h-svh flex-col outline-none">
      <SkipLink />
      <SiteHeader />
      <ScrollManager />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <SiteFooter profile={portfolio.profile} />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
