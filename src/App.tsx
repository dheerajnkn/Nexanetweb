import { type FormEvent, useEffect, useMemo, useState } from 'react'
import './App.css'

type View = 'home' | 'jobs' | 'immigration' | 'hub' | 'community'
type Post = { id: number; title: string; body: string; tag: string; createdAt: string; votes: number; comments: string[] }
type VisaSignal = { status: string; blockers: string[]; positives: string[] }
type Job = {
  id: string; source: string; title: string; company: string; location: string; level?: string; category?: string;
  publishedAt?: string; url: string; description?: string; logo?: string | null; remote?: boolean; salary?: string; visa: VisaSignal
}
type NewsItem = { id:string; title:string; summary?:string; publishedAt?:string|null; effectiveOn?:string|null; url:string; source:string; sourceType:string; verified:boolean; topics?:string[] }

const nav: { id: View; label: string; icon: string; desc: string }[] = [
  { id: 'home', label: 'Home', icon: '⌂', desc: 'Command center' },
  { id: 'jobs', label: 'Jobs', icon: '⌕', desc: 'Live F-1 career search' },
  { id: 'immigration', label: 'Immigration', icon: '◇', desc: 'Verified live updates' },
  { id: 'hub', label: 'Student Hub', icon: '✦', desc: 'Tools & resources' },
  { id: 'community', label: 'Community', icon: '◌', desc: 'Real discussions' },
]

const officialLinks = [
  ['USCIS — Students & Exchange Visitors', 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors'],
  ['Study in the States — DHS/SEVP', 'https://studyinthestates.dhs.gov/'],
  ['USCIS — Optional Practical Training', 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students'],
  ['USCIS — STEM OPT', 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/students-and-employment/stem-opt'],
  ['E-Verify Employer Search', 'https://www.e-verify.gov/about-e-verify/e-verify-data/how-to-find-participating-employers'],
  ['DOL H-1B Disclosure Data', 'https://www.dol.gov/agencies/eta/foreign-labor/performance'],
]

function timeAgo(value?: string | null) {
  if (!value) return 'Date unavailable'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  const diff = Date.now() - d.getTime()
  const h = Math.floor(diff / 3600000)
  const days = Math.floor(h / 24)
  if (h < 1) return 'Just now'
  if (h < 24) return `${h}h ago`
  if (days < 30) return `${days}d ago`
  return d.toLocaleDateString()
}

function App() {
  const [view, setView] = useState<View>('home')
  const [query, setQuery] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const [postOpen, setPostOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('nexanet-future-posts')
    if (saved) setPosts(JSON.parse(saved))
  }, [])
  useEffect(() => { localStorage.setItem('nexanet-future-posts', JSON.stringify(posts)) }, [posts])

  const filteredPosts = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return posts
    return posts.filter(p => `${p.title} ${p.body} ${p.tag}`.toLowerCase().includes(q))
  }, [posts, query])

  const addPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const title = String(fd.get('title') || '').trim(); const body = String(fd.get('body') || '').trim(); const tag = String(fd.get('tag') || 'General')
    if (!title || !body) return
    const post: Post = { id: Date.now(), title, body, tag, createdAt: new Date().toISOString(), votes: 0, comments: [] }
    setPosts(p => [post, ...p]); setPostOpen(false); e.currentTarget.reset()
  }
  const vote = (id: number, delta: number) => setPosts(p => p.map(x => x.id === id ? { ...x, votes: x.votes + delta } : x))
  const addComment = (id: number, text: string) => {
    if (!text.trim()) return
    setPosts(p => p.map(x => x.id === id ? { ...x, comments: [...x.comments, text.trim()] } : x))
    setSelectedPost(prev => prev && prev.id === id ? { ...prev, comments: [...prev.comments, text.trim()] } : prev)
  }

  return <div className="future-shell">
    <div className="aurora aurora-a"/><div className="aurora aurora-b"/><div className="aurora aurora-c"/>
    <aside className="icon-rail glass">
      <button className="logo" onClick={() => setView('home')}>N</button>
      <div className="rail-stack">{nav.map(n => <button key={n.id} className={`rail-icon ${view===n.id?'active':''}`} title={n.label} onClick={()=>setView(n.id)}>{n.icon}</button>)}</div>
      <button className="rail-avatar" onClick={()=>setProfileOpen(v=>!v)}>DJ<span/></button>
    </aside>
    <aside className="nav-panel glass">
      <div className="brand"><span>NEXANET</span><strong>Future</strong></div>
      <div className="command-search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Future"/></div>
      <div className="nav-group-label">Workspace</div>
      <nav>{nav.map(n => <button key={n.id} className={`nav-row ${view===n.id?'active':''}`} onClick={()=>setView(n.id)}><span className="nav-glyph">{n.icon}</span><span><b>{n.label}</b><small>{n.desc}</small></span></button>)}</nav>
      <div className="truth-card"><div className="truth-head"><span className="live-dot"/>Authenticity mode</div><p>Every live record shows its source. Visa compatibility is a text signal, never a legal conclusion.</p></div>
      <div className="status-card"><div><span className="live-dot"/><b>Live data connected</b></div><small>Jobs: The Muse + Remotive<br/>Immigration: official U.S. government sources</small></div>
    </aside>
    <main className="workspace">
      <header className="topbar"><div><span className="crumb">NexaNet Future /</span><strong>{nav.find(n=>n.id===view)?.label}</strong></div><div className="top-actions"><button className="ghost">Invite</button><button className="primary" onClick={()=>view==='community'?setPostOpen(true):setView('community')}>{view==='community'?'Create post':'Ask community'}</button></div></header>
      {view==='home' && <Home go={setView} postCount={posts.length}/>} 
      {view==='jobs' && <Jobs/>}
      {view==='immigration' && <Immigration/>}
      {view==='hub' && <Hub go={setView}/>} 
      {view==='community' && <Community posts={filteredPosts} onCreate={()=>setPostOpen(true)} onVote={vote} onOpen={setSelectedPost}/>} 
    </main>
    {profileOpen && <div className="profile-pop glass"><strong>Dheeraj</strong><span>Member profile</span><button onClick={()=>setProfileOpen(false)}>Close</button></div>}
    {postOpen && <div className="modal-backdrop" onMouseDown={()=>setPostOpen(false)}><form className="modal glass" onSubmit={addPost} onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">REAL USER POST</span><h2>Start a discussion</h2></div><button type="button" onClick={()=>setPostOpen(false)}>×</button></div><label>Title<input name="title" required maxLength={120}/></label><label>Topic<select name="tag"><option>General</option><option>Jobs</option><option>OPT / STEM OPT</option><option>CPT</option><option>H-1B</option><option>University / DSO</option><option>Interview</option></select></label><label>Details<textarea name="body" required rows={7}/></label><div className="modal-note">Do not post passport numbers, SEVIS IDs, EAD numbers, I-94 numbers, addresses, or other sensitive documents.</div><button className="primary wide" type="submit">Publish discussion</button></form></div>}
    {selectedPost && <ThreadDrawer post={posts.find(p=>p.id===selectedPost.id)||selectedPost} onClose={()=>setSelectedPost(null)} onComment={addComment}/>} 
  </div>
}

function Home({go,postCount}:{go:(v:View)=>void;postCount:number}){
  return <div className="page home-page">
    <section className="hero-panel glass-card"><div className="hero-copy"><span className="eyebrow">THE INTERNATIONAL STUDENT OPERATING SYSTEM</span><h1>Jobs, immigration and community <em>in one place.</em></h1><p>NexaNet Future combines a live career feed, verified immigration updates, official sources and student discussion without blurring fact and opinion.</p><div className="hero-actions"><button className="primary" onClick={()=>go('jobs')}>Explore live jobs</button><button className="ghost solid" onClick={()=>go('immigration')}>See immigration updates</button></div></div><div className="hero-orbit"><div className="orbit-core">NF</div><span className="orbit o1">JOBS</span><span className="orbit o2">OPT</span><span className="orbit o3">NEWS</span><span className="orbit o4">FORUM</span></div></section>
    <section className="quick-grid"><button className="quick-card purple" onClick={()=>go('jobs')}><span className="quick-icon">⌕</span><div><b>Live Job Board</b><p>Fresh public listings with source attribution and authorization-language screening.</p></div><i>→</i></button><button className="quick-card blue" onClick={()=>go('immigration')}><span className="quick-icon">◇</span><div><b>Immigration Live</b><p>Official USCIS, Federal Register and DOL updates with freshness timestamps.</p></div><i>→</i></button><button className="quick-card cyan" onClick={()=>go('hub')}><span className="quick-icon">✦</span><div><b>Student Hub</b><p>Official checkers, resources and next-step tools.</p></div><i>→</i></button><button className="quick-card pink" onClick={()=>go('community')}><span className="quick-icon">◌</span><div><b>Community</b><p>{postCount?`${postCount} real discussion${postCount===1?'':'s'} created in this browser.`:'Start the first real discussion.'}</p></div><i>→</i></button></section>
  </div>
}

function Jobs(){
  const [query,setQuery]=useState('identity access cybersecurity')
  const [jobs,setJobs]=useState<Job[]>([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState('')
  const [fetchedAt,setFetchedAt]=useState('')
  const [filter,setFilter]=useState('all')
  const [saved,setSaved]=useState<string[]>(()=>JSON.parse(localStorage.getItem('future-saved-jobs')||'[]'))
  const [sourceStatus,setSourceStatus]=useState<{source:string;ok:boolean;count?:number;note?:string}[]>([])

  const load=async(q=query)=>{setLoading(true);setError('');try{const r=await fetch(`/.netlify/functions/jobs?q=${encodeURIComponent(q)}`);if(!r.ok) throw new Error(`HTTP ${r.status}`);const d=await r.json();setJobs(d.jobs||[]);setFetchedAt(d.fetchedAt||'');setSourceStatus(d.sources||[])}catch(e){setError(e instanceof Error?e.message:'Failed to load jobs')}finally{setLoading(false)}}
  useEffect(()=>{load()},[])
  const toggleSave=(id:string)=>{const next=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];setSaved(next);localStorage.setItem('future-saved-jobs',JSON.stringify(next))}
  const filtered=jobs.filter(j=>filter==='all'||(filter==='remote'&&j.remote)||(filter==='positive'&&j.visa.status==='Positive signal')||(filter==='review'&&j.visa.status==='Review')||(filter==='restricted'&&j.visa.status==='Restricted signal'))

  return <div className="page jobs-page">
    <div className="jobs-toolbar glass-card"><div className="job-tabs"><button className="active">Recommended</button><button onClick={()=>setFilter('positive')}>Positive signals</button><button onClick={()=>setFilter('review')}>Needs review</button><button onClick={()=>setFilter('restricted')}>Restricted</button></div><div className="job-count">{loading?'Refreshing…':`${filtered.length} live jobs`}</div></div>
    <div className="job-filterbar glass-card"><div className="search-deck"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')load(query)}} placeholder="Search role, skill or company"/><button className="primary" onClick={()=>load(query)}>Search</button></div><div className="filter-row"><button className={filter==='all'?'active':''} onClick={()=>setFilter('all')}>All</button><button className={filter==='remote'?'active':''} onClick={()=>setFilter('remote')}>Remote</button><button className={filter==='positive'?'active':''} onClick={()=>setFilter('positive')}>Sponsorship / OPT signal</button><button className={filter==='review'?'active':''} onClick={()=>setFilter('review')}>No explicit signal</button></div></div>
    <div className="source-health">{sourceStatus.map(s=><span key={s.source} className={s.ok?'ok-source':'bad-source'}>{s.ok?'●':'×'} {s.source}{typeof s.count==='number'?` · ${s.count}`:''}</span>)}{fetchedAt&&<span className="freshness">Updated {timeAgo(fetchedAt)}</span>}</div>
    {error&&<div className="feed-error">Live feed error: {error}. Use refresh; stale data is not substituted.</div>}
    <div className="jobs-layout"><section className="job-feed">{loading&&<div className="skeleton-stack">{[1,2,3].map(x=><div className="job-skeleton" key={x}/>)}</div>}{!loading&&filtered.map(job=><article className="live-job-card" key={job.id}><div className="company-logo">{job.logo?<img src={job.logo} alt=""/>:<span>{job.company.slice(0,2).toUpperCase()}</span>}</div><div className="job-main"><div className="job-topline"><div><div className="job-badges"><span>{timeAgo(job.publishedAt)}</span><span>{job.source}</span>{job.remote&&<span>Remote</span>}</div><h3>{job.title}</h3><p className="company-line">{job.company}</p></div><button className={`save-btn ${saved.includes(job.id)?'saved':''}`} onClick={()=>toggleSave(job.id)}>{saved.includes(job.id)?'♥':'♡'}</button></div><div className="job-facts"><span>⌖ {job.location}</span>{job.level&&<span>◷ {job.level}</span>}{job.salary&&<span>＄ {job.salary}</span>}</div><p className="job-snippet">{(job.description||'').slice(0,260)}{(job.description||'').length>260?'…':''}</p><div className="visa-row-job"><VisaBadge visa={job.visa}/><div className="job-actions"><a href={job.url} target="_blank" rel="noreferrer" className="ghost solid link">View source ↗</a><a href={job.url} target="_blank" rel="noreferrer" className="apply-btn">Apply now</a></div></div></div></article>)}{!loading&&!filtered.length&&<div className="empty-state glass-card compact"><h2>No matching jobs right now.</h2><p>Change the search or filter. We do not invent fallback listings.</p></div>}</section><aside className="job-side-panel"><div className="glass-card side-card"><span className="eyebrow">YOUR FILTERS</span><h3>International-student view</h3><p>Work-authorization badges are extracted from the posted text. “Positive signal” does not guarantee eligibility or sponsorship.</p></div><div className="glass-card side-card"><span className="eyebrow">SAVED</span><h3>{saved.length} jobs</h3><p>Saved in this browser.</p></div><div className="glass-card side-card"><span className="eyebrow">VERIFY EMPLOYER</span><a className="side-link" href="https://www.e-verify.gov/about-e-verify/e-verify-data/how-to-find-participating-employers" target="_blank" rel="noreferrer">E-Verify search ↗</a><a className="side-link" href="https://www.dol.gov/agencies/eta/foreign-labor/performance" target="_blank" rel="noreferrer">DOL H-1B data ↗</a></div></aside></div>
  </div>
}

function VisaBadge({visa}:{visa:VisaSignal}){
  const cls=visa.status==='Positive signal'?'visa-positive':visa.status==='Restricted signal'?'visa-restricted':'visa-review'
  const detail=visa.blockers.length?visa.blockers.join(', '):visa.positives.length?visa.positives.join(', '):'No explicit sponsorship/OPT restriction detected'
  return <div className={`visa-score ${cls}`}><b>{visa.status}</b><span>{detail}</span></div>
}

function Immigration(){
  const [items,setItems]=useState<NewsItem[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(''); const [fetchedAt,setFetchedAt]=useState(''); const [status,setStatus]=useState<{source:string;ok:boolean;count?:number}[]>([]); const [topic,setTopic]=useState('all')
  const load=async()=>{setLoading(true);setError('');try{const r=await fetch('/.netlify/functions/immigration');if(!r.ok) throw new Error(`HTTP ${r.status}`);const d=await r.json();setItems(d.items||[]);setFetchedAt(d.fetchedAt||'');setStatus(d.status||[])}catch(e){setError(e instanceof Error?e.message:'Failed to load updates')}finally{setLoading(false)}}
  useEffect(()=>{load()},[])
  const filtered=items.filter(x=>topic==='all'||`${x.title} ${(x.topics||[]).join(' ')}`.toLowerCase().includes(topic.toLowerCase()))
  return <div className="page immigration-page"><div className="community-header"><div className="page-heading"><span className="eyebrow">VERIFIED IMMIGRATION FEED</span><h1>Fresh updates. Original sources.</h1><p>Only official-source items are shown here. If a source fails, the interface reports the failure instead of serving a stale substitute.</p></div><button className="primary" onClick={load}>Refresh now</button></div><div className="source-health">{status.map(s=><span key={s.source} className={s.ok?'ok-source':'bad-source'}>{s.ok?'●':'×'} {s.source}{typeof s.count==='number'?` · ${s.count}`:''}</span>)}{fetchedAt&&<span className="freshness">Fetched {timeAgo(fetchedAt)}</span>}</div>{error&&<div className="feed-error">Live feed error: {error}</div>}<div className="imm-filter-row"><button className={topic==='all'?'active':''} onClick={()=>setTopic('all')}>All</button><button className={topic==='F-1'?'active':''} onClick={()=>setTopic('F-1')}>F-1</button><button className={topic==='OPT'?'active':''} onClick={()=>setTopic('OPT')}>OPT / STEM</button><button className={topic==='H-1B'?'active':''} onClick={()=>setTopic('H-1B')}>H-1B</button></div><div className="imm-layout"><section className="news-feed">{loading&&[1,2,3,4].map(x=><div className="news-skeleton" key={x}/>)}{!loading&&filtered.map(item=><article className="news-card glass-card" key={item.id}><div className="news-source"><span className="verified-dot">✓</span><b>{item.source}</b><span>{item.sourceType}</span><time>{timeAgo(item.publishedAt)}</time></div><h2>{item.title}</h2>{item.summary&&<p>{item.summary}</p>}<div className="news-footer">{item.effectiveOn&&<span>Effective: {new Date(item.effectiveOn).toLocaleDateString()}</span>}<a href={item.url} target="_blank" rel="noreferrer">Read official source ↗</a></div></article>)}{!loading&&!filtered.length&&<div className="empty-state glass-card compact"><h2>No verified updates match this filter.</h2></div>}</section><aside className="imm-side"><div className="glass-card side-card"><span className="eyebrow">OFFICIAL SOURCES</span>{officialLinks.map(([name,href])=><a className="side-link" key={href} href={href} target="_blank" rel="noreferrer">{name} ↗</a>)}</div><div className="glass-card side-card"><span className="eyebrow">FRESHNESS POLICY</span><p>Feed fetch time is shown above. Failed sources are visibly marked. We do not label an older cached article as “latest.”</p></div></aside></div></div>
}

function Hub({go}:{go:(v:View)=>void}){const tools=[['Employer Visa Checker','Verify E-Verify participation and review public labor data.'],['Job Eligibility Scanner','Use live job descriptions and surface restrictive language.'],['Visa Timeline','Organize OPT/STEM milestones and reporting dates.'],['Resume & ATS Lab','Match a resume to a real role without inventing experience.'],['Interview Room','Practice around a real target job.'],['University / DSO Hub','Organize official school and DSO resources.']];return <div className="page"><div className="page-heading"><span className="eyebrow">STUDENT HUB</span><h1>Tools around the decision.</h1></div><div className="tool-grid">{tools.map(([title,body])=><div className="tool-card glass-card" key={title}><div className="tool-top"><span>✦</span><em>Student tool</em></div><h3>{title}</h3><p>{body}</p><button onClick={()=>title.includes('Employer')?window.open('https://www.e-verify.gov/about-e-verify/e-verify-data/how-to-find-participating-employers','_blank'):go('community')}>{title.includes('Employer')?'Open official checker ↗':'Discuss / request →'}</button></div>)}</div></div>}

function Community({posts,onCreate,onVote,onOpen}:{posts:Post[];onCreate:()=>void;onVote:(id:number,d:number)=>void;onOpen:(p:Post)=>void}){return <div className="page community-page"><div className="community-header"><div className="page-heading"><span className="eyebrow">COMMUNITY</span><h1>Real people. Real context.</h1><p>Reddit-style discussion without fake seeded users.</p></div><button className="primary" onClick={onCreate}>＋ Create post</button></div><div className="community-layout"><div className="feed">{posts.length===0?<div className="empty-state glass-card compact"><div className="empty-icon">◌</div><h2>No discussions yet.</h2><p>Create the first real post.</p><button className="primary" onClick={onCreate}>Start discussion</button></div>:posts.map(post=><article key={post.id} className="post-card glass-card"><div className="vote-stack"><button onClick={()=>onVote(post.id,1)}>⌃</button><b>{post.votes}</b><button onClick={()=>onVote(post.id,-1)}>⌄</button></div><div className="post-main" onClick={()=>onOpen(post)}><div className="post-meta"><span className="topic-pill">{post.tag}</span><span>Posted by you</span><span>·</span><time>{new Date(post.createdAt).toLocaleString()}</time></div><h3>{post.title}</h3><p>{post.body}</p><div className="post-footer"><button>◌ {post.comments.length} comments</button><button>↗ Share</button></div></div></article>)}</div><aside className="community-side"><div className="glass-card side-card"><span className="eyebrow">COMMUNITY STANDARD</span><h3>Experience ≠ policy</h3><p>Personal experience stays labeled as personal experience. Immigration rules should link to an official source.</p></div></aside></div></div>}

function ThreadDrawer({post,onClose,onComment}:{post:Post;onClose:()=>void;onComment:(id:number,text:string)=>void}){const[text,setText]=useState('');const submit=(e:FormEvent)=>{e.preventDefault();onComment(post.id,text);setText('')};return <div className="thread-overlay" onMouseDown={onClose}><aside className="thread-drawer glass" onMouseDown={e=>e.stopPropagation()}><header><div><span className="eyebrow">DISCUSSION THREAD</span><h2>{post.title}</h2></div><button onClick={onClose}>×</button></header><div className="thread-body"><span className="topic-pill">{post.tag}</span><p className="thread-post">{post.body}</p><div className="comment-list"><h4>{post.comments.length} comments</h4>{post.comments.length===0?<p className="muted-text">No replies yet.</p>:post.comments.map((c,i)=><div className="comment" key={i}><div className="comment-avatar">DJ</div><div><b>You</b><p>{c}</p></div></div>)}</div></div><form className="thread-composer" onSubmit={submit}><input value={text} onChange={e=>setText(e.target.value)} placeholder="Add a real reply..."/><button className="primary">Send</button></form></aside></div>}

export default App
