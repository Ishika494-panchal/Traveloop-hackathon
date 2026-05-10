import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarDays,
  ChevronDown,
  Mic,
  MicOff,
  Pin,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
  Trash2,
  UserRound,
} from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { AnimatedBackground } from '@/components/dashboard/AnimatedBackground'
import { cn } from '@/lib/utils'

type Note = {
  id: string
  title: string
  category: 'Hotel' | 'Food' | 'Safety' | 'Reminder' | 'Daily'
  reminder: 'Today' | 'Tomorrow' | 'Upcoming' | 'Completed'
  timestamp: string
  day: string
  stop: string
  markdown: string
  pinned: boolean
  favorite: boolean
}

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition
    SpeechRecognition?: new () => SpeechRecognition
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onresult: ((ev: SpeechRecognitionEvent) => void) | null
  onerror: ((ev: Event) => void) | null
  onend: (() => void) | null
}
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}
interface SpeechRecognitionResultList {
  length: number
  [index: number]: SpeechRecognitionResult
}
interface SpeechRecognitionResult {
  length: number
  isFinal: boolean
  [index: number]: SpeechRecognitionAlternative
}
interface SpeechRecognitionAlternative {
  transcript: string
}

const initialNotes: Note[] = [
  {
    id: 'n1',
    title: 'Hotel check-in details',
    category: 'Hotel',
    reminder: 'Today',
    timestamp: '08:45 AM',
    day: 'Day 1',
    stop: 'Paris',
    pinned: true,
    favorite: true,
    markdown: `## Check-in after 2pm\n\n- Room: **302**\n- Breakfast included *(7-10am)*\n- Keep passport copy at reception\n\n[Hotel map link](https://example.com)`,
  },
  {
    id: 'n2',
    title: 'Local food recommendations',
    category: 'Food',
    reminder: 'Tomorrow',
    timestamp: '11:20 AM',
    day: 'Day 2',
    stop: 'Rome',
    pinned: false,
    favorite: true,
    markdown: `### Must-try spots\n\n- Trastevere pasta lane\n- Pantheon gelato bar\n- Campo de Fiori breakfast\n\n- [ ] Book 8:00 PM table`,
  },
  {
    id: 'n3',
    title: 'Emergency contact notes',
    category: 'Safety',
    reminder: 'Upcoming',
    timestamp: '06:10 PM',
    day: 'Day 3',
    stop: 'Rome',
    pinned: false,
    favorite: false,
    markdown: `**Embassy:** +39 123 4567\n\n\`\`\`text\nLocal emergency: 112\nTravel insurer: +1 888 222 9000\n\`\`\``,
  },
]

const circleBtn =
  'flex h-10 w-10 items-center justify-center rounded-full border border-traveloop-sky/30 bg-white/[0.05] text-traveloop-ice shadow-inner-glow backdrop-blur-xl transition-colors hover:border-traveloop-ice/45 hover:bg-white/[0.1] hover:text-white md:h-11 md:w-11'

const selectClass =
  'h-12 w-full cursor-pointer appearance-none rounded-xl border border-traveloop-sky/30 bg-[#080c16] px-4 pr-10 text-sm font-medium text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-colors [color-scheme:dark] hover:border-traveloop-ice/35 hover:bg-[#0c111d] focus:border-traveloop-sky/55 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/25 md:min-w-[160px]'

export function TripNotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [query, setQuery] = useState('')
  const [groupBy, setGroupBy] = useState('Recent')
  const [filter, setFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Newest')
  const [trip, setTrip] = useState('Trip: Paris & Rome Adventure')
  const [tab, setTab] = useState<'All' | 'By Day' | 'By Stop'>('All')
  const [recording, setRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [toast, setToast] = useState('')
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase()
    const sorted = [...notes].sort((a, b) => (sortBy === 'Newest' ? (a.timestamp < b.timestamp ? 1 : -1) : a.title.localeCompare(b.title)))
    return sorted.filter((n) => {
      const matchesQuery = !q || n.title.toLowerCase().includes(q) || n.markdown.toLowerCase().includes(q) || n.stop.toLowerCase().includes(q)
      const matchesFilter = filter === 'All' || n.category === filter || n.reminder === filter
      return matchesQuery && matchesFilter
    })
  }, [notes, query, filter, sortBy])

  const startVoice = () => {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition
    if (!Ctor) {
      setToast('Speech API not supported in this browser')
      window.setTimeout(() => setToast(''), 1300)
      return
    }

    const rec = new Ctor()
    rec.continuous = true
    rec.interimResults = true
    rec.lang = 'en-US'
    rec.onresult = (event) => {
      let text = ''
      for (let i = 0; i < event.results.length; i++) text += event.results[i][0].transcript
      setTranscript(text)
    }
    rec.onerror = () => setToast('Voice capture interrupted')
    rec.onend = () => setRecording(false)
    recognitionRef.current = rec
    rec.start()
    setRecording(true)
  }

  const stopVoice = () => {
    recognitionRef.current?.stop()
    setRecording(false)
  }

  const addNote = () => {
    const content = transcript.trim() || '### Quick Note\n\n- Add your reminder here\n- Include stop/day details\n'
    setNotes((prev) => [
      {
        id: `n${Date.now()}`,
        title: transcript ? 'Voice captured note' : 'New travel note',
        category: 'Reminder',
        reminder: 'Today',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        day: 'Day 4',
        stop: 'Next Stop',
        markdown: content,
        pinned: false,
        favorite: false,
      },
      ...prev,
    ])
    setTranscript('')
    setToast('Note added')
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
          <Link to="/dashboard" className="group flex items-center gap-2">
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

      <main className="relative z-10 mx-auto max-w-[1200px] px-4 pb-28 pt-6 md:px-8 md:pb-32">
        <header className="mb-8 md:mb-10">
          <h1 className="bg-gradient-to-br from-white via-traveloop-ice to-traveloop-steel bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-[2.5rem]">
            Travel Notes & Journal
          </h1>
          <div className="mt-3 h-px max-w-xl origin-left bg-gradient-to-r from-traveloop-sky via-traveloop-ice to-transparent shadow-[0_0_22px_rgba(136,189,242,0.45)]" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-traveloop-ice/70 md:text-lg">
            Capture memories, reminders, hotel details, and important travel experiences beautifully.
          </p>
        </header>

        <section className="rounded-2xl border border-traveloop-sky/20 bg-[#080c16]/75 p-4 shadow-inner-glow backdrop-blur-xl md:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center md:gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/55" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes, reminders, or destinations…"
                className="h-12 w-full rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/65 py-2.5 pl-11 pr-4 text-sm text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-all placeholder:text-traveloop-ice/45 focus:border-traveloop-sky/70 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/35"
              />
            </div>
            {[
              ['Group by', ['Recent', 'Pinned', 'Favorites'], groupBy, setGroupBy],
              ['Filter', ['All', 'Hotel', 'Food', 'Safety', 'Reminder', 'Today', 'Tomorrow', 'Upcoming', 'Completed'], filter, setFilter],
              ['Sort by', ['Newest', 'Oldest', 'Title'], sortBy, setSortBy],
            ].map(([label, options, val, setVal]) => (
              <div key={String(label)} className="relative">
                <select value={String(val)} onChange={(e) => (setVal as (v: string) => void)(e.target.value)} className={selectClass}>
                  {(options as string[]).map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/55" />
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div className="relative">
              <select value={trip} onChange={(e) => setTrip(e.target.value)} className={selectClass}>
                <option>Trip: Paris & Rome Adventure</option>
                <option>Trip: Bali Escape</option>
                <option>Trip: Swiss Adventure</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/55" />
            </div>
            <div className="flex flex-wrap gap-2">
              {(['All', 'By Day', 'By Stop'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    'rounded-xl border px-4 py-2.5 text-sm font-semibold transition',
                    tab === t
                      ? 'border-traveloop-sky/45 bg-gradient-to-br from-traveloop-sky/25 to-traveloop-slate/45 text-white shadow-glow'
                      : 'border-traveloop-slate/40 bg-white/[0.03] text-traveloop-ice/80 hover:border-traveloop-sky/40',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={recording ? stopVoice : startVoice}
              className={cn(
                'inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition',
                recording
                  ? 'border-rose-300/50 bg-rose-500/15 text-rose-200 shadow-[0_0_18px_rgba(244,63,94,0.35)]'
                  : 'border-traveloop-sky/35 bg-[#080c16] text-traveloop-ice hover:border-traveloop-ice/40',
              )}
            >
              {recording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {recording ? 'Stop voice' : 'Voice-to-note'}
            </button>
            {recording ? (
              <motion.div className="flex items-end gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {[8, 14, 11, 16, 9].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-1 rounded-full bg-traveloop-sky/80"
                    animate={{ height: [6, h, 7] }}
                    transition={{ duration: 0.7 + i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </motion.div>
            ) : null}
          </div>
          <button
            onClick={addNote}
            className="inline-flex items-center gap-2 rounded-xl border border-traveloop-sky/35 bg-gradient-to-br from-traveloop-sky/28 to-traveloop-slate/55 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" /> Add Note
          </button>
        </section>

        {transcript ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 rounded-xl border border-traveloop-sky/24 bg-[#0B0F1A]/65 px-3 py-2.5 text-sm text-traveloop-ice/85">
            <span className="text-xs uppercase tracking-[0.16em] text-traveloop-steel">Transcription preview</span>
            <p className="mt-1">{transcript}</p>
          </motion.div>
        ) : null}

        <section className="mt-6 space-y-4">
          {filteredNotes.map((note, idx) => (
            <motion.article
              key={note.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(idx * 0.05, 0.25) }}
              className="rounded-2xl border border-traveloop-sky/20 bg-[#0B0F1A]/60 p-4 shadow-inner-glow backdrop-blur-xl md:p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{note.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-traveloop-sky/28 bg-traveloop-sky/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-traveloop-ice">
                      {note.category}
                    </span>
                    <span className={cn('rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                      note.reminder === 'Today' && 'border-emerald-300/40 bg-emerald-400/10 text-emerald-200',
                      note.reminder === 'Tomorrow' && 'border-sky-300/40 bg-sky-400/10 text-sky-200',
                      note.reminder === 'Upcoming' && 'border-amber-300/40 bg-amber-400/10 text-amber-200',
                      note.reminder === 'Completed' && 'border-traveloop-slate/45 bg-traveloop-slate/20 text-traveloop-ice/70',
                    )}>
                      {note.reminder}
                    </span>
                    <span className="text-xs text-traveloop-ice/55">{note.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { icon: Pin, onClick: () => setNotes((prev) => prev.map((n) => (n.id === note.id ? { ...n, pinned: !n.pinned } : n))), active: note.pinned },
                    { icon: Star, onClick: () => setNotes((prev) => prev.map((n) => (n.id === note.id ? { ...n, favorite: !n.favorite } : n))), active: note.favorite },
                    { icon: CalendarDays, onClick: () => setToast('Reminder adjusted') },
                    { icon: Share2, onClick: () => setToast('Note shared') },
                    { icon: Trash2, onClick: () => setNotes((prev) => prev.filter((n) => n.id !== note.id)) },
                  ].map(({ icon: Icon, onClick, active }, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        onClick()
                        window.setTimeout(() => setToast(''), 1000)
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-traveloop-slate/40 bg-[#080c16] text-traveloop-ice transition hover:border-traveloop-sky/40"
                    >
                      <Icon className={cn('h-4 w-4', active && 'fill-traveloop-sky text-traveloop-sky')} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="prose prose-invert prose-sm mt-4 max-w-none text-traveloop-ice/85 prose-headings:text-white prose-strong:text-traveloop-ice prose-code:text-traveloop-sky prose-a:text-traveloop-sky prose-pre:bg-[#080c16] prose-li:marker:text-traveloop-steel">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.markdown}</ReactMarkdown>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-traveloop-ice/60">
                <span className="rounded-full border border-traveloop-slate/40 bg-white/[0.03] px-2.5 py-1">{note.day}</span>
                <span className="rounded-full border border-traveloop-slate/40 bg-white/[0.03] px-2.5 py-1">{note.stop}</span>
              </div>
            </motion.article>
          ))}
        </section>
      </main>

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-xl border border-traveloop-sky/35 bg-[#080c16]/90 px-4 py-2.5 text-sm font-semibold text-white shadow-glow backdrop-blur-xl"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

