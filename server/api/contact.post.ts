interface ContactBody {
  name?: unknown
  email?: unknown
  phone?: unknown
  company?: unknown
  categories?: unknown
  description?: unknown
  /** Honeypot: hidden from people, filled in by most bots. */
  website?: unknown
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function field(value: unknown, max = 2000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

// Relays the contact form to the n8n webhook. The webhook URL and its token
// stay on the server (environment variables), unlike in the Weweb version.
export default defineEventHandler(async event => {
  const body = await readBody<ContactBody>(event)

  if (field(body.website)) return { ok: true }

  const payload = {
    name: field(body.name, 200),
    email: field(body.email, 200),
    phone: field(body.phone, 50),
    company: field(body.company, 200),
    type: Array.isArray(body.categories) ? body.categories.map(c => field(c, 50)).filter(Boolean).slice(0, 20) : [],
    description: field(body.description, 5000),
  }

  if (!payload.name || !EMAIL.test(payload.email)) {
    throw createError({ statusCode: 422, statusMessage: 'Nom et email valides requis.' })
  }

  const url = process.env.CONTACT_WEBHOOK_URL
  if (!url) {
    throw createError({ statusCode: 503, statusMessage: 'Formulaire indisponible.' })
  }

  await $fetch(url, {
    method: 'POST',
    headers: process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {},
    body: payload,
  }).catch(error => {
    console.error('[contact] webhook failed', error)
    throw createError({ statusCode: 502, statusMessage: 'Envoi impossible pour le moment.' })
  })

  return { ok: true }
})
