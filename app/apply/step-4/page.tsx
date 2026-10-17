'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepShell } from '@/components/step-shell'
import { FieldError, RequiredMark } from '@/components/form-kit'
import { useRegistration } from '@/lib/use-registration'
import { validateConsent, type Errors } from '@/lib/registration'

const PHOTO_OPTIONS = ['Yes, I give permission', 'No, I do not give permission']

export default function StepConsent() {
  const router = useRouter()
  const { state, update } = useRegistration()
  const [errors, setErrors] = useState<Errors>({})

  function clearError(name: string) {
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  function handleNext(event: FormEvent) {
    event.preventDefault()
    const found = validateConsent(state)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    router.push('/apply/step-5')
  }

  return (
    <StepShell step={4} title="Consent" backHref="/apply/step-3" onSubmit={handleNext}>
      <label className="mf-check">
        <input
          type="checkbox"
          checked={state.consent}
          onChange={(e) => {
            update({ consent: e.target.checked })
            clearError('consent')
          }}
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
        />
        <span>
          I confirm that I am the parent or guardian of the child named above and give permission for the
          child to participate in the <strong>Builda Meet the Builders — Robotics Day</strong> on
          31 October 2026.
        </span>
      </label>
      <FieldError id="consent-error" message={errors.consent} />

      <div className="mf-field" style={{ marginTop: 22 }}>
        <p className="mf-label">
          Photography &amp; Video Consent <RequiredMark />
        </p>
        <p className="mf-hint" id="photoConsent-hint">
          During the event, photographs and videos may be taken for Builda&apos;s
          documentation and social media communication.
        </p>
        <div className="mf-options" role="radiogroup" aria-required="true" aria-describedby={errors.photoConsent ? 'photoConsent-error' : undefined}>
          {PHOTO_OPTIONS.map((option) => (
            <label key={option} className={`mf-option ${state.photoConsent === option ? 'selected' : ''}`}>
              <input
                type="radio"
                name="photoConsent"
                value={option}
                checked={state.photoConsent === option}
                onChange={() => {
                  update({ photoConsent: option })
                  clearError('photoConsent')
                }}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <FieldError id="photoConsent-error" message={errors.photoConsent} />
      </div>

      <div className="mf-note">
        By continuing, your information is sent directly to the Builda team by email and used only
        to process this registration and keep your child safe at the event.
      </div>
    </StepShell>
  )
}
