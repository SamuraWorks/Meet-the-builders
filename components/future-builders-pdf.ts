export type FbAnswers = Record<string, string>

const X = 48
const W = 499.28
const BOTTOM = 782
const TOP = 50

function loadJspdf(): Promise<any> {
  return new Promise((resolve, reject) => {
    const w = window as any
    if (w.jspdf && w.jspdf.jsPDF) return resolve(w.jspdf.jsPDF)
    const s = document.createElement('script')
    s.src = '/vendor/jspdf.umd.min.js'
    s.onload = () => (w.jspdf && w.jspdf.jsPDF ? resolve(w.jspdf.jsPDF) : reject(new Error('jspdf load error')))
    s.onerror = () => reject(new Error('Could not load the PDF generator'))
    document.head.appendChild(s)
  })
}

function any(val: string | undefined): string {
  if (!val) return ''
  const v = String(val).trim()
  return v === 'on' ? 'Yes' : v
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunk)))
  }
  return btoa(binary)
}

export async function buildRegistrationPdfBase64(answers: FbAnswers): Promise<string> {
  const jsPDF = await loadJspdf()
  const doc = buildRegistrationPdf(jsPDF, answers)
  return arrayBufferToBase64(doc.output('arraybuffer') as ArrayBuffer)
}

export async function downloadRegistrationPdf(answers: FbAnswers): Promise<void> {
  const jsPDF = await loadJspdf()
  const doc = buildRegistrationPdf(jsPDF, answers)
  const childName = any(answers.childName).replace(/[^\w- ]+/g, '').trim().replace(/\s+/g, '_')
  const url = URL.createObjectURL(doc.output('blob'))
  const link = document.createElement('a')
  link.href = url
  link.download = `${childName || 'Child'}_MeetTheBuilders_Registration.pdf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function buildRegistrationPdf(jsPDF: any, answers: FbAnswers) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  let y = TOP

  const drawFooter = () => {
    const page = doc.internal.getNumberOfPages()
    doc.setDrawColor(0)
    doc.setLineWidth(0.7)
    doc.line(X, 40, X + W, 40)
    doc.setTextColor(0)
    doc.setFont('times', 'normal')
    doc.setFontSize(8.5)
    doc.text('Builda \u2022 academyfuturebuilders@gmail.com', X + W / 2, 806, { align: 'center' })
    doc.text(`Page ${page}`, X + W / 2, 818, { align: 'center' })
    doc.setTextColor(0)
    doc.setFontSize(10)
  }
  const drawContinuationHeader = () => {
    drawFooter()
    doc.setDrawColor(0)
    doc.setFont('times', 'bold')
    doc.setFontSize(10.5)
    doc.text('Builda', X, 32)
    doc.text('MEET THE BUILDERS \u2014 REGISTRATION FORM', X + W, 32, { align: 'right' })
    doc.setLineWidth(0.7)
    doc.line(X, 40, X + W, 40)
    y = 54
  }
  const newPage = () => {
    doc.addPage()
    drawContinuationHeader()
  }
  const space = (h: number) => {
    if (y + h > BOTTOM) newPage()
  }

  // Page 1 header
  doc.setDrawColor(0)
  doc.setLineWidth(0.8)
  doc.setFont('times', 'bold')
  doc.setFontSize(15)
  doc.text('Builda', X + W / 2, 46, { align: 'center' })
  doc.setFontSize(13)
  doc.text('MEET THE BUILDERS \u2014 REGISTRATION FORM', X + W / 2, 62, { align: 'center' })
  doc.setFont('times', 'italic')
  doc.setFontSize(10)
  doc.text('Saturday, 31 October 2026 \u2022 10:00 AM \u2022 Freetown Innovation Lab, Opposite FBC Field', X + W / 2, 77, { align: 'center' })
  doc.setFont('times', 'bold')
  doc.setFontSize(10)
  doc.text('PAY AS YOU CAN', X + W / 2, 89, { align: 'center' })
  doc.line(X, 96, X + W, 96)
  drawFooter()
  y = 112

  const section = (title: string) => {
    space(30)
    y += 10
    doc.setFillColor(229, 229, 229)
    doc.rect(X, y - 12, W, 16, 'F')
    doc.setDrawColor(0)
    doc.setLineWidth(0.9)
    doc.line(X, y + 4, X + W, y + 4)
    doc.setFont('times', 'bold')
    doc.setFontSize(10.5)
    doc.text(title, X, y)
    y += 24
  }
  const fieldLine = (label: string, value?: string) => {
    const cleanValue = any(value)
    const valueLines = cleanValue ? doc.splitTextToSize(cleanValue, W - 12) : ['']
    const height = 30 + Math.max(0, valueLines.length - 1) * 11
    space(height)
    doc.setFont('times', 'normal')
    doc.setFontSize(9.5)
    doc.text(label, X, y)
    doc.setDrawColor(0)
    doc.setLineWidth(0.6)
    doc.line(X, y + 5, X + W, y + 5)
    if (cleanValue) {
      doc.setFont('times', 'bold')
      doc.setFontSize(9.5)
      doc.text(valueLines, X + 2, y + 17, { lineHeightFactor: 1.15 })
    }
    y += height
  }
  const pair = (l1: string, v1?: string, l2?: string, v2?: string) => {
    const half = W / 2 - 8
    const xr = X + half + 16
    const leftLines = any(v1) ? doc.splitTextToSize(any(v1), half - 4) : ['']
    const rightLines = any(v2) ? doc.splitTextToSize(any(v2), W - (xr - X)) : ['']
    const height = 30 + Math.max(leftLines.length, rightLines.length, 1) * 11 - 11
    space(height)
    doc.setFont('times', 'normal')
    doc.setFontSize(9.5)
    doc.text(l1, X, y)
    doc.text(l2 || '', xr, y)
    doc.setDrawColor(0)
    doc.setLineWidth(0.6)
    doc.line(X, y + 5, X + half, y + 5)
    doc.line(xr, y + 5, X + W, y + 5)
    if (any(v1)) {
      doc.setFont('times', 'bold')
      doc.text(leftLines, X + 2, y + 17, { lineHeightFactor: 1.15 })
    }
    if (any(v2)) {
      doc.setFont('times', 'bold')
      doc.text(rightLines, xr + 2, y + 17, { lineHeightFactor: 1.15 })
    }
    y += height
  }
  const options = (label: string, opts: string[], chosen?: string) => {
    doc.setFont('times', 'normal')
    doc.setFontSize(9.5)
    const rows = opts.map((o) => ({ option: o, width: cbWidth(o) }))
    const rowCount = Math.max(1, Math.ceil(rows.reduce((count, row) => count + row.width, 0) / W))
    space(30 + rowCount * 15)
    doc.text(label, X, y)
    let cy = y + 14
    let x = X
    const cb = 7
    for (const { option } of rows) {
      const total = cb + 3 + doc.getTextWidth(option) + 11
      if (x !== X && x + total > X + W) {
        x = X
        cy += 15
      }
      const on = any(chosen) === option
      doc.setDrawColor(0)
      if (on) {
        doc.setFillColor(0)
        doc.rect(x, cy - 5, cb, cb, 'F')
      } else {
        doc.rect(x, cy - 5, cb, cb, 'S')
      }
      doc.setFont('times', on ? 'bold' : 'normal')
      doc.setTextColor(on ? 0 : 50)
      doc.text(option, x + cb + 3, cy)
      doc.setTextColor(0)
      x += total
    }
    y = cy + 14
  }
  const cbWidth = (option: string) => 7 + 3 + doc.getTextWidth(option) + 11
  const multiOptions = (label: string, opts: string[], value?: string) => {
    const chosen = any(value)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    space(32)
    doc.setFont('times', 'normal')
    doc.setFontSize(9.5)
    doc.text(label, X, y)
    let cy = y + 13
    let x = X
    const cb = 7
    for (const o of opts) {
      const total = cb + 3 + doc.getTextWidth(o) + 1
      if (x + total > X + W) {
        x = X
        cy += 13
      }
      const on = chosen.includes(o)
      doc.setDrawColor(0)
      if (on) {
        doc.setFillColor(0)
        doc.rect(x, cy - 5, cb, cb, 'F')
      } else {
        doc.rect(x, cy - 5, cb, cb, 'S')
      }
      doc.setFont('times', on ? 'bold' : 'normal')
      doc.setTextColor(on ? 0 : 50)
      doc.text(o, x + cb + 3, cy)
      doc.setTextColor(0)
      x += total + 10
    }
    y = cy + 12
  }
  const textArea = (label: string, value?: string) => {
    const lines = doc.splitTextToSize(any(value) || '\u00A0', W - 12)
    const h = Math.max(1, lines.length) * 12 + 8
    space(16 + h)
    doc.setFont('times', 'normal')
    doc.setFontSize(9.5)
    doc.text(label, X, y)
    const by = y + 6
    doc.setDrawColor(0)
    doc.setLineWidth(0.5)
    doc.rect(X, by, W, h)
    if (any(value)) {
      doc.setFont('times', 'bold')
      doc.setFontSize(9)
      doc.text(lines, X + 6, by + 14, { lineHeightFactor: 1.15 })
    }
    y = by + h + 8
  }
  const boxed = (statement: string, checked: boolean) => {
    space(18)
    doc.setDrawColor(0)
    if (checked) {
      doc.setFillColor(0)
      doc.rect(X, y - 10, 8, 8, 'F')
    } else {
      doc.rect(X, y - 10, 8, 8, 'S')
    }
    doc.setFont('times', 'normal')
    doc.setFontSize(9.5)
    doc.text(statement, X + 14, y)
    y += 16
  }

  // SECTION 1 — CHILD'S INFORMATION
  section("SECTION 1 \u2014 CHILD'S INFORMATION")
  fieldLine("Child's Full Name *", answers.childName)
  pair("Child's Age", answers.childAge, 'Gender', answers.gender)
  fieldLine('School', answers.school)
  multiOptions('What does the child enjoy most?', ['Technology', 'Art & Creativity', 'Building & Making Things', 'Problem Solving', 'Robotics', 'Speaking & Leadership', 'Coming up with Ideas', 'Games', 'Working with Others', 'Other'], answers.interests)
  fieldLine('Other interest', answers.otherInterest)

  // SECTION 2 — PARENT/GUARDIAN INFORMATION
  section('SECTION 2 \u2014 PARENT/GUARDIAN INFORMATION')
  fieldLine('Parent or Guardian Full Name *', answers.parentName)
  fieldLine('Parent or Guardian Phone Number *', answers.parentPhone)
  fieldLine('WhatsApp Number *', answers.whatsapp)
  options('Relationship to Child *', ['Mother', 'Father', 'Guardian', 'Other'], answers.relationship)
  fieldLine('If Other, please specify', answers.otherRelationship)
  fieldLine('Email Address (optional)', answers.email)

  // SECTION 3 — EMERGENCY & SAFETY
  section('SECTION 3 \u2014 EMERGENCY & SAFETY')
  options('Allergy, medical condition, or special consideration? *', ['No', 'Yes'], answers.medical)
  textArea('If Yes, please explain', answers.medicalExplain)

  // SECTION 4 — CONSENT
  section('SECTION 4 \u2014 CONSENT')
  boxed('I confirm that I am the parent or guardian of the child named above and give permission for the child to participate in the Builda Meetup, Meet the Builders, on 31 October 2026.', answers.consent === 'Yes')
  options('Photography & Video Consent *', ['Yes, I give permission', 'No, I do not give permission'], answers.photoConsent)

  // SECTION 5 — HOW DID YOU HEAR ABOUT US?
  section('SECTION 5 \u2014 HOW DID YOU HEAR ABOUT US?')
  options('How did you hear about the Builda Meetup? *', ['Facebook', 'Instagram', 'TikTok', 'WhatsApp', 'School', 'Friend/Family', 'Builda', 'Elimora Girls Foundation', 'Freetown Innovation Lab', 'Other'], answers.heardFrom)
  fieldLine('If Other, please specify', answers.otherHeardFrom)

  return doc
}
