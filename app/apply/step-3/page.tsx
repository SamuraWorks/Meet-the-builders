'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepShell } from '@/components/step-shell'
import { FieldError, RequiredMark } from '@/components/form-kit'
import { useRegistration } from '@/lib/use-registration'
import { validateMedical, type Errors } from '@/lib/registration'

export default function StepSafety() {
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
    const found = validateMedical(state)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    router.push('/apply/step-4')
  }

  return (
    <StepShell step={3} title="Emergency &amp; Safety" backHref="/apply/step-2" onSubmit={handleNext}>
      <p className="mf-label">
        Does the child have any allergy, medical condition, or special consideration we should be aware of?{' '}
        <RequiredMark />
      </p>
      <div className="mf-options mf-options-row" role="radiogroup" aria-required="true" aria-describedby={errors.medical ? 'medical-error' : undefined}>
        {['No', 'Yes'].map((option) => (
          <label key={option} className={`mf-option ${state.medical === option ? 'selected' : ''}`}>
            <input
              type="radio"
              name="medical"
              value={option}
              checked={state.medical === option}
              onChange={() => {
                update({ medical: option })
                clearError('medical')
              }}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <FieldError id="medical-error" message={errors.medical} />

      {state.medical === 'Yes' && (
        <div className="mf-field" style={{ marginTop: 14 }}>
          <label className="mf-label" htmlFor="medicalExplain">
            If Yes, please explain <RequiredMark />
          </label>
          <textarea
            className="mf-textarea"
            id="medicalExplain"
            name="medicalExplain"
            rows={3}
            value={state.medicalExplain}
            onChange={(e) => {
              update({ medicalExplain: e.target.value })
              clearError('medicalExplain')
            }}
            aria-invalid={errors.medicalExplain ? true : undefined}
            aria-describedby={errors.medicalExplain ? 'medicalExplain-error' : undefined}
          />
          <FieldError id="medicalExplain-error" message={errors.medicalExplain} />
        </div>
      )}
    </StepShell>
  )
}