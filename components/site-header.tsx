import Link from 'next/link'
import { Brand } from './brand'

export function SiteHeader() {
  return <header className="site-header"><Brand href="/" /><nav aria-label="Primary"><Link href="/#about">About Builda</Link><Link href="/#activities">Activities</Link><Link href="/#details">Event details</Link><Link className="header-apply" href="/apply">Apply now <span aria-hidden="true">→</span></Link></nav></header>
}
