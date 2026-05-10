export type PaymentStatus = 'Pending' | 'Paid' | 'Failed'

export type ExpenseRow = {
  id: number
  category: 'Hotel' | 'Travel' | 'Meals' | 'Transport'
  description: string
  details: string
  unitCost: number
  amount: number
}

export type InvoiceSummary = {
  invoiceId: string
  generatedDate: string
  traveler: string
  status: PaymentStatus
  tripTitle: string
  travelDates: string
  totalCities: number
  creatorName: string
  creatorRole: string
  imageUrl: string
}
