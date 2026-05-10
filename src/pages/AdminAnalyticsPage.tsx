import { motion } from 'framer-motion'
import {
  Activity,
  BarChart3,
  Bell,
  ChevronDown,
  CloudCog,
  Download,
  FileText,
  Globe2,
  Search,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip as ChartTooltip,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

import { AnimatedBackground } from '@/components/dashboard/AnimatedBackground'
import { cn } from '@/lib/utils'

ChartJS.register(RadialLinearScale, PointElement, LineElement, CategoryScale, ChartTooltip, Legend, Filler)

const tabs = ['Manage Users', 'Popular Cities', 'Popular Activities', 'User Trends & Analytics'] as const
type Tab = (typeof tabs)[number]

const cityShare = [
  { name: 'Tokyo', value: 26 },
  { name: 'Paris', value: 22 },
  { name: 'Bali', value: 18 },
  { name: 'Goa', value: 14 },
  { name: 'Swiss Alps', value: 20 },
]

const growthRows = [
  { month: 'Jan', users: 9200 },
  { month: 'Feb', users: 9800 },
  { month: 'Mar', users: 10800 },
  { month: 'Apr', users: 12100 },
  { month: 'May', users: 13500 },
  { month: 'Jun', users: 14900 },
]

const budgetRows = [
  { category: 'Luxury', budget: 3650 },
  { category: 'Adventure', budget: 2100 },
  { category: 'Backpacking', budget: 980 },
  { category: 'Family', budget: 1850 },
]

const tripsRows = [
  { month: 'Jan', trips: 740 },
  { month: 'Feb', trips: 810 },
  { month: 'Mar', trips: 980 },
  { month: 'Apr', trips: 1120 },
  { month: 'May', trips: 1230 },
  { month: 'Jun', trips: 1390 },
]

const radarData = {
  labels: ['Food Tours', 'Nightlife', 'Beaches', 'Treks', 'Museums', 'City Walks'],
  datasets: [
    {
      label: 'Popularity',
      data: [88, 76, 92, 81, 64, 73],
      borderColor: '#88BDF2',
      backgroundColor: 'rgba(136, 189, 242, 0.22)',
      pointBorderColor: '#BDDDFC',
      pointBackgroundColor: '#BDDDFC',
      pointHoverRadius: 6,
      borderWidth: 2,
    },
  ],
}

const circleBtn =
  'flex h-10 w-10 items-center justify-center rounded-full border border-traveloop-sky/30 bg-white/[0.05] text-traveloop-ice shadow-inner-glow backdrop-blur-xl transition-colors hover:border-traveloop-ice/45 hover:bg-white/[0.1] hover:text-white md:h-11 md:w-11'

const selectClass =
  'h-12 w-full cursor-pointer appearance-none rounded-xl border border-traveloop-sky/30 bg-[#080c16] px-4 pr-10 text-sm font-medium text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-colors [color-scheme:dark] hover:border-traveloop-ice/35 hover:bg-[#0c111d] focus:border-traveloop-sky/55 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/25 md:min-w-[170px]'

export function AdminAnalyticsPage() {
  const [query, setQuery] = useState('')
  const [groupBy, setGroupBy] = useState('Popular')
  const [filter, setFilter] = useState('All')
  const [sortBy, setSortBy] = useState('Newest')
  const [activeTab, setActiveTab] = useState<Tab>('Manage Users')

  const statCards = useMemo(
    () => [
      { label: 'Total Users', value: '149K', delta: '+12.5%', icon: Users },
      { label: 'Active Trips', value: '8.7K', delta: '+8.2%', icon: Activity },
      { label: 'Avg Budget', value: '$2,140', delta: '+4.1%', icon: BarChart3 },
      { label: 'Countries Explored', value: '96', delta: '+6.4%', icon: Globe2 },
      { label: 'Platform Growth', value: '24%', delta: '+2.8%', icon: TrendingUp },
    ],
    [],
  )

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
            <motion.button type="button" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} className={circleBtn}>
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.65} />
            </motion.button>
            <motion.button type="button" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} className={circleBtn}>
              <Settings className="h-[18px] w-[18px]" strokeWidth={1.65} />
            </motion.button>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-traveloop-sky/35 bg-gradient-to-br from-traveloop-sky/40 to-traveloop-slate text-xs font-semibold text-white shadow-glow-sm">
                AD
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10 mx-auto max-w-[1450px] px-4 pb-28 pt-6 md:px-8 md:pb-32">
        <header className="mb-8 md:mb-10">
          <h1 className="bg-gradient-to-br from-white via-traveloop-ice to-traveloop-steel bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-[2.5rem]">
            Travel Intelligence Dashboard
          </h1>
          <div className="mt-3 h-px max-w-xl origin-left bg-gradient-to-r from-traveloop-sky via-traveloop-ice to-transparent shadow-[0_0_22px_rgba(136,189,242,0.45)]" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-traveloop-ice/70 md:text-lg">
            Monitor user activity, travel trends, destination analytics, and platform growth.
          </p>
        </header>

        <section className="rounded-2xl border border-traveloop-sky/20 bg-[#080c16]/75 p-4 shadow-inner-glow backdrop-blur-xl md:p-5">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center md:gap-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-traveloop-ice/55" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search analytics, users, cities, or activities…"
                className="h-12 w-full rounded-xl border border-traveloop-sky/25 bg-[#0B0F1A]/65 py-2.5 pl-11 pr-4 text-sm text-traveloop-ice shadow-inner-glow backdrop-blur-md transition-all placeholder:text-traveloop-ice/45 focus:border-traveloop-sky/70 focus:outline-none focus:ring-2 focus:ring-traveloop-sky/35"
              />
            </div>
            {[
              ['Group by', ['Popular', 'Recent', 'Most Liked', 'Trending'], groupBy, setGroupBy],
              ['Filter', ['All', 'Cities', 'Activities', 'Users', 'Budgets'], filter, setFilter],
              ['Sort by', ['Newest', 'Likes', 'Comments', 'Views'], sortBy, setSortBy],
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
        </section>

        <section className="mt-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'rounded-xl border px-4 py-2.5 text-sm font-semibold transition',
                  activeTab === tab
                    ? 'border-traveloop-sky/45 bg-gradient-to-br from-traveloop-sky/25 to-traveloop-slate/45 text-white shadow-glow'
                    : 'border-traveloop-slate/40 bg-white/[0.03] text-traveloop-ice/80 hover:border-traveloop-sky/40',
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {statCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl border border-traveloop-sky/24 bg-[#0B0F1A]/65 p-4 shadow-inner-glow backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-traveloop-steel">{card.label}</span>
                    <card.icon className="h-4 w-4 text-traveloop-sky" strokeWidth={1.7} />
                  </div>
                  <p className="mt-3 text-2xl font-bold text-white">{card.value}</p>
                  <p className="mt-1 text-xs text-emerald-300">{card.delta}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-traveloop-sky/20 bg-[#080c16]/75 p-5 shadow-inner-glow backdrop-blur-xl">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Popular Cities</h3>
                <div className="mt-4 h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={cityShare} dataKey="value" nameKey="name" innerRadius={56} outerRadius={95} paddingAngle={3}>
                        {cityShare.map((_, i) => (
                          <Cell key={i} fill={['#88BDF2', '#BDDDFC', '#6A89A7', '#384959', '#739cbf'][i]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(8, 11, 22, 0.94)',
                          border: '1px solid rgba(136, 189, 242, 0.38)',
                          borderRadius: 12,
                          color: '#BDDDFC',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-3xl border border-traveloop-sky/20 bg-[#080c16]/75 p-5 shadow-inner-glow backdrop-blur-xl">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Active Users</h3>
                <div className="mt-4 h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthRows}>
                      <CartesianGrid strokeDasharray="3 6" stroke="rgba(106,137,167,0.2)" vertical={false} />
                      <XAxis dataKey="month" tick={{ fill: '#BDDDFC', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#6A89A7', fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(8,11,22,0.94)', border: '1px solid rgba(136,189,242,0.38)', borderRadius: 12 }} />
                      <Line type="monotone" dataKey="users" stroke="#88BDF2" strokeWidth={2.5} dot={{ fill: '#BDDDFC', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-3xl border border-traveloop-sky/20 bg-[#080c16]/75 p-5 shadow-inner-glow backdrop-blur-xl">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Average Budget</h3>
                <div className="mt-4 h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={budgetRows}>
                      <CartesianGrid strokeDasharray="3 6" stroke="rgba(106,137,167,0.2)" vertical={false} />
                      <XAxis dataKey="category" tick={{ fill: '#BDDDFC', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#6A89A7', fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(8,11,22,0.94)', border: '1px solid rgba(136,189,242,0.38)', borderRadius: 12 }} />
                      <Bar dataKey="budget" radius={[10, 10, 4, 4]}>
                        {budgetRows.map((_, i) => (
                          <Cell key={i} fill={['#88BDF2', '#BDDDFC', '#6A89A7', '#384959'][i]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-3xl border border-traveloop-sky/20 bg-[#080c16]/75 p-5 shadow-inner-glow backdrop-blur-xl">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Trips Per Month</h3>
                <div className="mt-4 h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={tripsRows}>
                      <defs>
                        <linearGradient id="trips" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#88BDF2" stopOpacity={0.45} />
                          <stop offset="95%" stopColor="#88BDF2" stopOpacity={0.03} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 6" stroke="rgba(106,137,167,0.2)" vertical={false} />
                      <XAxis dataKey="month" tick={{ fill: '#BDDDFC', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#6A89A7', fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: 'rgba(8,11,22,0.94)', border: '1px solid rgba(136,189,242,0.38)', borderRadius: 12 }} />
                      <Area type="monotone" dataKey="trips" stroke="#88BDF2" fill="url(#trips)" strokeWidth={2.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-traveloop-sky/20 bg-[#080c16]/75 p-5 shadow-inner-glow backdrop-blur-xl">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Popular Activities (Chart.js Radar)</h3>
              <div className="mx-auto mt-4 max-w-[560px]">
                <Radar
                  data={radarData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { labels: { color: '#BDDDFC' } },
                    },
                    scales: {
                      r: {
                        grid: { color: 'rgba(106,137,167,0.25)' },
                        angleLines: { color: 'rgba(106,137,167,0.25)' },
                        pointLabels: { color: '#BDDDFC', font: { size: 11 } },
                        ticks: { color: '#6A89A7', backdropColor: 'rgba(11,15,26,0.85)' },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-traveloop-sky/20 bg-[#0B0F1A]/65 p-5 shadow-inner-glow backdrop-blur-xl">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Insights panel</h3>
              <div className="mt-3 space-y-3">
                {[
                  ['Manage Users', 'New creators +18% this week'],
                  ['Popular Cities', 'Tokyo demand up 24%'],
                  ['Popular Activities', 'Food tours leading in APAC'],
                  ['User Trends & Analytics', 'Retention improved to 62%'],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-traveloop-slate/35 bg-white/[0.03] p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-traveloop-steel">{k}</p>
                    <p className="mt-1 text-sm text-traveloop-ice/80">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-traveloop-sky/20 bg-[#0B0F1A]/65 p-5 shadow-inner-glow backdrop-blur-xl">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-traveloop-steel">Live Activity</h3>
              <div className="mt-3 space-y-2">
                {[
                  'Aman created a Bali Trip',
                  'Goa trending +24%',
                  'Tokyo Food Tours increased',
                  'Riya exported quarterly report',
                ].map((entry) => (
                  <div key={entry} className="rounded-xl border border-traveloop-slate/35 bg-white/[0.03] px-3 py-2 text-sm text-traveloop-ice/85">
                    {entry}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              {[
                ['Export Analytics', Download],
                ['Generate Report', FileText],
                ['Manage Users', ShieldCheck],
                ['View Platform Logs', CloudCog],
              ].map(([label, Icon]) => (
                <button
                  key={String(label)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-traveloop-sky/35 bg-gradient-to-br from-traveloop-sky/22 to-traveloop-slate/50 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
                >
                  <Icon className="h-4 w-4" />
                  {String(label)}
                </button>
              ))}
            </div>
          </aside>
        </section>
      </main>

    </motion.div>
  )
}

