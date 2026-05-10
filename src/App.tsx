import { Route, Routes } from 'react-router-dom'

import { ActivityCitySearchPage } from '@/pages/ActivityCitySearchPage'
import { AdminAnalyticsPage } from '@/pages/AdminAnalyticsPage'
import { AuthPage } from '@/pages/AuthPage'
import { CreateTripPage } from '@/pages/CreateTripPage'
import { CommunityPage } from '@/pages/CommunityPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ExpenseInvoiceBillingPage } from '@/pages/ExpenseInvoiceBillingPage'
import { ItineraryBuilderPage } from '@/pages/ItineraryBuilderPage'
import { ItineraryViewPage } from '@/pages/ItineraryViewPage'
import { MyJourneysPage } from '@/pages/MyJourneysPage'
import { PackingChecklistPage } from '@/pages/PackingChecklistPage'
import { TripNotesPage } from '@/pages/TripNotesPage'
import { UserProfilePage } from '@/pages/UserProfilePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/admin-analytics" element={<AdminAnalyticsPage />} />
      <Route path="/plan" element={<CreateTripPage />} />
      <Route path="/plan/itinerary" element={<ItineraryBuilderPage />} />
      <Route path="/journeys" element={<MyJourneysPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/discover" element={<ActivityCitySearchPage />} />
      <Route path="/itinerary/view" element={<ItineraryViewPage />} />
      <Route path="/packing-checklist" element={<PackingChecklistPage />} />
      <Route path="/trip-notes" element={<TripNotesPage />} />
      <Route path="/expense-billing" element={<ExpenseInvoiceBillingPage />} />
    </Routes>
  )
}
