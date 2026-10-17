'use client'

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export type FbAnswers = Record<string, string>

const TEMPLATE_URL = '/MeetTheBuilders_Registration_Template.pdf'

function value(answers: FbAnswers, key: string): string {
  const raw = String(answers[key] ?? '').trim()
  return raw === 'on' ? 'Yes' : raw
}

function safeFilename(answers: FbAnswers): string {
  return value(answers, 'childName').replace(/[^\w- ]+/g, '').trim().replace(/\s+/g, '_') || 'Child'
}

function draw(pdfPage: any, font: any, text: string, x: number, y: number, size = 9) {
  if (!text) return
  pdfPage.drawText(text, { x, y, size, font, color: rgb(0.05, 0.05, 0.05), maxWidth: 470 })
}

function checkbox(pdfPage: any, text: string, x: number, y: number, selected: boolean, font: any) {
  if (!selected) return
  pdfPage.drawText('X', { x, y, size: 9, font, color: rgb(0.05, 0.05, 0.05) })
}

export async function buildRegistrationPdf(answers: FbAnswers): Promise<Uint8Array> {
  const response = await fetch(TEMPLATE_URL)
  if (!response.ok) throw new Error('Could not load the registration form template')

  const pdf = await PDFDocument.load(await response.arrayBuffer())
  const page = pdf.getPages()[0]
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)

  // Coordinates follow the blank registration template (PDF origin is bottom-left).
  draw(page, bold, value(answers, 'childName'), 86, 675)
  draw(page, font, value(answers, 'childAge'), 86, 648)
  draw(page, font, value(answers, 'gender'), 315, 648)
  draw(page, font, value(answers, 'school'), 86, 621)
  draw(page, font, value(answers, 'interests'), 86, 584, 8)
  draw(page, font, value(answers, 'otherInterest'), 86, 548)

  draw(page, bold, value(answers, 'parentName'), 86, 494)
  draw(page, bold, value(answers, 'parentPhone'), 86, 467)
  draw(page, bold, value(answers, 'whatsapp'), 86, 440)
  draw(page, font, value(answers, 'relationship'), 86, 400)
  draw(page, font, value(answers, 'otherRelationship'), 86, 373)
  draw(page, font, value(answers, 'email'), 86, 346)

  draw(page, font, value(answers, 'medical'), 86, 305)
  draw(page, font, value(answers, 'medicalExplain'), 86, 270, 8)

  checkbox(page, 'X', 49, 215, value(answers, 'consent') === 'Yes', font)
  draw(page, font, value(answers, 'photoConsent'), 86, 182, 8)
  draw(page, font, value(answers, 'heardFrom'), 86, 128, 8)
  draw(page, font, value(answers, 'otherHeardFrom'), 86, 92, 8)

  return pdf.save()
}

export async function buildRegistrationPdfBase64(answers: FbAnswers): Promise<string> {
  const bytes = await buildRegistrationPdf(answers)
  let binary = ''
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  }
  return btoa(binary)
}

export async function downloadRegistrationPdf(answers: FbAnswers): Promise<void> {
  const bytes = await buildRegistrationPdf(answers)
  const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `${safeFilename(answers)}_MeetTheBuilders_Registration.pdf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
