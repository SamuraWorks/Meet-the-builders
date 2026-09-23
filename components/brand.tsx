export function Brand({ href }: { href: string }) {
  return (
    <a className="brand" href={href} aria-label="Future Builders Academy home">
      <img className="brand-logo" src="/future-builders/logo.jpeg" alt="Future Builders Academy logo" />
      <span className="brand-name">
        <strong>FUTURE BUILDERS</strong>
        <span className="brand-tag">ACADEMY</span>
      </span>
    </a>
  )
}