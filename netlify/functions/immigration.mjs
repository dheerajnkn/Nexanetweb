const json = (statusCode, body) => ({ statusCode, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=300, s-maxage=900' }, body: JSON.stringify(body) })

const sourceDefs = [
  { id: 'federal-register-f1', name: 'Federal Register', verified: true, type: 'Official', url: 'https://www.federalregister.gov/' },
  { id: 'uscis', name: 'USCIS', verified: true, type: 'Official', url: 'https://www.uscis.gov/newsroom/all-news' },
  { id: 'study-states', name: 'Study in the States / SEVP', verified: true, type: 'Official', url: 'https://studyinthestates.dhs.gov/' },
  { id: 'dol', name: 'U.S. Department of Labor', verified: true, type: 'Official', url: 'https://www.dol.gov/agencies/eta/foreign-labor' },
]

const fetchFederalRegister = async () => {
  const terms = ['F-1', 'OPT', 'STEM OPT', 'H-1B', 'student visa']
  const all = []
  for (const term of terms) {
    const u = new URL('https://www.federalregister.gov/api/v1/documents.json')
    u.searchParams.set('per_page', '20')
    u.searchParams.set('order', 'newest')
    u.searchParams.set('conditions[term]', term)
    u.searchParams.append('conditions[agencies][]', 'homeland-security-department')
    const r = await fetch(u, { headers: { 'user-agent': 'NexaNetFuture/1.0' } })
    if (!r.ok) continue
    const d = await r.json()
    for (const x of d.results || []) {
      all.push({
        id: `fr-${x.document_number}`,
        title: x.title,
        summary: x.abstract || '',
        publishedAt: x.publication_date,
        effectiveOn: x.effective_on || null,
        url: x.html_url,
        source: 'Federal Register',
        sourceType: 'Official',
        verified: true,
        agencies: (x.agencies || []).map(a => a.name),
        topics: [term],
      })
    }
  }
  const seen = new Set()
  return all.filter(x => !seen.has(x.id) && seen.add(x.id)).sort((a,b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
}

const extractUSCIS = async () => {
  const r = await fetch('https://www.uscis.gov/newsroom/all-news?items_per_page=20&page=0', { headers: { 'user-agent': 'Mozilla/5.0 NexaNetFuture/1.0' } })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  const html = await r.text()
  const items = []
  const anchorRe = /<a[^>]+href="(\/newsroom\/(?:alerts|news-releases)\/[^"?#]+)"[^>]*>([\s\S]*?)<\/a>/gi
  const dateRe = /(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+20\d{2}/i
  let m
  while ((m = anchorRe.exec(html)) && items.length < 20) {
    const title = m[2].replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim()
    if (!title || title.length < 18) continue
    const nearby = html.slice(Math.max(0, m.index - 400), Math.min(html.length, m.index + m[0].length + 400))
    const date = nearby.match(dateRe)?.[0] || null
    const topic = /F-1|OPT|STEM|H-1B|student|employment authorization|EAD|I-765|nonimmigrant/i.test(title)
    if (!topic) continue
    items.push({ id:`uscis-${items.length}-${title.slice(0,30)}`, title, summary:'', publishedAt: date ? new Date(date).toISOString().slice(0,10) : null, url:`https://www.uscis.gov${m[1]}`, source:'USCIS', sourceType:'Official', verified:true, topics:['USCIS'] })
  }
  return items
}

const extractDOL = async () => {
  const r = await fetch('https://www.dol.gov/agencies/eta/foreign-labor', { headers: { 'user-agent': 'Mozilla/5.0 NexaNetFuture/1.0' } })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  const html = await r.text()
  const re = /((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+20\d{2})\.\s*([^<]{20,240})/gi
  const items = []
  let m
  while ((m = re.exec(html)) && items.length < 12) {
    const title = m[2].replace(/&amp;/g,'&').replace(/\s+/g,' ').trim()
    if (!/H-1B|LCA|foreign labor|disclosure|program statistics|PERM/i.test(title)) continue
    items.push({ id:`dol-${items.length}-${m[1]}`, title, summary:'', publishedAt:new Date(m[1]).toISOString().slice(0,10), url:'https://www.dol.gov/agencies/eta/foreign-labor', source:'U.S. Department of Labor', sourceType:'Official', verified:true, topics:['H-1B','DOL'] })
  }
  return items
}

export const handler = async () => {
  const status = []
  let items = []
  for (const [name, fn] of [['Federal Register', fetchFederalRegister], ['USCIS', extractUSCIS], ['U.S. Department of Labor', extractDOL]]) {
    try {
      const got = await fn()
      items.push(...got)
      status.push({ source:name, ok:true, count:got.length })
    } catch (e) {
      status.push({ source:name, ok:false, error:e.message })
    }
  }
  const seen = new Set()
  items = items.filter(x => {
    const k = `${x.title}|${x.url}`.toLowerCase()
    if (seen.has(k)) return false
    seen.add(k)
    return true
  }).sort((a,b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0)).slice(0,50)
  return json(200, { fetchedAt:new Date().toISOString(), sources:sourceDefs, status, count:items.length, items })
}
