import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/footer'
import { Countdown } from '@/components/countdown'
import Link from 'next/link'

const ACTIVITIES = ['Games', 'Creativity Challenges', 'Problem Solving', 'Building', 'Teamwork', 'Showcase']

export default function Home() {
  return (
    <main className="inner-page">
      <SiteHeader />

      <section className="fb-hero">
        <div className="fb-hero-grid">
          <div className="fb-hero-copy">
            <p className="eyebrow">
              <span className="fb-eyebrow">Future Builders Academy</span>
            </p>
            <h1>
              Meet the <span className="hl">Builders!</span>
            </h1>
            <p>
              We are excited to welcome young builders ages 7–17 to our very first community meetup —
              a day packed with games, creativity challenges, problem solving, building, teamwork and a
              Showcase of what they create.
            </p>
            <div className="fb-chips">
              <span className="fb-chip ch-1">Ages 7–17</span>
              <span className="fb-chip ch-2">Sat · 26 Sep</span>
              <span className="fb-chip ch-3">Free Event</span>
            </div>
            <div className="fb-hero-actions">
              <Link className="fb-apply" href="/apply">
                Apply Now
              </Link>
              <span className="fb-hero-note">Takes about 2 minutes · parent or guardian signs up</span>
            </div>
          </div>
          <div className="fb-hero-media">
            <img
              className="fb-flyer"
              src="/future-builders/meet-the-builders-flyer.jpeg"
              alt="Future Builders Academy Meet the Builders flyer"
            />
            <span className="fb-sticker sticker-1">
              <span>Under</span>
              <span className="big">Roof?</span>
            </span>
            <span className="fb-sticker sticker-2">
              <span>We</span>
              <span className="big">Build!</span>
            </span>
          </div>
        </div>
      </section>

      <div className="fb-stripes" aria-hidden="true" />
      <section className="fb-blocks" aria-hidden="true">
        <span className="fb-block b1" />
        <span className="fb-block b2" />
        <span className="fb-block b3" />
        <span className="fb-block b4" />
        <span className="fb-block b5" />
        <span className="fb-block b6" />
        <span className="fb-block b7" />
      </section>

      <section className="fb-countdown" aria-label="Countdown to the meetup">
        <Countdown
          target="2026-09-26T10:00:00"
          label="Meetup starts in"
          sub="Saturday, 26 September 2026 at 10:00 AM"
          doneLabel="The Meet the Builders meetup has started!"
          doneSub="See you at the Freetown Innovation Lab."
        />
      </section>

      <section className="fb-info">
        <div className="fb-section-head">
          <h2>Event Details</h2>
          <p>Everything you need to know before you arrive. Mark it on your calendar!</p>
        </div>
        <div className="fb-info-card">
          <dl className="fb-info-grid">
            <div className="fb-info-item dt-1">
              <span className="dot" aria-hidden="true" />
              <div>
                <dt>Date</dt>
                <dd>Saturday, 26 September 2026</dd>
              </div>
            </div>
            <div className="fb-info-item dt-2">
              <span className="dot" aria-hidden="true" />
              <div>
                <dt>Time</dt>
                <dd>10:00 AM</dd>
              </div>
            </div>
            <div className="fb-info-item dt-3">
              <span className="dot" aria-hidden="true" />
              <div>
                <dt>Venue</dt>
                <dd>Freetown Innovation Lab, Opposite FBC Field</dd>
              </div>
            </div>
            <div className="fb-info-item dt-4">
              <span className="dot" aria-hidden="true" />
              <div>
                <dt>Cost</dt>
                <dd>FREE EVENT</dd>
              </div>
            </div>
            <div className="fb-info-item dt-5">
              <span className="dot" aria-hidden="true" />
              <div>
                <dt>Ages</dt>
                <dd>7–17 years old</dd>
              </div>
            </div>
            <div className="fb-info-item dt-6">
              <span className="dot" aria-hidden="true" />
              <div>
                <dt>Registration</dt>
                <dd>Completed by a parent or guardian</dd>
              </div>
            </div>
          </dl>
          <Link className="fb-apply fb-apply-block" href="/apply">
            Apply Now
          </Link>
        </div>
      </section>

      <section className="fb-activities">
        <h2>What&apos;s Inside</h2>
        <p className="fb-sub">Six ways to play, build and grow.</p>
        <ul className="fb-activity-grid">
          {ACTIVITIES.map((activity, index) => (
            <li key={activity}>
              <span className="num" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {activity}
            </li>
          ))}
        </ul>
      </section>

      <section className="fb-final">
        <h2>Ready to Register?</h2>
        <p>
          Registration is quick and easy, and it only takes a couple of minutes. Register your young builder
          today — we can&apos;t wait to welcome you.
        </p>
        <Link className="fb-apply" href="/apply">
          Apply Now
        </Link>
      </section>

      <Footer />
    </main>
  )
}