import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation'
import { saveSubmission } from '@/lib/submissions'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = contactFormSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission', issues: parsed.error.flatten() }, { status: 400 })
  }

  // Honeypot field — if it's filled in, silently accept without persisting.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true })
  }

  const { website: _website, ...record } = parsed.data
  void _website
  await saveSubmission('contact', record)

  return NextResponse.json({ ok: true })
}
