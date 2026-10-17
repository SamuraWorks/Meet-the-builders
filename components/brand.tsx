export function Brand({ href }: { href: string }) {
  return <a className="brand" href={href} aria-label="Builda home"><img className="brand-logo" src="/future-builders/logo.jpeg" alt="Builda logo" /><span className="brand-copy"><strong>Builda</strong><span>Turning Curiosity Into Creativity</span></span></a>
}
