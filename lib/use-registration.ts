'use client'

import { useState } from 'react'
import { loadState, saveState, type RegistrationState } from '@/lib/registration'

export function useRegistration() {
  const [state, setState] = useState<RegistrationState>(() => loadState())

  function update(patch: Partial<RegistrationState>) {
    setState((prev) => {
      const next = { ...prev, ...patch }
      saveState(next)
      return next
    })
  }

  return { state, update }
}