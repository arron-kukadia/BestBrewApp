import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { insightService } from '@/services/insightService'
import { Coffee } from '@/types'
import { CoffeeHistorySummary, InsightsResponse } from '@/types/insight'
import { getStoredInsights, storeInsights } from '@/stores/insightStorage'

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
  const [cachedData] = useState(() => getStoredInsights())

  return useQuery<InsightsResponse>({
    queryKey: ['insights', userId],
    queryFn: async () => {
      if (!userId || coffees.length < 2) {
        throw new Error('Need at least 2 coffees')
      }

      const response = await insightService.getInsights({
        userId,
        coffeeHistory: transformCoffeeHistory(coffees),
      })

      storeInsights(response)
      return response
    },
    initialData: cachedData ?? undefined,
    enabled: enabled && !!userId && coffees.length >= 2 && !cachedData,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })
}

export const insightKeys = {
  all: ['insights'] as const,
  user: (userId: string) => [...insightKeys.all, userId] as const,
}
