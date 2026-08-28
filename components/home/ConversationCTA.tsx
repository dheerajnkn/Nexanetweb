'use client'

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { site } from '@/content/site'

export function ConversationCTA() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (email.trim()) params.set('email', email.trim())
    router.push(`/contact${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <section className="bg-gradient-band py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-end">
          <div>
            <Eyebrow on="dark">Start a conversation</Eyebrow>
            <h2 className="mt-5 font-display text-display-md font-bold text-white">What are you building next?</h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
              Tell us about the capability, talent, or project outcome you need. We&apos;ll respond with a focused next step.
            </p>
          </div>
          <div className="md:justify-self-end md:text-right">
            <form onSubmit={submit} className="flex w-full max-w-md gap-2 rounded-full bg-white/10 p-1.5 backdrop-blur md:ml-auto">
              <label htmlFor="conversation-email" className="sr-only">Work email</label>
              <input
                id="conversation-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full flex-1 rounded-full bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/50 outline-none"
              />
              <button
                type="submit"
                aria-label="Start the conversation"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-navy-900 transition-transform hover:scale-105"
              >
                ↗
              </button>
            </form>
            <p className="mt-4 text-sm text-white/70">{site.phone}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
