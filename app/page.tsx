import Link from 'next/link'
import { Brand } from '@/components/brand'
import { Footer } from '@/components/footer'
import { SiteHeader } from '@/components/site-header'
import { EVENT } from '@/lib/event'

const icons = ['✦', '◒', '⌁', '◆', '◎', '↗']

export default function Home() {
  return (
    <main className="site-shell">
      <SiteHeader />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">Builda presents · 2026</p>
            <h1 id="hero-title">Meet the Builders<span>: Robotics Day</span></h1>
            <p className="hero-lede">A hands-on experience where children explore creativity, build, solve problems, and discover the possibilities of technology.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href={EVENT.applicationPath}>Apply for Robotics Day <span aria-hidden="true">→</span></Link>
              <a className="button button-quiet" href="#activities">Explore the activities</a>
            </div>
            <p className="hero-note">For children ages 4–17 · Parent or guardian application</p>
          </div>
          <div className="hero-art">
            <div className="hero-image-frame">
              <img src={EVENT.flyerUrl} alt="Builda Meet the Builders Robotics Day 2026 flyer" />
            </div>
            <div className="hero-stamp"><span>Pay As</span><strong>You Can</strong></div>
          </div>
        </div>
        <div className="event-strip" aria-label="Event essentials">
          <div><span className="strip-label">When</span><strong>{EVENT.date}</strong><span>{EVENT.time}</span></div>
          <div><span className="strip-label">Where</span><strong>{EVENT.shortVenue}</strong><span>Freetown, Sierra Leone</span></div>
          <div><span className="strip-label">Who</span><strong>Ages {EVENT.ageGroup.replace(' years', '')}</strong><span>{EVENT.payment}</span></div>
        </div>
      </section>

      <section className="about-section section-pad" id="about" aria-labelledby="about-title">
        <div className="section-label">About Builda</div>
        <div className="about-grid"><h2 id="about-title">Turning curiosity into creativity.</h2><div><p>Builda helps children grow their creativity, practical skills, teamwork, problem-solving abilities, and interest in technology through hands-on learning experiences.</p><p>Robotics Day is an invitation to get curious, make things, and learn alongside others in a welcoming space.</p></div></div>
      </section>

      <section className="activities-section section-pad" id="activities" aria-labelledby="activities-title">
        <div className="section-label">The experience</div><div className="section-heading"><h2 id="activities-title">Six ways to get building.</h2><p>Every activity is designed to help young people explore, make, and share.</p></div>
        <div className="activity-grid">{EVENT.activities.map((activity, index) => <article className="activity-card" key={activity.name}><span className="activity-icon" aria-hidden="true">{icons[index]}</span><span className="activity-number">0{index + 1}</span><h3>{activity.name}</h3><p>{activity.description}</p></article>)}</div>
      </section>

      <section className="details-section section-pad" id="details" aria-labelledby="details-title">
        <div className="details-card"><div><div className="section-label">Plan your visit</div><h2 id="details-title">Everything you need to know.</h2><p>Bring your curiosity. We&apos;ll bring a welcoming space for children to explore creativity, practical building, teamwork, and problem-solving.</p></div><dl className="details-list"><div><dt>Date &amp; time</dt><dd>{EVENT.date}<br />{EVENT.time}</dd></div><div><dt>Venue</dt><dd>{EVENT.venue}</dd></div><div><dt>Age group</dt><dd>{EVENT.ageGroup}</dd></div><div><dt>Payment</dt><dd>{EVENT.payment}</dd></div></dl><div className="contact-row"><div><span>Questions? Call us</span><a href={`tel:${EVENT.contacts[0].replaceAll(' ', '')}`}>{EVENT.contacts[0]}</a><a href={`tel:${EVENT.contacts[1].replaceAll(' ', '')}`}>{EVENT.contacts[1]}</a></div><Link className="button button-primary" href={EVENT.applicationPath}>Apply now <span aria-hidden="true">→</span></Link></div></div>
      </section>

      <section className="closing-cta"><Brand href="/" /><h2>Give curiosity room to grow.</h2><p>Applications are open for Meet the Builders: Robotics Day 2026.</p><Link className="button button-light" href={EVENT.applicationPath}>Apply for Robotics Day <span aria-hidden="true">→</span></Link></section>
      <Footer />
    </main>
  )
}
