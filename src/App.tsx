import { FormEvent, useEffect, useMemo, useState } from 'react'
import './App.css'

type View = 'home' | 'jobs' | 'immigration' | 'hub' | 'community'
type Post = { id: number; title: string; body: string; tag: string; createdAt: string; votes: number; comments: string[] }

const nav: { id: View; label: string; icon: string; desc: string }[] = [
  { id: 'home', label: 'Home', icon: '⌂', desc: 'Command center' },
  { id: 'jobs', label: 'Jobs', icon: '⌕', desc: 'F-1 career search' },
  { id: 'immigration', label: 'Immigration', icon: '◇', desc: 'Official updates' },
  { id: 'hub', label: 'Student Hub', icon: '✦', desc: 'Tools & resources' },
  { id: 'community', label: 'Community', icon: '◌', desc: 'Real discussions' },
]

const sourceLinks = [
  ['USCIS — Students & Exchange Visitors', 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors'],
  ['Study in the States — DHS/SEVP', 'https://studyinthestates.dhs.gov/'],
  ['USCIS — Optional Practical Training', 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students'],
  ['USCIS — STEM OPT', 'https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/students-and-employment/stem-opt'],
  ['E-Verify Employer Search', 'https://www.e-verify.gov/about-e-verify/e-verify-data/how-to-find-participating-employers'],
  ['DOL H-1B Disclosure Data', 'https://www.dol.gov/agencies/eta/foreign-labor/performance'],
]

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

  useEffect(() => {
    localStorage.setItem('nexanet-future-posts', JSON.stringify(posts))
  }, [posts])

  const filteredPosts = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return posts
    return posts.filter(p => `${p.title} ${p.body} ${p.tag}`.toLowerCase().includes(q))
  }, [posts, query])

  const addPost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const title = String(fd.get('title') || '').trim()
    const body = String(fd.get('body') || '').trim()
    const tag = String(fd.get('tag') || 'General')
    if (!title || !body) return
    const post: Post = { id: Date.now(), title, body, tag, createdAt: new Date().toISOString(), votes: 0, comments: [] }
    setPosts(p => [post, ...p])
    setPostOpen(false)
    e.currentTarget.reset()
  }

  const vote = (id: number, delta: number) => setPosts(p => p.map(x => x.id === id ? { ...x, votes: x.votes + delta } : x))

  const addComment = (id: number, text: string) => {
    if (!text.trim()) return
    setPosts(p => p.map(x => x.id === id ? { ...x, comments: [...x.comments, text.trim()] } : x))
    setSelectedPost(prev => prev && prev.id === id ? { ...prev, comments: [...prev.comments, text.trim()] } : prev)
  }

  return (
    <div className="future-shell">
      <div className="aurora aurora-a" /><div className="aurora aurora-b" /><div className="aurora aurora-c" />

      <aside className="icon-rail glass">
        <button className="logo" onClick={() => setView('home')}>N</button>
        <div className="rail-stack">
          {nav.map(n => <button key={n.id} className={`rail-icon ${view === n.id ? 'active' : ''}`} title={n.label} onClick={() => setView(n.id)}>{n.icon}</button>)}
        </div>
        <button className="rail-avatar" onClick={() => setProfileOpen(v => !v)}>DJ<span /></button>
      </aside>

      <aside className="nav-panel glass">
        <div className="brand"><span>NEXANET</span><strong>Future</strong></div>
        <div className="command-search"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Future" /></div>
        <div className="nav-group-label">Workspace</div>
        <nav>
          {nav.map(n => <button key={n.id} className={`nav-row ${view === n.id ? 'active' : ''}`} onClick={() => setView(n.id)}><span className="nav-glyph">{n.icon}</span><span><b>{n.label}</b><small>{n.desc}</small></span></button>)}
        </nav>
        <div className="truth-card"><div className="truth-head"><span className="live-dot" />Authenticity mode</div><p>No fabricated listings, users, visa outcomes or employer reviews. Empty data stays empty until a real source or real user provides it.</p></div>
        <div className="status-card"><div><span className="live-dot" /><b>Frontend live</b></div><small>Community data: browser storage<br/>Jobs & immigration APIs: not connected yet</small></div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div><span className="crumb">NexaNet Future /</span><strong>{nav.find(n => n.id === view)?.label}</strong></div>
          <div className="top-actions"><button className="ghost">Invite</button><button className="primary" onClick={() => view === 'community' ? setPostOpen(true) : setView('community')}>{view === 'community' ? 'Create post' : 'Ask community'}</button></div>
        </header>

        {view === 'home' && <Home go={setView} postCount={posts.length} />}
        {view === 'jobs' && <Jobs query={query} setQuery={setQuery} />}
        {view === 'immigration' && <Immigration />}
        {view === 'hub' && <Hub go={setView} />}
        {view === 'community' && <Community posts={filteredPosts} onCreate={() => setPostOpen(true)} onVote={vote} onOpen={setSelectedPost} />}
      </main>

      {profileOpen && <div className="profile-pop glass"><strong>Dheeraj</strong><span>Member profile</span><button onClick={() => setProfileOpen(false)}>Close</button></div>}

      {postOpen && <div className="modal-backdrop" onMouseDown={() => setPostOpen(false)}><form className="modal glass" onSubmit={addPost} onMouseDown={e => e.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">REAL USER POST</span><h2>Start a discussion</h2></div><button type="button" onClick={() => setPostOpen(false)}>×</button></div><label>Title<input name="title" required maxLength={120} placeholder="What do you want to ask or discuss?" /></label><label>Topic<select name="tag"><option>General</option><option>Jobs</option><option>OPT / STEM OPT</option><option>CPT</option><option>H-1B</option><option>University / DSO</option><option>Housing</option><option>Interview</option></select></label><label>Details<textarea name="body" required rows={7} placeholder="Add enough context for other students to answer accurately." /></label><div className="modal-note">Do not post passport numbers, SEVIS IDs, EAD numbers, I-94 numbers, addresses, or other sensitive documents.</div><button className="primary wide" type="submit">Publish discussion</button></form></div>}

      {selectedPost && <ThreadDrawer post={posts.find(p => p.id === selectedPost.id) || selectedPost} onClose={() => setSelectedPost(null)} onComment={addComment} />}
    </div>
  )
}

function Home({ go, postCount }: { go: (v: View) => void; postCount: number }) {
  return <div className="page home-page">
    <section className="hero-panel glass-card"><div className="hero-copy"><span className="eyebrow">THE INTERNATIONAL STUDENT OPERATING SYSTEM</span><h1>One place to figure out <em>what comes next.</em></h1><p>Jobs, F-1 work authorization, official immigration sources, student tools, and real peer discussion — organized around decisions students actually need to make.</p><div className="hero-actions"><button className="primary" onClick={() => go('jobs')}>Explore jobs</button><button className="ghost solid" onClick={() => go('community')}>Open community</button></div></div><div className="hero-orbit"><div className="orbit-core">NF</div><span className="orbit o1">JOBS</span><span className="orbit o2">OPT</span><span className="orbit o3">DSO</span><span className="orbit o4">FORUM</span></div></section>

    <section className="quick-grid">
      <button className="quick-card purple" onClick={() => go('jobs')}><span className="quick-icon">⌕</span><div><b>F-1 Job Search</b><p>Search and evaluate roles without pretending sponsorship or authorization data exists when it does not.</p></div><i>→</i></button>
      <button className="quick-card blue" onClick={() => go('immigration')}><span className="quick-icon">◇</span><div><b>Immigration Center</b><p>Go directly to USCIS, SEVP and other authoritative student immigration resources.</p></div><i>→</i></button>
      <button className="quick-card cyan" onClick={() => go('hub')}><span className="quick-icon">✦</span><div><b>Student Hub</b><p>Employer checks, visa timeline planning, interview prep and practical tools.</p></div><i>→</i></button>
      <button className="quick-card pink" onClick={() => go('community')}><span className="quick-icon">◌</span><div><b>Community</b><p>{postCount ? `${postCount} real discussion${postCount === 1 ? '' : 's'} created in this browser.` : 'The forum is intentionally empty until real users create discussions.'}</p></div><i>→</i></button>
    </section>

    <section className="home-columns"><div className="glass-card section-card"><div className="section-heading"><div><span className="eyebrow">HOW FUTURE WORKS</span><h2>Signal before noise.</h2></div></div><div className="principles"><div><span>01</span><b>Official facts stay official</b><p>Government information is linked to its source instead of rewritten as rumor.</p></div><div><span>02</span><b>Community stays community</b><p>Personal experiences are useful, but they are not labeled as policy or legal guidance.</p></div><div><span>03</span><b>No fake activity</b><p>No fake job feed, fake posts, fake employers or invented sponsorship claims.</p></div></div></div><div className="glass-card section-card"><span className="eyebrow">BUILD STATUS</span><h2>What is actually live</h2><div className="build-list"><div><span className="ok">✓</span><p><b>Navigation & dashboard</b><small>Live</small></p></div><div><span className="ok">✓</span><p><b>Local community posting</b><small>Live in this browser</small></p></div><div><span className="pending">○</span><p><b>Real job ingestion</b><small>Backend connection next</small></p></div><div><span className="pending">○</span><p><b>Live immigration monitoring</b><small>Backend connection next</small></p></div><div><span className="pending">○</span><p><b>User accounts & shared forum</b><small>Supabase next</small></p></div></div></div></section>
  </div>
}

function Jobs({ query, setQuery }: { query: string; setQuery: (q: string) => void }) {
  return <div className="page"><div className="page-heading"><span className="eyebrow">CAREER ENGINE</span><h1>F-1 job search</h1><p>Built to surface work-authorization context without inventing employer claims.</p></div><div className="job-search glass-card"><div className="search-deck"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Job title, company, skill or city" /><button className="primary">Search</button></div><div className="filter-row"><button>Remote</button><button>E-Verify</button><button>STEM OPT</button><button>Sponsorship signal</button><button>Last 72 hours</button></div></div><div className="empty-state glass-card"><div className="empty-icon">⌁</div><h2>No live job source connected yet.</h2><p>We are not filling this screen with fictional listings. The next backend step is to connect permitted employer/ATS sources, normalize postings, and run work-authorization analysis on actual job descriptions.</p><div className="source-actions"><a className="primary link" href="https://www.e-verify.gov/about-e-verify/e-verify-data/how-to-find-participating-employers" target="_blank" rel="noreferrer">Check E-Verify employer ↗</a><a className="ghost solid link" href="https://www.dol.gov/agencies/eta/foreign-labor/performance" target="_blank" rel="noreferrer">DOL disclosure data ↗</a></div></div><div className="roadmap-strip"><div><span>1</span><p><b>Ingest</b><small>Employer / ATS sources</small></p></div><i>→</i><div><span>2</span><p><b>Analyze</b><small>Authorization language</small></p></div><i>→</i><div><span>3</span><p><b>Verify</b><small>E-Verify + public data</small></p></div><i>→</i><div><span>4</span><p><b>Rank</b><small>Student compatibility</small></p></div></div></div>
}

function Immigration() {
  return <div className="page"><div className="page-heading"><span className="eyebrow">IMMIGRATION INTELLIGENCE</span><h1>Start with the source.</h1><p>Official government resources first. Analysis and community discussion remain clearly separate.</p></div><div className="source-grid">{sourceLinks.map(([name, href], i) => <a key={href} className="source-card glass-card" href={href} target="_blank" rel="noreferrer"><span className="source-number">0{i + 1}</span><div><b>{name}</b><p>Official external resource</p></div><span className="arrow">↗</span></a>)}</div><div className="glass-card update-engine"><div><span className="eyebrow">LIVE UPDATE ENGINE</span><h2>Not connected yet — deliberately.</h2><p>Once connected, this area should watch USCIS, DHS/SEVP and Federal Register sources and store each change with publication date, effective date, affected status and the original URL. Until then, it will not display invented “latest updates.”</p></div><span className="pending-badge">Backend required</span></div></div>
}

function Hub({ go }: { go: (v: View) => void }) {
  const tools = [
    ['Employer Visa Checker', 'Cross-reference a real employer against authoritative E-Verify and public sponsorship datasets.', 'External data'],
    ['Job Eligibility Scanner', 'Analyze the exact authorization language in a job description before applying.', 'Backend next'],
    ['Visa Timeline', 'Organize program dates, OPT/STEM milestones and reporting reminders.', 'Profile next'],
    ['Resume & ATS Lab', 'Match a resume to a real job while keeping experience and authorization claims accurate.', 'AI layer later'],
    ['Interview Room', 'Practice technical and behavioral interviews around the role you are actually targeting.', 'AI layer later'],
    ['University / DSO Hub', 'Organize official school resources, DSO contacts and student-specific procedures.', 'Directory next'],
  ]
  return <div className="page"><div className="page-heading"><span className="eyebrow">STUDENT HUB</span><h1>Tools around the decision.</h1><p>The hub should reduce tab switching — not create another pile of disconnected widgets.</p></div><div className="tool-grid">{tools.map(([title, body, status]) => <div className="tool-card glass-card" key={title}><div className="tool-top"><span>✦</span><em>{status}</em></div><h3>{title}</h3><p>{body}</p><button onClick={() => title.includes('Employer') ? window.open('https://www.e-verify.gov/about-e-verify/e-verify-data/how-to-find-participating-employers','_blank') : go('community')}>{title.includes('Employer') ? 'Open official checker ↗' : 'Discuss / request access →'}</button></div>)}</div></div>
}

function Community({ posts, onCreate, onVote, onOpen }: { posts: Post[]; onCreate: () => void; onVote: (id:number,d:number)=>void; onOpen:(p:Post)=>void }) {
  return <div className="page community-page"><div className="community-header"><div className="page-heading"><span className="eyebrow">COMMUNITY</span><h1>Real people. Real context.</h1><p>Reddit-style discussion without pretending an empty network is already busy.</p></div><button className="primary" onClick={onCreate}>＋ Create post</button></div><div className="community-layout"><div className="feed">{posts.length === 0 ? <div className="empty-state glass-card compact"><div className="empty-icon">◌</div><h2>No discussions yet.</h2><p>This is intentional. Create the first real post instead of looking at seeded fake accounts and fake comments.</p><button className="primary" onClick={onCreate}>Start the first discussion</button></div> : posts.map(post => <article key={post.id} className="post-card glass-card"><div className="vote-stack"><button onClick={() => onVote(post.id,1)}>⌃</button><b>{post.votes}</b><button onClick={() => onVote(post.id,-1)}>⌄</button></div><div className="post-main" onClick={() => onOpen(post)}><div className="post-meta"><span className="topic-pill">{post.tag}</span><span>Posted by you</span><span>·</span><time>{new Date(post.createdAt).toLocaleString()}</time></div><h3>{post.title}</h3><p>{post.body}</p><div className="post-footer"><button>◌ {post.comments.length} comments</button><button>↗ Share</button><button>☆ Save</button></div></div></article>)}</div><aside className="community-side"><div className="glass-card side-card"><span className="eyebrow">COMMUNITY STANDARD</span><h3>Experience ≠ policy</h3><p>People can share what happened to them. Immigration rules, deadlines and eligibility claims should be backed by official sources.</p></div><div className="glass-card side-card"><span className="eyebrow">POPULAR TOPICS</span>{['Jobs & sponsorship','OPT / STEM OPT','CPT & universities','DSO experiences','Interviews','Housing & relocation'].map(x => <button key={x}>{x}<span>→</span></button>)}</div></aside></div></div>
}

function ThreadDrawer({ post, onClose, onComment }: { post: Post; onClose:()=>void; onComment:(id:number,text:string)=>void }) {
  const [text,setText]=useState('')
  const submit=(e:FormEvent)=>{e.preventDefault();onComment(post.id,text);setText('')}
  return <div className="thread-overlay" onMouseDown={onClose}><aside className="thread-drawer glass" onMouseDown={e=>e.stopPropagation()}><header><div><span className="eyebrow">DISCUSSION THREAD</span><h2>{post.title}</h2></div><button onClick={onClose}>×</button></header><div className="thread-body"><span className="topic-pill">{post.tag}</span><p className="thread-post">{post.body}</p><div className="comment-list"><h4>{post.comments.length} comments</h4>{post.comments.length===0?<p className="muted-text">No replies yet.</p>:post.comments.map((c,i)=><div className="comment" key={i}><div className="comment-avatar">DJ</div><div><b>You</b><p>{c}</p></div></div>)}</div></div><form className="thread-composer" onSubmit={submit}><input value={text} onChange={e=>setText(e.target.value)} placeholder="Add a real reply..."/><button className="primary">Send</button></form></aside></div>
}

export default App
