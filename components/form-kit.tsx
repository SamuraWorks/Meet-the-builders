export function RequiredMark() {
  return (
    <span className="mf-req" aria-hidden="true">
      *
    </span>
  )
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p className="mf-error" id={id} role="alert">
      {message}
    </p>
  )
}