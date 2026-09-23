'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepShell } from '@/components/step-shell'
import { FieldError, RequiredMark } from '@/components/form-kit'
import { useRegistration } from '@/lib/use-registration'
import { INTEREST_OPTIONS, validateChild, type Errors } from '@/lib/registration'

export default function StepChild() {
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

  function toggleInterest(option: string) {
    const next = state.interests.includes(option)
      ? state.interests.filter((i) => i !== option)
      : [...state.interests, option]
    update({ interests: next })
    clearError('interests')
  }

  function handleNext(event: FormEvent) {
    event.preventDefault()
    const found = validateChild(state)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    router.push('/apply/step-2')
  }

  return (
    <StepShell step={1} title="Child's Information" backHref="/apply" onSubmit={handleNext}>
      <div className="mf-field">
        <label className="mf-label" htmlFor="childName">
          Child&apos;s Full Name <RequiredMark />
        </label>
        <input
          className="mf-input"
          id="childName"
          type="text"
          autoComplete="name"
          value={state.childName}
          onChange={(e) => {
            update({ childName: e.target.value })
            clearError('childName')
          }}
          aria-invalid={errors.childName ? true : undefined}
          aria-describedby={errors.childName ? 'childName-error' : undefined}
        />
        <FieldError id="childName-error" message={errors.childName} />
      </div>

      <div className="mf-grid">
        <div className="mf-field">
          <label className="mf-label" htmlFor="childAge">
            Child&apos;s Age <RequiredMark />
          </label>
          <input
            className="mf-input"
            id="childAge"
            type="number"
            min={7}
            max={17}
            step={1}
            inputMode="numeric"
            value={state.childAge}
            onChange={(e) => {
              update({ childAge: e.target.value })
              clearError('childAge')
            }}
            aria-invalid={errors.childAge ? true : undefined}
            aria-describedby={errors.childAge ? 'childAge-error' : undefined}
          />
          <FieldError id="childAge-error" message={errors.childAge} />
        </div>

        <div className="mf-field">
          <p className="mf-label">
            Gender <RequiredMark />
          </p>
          <div className="mf-options mf-options-row" role="radiogroup" aria-required="true" aria-describedby={errors.gender ? 'gender-error' : undefined}>
            {['Male', 'Female'].map((option) => (
              <label key={option} className={`mf-option ${state.gender === option ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={state.gender === option}
                  onChange={() => {
                    update({ gender: option })
                    clearError('gender')
                  }}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <FieldError id="gender-error" message={errors.gender} />
        </div>
      </div>

      <div className="mf-field">
        <label className="mf-label" htmlFor="school">
          School <RequiredMark />
        </label>
        <input
          className="mf-input"
          id="school"
          type="text"
          value={state.school}
          onChange={(e) => {
            update({ school: e.target.value })
            clearError('school')
          }}
          aria-invalid={errors.school ? true : undefined}
          aria-describedby={errors.school ? 'school-error' : undefined}
        />
        <FieldError id="school-error" message={errors.school} />
      </div>

      <div className="mf-field">
        <p className="mf-label">What does the child enjoy most?</p>
        <div className="fb-check-grid" aria-describedby={errors.interests ? 'interests-error' : undefined}>
          {INTEREST_OPTIONS.map((option) => (
            <label key={option} className={`mf-option ${state.interests.includes(option) ? 'selected' : ''}`}>
              <input
                type="checkbox"
                value={option}
                checked={state.interests.includes(option)}
                onChange={() => toggleInterest(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <FieldError id="interests-error" message={errors.interests} />
        {state.interests.includes('Other') && (
          <div className="mf-field" style={{ marginTop: 12 }}>
            <label className="mf-label" htmlFor="otherInterest">
              If Other, please specify
            </label>
            <input
              className="mf-input"
              id="otherInterest"
              name="otherInterest"
              type="text"
              value={state.otherInterest}
              onChange={(e) => update({ otherInterest: e.target.value })}
            />
          </div>
        )}
      </div>
    </StepShell>
  )
}