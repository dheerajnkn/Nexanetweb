import { NextResponse } from 'next/server'
import { talentFormSchema } from '@/lib/validation'
import { saveSubmission } from '@/lib/submissions'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = talentFormSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission', issues: parsed.error.flatten() }, { status: 400 })
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true })
  }

  const { website: _website, ...record } = parsed.data
  void _website
  await saveSubmission(`talent-${parsed.data.kind}`, record)

  return NextResponse.json({ ok: true })
}
