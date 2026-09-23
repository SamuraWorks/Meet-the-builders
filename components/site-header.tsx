import { Brand } from './brand'

export function SiteHeader() {
  return (
    <header className="inner-header">
      <Brand href="/" />
      <nav aria-label="Primary">
        <a className="nav-apply" href="/apply">
          Apply Now
        </a>
      </nav>
    </header>
  )
}