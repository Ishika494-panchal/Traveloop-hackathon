import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { BillingActionButtons } from '@/components/expense-billing/BillingActionButtons'
import { BillingAnimatedBackground } from '@/components/expense-billing/BillingAnimatedBackground'
import { BillingNavbar } from '@/components/expense-billing/BillingNavbar'
import { BillingSearchFilters } from '@/components/expense-billing/BillingSearchFilters'
import { BillingSummary } from '@/components/expense-billing/BillingSummary'
import { BudgetInsightsWidget } from '@/components/expense-billing/BudgetInsightsWidget'
import { ExpenseTable } from '@/components/expense-billing/ExpenseTable'
import { InvoiceSummaryCard } from '@/components/expense-billing/InvoiceSummaryCard'
import type { ExpenseRow, InvoiceSummary, PaymentStatus } from '@/components/expense-billing/types'

const expenseRows: ExpenseRow[] = [
  { id: 1, category: 'Hotel', description: 'Hotel booking Paris', details: '3 nights · Deluxe room', unitCost: 240, amount: 720 },
  { id: 2, category: 'Travel', description: 'Flight booking (DEL -> PAR)', details: 'Round trip · Economy Plus', unitCost: 680, amount: 680 },
  { id: 3, category: 'Meals', description: 'Fine dining reservation', details: '2 guests · Michelin', unitCost: 125, amount: 250 },
  { id: 4, category: 'Transport', description: 'Airport taxi', details: 'CDG to hotel', unitCost: 58, amount: 58 },
]

const invoiceBase: Omit<InvoiceSummary, 'status'> = {
  invoiceId: 'INV-TL-9084',
  generatedDate: 'May 10, 2026',
  traveler: 'James',
  tripTitle: 'Trip to Europe Adventure',
  travelDates: 'May 11 - May 20, 2026',
  totalCities: 4,
  creatorName: 'Arjun',
  creatorRole: 'Created by Trip Lead',
  imageUrl:
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
}

export function ExpenseInvoiceBillingPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('Newest')
  const [status, setStatus] = useState<PaymentStatus>('Pending')

  const filteredRows = useMemo(() => {
    let list = expenseRows.filter((r) => {
      const q = query.trim().toLowerCase()
      const hit = !q || r.category.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.details.toLowerCase().includes(q)
      const filterHit = filter === 'All' || r.category === filter
      return hit && filterHit
    })

    if (sort === 'Amount: High to Low') list = [...list].sort((a, b) => b.amount - a.amount)
    if (sort === 'Amount: Low to High') list = [...list].sort((a, b) => a.amount - b.amount)
    if (sort === 'Category') list = [...list].sort((a, b) => a.category.localeCompare(b.category))
    return list
  }, [query, filter, sort])

  const subtotal = useMemo(() => filteredRows.reduce((acc, r) => acc + r.amount, 0), [filteredRows])
  const tax = subtotal * 0.08
  const discount = subtotal * 0.05
  const grandTotal = subtotal + tax - discount
  const totalBudget = 3000
  const totalSpent = grandTotal

  const invoice: InvoiceSummary = { ...invoiceBase, status }

  return (
    <motion.div className="relative min-h-screen bg-[#0B0F1A] text-traveloop-ice" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <BillingAnimatedBackground />
      <BillingNavbar />

      <main className="relative z-10 mx-auto max-w-[1320px] px-4 pb-28 pt-6 md:px-8 md:pb-32">
        <header className="mb-8 md:mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-white via-traveloop-ice to-traveloop-steel bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-[2.5rem]"
          >
            Travel Expense Invoice
          </motion.h1>
          <div className="mt-3 h-px max-w-xl origin-left bg-gradient-to-r from-traveloop-sky via-traveloop-ice to-transparent shadow-[0_0_22px_rgba(136,189,242,0.45)]" />
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-traveloop-ice/70 md:text-lg">
            Track hotel bookings, transport costs, meals, taxes, and complete trip expenses.
          </p>
        </header>

        <BillingSearchFilters query={query} onQuery={setQuery} filter={filter} onFilter={setFilter} sort={sort} onSort={setSort} />

        <div className="mt-5">
          <Link
            to="/journeys"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-traveloop-ice/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="relative">
              <span>Back to My Trips</span>
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-traveloop-sky transition-all duration-300 group-hover:w-full" />
            </span>
          </Link>
        </div>

        <section className="mt-5 grid gap-4 xl:grid-cols-[1fr_320px] xl:items-start">
          <InvoiceSummaryCard invoice={invoice} />
          <BudgetInsightsWidget totalBudget={totalBudget} totalSpent={totalSpent} />
        </section>

        <section className="mt-5 rounded-2xl border border-traveloop-sky/18 bg-[#080c16]/72 p-4 shadow-inner-glow backdrop-blur-xl md:p-5">
          <ExpenseTable rows={filteredRows} />

          <div className="mt-5">
            <BillingSummary subtotal={subtotal} tax={tax} discount={discount} total={grandTotal} />
          </div>

          <BillingActionButtons onMarkPaid={() => setStatus('Paid')} />
        </section>
      </main>
    </motion.div>
  )
}
