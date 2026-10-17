'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepShell } from '@/components/step-shell'
import { FieldError, RequiredMark } from '@/components/form-kit'
import { useRegistration } from '@/lib/use-registration'
import { validateParent, type Errors } from '@/lib/registration'

const RELATIONSHIPS = ['Mother', 'Father', 'Guardian', 'Other']

export default function StepParent() {
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
    const found = validateParent(state)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    router.push('/apply/step-3')
  }

  return (
    <StepShell step={2} title="Parent / Guardian Information" backHref="/apply/step-1" onSubmit={handleNext}>
      <div className="mf-field">
        <label className="mf-label" htmlFor="parentName">
          Parent or Guardian Full Name <RequiredMark />
        </label>
        <input
          className="mf-input"
          id="parentName"
          type="text"
          autoComplete="name"
          value={state.parentName}
          onChange={(e) => {
            update({ parentName: e.target.value })
            clearError('parentName')
          }}
          aria-invalid={errors.parentName ? true : undefined}
          aria-describedby={errors.parentName ? 'parentName-error' : undefined}
        />
        <FieldError id="parentName-error" message={errors.parentName} />
      </div>

      <div className="mf-grid">
        <div className="mf-field">
          <label className="mf-label" htmlFor="parentPhone">
            Parent / Guardian Phone Number <RequiredMark />
          </label>
          <input
            className="mf-input"
            id="parentPhone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. +232 76 000 000"
            value={state.parentPhone}
            onChange={(e) => {
              update({ parentPhone: e.target.value })
              clearError('parentPhone')
            }}
            aria-invalid={errors.parentPhone ? true : undefined}
            aria-describedby={errors.parentPhone ? 'parentPhone-error' : undefined}
          />
          <FieldError id="parentPhone-error" message={errors.parentPhone} />
        </div>

        <div className="mf-field">
          <label className="mf-label" htmlFor="whatsapp">
            WhatsApp Number <RequiredMark />
          </label>
          <input
            className="mf-input"
            id="whatsapp"
            type="tel"
            inputMode="tel"
            placeholder="e.g. +232 76 000 000"
            value={state.whatsapp}
            onChange={(e) => {
              update({ whatsapp: e.target.value })
              clearError('whatsapp')
            }}
            aria-invalid={errors.whatsapp ? true : undefined}
            aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
          />
          <FieldError id="whatsapp-error" message={errors.whatsapp} />
        </div>
      </div>

      <div className="mf-field">
        <p className="mf-label">
          Relationship to Child <RequiredMark />
        </p>
        <div className="mf-options" role="radiogroup" aria-required="true" aria-describedby={errors.relationship ? 'relationship-error' : undefined}>
          {RELATIONSHIPS.map((option) => (
            <label key={option} className={`mf-option ${state.relationship === option ? 'selected' : ''}`}>
              <input
                type="radio"
                name="relationship"
                value={option}
                checked={state.relationship === option}
                onChange={() => {
                  update({ relationship: option })
                  clearError('relationship')
                }}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <FieldError id="relationship-error" message={errors.relationship} />
        {state.relationship === 'Other' && (
          <div className="mf-field" style={{ marginTop: 12 }}>
            <label className="mf-label" htmlFor="otherRelationship">
              Please specify
            </label>
            <input
              className="mf-input"
              id="otherRelationship"
              name="otherRelationship"
              type="text"
              value={state.otherRelationship}
              onChange={(e) => {
                update({ otherRelationship: e.target.value })
                clearError('otherRelationship')
              }}
              aria-invalid={errors.otherRelationship ? true : undefined}
              aria-describedby={errors.otherRelationship ? 'otherRelationship-error' : undefined}
            />
            <FieldError id="otherRelationship-error" message={errors.otherRelationship} />
          </div>
        )}
      </div>

      <div className="mf-field">
        <label className="mf-label" htmlFor="email">
          Email Address <RequiredMark />
        </label>
        <p className="mf-hint" id="email-hint">
          We&apos;ll send a confirmation of this application to this address.
        </p>
        <input
          className="mf-input"
          id="email"
          type="email"
          autoComplete="email"
          value={state.email}
          onChange={(e) => {
            update({ email: e.target.value })
            clearError('email')
          }}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={['email-hint', errors.email ? 'email-error' : ''].filter(Boolean).join(' ')}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>
    </StepShell>
  )
}
