import { HashRouter, Link, NavLink, Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom'
import type { ReactNode } from 'react'
import { componentCatalog } from './componentCatalog'

function AppShell() {
  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">Vibe Components</p>
        <div className="hero__content">
          <div>
            <h1>Copy-friendly React components</h1>
            <p className="hero__lede">
              A tiny gallery of TypeScript components that live in self-contained folders and
              route to their own demos.
            </p>
          </div>
          <nav className="hero__nav" aria-label="Component navigation">
            {componentCatalog.map((component) => (
              <NavLink
                key={component.slug}
                className="hero__link"
                to={component.route}
              >
                {component.name}
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

function GalleryPage() {
  return (
    <section className="gallery">
      {componentCatalog.map((component) => (
        <article className="gallery-card" key={component.slug}>
          <div className="gallery-card__preview">{component.preview()}</div>
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
    </section>
  )
}

function ComponentRoute() {
  const { componentId } = useParams()
  const component = componentCatalog.find((entry) => entry.slug === componentId)

  if (!component) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="detail-card">
      <Link className="detail-card__back" to="/">
        ← Back to gallery
      </Link>
      <div className="detail-card__header">
        <div>
          <p className="eyebrow">Component route</p>
          <h2>{component.name}</h2>
          <p>{component.description}</p>
        </div>
        <code>{component.copyPath}</code>
      </div>
      <div className="detail-card__preview">{component.preview()}</div>
      <div className="detail-card__usage">
        <h3>Usage</h3>
        <pre>{component.usage}</pre>
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
        <Route path="components/:componentId" element={<ComponentRoute />} />
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
