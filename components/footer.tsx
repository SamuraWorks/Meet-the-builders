import Link from 'next/link'
import { Brand } from './brand'
import { EVENT } from '@/lib/event'

export function Footer() {
  return <footer className="site-footer"><div className="footer-grid"><div><Brand href="/" /><p className="footer-tagline">{EVENT.tagline}.</p></div><div><h2>Explore</h2><Link href="/#about">About Builda</Link><Link href="/#activities">Activities</Link><Link href="/#details">Event details</Link></div><div><h2>Get in touch</h2>{EVENT.contacts.map((contact) => <a key={contact} href={`tel:${contact.replaceAll(' ', '')}`}>{contact}</a>)}<span>{EVENT.shortVenue}</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Builda</span><span>{EVENT.name}</span></div></footer>
}
