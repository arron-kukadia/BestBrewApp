export interface Insight {
  id: string
  title: string
  description: string
  icon: string
}

export interface InsightsRequest {
  userId: string
  coffeeHistory: CoffeeHistorySummary[]
}

export interface CoffeeHistorySummary {
  brand: string
  origin: string
  roastLevel: string
  rating: number
  flavourNotes: string[]
}

export interface InsightsResponse {
  tasteProfile: string
  insights: Insight[]
  generatedAt: string
}
