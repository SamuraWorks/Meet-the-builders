import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/footer'
import { StepShell } from '@/components/step-shell'
import Link from 'next/link'

export const metadata = {
  title: 'Apply — Future Builders Academy',
}

export default function GetStartedPage() {
  return (
    <main className="inner-page">
      <SiteHeader />

      <div className="step-top">
        <span className="fb-eyebrow">Apply</span>
      </div>

      <div className="step-body gs-body">
        <div className="mf-card step-card gs-card">
          <div className="mf-card-head">
            <span className="mf-num" aria-hidden="true">
              *
            </span>
            <div>
              <h2>Get Started</h2>
              <p className="mf-card-sub">
                A few quick details to register your young builder. You&apos;ll go through 5 short sections —
                it takes about 2 minutes.
              </p>
            </div>
          </div>

          <ul className="gs-list">
            <li>
              <span className="gs-check" aria-hidden="true">
                &#10003;
              </span>
              <span>
                <strong>Child&apos;s information</strong> — name, age, school and what they enjoy
              </span>
            </li>
            <li>
              <span className="gs-check" aria-hidden="true">
                &#10003;
              </span>
              <span>
                <strong>Parent or guardian details</strong> — so we can contact you about the meetup
              </span>
            </li>
            <li>
              <span className="gs-check" aria-hidden="true">
                &#10003;
              </span>
              <span>
                <strong>Emergency &amp; safety</strong> — any allergies or things to be aware of
              </span>
            </li>
            <li>
              <span className="gs-check" aria-hidden="true">
                &#10003;
              </span>
              <span>
                <strong>Consent</strong> — permission to participate and be photographed
              </span>
            </li>
            <li>
              <span className="gs-check" aria-hidden="true">
                &#10003;
              </span>
              <span>
                <strong>How you heard about us</strong> — helps us reach more young builders
              </span>
            </li>
          </ul>

          <div className="step-nav single">
            <Link className="mf-submit step-continue" href="/apply/step-1">
              Let&apos;s Go &rarr;
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}