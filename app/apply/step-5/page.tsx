'use client'

import { FormEvent, useRef, useState } from 'react'
import { StepShell } from '@/components/step-shell'
import { FieldError, RequiredMark } from '@/components/form-kit'
import { useRegistration } from '@/lib/use-registration'
import { clearState, HEARD_FROM_OPTIONS, validateHeardFrom, type Errors } from '@/lib/registration'
import { buildRegistrationPdfBase64 } from '@/components/future-builders-pdf'

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function StepHeardFrom() {
  const { state, update } = useRegistration()
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const submittingRef = useRef(false)

  function clearError(name: string) {
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (submittingRef.current) return

    const found = validateHeardFrom(state)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }

    setErrors({})
    submittingRef.current = true
    setStatus('submitting')

    try {
      const pdfBase64 = await buildRegistrationPdfBase64({
        childName: state.childName,
        childAge: state.childAge,
        gender: state.gender,
        school: state.school,
        interests: state.interests.join(', '),
        otherInterest: state.otherInterest.trim(),
        parentName: state.parentName,
        parentPhone: state.parentPhone,
        whatsapp: state.whatsapp,
        relationship: state.relationship,
        otherRelationship: state.otherRelationship.trim().replace(/\s+/g, ' '),
        email: state.email.trim(),
        medical: state.medical,
        medicalExplain: state.medicalExplain.trim(),
        consent: 'Yes',
        photoConsent: state.photoConsent,
        heardFrom: state.heardFrom,
        otherHeardFrom: state.otherHeardFrom.trim(),
      })

      const response = await fetch('/api/future-builders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: {
            childName: state.childName,
            childAge: state.childAge,
            gender: state.gender,
            school: state.school,
            interests: state.interests.join(', '),
            otherInterest: state.otherInterest.trim(),
            parentName: state.parentName,
            parentPhone: state.parentPhone,
            whatsapp: state.whatsapp,
            relationship: state.relationship,
            otherRelationship: state.otherRelationship.trim().replace(/\s+/g, ' '),
            email: state.email.trim(),
            medical: state.medical,
            medicalExplain: state.medicalExplain.trim(),
            photoConsent: state.photoConsent,
            heardFrom: state.heardFrom,
            otherHeardFrom: state.otherHeardFrom.trim(),
          },
          pdfBase64,
          consent: true,
        }),
      })

      const data = await response.json().catch(() => null)
      if (!response.ok || !data?.ok) throw new Error('submit failed')

      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('error')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      submittingRef.current = false
    }
  }

  function resetForm() {
    clearState()
    setErrors({})
    setStatus('idle')
    window.location.href = '/apply'
  }

  if (status === 'success') {
    return (
      <main className="inner-page">
        <div className="step-top" />
        <section className="mf-success">
          <div className="mf-success-card">
            <span className="mf-success-icon" aria-hidden="true">
              🛠️
            </span>
            <h2>REGISTRATION RECEIVED!</h2>
            <p>
              Thank you for registering for the Future Builders Academy Meetup, <strong>Meet the
              Builders</strong>! We look forward to welcoming your young builder.
              <br />
              <br />
              Saturday, 26 September 2026
              <br />
              10:00 AM
              <br />
              Freetown Innovation Lab, Opposite FBC Field
              <br />
              FREE EVENT
              <br />
              <br />
              Please arrive a little early for registration.
            </p>
            <button className="mf-submit mf-submit-inline" type="button" onClick={resetForm}>
              Register Another Child
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <StepShell
      step={5}
      title="Almost Done!"
      backHref="/apply/step-4"
      submitLabel="Submit Registration"
      submitting={status === 'submitting'}
      onSubmit={handleSubmit}
    >
      {status === 'error' && (
        <div className="mf-alert" role="alert">
          We couldn&apos;t submit the registration right now. Please try again.
        </div>
      )}

      <p className="mf-label">
        How did you hear about us? <RequiredMark />
      </p>
      <div className="mf-options" role="radiogroup" aria-required="true" aria-describedby={errors.heardFrom ? 'heardFrom-error' : undefined}>
        {HEARD_FROM_OPTIONS.map((option) => (
          <label key={option} className={`mf-option ${state.heardFrom === option ? 'selected' : ''}`}>
            <input
              type="radio"
              name="heardFrom"
              value={option}
              checked={state.heardFrom === option}
              onChange={() => {
                update({ heardFrom: option })
                clearError('heardFrom')
              }}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <FieldError id="heardFrom-error" message={errors.heardFrom} />

      {state.heardFrom === 'Other' && (
        <div className="mf-field" style={{ marginTop: 14 }}>
          <label className="mf-label" htmlFor="otherHeardFrom">
            Please specify
          </label>
          <input
            className="mf-input"
            id="otherHeardFrom"
            name="otherHeardFrom"
            type="text"
            value={state.otherHeardFrom}
            onChange={(e) => update({ otherHeardFrom: e.target.value })}
          />
        </div>
      )}

      <div className="mf-note">
        One last check — press <strong>Submit Registration</strong> and your application is in!
      </div>
    </StepShell>
  )
}