export const STORAGE_KEY = 'fb-registration-v1'

export type RegistrationState = {
  childName: string
  childAge: string
  gender: string
  school: string
  interests: string[]
  otherInterest: string
  parentName: string
  parentPhone: string
  whatsapp: string
  relationship: string
  otherRelationship: string
  email: string
  medical: string
  medicalExplain: string
  consent: boolean
  photoConsent: string
  heardFrom: string
  otherHeardFrom: string
}

export const EMPTY_STATE: RegistrationState = {
  childName: '',
  childAge: '',
  gender: '',
  school: '',
  interests: [],
  otherInterest: '',
  parentName: '',
  parentPhone: '',
  whatsapp: '',
  relationship: '',
  otherRelationship: '',
  email: '',
  medical: '',
  medicalExplain: '',
  consent: false,
  photoConsent: '',
  heardFrom: '',
  otherHeardFrom: '',
}

export const INTEREST_OPTIONS = [
  'Technology',
  'Art & Creativity',
  'Building & Making Things',
  'Problem Solving',
  'Robotics',
  'Speaking & Leadership',
  'Coming up with Ideas',
  'Games',
  'Working with Others',
  'Other',
]

export const HEARD_FROM_OPTIONS = [
  'Facebook',
  'Instagram',
  'TikTok',
  'WhatsApp',
  'School',
  'Friend/Family',
  'Builda',
  'Elimora Girls Foundation',
  'Freetown Innovation Lab',
  'Other',
]

export const STEP_NAV = ['Child', 'Parent', 'Safety', 'Consent', 'About']

export type Errors = Record<string, string>

export function loadState(): RegistrationState {
  if (typeof window === 'undefined') return { ...EMPTY_STATE }
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...EMPTY_STATE }
    const parsed = JSON.parse(raw) as Partial<RegistrationState>
    return { ...EMPTY_STATE, ...parsed, interests: Array.isArray(parsed.interests) ? parsed.interests : [] }
  } catch {
    return { ...EMPTY_STATE }
  }
}

export function saveState(state: RegistrationState) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable */
  }
}

export function clearState() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* storage unavailable */
  }
}

export function validateChild(state: RegistrationState): Errors {
  const errors: Errors = {}
  const name = state.childName.trim()
  if (!name) errors.childName = "Child's full name is required."

  const ageText = state.childAge.trim()
  if (!ageText) errors.childAge = "Child's age is required."
  else {
    const age = Number(ageText)
    if (!Number.isInteger(age) || age < 4 || age > 17) errors.childAge = 'Age must be a number from 4 to 17.'
  }
  if (!state.gender) errors.gender = 'Please choose a gender.'
  if (!state.school.trim()) errors.school = 'School is required.'
  return errors
}

export function validateParent(state: RegistrationState): Errors {
  const errors: Errors = {}
  if (!state.parentName.trim()) errors.parentName = 'Parent or guardian full name is required.'
  if (!state.parentPhone.trim()) errors.parentPhone = 'Phone number is required.'
  if (!state.whatsapp.trim()) errors.whatsapp = 'WhatsApp number is required.'
  if (!state.relationship) errors.relationship = 'Please choose the relationship to the child.'
  if (state.relationship === 'Other' && !state.otherRelationship.trim())
    errors.otherRelationship = 'Please specify the relationship.'
  const email = state.email.trim()
  if (!email) errors.email = 'Email address is required so we can send your confirmation.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
  return errors
}

export function validateMedical(state: RegistrationState): Errors {
  const errors: Errors = {}
  if (!state.medical) errors.medical = 'Please answer this question.'
  if (state.medical === 'Yes' && !state.medicalExplain.trim())
    errors.medicalExplain = 'Please explain so we can keep your child safe.'
  return errors
}

export function validateConsent(state: RegistrationState): Errors {
  const errors: Errors = {}
  if (!state.consent) errors.consent = 'Parent or guardian consent is required.'
  if (!state.photoConsent) errors.photoConsent = 'Please choose one option.'
  return errors
}

export function validateHeardFrom(state: RegistrationState): Errors {
  const errors: Errors = {}
  if (!state.heardFrom) errors.heardFrom = 'Please tell us how you heard about us.'
  return errors
}
