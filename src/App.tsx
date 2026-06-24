import type { ReactNode } from 'react'
import { HashRouter, Link, NavLink, Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'
import { componentCatalog, pageCatalog, showcaseCatalog, type ShowcaseItem } from './componentCatalog'

function AppShell() {
  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">Vibe Components</p>
        <div className="hero__content">
          <div>
            <h1>Copy-friendly React UI building blocks</h1>
            <p className="hero__lede">
              A tiny gallery of TypeScript components and pages that live in self-contained
              folders and route to their own demos.
            </p>
          </div>
          <nav className="hero__nav" aria-label="Component navigation">
            {showcaseCatalog.map((component) => (
              <NavLink
                key={component.route}
                className={({ isActive }) => (isActive ? 'hero__link hero__link--active' : 'hero__link')}
                to={component.route}
              >
                {component.kind === 'page' ? `Page · ${component.name}` : component.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="page">
        <Outlet />
      </main>
    </div>
  )
}

function GallerySection({ items, title }: { items: ShowcaseItem[]; title: string }) {
  return (
    <section className="gallery-section">
      <div className="gallery-section__header">
        <p className="eyebrow">{title}</p>
      </div>
      <div className="gallery">
        {items.map((component) => (
          <article className="gallery-card" key={component.route}>
            <div className="gallery-card__preview">
              <component.Preview />
            </div>
            <div className="gallery-card__body">
              <div>
                <h2>{component.name}</h2>
                <p>{component.description}</p>
              </div>
              <Link className="gallery-card__link" to={component.route}>
                View route
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function GalleryPage() {
  return (
    <>
      <GallerySection items={componentCatalog} title="Components" />
      <GallerySection items={pageCatalog} title="Pages" />
    </>
  )
}

function DetailRoute({
  catalog,
  eyebrow,
  itemIdParam,
}: {
  catalog: ShowcaseItem[]
  eyebrow: string
  itemIdParam: 'componentId' | 'pageId'
}) {
  const params = useParams()
  const item = catalog.find((entry) => entry.slug === params[itemIdParam])

  if (!item) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="detail-card">
      <Link className="detail-card__back" to="/">
        ← Back to gallery
      </Link>
      <div className="detail-card__header">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
        <code>{item.copyPath}</code>
      </div>
      <div className="detail-card__preview">
        <item.Preview />
      </div>
      <div className="detail-card__usage">
        <h3>Usage</h3>
        <pre>{item.usage}</pre>
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <section className="empty-state">
      <h2>Route not found</h2>
      <Link className="gallery-card__link" to="/">
        Return home
      </Link>
    </section>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<GalleryPage />} />
        <Route
          path="components/:componentId"
          element={<DetailRoute catalog={componentCatalog} eyebrow="Component route" itemIdParam="componentId" />}
        />
        <Route
          path="pages/:pageId"
          element={<DetailRoute catalog={pageCatalog} eyebrow="Page route" itemIdParam="pageId" />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default function App(): ReactNode {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  )
}
