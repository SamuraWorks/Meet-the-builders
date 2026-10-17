import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

const RECIPIENT = process.env.FUTURE_BUILDERS_EMAIL || 'academyfuturebuilders@gmail.com'

const RELATIONSHIPS = ['Mother', 'Father', 'Guardian', 'Other']
const HEARD_FROM = [
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
const PHOTO_OPTIONS = ['Yes, I give permission', 'No, I do not give permission']

type Payload = {
  answers?: Record<string, unknown>
  pdfBase64?: string
}

function str(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' && Number.isFinite(value)) return String(value)
  return ''
}

function validate(data: Record<string, unknown>): string | null {
  const a: Record<string, unknown> =
    data.answers && typeof data.answers === 'object' ? (data.answers as Record<string, unknown>) : {}
  const f = (key: string) => str(a[key])

  if (!f('childName')) return "Child's full name is required."
  const age = Number(f('childAge'))
  if (!f('childAge') || !Number.isInteger(age) || age < 4 || age > 17) return "Child's age is required (4–17)."
  if (!f('gender')) return 'Gender is required.'
  if (!f('school')) return 'School is required.'
  if (!f('parentName')) return 'Parent or guardian full name is required.'
  if (!f('parentPhone')) return 'Parent or guardian phone number is required.'
  if (!f('whatsapp')) return 'WhatsApp number is required.'
  if (!RELATIONSHIPS.includes(f('relationship'))) return 'Relationship to child is required.'
  if (f('relationship') === 'Other' && !f('otherRelationship')) return 'Please specify the relationship.'

  const medical = f('medical')
  if (medical !== 'No' && medical !== 'Yes') return 'Please answer the medical / safety question.'
  if (medical === 'Yes' && !f('medicalExplain')) return 'Please explain the medical condition or special consideration.'

  if (data.consent !== true && data.consent !== 'true' && data.consent !== 'on') {
    return 'Parent or guardian consent is required.'
  }
  if (!PHOTO_OPTIONS.includes(f('photoConsent'))) return 'Please choose a photography & video consent option.'
  if (!HEARD_FROM.includes(f('heardFrom'))) return 'Please tell us how you heard about the meetup.'
  if (f('heardFrom') === 'Other' && !f('otherHeardFrom')) return 'Please specify how you heard about us.'

  const email = f('email')
  if (!email) return 'Email address is required so we can send your confirmation.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.'

  if (!str(data.pdfBase64)) return 'Application PDF is missing.'

  return null
}

function buildRows(data: Payload): Array<[string, string]> {
  const a = (data.answers ?? {}) as Record<string, unknown>
  const f = (key: string) => str(a[key])
  const medical = f('medical')
  const rows: Array<[string, string]> = [
    ["Child's Full Name", f('childName')],
    ["Child's Age", f('childAge')],
    ['Gender', f('gender')],
    ['School', f('school')],
    ['What does the child enjoy most?', f('interests')],
  ]
  if (f('otherInterest')) rows.push(['Other interest', f('otherInterest')])
  rows.push(['Parent / Guardian Full Name', f('parentName')])
  rows.push(['Parent / Guardian Phone', f('parentPhone')])
  rows.push(['WhatsApp Number', f('whatsapp')])
  rows.push(['Relationship to Child', f('relationship')])
  if (f('otherRelationship')) rows.push(['Relationship (other)', f('otherRelationship')])
  if (f('email')) rows.push(['Email Address', f('email')])
  rows.push(['Allergy / Medical / Special Consideration', medical])
  if (medical === 'Yes') rows.push(['If Yes, please explain', f('medicalExplain')])
  rows.push(['Parent / Guardian Consent', 'Confirmed'])
  rows.push(['Photography & Video Consent', f('photoConsent')])
  rows.push(['How did you hear about us?', f('heardFrom')])
  if (f('otherHeardFrom')) rows.push(['How you heard (other)', f('otherHeardFrom')])
  rows.push([
    'Submitted',
    new Date().toLocaleString('en-GB', {
      timeZone: 'Africa/Freetown',
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  ])
  return rows
}

function buildPlain(rows: Array<[string, string]>): string {
  return rows.map(([label, value]) => `${label}: ${value || '—'}`).join('\n')
}

function buildHtml(rows: Array<[string, string]>): string {
  const list = rows
    .map(([label, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #e4e7eb;font-size:14px;"><strong>${label}</strong></td><td style="padding:8px 12px;border-bottom:1px solid #e4e7eb;font-size:14px;">${value || '—'}</td></tr>`)
    .join('')
  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#212121;">
    <h1 style="font-size:20px;margin:0 0 4px;">Builda — Meet the Builders: Robotics Day 2026</h1>
    <p style="margin:0 0 16px;color:#555;">Saturday, 31 October 2026 · 10:00 AM · Freetown Innovation Lab, opposite FBC Field</p>
    <table style="border-collapse:collapse;width:100%;max-width:640px;">${list}</table>
  </div>`
}

function buildConfirmationHtml(answers: Record<string, string> | undefined): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;color:#212121;">
    <h1 style="font-size:20px;margin:0 0 6px;">REGISTRATION RECEIVED!</h1>
    <p style="margin:0 0 14px;line-height:1.6;">Hi ${str(answers?.parentName) || 'there'},<br/><br/>Thank you for applying for <strong>Builda Meet the Builders — Robotics Day</strong>. Your application has been received.</p>
    <table style="border-collapse:collapse;background:#f6f8fa;font-size:14px;">
      <tr><td style="padding:10px 16px;"><strong>Date:</strong> Saturday, 31 October 2026</td></tr>
      <tr><td style="padding:10px 16px;"><strong>Time:</strong> 10:00 AM</td></tr>
      <tr><td style="padding:10px 16px;"><strong>Venue:</strong> Freetown Innovation Lab, opposite FBC Field</td></tr>
      <tr><td style="padding:10px 16px;"><strong>Event:</strong> PAY AS YOU CAN</td></tr>
    </table>
    <p style="margin:16px 0 0;line-height:1.6;">Please arrive a little early for registration.<br/><br/>— Builda</p>
  </div>`
}

export async function POST(request: Request) {
  let data: Payload
  try {
    data = (await request.json()) as Payload
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const validationError = validate(data)
  if (validationError) {
    return Response.json({ ok: false, error: validationError }, { status: 400 })
  }

  const user = process.env.SMTP_USER || 'academyfuturebuilders@gmail.com'
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, '')

  if (!user || !pass) {
    console.error(
      '[future-builders] Missing SMTP credentials. Set SMTP_USER and SMTP_PASS in your environment.',
    )
    return Response.json({ ok: false, error: 'Email is not configured.' }, { status: 500 })
  }

  const answers = (data.answers ?? {}) as Record<string, string>
  const childName = str(answers.childName)
  const safeName = childName.replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '_')

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    })

    const rows = buildRows(data)

    await transporter.sendMail({
      from: `"Builda Robotics Day" <${user}>`,
      replyTo: answers.email,
      to: RECIPIENT,
      subject: `Meet the Builders Registration — ${childName}`,
      text: buildPlain(rows),
      html: buildHtml(rows),
      attachments: [
        {
          filename: `${safeName || 'Child'}_MeetTheBuilders_Registration.pdf`,
          content: Buffer.from(str(data.pdfBase64), 'base64'),
        },
      ],
    })

const email = str(answers.email)
    await transporter.sendMail({
        from: `"Builda Robotics Day" <${user}>`,
        replyTo: RECIPIENT,
        to: email,
        subject: 'APPLICATION RECEIVED! — Builda Robotics Day 2026',
        text: `REGISTRATION RECEIVED!\n\nHi ${str(answers.parentName) || 'there'},\n\nThank you for applying for Builda Meet the Builders — Robotics Day. Your application has been received.\n\nSaturday, 31 October 2026\n10:00 AM\nFreetown Innovation Lab, opposite FBC Field\n\nPAY AS YOU CAN\n\nPlease arrive a little early for registration.\n\n— Builda`,
        html: buildConfirmationHtml(answers),
        attachments: [
          {
            filename: `${safeName || 'Child'}_MeetTheBuilders_Registration.pdf`,
            content: Buffer.from(str(data.pdfBase64), 'base64'),
          },
        ],
      })

    return Response.json({ ok: true })
  } catch (error) {
    console.error('[future-builders] Failed to send registration email:', error)
    return Response.json({ ok: false, error: 'Failed to send email.' }, { status: 500 })
  }
}
