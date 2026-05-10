import { motion } from 'framer-motion'
import {
  Bookmark,
  Heart,
  MessageCircle,
  Search,
  Send,
  Settings,
  Sparkles,
  TrendingUp,
  UserRound,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { AnimatedBackground } from '@/components/dashboard/AnimatedBackground'
import { cn } from '@/lib/utils'

type Post = {
  id: string
  name: string
  user: string
  badge: string
  title: string
  story: string
  highlights: string[]
  destination: string
  image: string
  likes: number
  comments: number
  views: number
}

const POSTS: Post[] = [
  {
    id: 'p1',
    name: 'Anaya Kulkarni',
    user: '@anaya.trails',
    badge: 'Beach Curator',
    title: 'Bali Beach Escape',
    story: 'Four-day coast run with sunrise yoga, clifftop cafes, and cinematic night markets.',
    highlights: ['Uluwatu sunset', 'Seminyak brunch', 'Nusa Penida day trip'],
    destination: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1100&q=80',
    likes: 1820,
    comments: 148,
    views: 9100,
  },
  {
    id: 'p2',
    name: 'Rohan Mehta',
    user: '@roam.rohan',
    badge: 'Adventure Pro',
    title: 'Swiss Mountain Adventure',
    story: 'Snow train hops, ridge walks, and alpine lakes stitched into one smooth route.',
    highlights: ['Grindelwald pass', 'Interlaken rail', 'Lauterbrunnen valley'],
    destination: 'Bernese Alps, Switzerland',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1100&q=80',
    likes: 2430,
    comments: 211,
    views: 12030,
  },
  {
    id: 'p3',
    name: 'Mika Sato',
    user: '@mika.eats',
    badge: 'Food Scout',
    title: 'Tokyo Food Journey',
    story: 'Night ramen lanes, hidden izakayas, and omakase picks mapped for first-timers.',
    highlights: ['Shinjuku food lane', 'Asakusa dessert trail', 'Tsukiji dawn stop'],
    destination: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1100&q=80',
    likes: 2940,
    comments: 260,
    views: 14500,
  },
]

const circleBtn =
  'flex h-10 w-10 items-center justify-center rounded-full border border-traveloop-sky/30 bg-white/[0.05] text-traveloop-ice shadow-inner-glow backdrop-blur-xl transition-colors hover:border-traveloop-ice/45 hover:bg-white/[0.1] hover:text-white md:h-11 md:w-11'

export function CommunityPage() {
  const [query, setQuery] = useState('')
  const [groupBy, setGroupBy] = useState('Popular')
  const [filter, setFilter] = useState('Beaches')
  const [sortBy, setSortBy] = useState('Likes')
  const [likes, setLikes] = useState<Set<string>>(() => new Set(['p1']))
  const [saved, setSaved] = useState<Set<string>>(() => new Set())
  const [following, setFollowing] = useState<Set<string>>(() => new Set(['@anaya.trails']))
  const [toast, setToast] = useState('')

  const posts = useMemo(() => {
    const q = query.toLowerCase().trim()
    return POSTS.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.story.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q),
    )
  }, [query])

  const pulse = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(''), 1200)
  }

  return (
    <motion.div className="relative min-h-screen bg-[#0B0F1A] text-traveloop-ice" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AnimatedBackground />

      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 border-b border-traveloop-sky/20 bg-[#0B0F1A]/55 shadow-[0_0_40px_rgba(136,189,242,0.08)] backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 md:h-[4.25rem] md:px-8">
          <Link to="/dashboard" className="group flex items-center gap-2" aria-label="Traveloop home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-traveloop-sky to-traveloop-slate shadow-glow-sm" />
            <span className="bg-gradient-to-r from-traveloop-ice via-traveloop-sky to-traveloop-steel bg-clip-text text-lg font-semibold tracking-tight text-transparent">Traveloop</span>
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <Link to="/profile" className={circleBtn} aria-label="Profile">
                <UserRound className="h-[18px] w-[18px]" strokeWidth={1.65} />
              </Link>
            </motion.div>
            <motion.button type="button" aria-label="Settings" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} className={circleBtn}>
              <Settings className="h-[18px] w-[18px]" strokeWidth={1.65} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 mx-auto max-w-[1400px] px-4 pb-28 pt-6 md:px-8 md:pb-32">
        <header className="mb-8 md:mb-10">
          <motion.div className="relative max-w-3xl">
            <h1 className="bg-gradient-to-br from-white via-traveloop-ice to-traveloop-steel bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-[2.5rem]">
              Travel Community
            </h1>
            <div className="mt-3 h-px max-w-xl origin-left bg-gradient-to-r from-traveloop-sky via-traveloop-ice to-transparent shadow-[0_0_22px_rgba(136,189,242,0.5)]" />
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-traveloop-ice/70 md:text-lg">
              Discover journeys, share experiences, and explore adventures from travelers worldwide.
            </p>
          </motion.div>
        </header>

        <section className="mb-8 rounded-2xl border border-traveloop-sky/20 bg-[#080c16]/75 p-4 shadow-inner-glow backdrop-blur-xl md:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center md:gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/55" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search trips, travelers, or destinations…"
                className="h-12 w-full rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/65 py-2.5 pl-11 pr-4 text-sm text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-all placeholder:text-traveloop-ice/45 focus:border-traveloop-sky/70 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/35"
              />
            </div>
            {[
              ['Group by', ['Popular', 'Recent', 'Most Liked', 'Trending'], groupBy, setGroupBy],
              ['Filter', ['Beaches', 'Adventure', 'Food', 'Luxury', 'Backpacking'], filter, setFilter],
              ['Sort by', ['Likes', 'Comments', 'Views', 'Newest'], sortBy, setSortBy],
            ].map(([label, options, val, setVal]) => (
              <div key={String(label)} className="relative">
                <select
                  value={String(val)}
                  onChange={(e) => (setVal as (v: string) => void)(e.target.value)}
                  className="h-12 min-w-[170px] appearance-none rounded-xl border border-traveloop-sky/30 bg-[#080c16] px-4 pr-10 text-sm font-medium text-traveloop-ice shadow-inner-glow [color-scheme:dark] focus:border-traveloop-sky/55 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/25"
                >
                  {(options as string[]).map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute -top-2 left-3 bg-[#0B0F1A] px-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-traveloop-ice/55">
                  {String(label)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[76px_minmax(0,1fr)_300px]">
          <div className="hidden flex-col gap-3 lg:flex">
            {posts.map((p) => (
              <div key={p.id} className="flex h-14 w-14 items-center justify-center rounded-2xl border border-traveloop-sky/28 bg-[#0B0F1A]/65 text-sm font-bold text-white shadow-inner-glow">
                {p.name.split(' ').map((n) => n[0]).join('')}
              </div>
            ))}
          </div>

          <div className="space-y-5">
            {posts.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.06, 0.2) }}
                className="overflow-hidden rounded-3xl border border-traveloop-sky/22 bg-[#0B0F1A]/55 shadow-[0_18px_60px_rgba(8,12,25,0.6)] backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between gap-3 border-b border-traveloop-sky/15 p-4 md:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-traveloop-sky/35 bg-traveloop-slate/35 text-sm font-semibold text-white">
                      {p.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{p.name}</p>
                      <p className="text-xs text-traveloop-ice/60">{p.user}</p>
                    </div>
                    <span className="rounded-full border border-traveloop-sky/30 bg-traveloop-sky/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-traveloop-ice">
                      {p.badge}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setFollowing((prev) => {
                        const next = new Set(prev)
                        if (next.has(p.user)) next.delete(p.user)
                        else next.add(p.user)
                        return next
                      })
                    }
                    className={cn(
                      'rounded-xl border px-3.5 py-2 text-xs font-semibold transition',
                      following.has(p.user)
                        ? 'border-traveloop-sky/45 bg-traveloop-sky/20 text-white'
                        : 'border-traveloop-slate/45 bg-white/[0.03] text-traveloop-ice hover:border-traveloop-sky/45',
                    )}
                  >
                    {following.has(p.user) ? 'Following' : 'Follow'}
                  </button>
                </div>
                <div className="relative h-56 overflow-hidden md:h-72">
                  <img src={p.image} alt="" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/85 via-[#0B0F1A]/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <h3 className="text-xl font-bold text-white md:text-2xl">{p.title}</h3>
                    <p className="mt-2 text-sm text-traveloop-ice/75">{p.story}</p>
                    <p className="mt-2 text-xs text-traveloop-steel">{p.destination}</p>
                  </div>
                </div>
                <div className="space-y-3 p-4 md:p-5">
                  <div className="flex flex-wrap gap-2">
                    {p.highlights.map((h) => (
                      <span key={h} className="rounded-full border border-traveloop-sky/24 bg-white/[0.03] px-2.5 py-1 text-[11px] text-traveloop-ice/80">
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setLikes((prev) => {
                            const next = new Set(prev)
                            if (next.has(p.id)) next.delete(p.id)
                            else next.add(p.id)
                            return next
                          })
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-traveloop-sky/28 bg-[#080c16] text-traveloop-ice shadow-inner-glow transition hover:border-traveloop-ice/40"
                      >
                        <Heart className={cn('h-4.5 w-4.5', likes.has(p.id) && 'fill-traveloop-sky text-traveloop-sky')} />
                      </button>
                      <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-traveloop-sky/28 bg-[#080c16] text-traveloop-ice shadow-inner-glow">
                        <MessageCircle className="h-4.5 w-4.5" />
                      </button>
                      <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-traveloop-sky/28 bg-[#080c16] text-traveloop-ice shadow-inner-glow">
                        <Send className="h-4.5 w-4.5" />
                      </button>
                      <button
                        onClick={() =>
                          setSaved((prev) => {
                            const next = new Set(prev)
                            if (next.has(p.id)) next.delete(p.id)
                            else next.add(p.id)
                            return next
                          })
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-traveloop-sky/28 bg-[#080c16] text-traveloop-ice shadow-inner-glow"
                      >
                        <Bookmark className={cn('h-4.5 w-4.5', saved.has(p.id) && 'fill-traveloop-sky text-traveloop-sky')} />
                      </button>
                    </div>
                    <button
                      onClick={() => pulse(`Trip cloned: ${p.title}`)}
                      className="inline-flex items-center gap-2 rounded-xl border border-traveloop-sky/35 bg-gradient-to-br from-traveloop-sky/30 to-traveloop-slate/55 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
                    >
                      <Sparkles className="h-4 w-4" /> Clone This Trip
                    </button>
                  </div>
                  <p className="text-xs text-traveloop-ice/60">
                    {likes.has(p.id) ? p.likes + 1 : p.likes} likes · {p.comments} comments · {p.views} views · View all comments
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-traveloop-sky/20 bg-[#0B0F1A]/65 p-5 shadow-inner-glow backdrop-blur-xl">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Community panel</h3>
              <p className="mt-2 text-sm text-traveloop-ice/70">
                Premium creators sharing modular travel flows you can remix instantly.
              </p>
              <div className="mt-4 space-y-2">
                {['#Backpacking', '#BeachLife', '#LuxuryTravel', '#MountainTrips'].map((tag) => (
                  <div key={tag} className="rounded-xl border border-traveloop-sky/20 bg-white/[0.03] px-3 py-2 text-sm text-traveloop-ice/85">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-traveloop-sky/20 bg-[#0B0F1A]/65 p-5 shadow-inner-glow backdrop-blur-xl">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Top creators</h3>
              <div className="mt-3 space-y-2">
                {['@anaya.trails', '@roam.rohan', '@mika.eats'].map((u) => (
                  <div key={u} className="flex items-center justify-between rounded-xl border border-traveloop-slate/35 bg-white/[0.03] px-3 py-2">
                    <span className="text-sm text-traveloop-ice/85">{u}</span>
                    <TrendingUp className="h-4 w-4 text-traveloop-sky" />
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>

      <div className="pointer-events-none fixed bottom-20 right-4 z-40 hidden w-[210px] flex-col gap-2 xl:flex">
        {[
          ['Active travelers', '1,284'],
          ['Trending destination', 'Bali'],
          ['Posts today', '326'],
          ['Live trip shares', '89'],
        ].map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="rounded-xl border border-traveloop-sky/22 bg-[#0B0F1A]/55 px-3 py-2.5 shadow-glow backdrop-blur-xl"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-traveloop-steel">{k}</p>
            <p className="mt-1 text-sm font-bold text-white">{v}</p>
          </motion.div>
        ))}
      </div>

      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-xl border border-traveloop-sky/35 bg-[#080c16]/90 px-4 py-2.5 text-sm font-semibold text-white shadow-glow backdrop-blur-xl"
        >
          {toast}
        </motion.div>
      ) : null}
    </motion.div>
  )
}

