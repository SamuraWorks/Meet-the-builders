import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { STEP_NAV } from '@/lib/registration'

type StepShellProps = {
  step: number
  title: string
  subtitle?: string
  backHref: string
  submitLabel?: string
  submitting?: boolean
  onSubmit?: (event: React.FormEvent) => void
  children: React.ReactNode
}

export function StepShell({
  step,
  title,
  subtitle,
  backHref,
  submitLabel = 'Continue',
  submitting = false,
  onSubmit,
  children,
}: StepShellProps) {
  return (
    <main className="inner-page">
      <SiteHeader />

      <div className="step-top">
        <div className="step-progress" aria-label={`Step ${step} of ${STEP_NAV.length}`}>
          {STEP_NAV.map((label, index) => {
            const number = index + 1
            const state = number === step ? 'active' : number < step ? 'done' : ''
            return (
              <div key={label} className={`step-pip ${state}`}>
                <span className="pip-num" aria-hidden="true">
                  {number}
                </span>
                <span className="pip-label">{label}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="step-body">
        <form
          className="mf-card step-card"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="mf-card-head">
            <span className="mf-num" aria-hidden="true">
              {step}
            </span>
            <div>
              <h2>{title}</h2>
              {subtitle && <p className="mf-card-sub">{subtitle}</p>}
            </div>
          </div>

          {children}

          <div className="step-nav">
            <Link className="step-back" href={backHref}>
              &larr; Back
            </Link>
            {onSubmit && (
              <button className="mf-submit step-continue" type="submit" disabled={submitting}>
                {submitting ? 'Please wait…' : submitLabel}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}