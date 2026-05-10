import { AnimatePresence, motion } from 'framer-motion'
import {
  Briefcase,
  CalendarDays,
  Check,
  ChevronDown,
  CloudSun,
  ListPlus,
  Search,
  Settings,
  Share2,
  Sparkles,
  Timer,
  Trash2,
  UserRound,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { AnimatedBackground } from '@/components/dashboard/AnimatedBackground'
import { cn } from '@/lib/utils'

type Item = { id: string; label: string; priority?: 'high'; packed: boolean }
type Category = { id: string; name: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; items: Item[] }

const initialCategories: Category[] = [
  {
    id: 'docs',
    name: 'Documents',
    icon: CalendarDays,
    items: [
      { id: 'passport', label: 'Passport', packed: true, priority: 'high' },
      { id: 'tickets', label: 'Flight Tickets', packed: true, priority: 'high' },
      { id: 'insurance', label: 'Travel Insurance', packed: false },
      { id: 'hotel', label: 'Hotel Confirmations', packed: true },
    ],
  },
  {
    id: 'clothes',
    name: 'Clothing',
    icon: Briefcase,
    items: [
      { id: 'jacket', label: 'Windproof Jacket', packed: false, priority: 'high' },
      { id: 'tee', label: 'Quick-dry Tees', packed: false },
      { id: 'shoes', label: 'Walking Shoes', packed: false },
    ],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Sparkles,
    items: [
      { id: 'charger', label: 'Phone Charger', packed: true },
      { id: 'adapter', label: 'Universal Adapter', packed: false, priority: 'high' },
      { id: 'battery', label: 'Power Bank', packed: false },
    ],
  },
  {
    id: 'toiletries',
    name: 'Toiletries',
    icon: CloudSun,
    items: [
      { id: 'tooth', label: 'Toothbrush Kit', packed: true },
      { id: 'spf', label: 'Sunscreen SPF 50', packed: false },
      { id: 'meds', label: 'Travel Medicines', packed: false, priority: 'high' },
    ],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: Timer,
    items: [
      { id: 'glasses', label: 'Sunglasses', packed: true },
      { id: 'wallet', label: 'RFID Travel Wallet', packed: false },
    ],
  },
]

const circleBtn =
  'flex h-10 w-10 items-center justify-center rounded-full border border-traveloop-sky/30 bg-white/[0.05] text-traveloop-ice shadow-inner-glow backdrop-blur-xl transition-colors hover:border-traveloop-ice/45 hover:bg-white/[0.1] hover:text-white md:h-11 md:w-11'

const selectClass =
  'h-12 w-full cursor-pointer appearance-none rounded-xl border border-traveloop-sky/30 bg-[#080c16] px-4 pr-10 text-sm font-medium text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-colors [color-scheme:dark] hover:border-traveloop-ice/35 hover:bg-[#0c111d] focus:border-traveloop-sky/55 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/25 md:min-w-[150px]'

export function PackingChecklistPage() {
  const [query, setQuery] = useState('')
  const [groupBy, setGroupBy] = useState('Popular')
  const [filter, setFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Priority')
  const [trip, setTrip] = useState('Trip: Paris & Rome Adventure')
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(initialCategories.map((c) => [c.id, true])),
  )
  const [toast, setToast] = useState('')

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase()
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((i) => !q || i.label.toLowerCase().includes(q)),
      }))
      .filter((c) => c.items.length > 0)
  }, [categories, query])

  const total = categories.reduce((acc, c) => acc + c.items.length, 0)
  const packed = categories.reduce((acc, c) => acc + c.items.filter((i) => i.packed).length, 0)
  const pct = total ? Math.round((packed / total) * 100) : 0

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, packed: !i.packed } : i)) }
          : c,
      ),
    )
  }

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
            <span className="bg-gradient-to-r from-traveloop-ice via-traveloop-sky to-traveloop-steel bg-clip-text text-lg font-semibold tracking-tight text-transparent">
              Traveloop
            </span>
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

      <main className="relative z-10 mx-auto max-w-[1200px] px-4 pb-32 pt-6 md:px-8">
        <header className="mb-8 md:mb-10">
          <h1 className="bg-gradient-to-br from-white via-traveloop-ice to-traveloop-steel bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-[2.5rem]">
            Smart Packing Assistant
          </h1>
          <div className="mt-3 h-px max-w-xl origin-left bg-gradient-to-r from-traveloop-sky via-traveloop-ice to-transparent shadow-[0_0_22px_rgba(136,189,242,0.45)]" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-traveloop-ice/70 md:text-lg">
            Stay organized and never forget essentials for your upcoming adventures.
          </p>
        </header>

        <section className="space-y-4 rounded-2xl border border-traveloop-sky/20 bg-[#080c16]/75 p-4 shadow-inner-glow backdrop-blur-xl md:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center md:gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/55" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search checklist items…"
                className="h-12 w-full rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/65 py-2.5 pl-11 pr-4 text-sm text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-all placeholder:text-traveloop-ice/45 focus:border-traveloop-sky/70 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/35"
              />
            </div>
            {[
              ['Group by', ['Popular', 'Recent', 'Most Liked', 'Trending'], groupBy, setGroupBy],
              ['Filter', ['All', 'Documents', 'Clothing', 'Electronics', 'Toiletries', 'Accessories'], filter, setFilter],
              ['Sort', ['Priority', 'Name', 'Packed'], sortBy, setSortBy],
            ].map(([label, options, val, setVal]) => (
              <div key={String(label)} className="relative">
                <select
                  value={String(val)}
                  onChange={(e) => (setVal as (v: string) => void)(e.target.value)}
                  className={selectClass}
                >
                  {(options as string[]).map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/55" />
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <select value={trip} onChange={(e) => setTrip(e.target.value)} className="h-12 w-full appearance-none rounded-xl border border-traveloop-sky/30 bg-[#080c16] px-4 pr-10 text-sm font-medium text-traveloop-ice shadow-inner-glow">
                <option>Trip: Paris & Rome Adventure</option>
                <option>Trip: Bali Escape</option>
                <option>Trip: Swiss Adventure</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/55" />
            </div>
            <div className="rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/65 px-4 py-3 text-sm text-traveloop-ice/85">
              Countdown: <span className="font-semibold text-white">12 days</span>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-traveloop-sky/20 bg-[#0B0F1A]/55 p-4 shadow-inner-glow backdrop-blur-xl md:p-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-traveloop-ice/80">Progress: {packed}/{total} items packed</p>
            <p className="text-sm font-semibold text-white">{pct}%</p>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-traveloop-slate/55">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-traveloop-steel via-traveloop-sky to-traveloop-ice shadow-[0_0_12px_rgba(136,189,242,0.6)]"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </section>

        <section className="mt-6 space-y-4">
          {filteredCategories.map((cat) => {
            const done = cat.items.filter((i) => i.packed).length
            const Icon = cat.icon
            const isOpen = expanded[cat.id] ?? true
            return (
              <motion.div key={cat.id} layout className="overflow-hidden rounded-2xl border border-traveloop-sky/20 bg-[#0B0F1A]/55 shadow-inner-glow backdrop-blur-xl">
                <button
                  onClick={() => setExpanded((prev) => ({ ...prev, [cat.id]: !isOpen }))}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-traveloop-sky/28 bg-traveloop-slate/30 text-traveloop-sky">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-semibold text-white">{cat.name}</p>
                      <p className="text-xs text-traveloop-ice/55">{done}/{cat.items.length} packed</p>
                    </div>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown className="h-4 w-4 text-traveloop-ice/65" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-traveloop-sky/15"
                    >
                      <div className="space-y-2 px-4 py-3.5">
                        {cat.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => toggleItem(cat.id, item.id)}
                            className="flex w-full items-center gap-3 rounded-xl border border-traveloop-slate/35 bg-white/[0.02] px-3 py-2.5 text-left transition hover:border-traveloop-sky/35"
                          >
                            <span
                              className={cn(
                                'flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition',
                                item.packed
                                  ? 'border-traveloop-sky/60 bg-traveloop-sky/20 text-traveloop-ice shadow-[0_0_10px_rgba(136,189,242,0.5)]'
                                  : 'border-traveloop-slate/60 text-transparent',
                              )}
                            >
                              <Check className="h-3.5 w-3.5" />
                            </span>
                            <span className={cn('flex-1 text-sm', item.packed ? 'text-traveloop-ice/50 line-through' : 'text-traveloop-ice/90')}>
                              {item.label}
                            </span>
                            {item.priority === 'high' ? (
                              <span className="rounded-full border border-rose-300/40 bg-rose-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose-200">
                                Priority
                              </span>
                            ) : null}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </section>

        <section className="mt-6 rounded-2xl border border-traveloop-sky/20 bg-[#0B0F1A]/55 p-4 shadow-inner-glow backdrop-blur-xl md:p-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Smart suggestions</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-3">
            {['Carry a windbreaker', 'Don’t forget universal adapter', 'Pack trekking shoes'].map((s) => (
              <div key={s} className="rounded-xl border border-traveloop-slate/35 bg-white/[0.03] px-3 py-2.5 text-sm text-traveloop-ice/85">
                {s}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => pulse('Add item flow ready')}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-traveloop-sky/35 bg-gradient-to-br from-traveloop-sky/28 to-traveloop-slate/55 px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.01]"
          >
            <ListPlus className="h-4 w-4" /> Add Item to Checklist
          </button>
          <button
            onClick={() => {
              setCategories((prev) => prev.map((c) => ({ ...c, items: c.items.map((i) => ({ ...i, packed: false })) })))
              pulse('Checklist reset')
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-traveloop-sky/30 bg-[#080c16] px-4 py-3 text-sm font-semibold text-traveloop-ice transition hover:border-traveloop-ice/40"
          >
            <Trash2 className="h-4 w-4" /> Reset All
          </button>
          <button
            onClick={() => pulse('Checklist shared')}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-traveloop-sky/30 bg-[#080c16] px-4 py-3 text-sm font-semibold text-traveloop-ice transition hover:border-traveloop-ice/40"
          >
            <Share2 className="h-4 w-4" /> Share Checklist
          </button>
        </section>
      </main>

      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-xl border border-traveloop-sky/35 bg-[#080c16]/90 px-4 py-2.5 text-sm font-semibold text-white shadow-glow backdrop-blur-xl"
        >
          {toast}
        </motion.div>
      ) : null}
    </motion.div>
  )
}

