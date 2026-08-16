const json = (statusCode, body) => ({ statusCode, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=300, s-maxage=900' }, body: JSON.stringify(body) })

const stripHtml = (html = '') => html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim()

const classifyVisa = (text = '') => {
  const t = text.toLowerCase()
  const blockers = [
    ['citizenship', /u\.?s\.? citizen|us citizen|must be a citizen|citizenship required/],
    ['clearance', /security clearance|secret clearance|top secret|ts\/sci/],
    ['no-sponsorship', /no sponsorship|will not sponsor|cannot sponsor|not able to sponsor|without sponsorship|no visa sponsorship/],
    ['unrestricted', /unrestricted work authorization|permanent work authorization|authorized to work.*without.*sponsorship/],
  ].filter(([, re]) => re.test(t)).map(([name]) => name)
  const positives = [
    ['sponsorship', /visa sponsorship|sponsor.*h-?1b|h-?1b sponsorship|immigration sponsorship/],
    ['opt-cpt', /\bopt\b|\bcpt\b|stem opt/],
  ].filter(([, re]) => re.test(t)).map(([name]) => name)
  let status = 'Review'
  if (blockers.length) status = 'Restricted signal'
  else if (positives.length) status = 'Positive signal'
  return { status, blockers, positives }
}

const normalizeMuse = (j) => {
  const text = stripHtml(j.contents || '')
  const visa = classifyVisa(`${j.name || ''} ${text}`)
  return {
    id: `muse-${j.id}`,
    source: 'The Muse',
    title: j.name,
    company: j.company?.name || 'Unknown company',
    location: (j.locations || []).map(x => x.name).join(' · ') || 'Location not listed',
    level: (j.levels || []).map(x => x.name).join(', ') || '',
    category: (j.categories || []).map(x => x.name).join(', ') || '',
    publishedAt: j.publication_date,
    url: j.refs?.landing_page,
    description: text,
    logo: null,
    remote: /remote|flexible/i.test((j.locations || []).map(x => x.name).join(' ')),
    visa,
  }
}

const normalizeRemotive = (j) => {
  const text = stripHtml(j.description || '')
  const visa = classifyVisa(`${j.title || ''} ${text}`)
  return {
    id: `remotive-${j.id}`,
    source: 'Remotive',
    title: j.title,
    company: j.company_name,
    location: j.candidate_required_location || 'Remote',
    level: '',
    category: j.category || '',
    publishedAt: j.publication_date,
    url: j.url,
    description: text,
    logo: j.company_logo || null,
    remote: true,
    salary: j.salary || '',
    visa,
  }
}

export const handler = async (event) => {
  const q = (event.queryStringParameters?.q || '').trim()
  const search = q || 'identity access cybersecurity cloud security iam sailpoint'
  const results = []
  const sourceStatus = []

  try {
    const museUrl = new URL('https://www.themuse.com/api/public/jobs')
    museUrl.searchParams.set('page', '0')
    museUrl.searchParams.set('descending', 'true')
    const museRes = await fetch(museUrl, { headers: { 'user-agent': 'NexaNetFuture/1.0' } })
    if (!museRes.ok) throw new Error(`HTTP ${museRes.status}`)
    const data = await museRes.json()
    const terms = search.toLowerCase().split(/\s+/).filter(Boolean)
    const museJobs = (data.results || []).map(normalizeMuse).filter(j => {
      const hay = `${j.title} ${j.company} ${j.description} ${j.category}`.toLowerCase()
      return terms.some(t => hay.includes(t))
    })
    results.push(...museJobs)
    sourceStatus.push({ source: 'The Muse', ok: true, count: museJobs.length })
  } catch (e) {
    sourceStatus.push({ source: 'The Muse', ok: false, error: e.message })
  }

  try {
    const remUrl = new URL('https://remotive.com/api/remote-jobs')
    remUrl.searchParams.set('search', search)
    remUrl.searchParams.set('limit', '30')
    const remRes = await fetch(remUrl, { headers: { 'user-agent': 'NexaNetFuture/1.0' } })
    if (!remRes.ok) throw new Error(`HTTP ${remRes.status}`)
    const data = await remRes.json()
    const remJobs = (data.jobs || []).map(normalizeRemotive)
    results.push(...remJobs)
    sourceStatus.push({ source: 'Remotive', ok: true, count: remJobs.length, note: 'Public feed is delayed by Remotive by about 24 hours.' })
  } catch (e) {
    sourceStatus.push({ source: 'Remotive', ok: false, error: e.message })
  }

  const seen = new Set()
  const jobs = results.filter(j => {
    const key = `${j.title}|${j.company}|${j.url}`.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  }).sort((a,b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0)).slice(0, 60)

  return json(200, { fetchedAt: new Date().toISOString(), query: search, count: jobs.length, sources: sourceStatus, jobs })
}
