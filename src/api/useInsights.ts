import { useQuery } from '@tanstack/react-query'
import { insightService } from '@/services/insightService'
import { Coffee } from '@/types'
import { CoffeeHistorySummary, InsightsResponse } from '@/types/insight'

const transformCoffeeHistory = (coffees: Coffee[]): CoffeeHistorySummary[] => {
  return coffees.map((coffee) => ({
    brand: coffee.brand,
    origin: coffee.origin,
    roastLevel: coffee.roastLevel,
    rating: coffee.rating,
    flavourNotes: coffee.flavourNotes?.map((fn) => fn.name) || [],
  }))
}

interface UseInsightsOptions {
  userId: string | undefined
  coffees: Coffee[]
  enabled?: boolean
}

export const useInsights = ({ userId, coffees, enabled = true }: UseInsightsOptions) => {
  return useQuery<InsightsResponse>({
    queryKey: ['insights', userId, coffees.length],
    queryFn: async () => {
      if (!userId || coffees.length < 2) {
        throw new Error('Need at least 2 coffees')
      }

      return insightService.getInsights({
        userId,
        coffeeHistory: transformCoffeeHistory(coffees),
      })
    },
    enabled: enabled && !!userId && coffees.length >= 2,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: false,
  })
}
